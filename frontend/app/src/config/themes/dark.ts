import { Theme } from "src/config/themes/Theme";

export const darkTheme: Theme = {
  name: "dark",
  statusBarStyle: "light",
  colors: {
    text: "#fff",
    textOpposite: "#000",

    // Theme primary colors
    primaryA0: "#eb7c0e",
    primaryA10: "#f18b33",
    primaryA20: "#f5994e",
    primaryA30: "#faa867",
    primaryA40: "#fdb680",
    primaryA50: "#ffc599",

    // Theme surface colors
    surfaceA0: "#121212",
    surfaceA10: "#282828",
    surfaceA20: "#3f3f3f",
    surfaceA30: "#575757",
    surfaceA40: "#717171",
    surfaceA50: "#8b8b8b",

    // Theme tonal surface colors
    surfaceTonalA0: "#261c15",
    surfaceTonalA10: "#3b312a",
    surfaceTonalA20: "#514741",
    surfaceTonalA30: "#675f59",
    surfaceTonalA40: "#7f7772",
    surfaceTonalA50: "#97918d",

    // Success colors
    successA0: "#22946e",
    successA10: "#47d5a6",
    successA20: "#9ae8ce",

    // Warning colors
    warningA0: "#a87a2a",
    warningA10: "#d7ac61",
    warningA20: "#ecd7b2",

    // Danger colors
    dangerA0: "#9c2121",
    dangerA10: "#d94a4a",
    dangerA20: "#eb9e9e",

    // Info colors
    infoA0: "#21498a",
    infoA10: "#4077d1",
    infoA20: "#92b2e5",
  },
};
