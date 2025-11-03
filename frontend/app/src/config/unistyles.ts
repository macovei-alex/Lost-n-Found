import { lightTheme } from "src/config/themes/light";
import { darkTheme } from "src/config/themes/dark";
import { StyleSheet } from "react-native-unistyles";

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

type AppThemes = typeof appThemes;

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  settings: {
    adaptiveThemes: false,
    initialTheme: "light",
  },
  themes: appThemes,
});
