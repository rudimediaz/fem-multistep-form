import { globalStyle, style } from "@vanilla-extract/css";
import { DESKTOP, MOBILE } from "./lib/styles/constants.css";
import { flex } from "./lib/styles/utils.css";

export const parent = style([
    flex,
    {
        "@media": {
            [MOBILE]: {
                flexDirection: "column",
            },
            [DESKTOP]: {
                display: "grid",
                placeItems: "center",
            },
        },
    },
]);

globalStyle(`${parent} > *`, {
    "@media": {
        [MOBILE]: {
            flex: 1,
        },
        [DESKTOP]: {
            width: "80%",
            height: "80%",
        },
    },
});
