import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../lib/styles/theme.css";
import { grid } from "../lib/styles/utils.css";

export const parent = style([
    grid,
    {
        gridTemplateRows: "100vh auto",
        backgroundColor: `hsl(${vars.color.primary.hsl.light} / 0.3)`,
        overflowX: "hidden",
    },
]);

globalStyle(`${parent} main`, {
    display: "contents",
});
