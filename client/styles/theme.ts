import { createTheme } from "baseui";
import { ThemePrimitives } from "baseui/theme";

const primitives: Partial<ThemePrimitives> = {
  primary: "#C63527", // ITWorx Red
  primary700: "#7C2529", // ITWorx Dark Red
  accent: "#171C8F", // ITWorx Blue
};

const overrides = {
  colors: {},
};

export const ItworxTheme = createTheme(primitives, overrides);
