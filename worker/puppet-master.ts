import * as puppeteer from 'puppeteer'
import Script from '../types/script';
import Site from '../types/site';
import fs from 'fs/promises';
import Comparison from '../types/comparison';
import { v4 as uuid } from 'uuid';
import sharp from 'sharp';
import pixelmatch from "pixelmatch";

export default class PuppetMaster {
    constructor() {
    }
    browser: puppeteer.Browser;
    page: puppeteer.Page;

    async init() {
        this.browser = await puppeteer.launch();
    }

    async open({ url, timeout }: Site) {
        this.page = await this.browser.newPage();
        return this.page.goto(url, { waitUntil: 'networkidle2', timeout, referer: "compair" });
    }

    async executeScript(script: Script) {
        const scriptContent = await fs.readFile(script.path, 'utf8');
        return (await this.page.evaluate(scriptContent)) as any;
    }

    /**
     * @returns - `true` if the comparison is the same, `false` if not
     */
    async compare(site: Site) {
        return site.comparison.type === 'html' ? this.compareHtml(site.comparison, site) : this.compareVisual(site.comparison);
    }

    // INTERNAL
    // UNTESTED
    private async compareHtml(comparison: Comparison, site: Site) {
        this.page.waitForSelector(comparison.selector, { timeout: site.timeout });
        const current = await this.page.$eval(comparison.selector, el => el.innerHTML);
        if(current !== comparison.current.value) {
            comparison.current.value = current;
            return false;
        }        
        return true;
    }

    // INTERNAL
    // UNTESTED
    private async compareVisual(comparison: Comparison) {
        const screenshot: Buffer = (await this.page.screenshot({
            path: `screenshot-${uuid()}.png`,
            fullPage: true,
            clip: comparison.region ? { x: comparison.region.left, y: comparison.region.top, width: comparison.region.width, height: comparison.region.height } : undefined,
            type: 'png',
            encoding: 'binary'
        })) as Buffer;
        const currentImage = await fs.readFile(comparison.current.imagePath);
        const diffBuffer = Buffer.alloc(screenshot.length);

        const differentPixels = pixelmatch(screenshot, currentImage, diffBuffer, comparison.region ? comparison.region.width : undefined, comparison.region ? comparison.region.height : undefined);

        if(differentPixels > comparison.difference * screenshot.length) {
            await fs.writeFile(`diff-${uuid()}.png`, diffBuffer);
            return false;
        }
        return true;
    }

    async close() {
        await this.page.close();
    }

    async destroy() {
        await this.browser.close();
    }
}