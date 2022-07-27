import { v4 as uuid } from 'uuid';
import ComparisonValue from "./comparison-value";

export type Region = {
    x: number;
    y: number;
    height: number;
    width: number;
}

export type ComparisonType = "html" | "visual"

export default class Comparison {
    type: ComparisonType = "html";
    /** Percentage change - Only Applicable if type == visual */
    difference?: number = 0.05;
    /** Amount in ms to delay actions after page load */
    delay: number = 2000;
    /** Region to check/compare - Only Applicable if type == visual */
    region?: Region;
    /** Selector used to find the element to compare - Only Applicable if type == html */
    selector?: string;
    /** Only Applicable if type == html */
    excepted?: string;
    current?: ComparisonValue;
}