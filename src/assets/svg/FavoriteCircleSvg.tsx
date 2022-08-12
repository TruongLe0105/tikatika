import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SvgComponent({ size = 24, isFavorite = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle opacity={0.5} cx={12} cy={12} r={12} fill="#FFF5F5" />
      {isFavorite ? <Path
        d="M12 17.76l-.87-.792C8.04 14.166 6 12.318 6 10.05c0-1.848 1.452-3.3 3.3-3.3 1.044 0 2.046.486 2.7 1.254a3.593 3.593 0 012.7-1.254c1.848 0 3.3 1.452 3.3 3.3 0 2.268-2.04 4.116-5.13 6.924l-.87.786z"
        fill="#F44336"
      /> : <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.13 16.968l.87.792.87-.786.024-.021C15.97 14.157 18 12.313 18 10.05c0-1.848-1.452-3.3-3.3-3.3-.658 0-1.3.193-1.848.529-.321.196-.61.441-.852.725a3.558 3.558 0 00-.852-.725A3.558 3.558 0 009.3 6.75a3.268 3.268 0 00-3.3 3.3c0 2.266 2.037 4.113 5.122 6.911l.008.007zm.983-.827h.002c1.567-1.425 2.776-2.526 3.608-3.543.818-1.002 1.152-1.784 1.152-2.548A2.143 2.143 0 0014.7 7.875c-.703 0-1.396.333-1.843.858L12 9.74l-.857-1.006A2.469 2.469 0 009.3 7.875a2.143 2.143 0 00-2.175 2.175c0 .764.334 1.546 1.152 2.546.831 1.017 2.041 2.117 3.609 3.539l.001.001.116.105.11-.1z"
        fill="#2E384D"
      />}
    </Svg>
  )
}

const FavoriteCircleSvg = React.memo(SvgComponent)
export { FavoriteCircleSvg }
