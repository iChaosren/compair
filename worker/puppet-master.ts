import * as puppeteer from 'puppeteer'
import Script from '../types/script';
import Site from '../types/site';
import fs from 'fs/promises';
import Comparison from '../types/comparison';
import { v4 as uuid } from 'uuid';
import sharp from 'sharp';
// import pixelmatch from "pixelmatch";
import looksSame from 'looks-same';

export default class PuppetMaster {
    constructor() {
    }
    browser: puppeteer.Browser;
    page: puppeteer.Page;

    async init() {
        this.browser = await puppeteer.launch();
    }

    async open({ url, timeout }: { url: string, timeout: number }) {
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
        return site.comparison.type === 'html' ? this.compareHtml(site.comparison, site) : this.compareVisual(site.comparison, site.id);
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
    private async compareVisual(comparison: Comparison, siteId: string) {
        const screenshot: Buffer = (await this.page.screenshot({
            path: `site-screenshots/screenshot-${siteId}-new.png`,
            fullPage: !comparison.region,
            clip: comparison.region ? comparison.region : undefined,
            type: 'png',
            encoding: 'binary'
        })) as Buffer;
        let currentImage : Buffer;
        if(!comparison.current) {
            await fs.rename(`site-screenshots/screenshot-${siteId}-new.png`, `site-screenshots/screenshot-${siteId}.png`);
            comparison.current = {
                imagePath: `site-screenshots/screenshot-${siteId}.png`
            };
            return true;
        } else {
            currentImage = await fs.readFile(comparison.current?.imagePath);
        }
        
        const imagesEqual = new Promise<boolean>((resolve, reject) => looksSame(currentImage, screenshot, { tolerance: 0.5 }, function (error, result) {
            if(error) {
                reject(error);
            } else {
                console.debug(result);
                resolve(result.equal);
            }
        }));

        //Debug Only
        await fs.rename(`site-screenshots/screenshot-${siteId}.png`, `site-screenshots/screenshot-${siteId}-old.png`);
        
        await fs.rename(`site-screenshots/screenshot-${siteId}-new.png`, `site-screenshots/screenshot-${siteId}.png`);
        return imagesEqual;
    }

    async takeScreenshot() {
        return (await this.page.screenshot({
            fullPage: true,
            type: 'png',
            encoding: 'binary'
        })) as Buffer;
    }

    async close() {
        await this.page.close();
    }

    async destroy() {
        await this.browser.close();
    }
}