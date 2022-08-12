import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent({ size = 36, active = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 0h19a3 3 0 013 3v2.688c0 .172-.14.312-.313.312H3.813a.313.313 0 01-.312-.313V3a3 3 0 013-3zm13 4h.5a1 1 0 100-2h-.5a1 1 0 100 2zm4 0h.5a1 1 0 100-2h-.5a1 1 0 100 2zm-20 27V8.312c0-.172.14-.312.313-.312h24.375c.172 0 .312.14.312.313V31a1 1 0 01-1 1h-23a1 1 0 01-1-1zM24 18.988C23.993 14.582 20.407 11 16 11c-4.411 0-8 3.589-8 8-.008 4.358 3.544 8 8 8 4.495 0 8.051-3.72 8-8.012zM16 25a6.01 6.01 0 005.642-3.957.313.313 0 00-.364-.412 8.353 8.353 0 01-1.918.236c-1.573 0-2.657-.472-3.691-.923-1.474-.641-2.847-1.24-5.39-.367a.313.313 0 00-.208.343A6.009 6.009 0 0016 25zm5.722-6.577c-2.512.864-3.828.3-5.328-.342-1.462-.627-3.081-1.32-5.67-.713a.313.313 0 01-.366-.411A6.01 6.01 0 0116 13a6.01 6.01 0 015.93 5.08.313.313 0 01-.208.343z"
        fill={active ? '#F44336' : "#C8D2DD"}
      />
    </Svg>
  )
}

const MaygiatSvg = React.memo(SvgComponent)
export { MaygiatSvg }
