import pixelmatch from "pixelmatch";
import {  } from "puppeteer";
import * as sharp from "sharp";
import sleep from "../helpers/sleep";
//require("sharp/build/Release/sharp-darwin-x64.node");

const worker = async () => {
    while(true) {


        await sleep(1000);
    }
}

worker().catch((e) => console.error(e));
