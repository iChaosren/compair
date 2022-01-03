import Sites from './sites';
import Scripts from './scripts';

export interface DbStructure {
    sites: Sites;
    scripts: Scripts;
}

// Default DB and List of DB Files with examples
export default {
    "sites": {
        "123-site_id": {
            id: "123-site_id",
            url: "https://example.com",
            comparison: {
                type: "visual", // | html
                difference: 0.01, // percentage change - Only Applicable if type == visual
                delay: 2000,// ms to delay actions after page load
                region: { // Only Applicable if type == "visual"
                    left: 0,
                    top: 0,
                    width: 1,
                    height: 1
                },
                selector: "#some-element", // Only Applicable if type == html
                excepted: "In Stock", // optional | Only Applicable if type == html
                current: null, // visual -> image path ;  html -> element value; null if first time
            },
            created: "2021-01-01 00:00:00",
            lastChecked: "2021-01-01 00:00:00",
            /* allows weekly on a day */ start: "2021-01-01 00:00:00",
            frequency: {
                /* every x */ minutes: 0,
                /* every x */ hours: 1,
                /* every x */ days: 0,
                /* script returns (true -> run) (false -> don't) */ script: null
            },
            scripts: []
        }
    },
    "scripts": {
        "scriptName": {
            name: "scriptName",
            path: "db/scripts/scriptName.js",
            runAsync: false,
            runBeforePageLoad: false,
            runAfterPageLoad: false
        }
    }
}