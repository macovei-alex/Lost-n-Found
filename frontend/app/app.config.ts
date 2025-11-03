import "dotenv/config";
import { ExpoConfig } from "@expo/config";

type SchemeSuffix = "dev" | "prev" | "prod";

function getSchemeSuffix(): SchemeSuffix {
  switch (process.env.APP_VARIANT) {
    case "development":
      return "dev";
    case "preview":
      return "prev";
    case "production":
      return "prod";
    default:
      throw new Error(
        `Invalid APP_VARIANT value ( ${process.env.APP_VARIANT} ). Expected 'development', 'preview', or 'production'.`
      );
  }
}

function withDot(suffix: SchemeSuffix): string {
  return suffix !== "prod" ? `.${suffix}` : "";
}

function withDash(suffix: SchemeSuffix): string {
  return suffix !== "prod" ? `-${suffix}` : "";
}

export default function (): ExpoConfig {
  const schemeSuffix = getSchemeSuffix();
  return {
    name: `LostnFound${withDash(schemeSuffix)}`,
    slug: "lostnfound",
    scheme: `lostnfound${withDot(schemeSuffix)}`,
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    platforms: ["android"],
    newArchEnabled: true,
    plugins: ["react-native-edge-to-edge"],
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      softwareKeyboardLayoutMode: "pan",
      package: `com.lostnfound.app${withDot(schemeSuffix)}`,
    },
  };
}
