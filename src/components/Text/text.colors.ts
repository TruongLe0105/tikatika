import { colors as themeColor, fontFamily } from "@/styles/theme"
import { TextStyle } from "react-native"

/**
 * All the variations of text color within the app.
 *
 * You want to customize these to whatever you need in your app.
 */

const colors = {}

Object.entries(themeColor).forEach(([index, item]) => {
  colors[index] = { color: item } as TextStyle
})

export { colors }

/**
 * A list of preset names.
 */
export type TextColors = keyof typeof themeColor