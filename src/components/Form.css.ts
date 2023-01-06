import { style } from "@vanilla-extract/css";
import { DESKTOP, MOBILE } from "../lib/styles/constants.css";
import { vars } from "../lib/styles/theme.css";
import { rem } from "../lib/styles/utils";
import { flex } from "../lib/styles/utils.css";

function makeShadow(shade: string) {
    let x = 1;
    let y = 2;
    let b = 4;
    let s = 2;
    let o = 1;
    let result: string[] = [];

    for (let i = 0; i < 4; i++) {
        let current = `${x}px ${y}px ${b}px ${s}px hsl(${shade} / ${o})`;
        result.push(current);
        x += 2;
        y += 4;
        b *= 2;
        s += 2;
        o -= 0.2;
    }

    return result.join(", ");
}

const desktopSpacing = style({
    "@media": {
        [DESKTOP]: {
            marginInline: rem(2),
        },
    },
});

export const parent = style([
    flex,
    {
        "@media": {
            [MOBILE]: {
                flexDirection: "column",
                backgroundImage: "url(/images/bg-sidebar-mobile.svg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% auto",
            },
            [DESKTOP]: {
                display: "grid",
                gridTemplateColumns: "30% 1fr",
                gridTemplateRows: "1fr auto",
                backgroundColor: vars.color.neutral[100],
                padding: rem(1),
                borderRadius: vars.radius.md,
                overflow: "hidden",
                boxShadow: makeShadow(vars.color.neutral.hsl[400]),
            },
        },
    },
]);

export const sidebar = style({
    color: vars.color.neutral[100],
    "@media": {
        [MOBILE]: {
            marginInline: "auto",
        },
        [DESKTOP]: {
            gridRow: "1/-1",
            backgroundImage: "url(/images/bg-sidebar-desktop.svg)",
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "center",
            backgroundPositionY: "bottom",
            backgroundSize: "cover",
            padding: rem(1),
            borderRadius: vars.radius.md,
        },
    },
});

export const fields = style([desktopSpacing, {}]);

export const actions = style([
    desktopSpacing,
    {
        "@media": {
            [MOBILE]: {
                marginBlockStart: "auto",
            },
        },
    },
]);
