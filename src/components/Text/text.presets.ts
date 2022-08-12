import { colors, fontFamily } from "@/styles/theme"
import { TextStyle } from "react-native"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: fontFamily.regular,
  color: colors.regularText
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * X-LargeTitle styles
   */
  xLargeTitle: { ...BASE, fontSize: 20, lineHeight: 24, fontFamily: 'text-bold' } as TextStyle,

  /**
   * LargeTitle styles
   */
  largeTitle: { ...BASE, fontSize: 22, lineHeight: 26, fontFamily: 'text-bold' } as TextStyle,

  /**
   * MediumTitle style.
   */
  mediumTitle: { ...BASE, fontSize: 18, lineHeight: 22, fontFamily: 'text-bold' } as TextStyle,

  /**
   * SmallTitle style.
   */
  smallTitle: { ...BASE, fontSize: 14, lineHeight: 16, fontFamily: 'text-bold' } as TextStyle,

  /**
   * LargeLabel style.
   */
  largeLabel: { ...BASE, fontSize: 16, lineHeight: 21, fontFamily: 'text-semibold' } as TextStyle,

  /**
   * MediumLabel style.
   */
  mediumLabel: { ...BASE, fontSize: 14, lineHeight: 20, fontFamily: 'text-semibold' } as TextStyle,

  /**
   * SmallLabel Label style.
   */
  smallLabel: { ...BASE, fontSize: 12, lineHeight: 12, fontFamily: 'text-semibold' } as TextStyle,

  /**
   * SuperSmallLabel style.
   */
  superSmallLabel: { ...BASE, fontSize: 10, lineHeight: 12, fontFamily: 'text-semibold' } as TextStyle,

  /**
   * MediumParagraph style.
   */
  mediumParagraph: { ...BASE, fontSize: 14, lineHeight: 21 } as TextStyle,

  /**
  * SmallParagraph style.
  */
  smallParagraph: { ...BASE, fontSize: 12, lineHeight: 16 } as TextStyle,

  /**
  * SuperSmallParagraph style.
  */
  superSmallParagraph: { ...BASE, fontSize: 10, lineHeight: 15 } as TextStyle,

  /**
   * MediumButton style.
   */
  mediumButton: { ...BASE, fontSize: 14, lineHeight: 20, fontFamily: 'text-bold' } as TextStyle,

  /**
  * SmallButton style.
  */
  smallButton: { ...BASE, fontSize: 12, lineHeight: 12, fontFamily: 'text-semibold' } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets