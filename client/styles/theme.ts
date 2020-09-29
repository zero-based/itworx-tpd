import { createTheme } from "baseui";
import { ThemePrimitives } from "baseui/theme";

const primitives: Partial<ThemePrimitives> = {
  primary: "#C63527", // ITWorx Red
  primary700: "#7C2529", // ITWorx Dark Red
  accent: "#171C8F", // ITWorx Blue
  accent700: "#101464",
  mono500: "#D0D3D4", // ITWorx Grey
  mono1000: "#101820" // ITWorx Black
};

const overrides = {
  colors: {
    buttonSecondaryFill: primitives.accent,
    buttonSecondaryText: "#FFF",
    buttonSecondaryHover: primitives.accent700,
    buttonMinimalFill: "#FFF",
    buttonMinimalText: primitives.primary700,
    buttonMinimalHover: "#EEE"
  },
};

export const ItworxTheme = createTheme(primitives, overrides);
