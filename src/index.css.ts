import { createGlobalTheme, globalFontFace, globalStyle } from "@vanilla-extract/css";
import { UBUNTU_BOLD, UBUNTU_MEDIUM, UBUNTU_REGULAR } from "./lib/styles/constants.css";
import { vars } from "./lib/styles/theme.css";

/*
 ## Colors

### Primary

- Marine blue: hsl(213, 96%, 18%)
- Purplish blue: hsl(243, 100%, 62%)
- Pastel blue: hsl(228, 100%, 84%)
- Light blue: hsl(206, 94%, 87%)
- Strawberry red: hsl(354, 84%, 57%)

### Neutral

- Cool gray: hsl(231, 11%, 63%)
- Light gray: hsl(229, 24%, 87%)
- Magnolia: hsl(217, 100%, 97%)
- Alabaster: hsl(231, 100%, 99%)
- White: hsl(0, 0%, 100%)


 */

const primaries = ["213 96% 18%", "243 100% 62%", "228 100% 84%", "206 94% 87%", "354 84% 57%"];

const neutrals = [
    "0 0% 100%",
    "231 100% 93%",
    "217 100% 97%",
    "229 24% 87%",
    "231 11% 63%",
    "0 0% 0%",
];

enum Primary {
    MAR,
    PUR,
    PAS,
    LIG,
    STR,
}

enum Neutral {
    X,
    XX,
    XXX,
    XXXX,
    XXXXX,
    XXXXXX,
}

const getPrimary = (key: Primary) => primaries[key];
const getNeutral = (key: Neutral) => neutrals[key];
const wrapHSLprimary = (key: Primary) => `hsl(${getPrimary(key)})`;
const wrapHSLNeutral = (key: Neutral) => `hsl(${getNeutral(key)})`;

globalFontFace(UBUNTU_REGULAR, {
    src: "url(/fonts/Ubuntu-Regular.ttf)",
});
globalFontFace(UBUNTU_MEDIUM, {
    src: "url(/fonts/Ubuntu-Medium.ttf)",
});
globalFontFace(UBUNTU_BOLD, {
    src: "url(/fonts/Ubuntu-Bold.ttf)",
});

createGlobalTheme(":root", vars, {
    color: {
        primary: {
            hsl: {
                marine: getPrimary(Primary.MAR),
                purplish: getPrimary(Primary.PUR),
                pastel: getPrimary(Primary.PAS),
                light: getPrimary(Primary.LIG),
                straw: getPrimary(Primary.STR),
            },
            marine: wrapHSLprimary(Primary.MAR),
            purplish: wrapHSLprimary(Primary.PUR),
            pastel: wrapHSLprimary(Primary.PAS),
            light: wrapHSLprimary(Primary.LIG),
            straw: wrapHSLprimary(Primary.STR),
        },
        neutral: {
            hsl: {
                "100": getNeutral(Neutral.X),
                "200": getNeutral(Neutral.XX),
                "300": getNeutral(Neutral.XXX),
                "400": getNeutral(Neutral.XXXX),
                "500": getNeutral(Neutral.XXXXX),
                "600": getNeutral(Neutral.XXXXXX),
            },
            "100": wrapHSLNeutral(Neutral.X),
            "200": wrapHSLNeutral(Neutral.XX),
            "300": wrapHSLNeutral(Neutral.XXX),
            "400": wrapHSLNeutral(Neutral.XXXX),
            "500": wrapHSLNeutral(Neutral.XXXXX),
            "600": wrapHSLNeutral(Neutral.XXXXXX),
        },
    },
    font: {
        regular: `'${UBUNTU_REGULAR}', sans-serif`,
        medium: `'${UBUNTU_MEDIUM}', sans-serif`,
        bold: `'${UBUNTU_BOLD}', sans-serif`,
        size: {
            sub: "0.75em",
        },
    },
    radius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        rnd: "9999em",
    },
});

globalStyle("html", {
    boxSizing: "border-box",
});

globalStyle("*,*::before,*::after", {
    boxSizing: "inherit",
    font: "inherit",
});

globalStyle("body, h1, h2, h3, h4, h5, h6, p, pre", {
    margin: 0,
});

globalStyle("body", {
    fontFamily: vars.font.regular,
    overflowX: "hidden",
});
