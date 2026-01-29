export type Theme = {
  name: "light" | "dark";
  statusBarStyle: "light" | "dark";
  colors: {
    text: string;
    textOpposite: string;

    // Theme primary colors
    primaryA0: string;
    primaryA10: string;
    primaryA20: string;
    primaryA30: string;
    primaryA40: string;
    primaryA50: string;

    // Theme surface colors
    surfaceA0: string;
    surfaceA10: string;
    surfaceA20: string;
    surfaceA30: string;
    surfaceA40: string;
    surfaceA50: string;

    // Theme tonal surface colors
    surfaceTonalA0: string;
    surfaceTonalA10: string;
    surfaceTonalA20: string;
    surfaceTonalA30: string;
    surfaceTonalA40: string;
    surfaceTonalA50: string;

    // Success colors
    successA0: string;
    successA10: string;
    successA20: string;

    // Warning colors
    warningA0: string;
    warningA10: string;
    warningA20: string;

    // Danger colors
    dangerA0: string;
    dangerA10: string;
    dangerA20: string;

    // Info colors
    infoA0: string;
    infoA10: string;
    infoA20: string;
  };
};
