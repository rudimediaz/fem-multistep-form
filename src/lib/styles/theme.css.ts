import { createGlobalThemeContract } from "@vanilla-extract/css";

const prefix = (n: string, type: "p" | "n", hsl = false) => {
    if (hsl) {
        return `clr-${type}-hsl-${n}`;
    }

    return `clr-${type}-${n}`;
};

export const vars = createGlobalThemeContract({
    color: {
        primary: {
            hsl: {
                marine: prefix("marine", "p", true),
                purplish: prefix("purplish", "p", true),
                pastel: prefix("pastel", "p", true),
                light: prefix("light", "p", true),
                straw: prefix("straw", "p", true),
            },
            marine: prefix("marine", "p"),
            purplish: prefix("purplish", "p"),
            pastel: prefix("pastel", "p"),
            light: prefix("light", "p"),
            straw: prefix("straw", "p"),
        },
        neutral: {
            hsl: {
                "100": prefix("100", "n", true),
                "200": prefix("200", "n", true),
                "300": prefix("300", "n", true),
                "400": prefix("400", "n", true),
                "500": prefix("500", "n", true),
                "600": prefix("600", "n", true),
            },
            "100": prefix("100", "n"),
            "200": prefix("200", "n"),
            "300": prefix("300", "n"),
            "400": prefix("400", "n"),
            "500": prefix("500", "n"),
            "600": prefix("600", "n"),
        },
    },
    font: {
        regular: "ft-400",
        medium: "ft-500",
        bold: "ft-600",
        size: {
            sub: "ft-size-sub",
        },
    },
    radius : {
        sm : 'rad-1',
        md : 'rad-2',
        lg : 'rad-3',
        xl : 'rad-4',
        rnd : 'rad-o',
    }
});
