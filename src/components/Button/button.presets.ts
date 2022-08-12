import { colors } from "@/styles/theme"
import { ViewStyle, TextStyle } from "react-native"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: 8,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: colors.primary } as ViewStyle,
  disable: { ...BASE_VIEW, backgroundColor: colors.borderBase } as ViewStyle,
  outline: { ...BASE_VIEW, backgroundColor: colors.borderBase } as ViewStyle

  /**
   * A button without extras.
   */

}

export const textPresets = {
  primary: { ...BASE_TEXT, color: colors.secondary } as TextStyle,
  disable: { ...BASE_TEXT, color: colors.secondaryText } as TextStyle,
  outline: { ...BASE_TEXT, color: colors.secondaryText } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
