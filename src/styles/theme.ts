import { REM } from "./dimensions";
import { FlexAlignType } from "react-native";

export const colors = {
  primary: '#FD6C9F',
  secondary: '#fff',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
  blue: '#2196F3',
  yellow: '#FFFF00',
  mask: 'rgba(0, 0, 0, 0.3)',
  background: '#D7D9D9',
  primaryText: '#000', // super dark grey
  regularText: '#5B5B5B', // dark grey
  secondaryText: '#9FA0A0', // grey
  placeholder: '#F1F1F1', // light grey
  borderBase: '#F5F5F5' // super light grey
};

export const fontFamily = {
  bold: 'text-bold',
  italic: 'text-italic',
  medium: 'text-medium',
  regular: 'text-regular',
  semibold: 'text-semibold',
}

export const appStyle = {
  image: {
    width: "100%",
    height: "100%"
  },
  divider: {
    height: 1,
    backgroundColor: colors.background,
    opacity: 1,
    width: '100%'
  },
};

type FlexJustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'

export function alignJustify(justifyContent: FlexJustifyContent = 'center', alignItems: FlexAlignType = 'center') {
  return {
    justifyContent,
    alignItems,
  }
}

export function boxShadow(color, x = 0, y = 6, blur = 10) {
  return {
    shadowColor: color,
    shadowOffset: { width: x, height: y },
    shadowOpacity: 1,
    shadowRadius: blur,
    elevation: y < 0 ? 2 : y + 1
  };
}

