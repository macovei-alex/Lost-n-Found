import { Theme } from "src/config/themes/Theme";

export const lightTheme: Theme = {
  name: "light",
  statusBarStyle: "dark",
  colors: {
    text: "#000",
    textOpposite: "#fff",

    // Theme primary colors
    primaryA0: "#cc6b0a",
    primaryA10: "#b35f0e",
    primaryA20: "#9b5310",
    primaryA30: "#844711",
    primaryA40: "#6d3c11",
    primaryA50: "#583111",

    // Theme surface colors
    surfaceA0: "#ffffff",
    surfaceA10: "#f0f0f0",
    surfaceA20: "#e1e1e1",
    surfaceA30: "#d3d3d3",
    surfaceA40: "#c5c5c5",
    surfaceA50: "#b6b6b6",

    // Theme tonal surface colors
    surfaceTonalA0: "#fdf0e7",
    surfaceTonalA10: "#eee3db",
    surfaceTonalA20: "#e0d6cf",
    surfaceTonalA30: "#d2c9c3",
    surfaceTonalA40: "#c4bdb8",
    surfaceTonalA50: "#b6b0ac",

    // Success colors
    successA0: "#1b7f5c",
    successA10: "#28be8a",
    successA20: "#58dbad",

    // Warning colors
    warningA0: "#b8871f",
    warningA10: "#dfae44",
    warningA20: "#ebca85",

    // Danger colors
    dangerA0: "#b13535",
    dangerA10: "#d06262",
    dangerA20: "#e29d9d",

    // Info colors
    infoA0: "#1e56a3",
    infoA10: "#347ada",
    infoA20: "#74a4e6",
  },
};
