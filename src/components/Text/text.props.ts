import { TextStyle, TextProps as TextProperties } from "react-native"
import { TextColors } from "./text.colors"
import { TextPresets } from "./text.presets"

export interface TextProps extends TextProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: TextStyle | TextStyle[]

  /**
   * One of the different types of text presets.
   */
  preset?: TextPresets

  /**
   * One of the different types of text colors preset.
   */
  colorPreset?: TextColors

  /**
   * font size of text.
   */
  size?: number

  /**
   * line height of text.
   */
  lineHeight?: number

  /**
   * color of text.
   */
  color?: string

  /**
   * font family of text.
   */
  family?: "bold" | "italic" | "medium" | "regular" | "semibold";

  /**
   * transform of text.
   */
  transform?: "none" | "capitalize" | "uppercase" | "lowercase";

  /**
   * align of text.
   */
  align?: "auto" | "left" | "right" | "center" | "justify";
}