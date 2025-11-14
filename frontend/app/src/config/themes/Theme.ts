import { ColorValue } from "react-native";

export type Theme = {
  name: "light" | "dark";
  statusBarStyle: "light" | "dark";
  colors: {
    text: ColorValue;
    textOpposite: ColorValue;

    // Theme primary colors
    primaryA0: ColorValue;
    primaryA10: ColorValue;
    primaryA20: ColorValue;
    primaryA30: ColorValue;
    primaryA40: ColorValue;
    primaryA50: ColorValue;

    // Theme surface colors
    surfaceA0: ColorValue;
    surfaceA10: ColorValue;
    surfaceA20: ColorValue;
    surfaceA30: ColorValue;
    surfaceA40: ColorValue;
    surfaceA50: ColorValue;

    // Theme tonal surface colors
    surfaceTonalA0: ColorValue;
    surfaceTonalA10: ColorValue;
    surfaceTonalA20: ColorValue;
    surfaceTonalA30: ColorValue;
    surfaceTonalA40: ColorValue;
    surfaceTonalA50: ColorValue;

    // Success colors
    successA0: ColorValue;
    successA10: ColorValue;
    successA20: ColorValue;

    // Warning colors
    warningA0: ColorValue;
    warningA10: ColorValue;
    warningA20: ColorValue;

    // Danger colors
    dangerA0: ColorValue;
    dangerA10: ColorValue;
    dangerA20: ColorValue;

    // Info colors
    infoA0: ColorValue;
    infoA10: ColorValue;
    infoA20: ColorValue;
  };
};
