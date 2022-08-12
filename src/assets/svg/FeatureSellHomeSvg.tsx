import * as React from "react"
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent({ size = 48 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Circle cx={24} cy={24} r={24} fill="#fff" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.3 36h3.6v-1.8h-3.6a.901.901 0 01-.9-.9v-8.4a.9.9 0 00-.9-.9h-2.243l10.344-9.858 3.88 3.693a.9.9 0 001.52-.652V15h1.8v5.616c0 .246.1.48.277.65l1.38 1.32 1.244-1.3-1.101-1.055V14.1a.9.9 0 00-.9-.9h-3.6a.9.9 0 00-.9.9v.983l-2.98-2.835a.903.903 0 00-1.242 0L10.487 23.2c-.31.281-.487.682-.487 1.1 0 .826.673 1.5 1.5 1.5h2.1v7.5c0 1.488 1.211 2.7 2.7 2.7zm5.7-7.78c0-.674.546-1.22 1.22-1.22h13.56c.674 0 1.22.546 1.22 1.22v6.644a1.22 1.22 0 01-1.22 1.22H23.22a1.22 1.22 0 01-1.22-1.22V28.22zm8.395.271l-.237.747h-.74l.237-.747h.74zm-1.856 5.695h-.77l1.41-4.48h1.098l1.41 4.48h-.77l-.308-.97h-1.765l-.305.97zm.525-1.67h1.321l-.665-2.086-.655 2.085zm-3.075 1.67h-1.955v-4.48h1.774c.303 0 .55.06.743.183.195.12.339.275.432.463.095.19.143.384.143.585 0 .204-.04.382-.121.536a.863.863 0 01-.326.351c.215.092.378.23.488.414.111.185.167.39.167.616 0 .399-.114.72-.341.965-.228.245-.563.367-1.004.367zm-1.197-3.78v1.088H25.8c.16 0 .293-.045.401-.136.11-.094.165-.23.165-.408a.54.54 0 00-.15-.39c-.099-.103-.238-.155-.416-.155h-1.007zm0 1.789v1.285h1.103a.7.7 0 00.488-.174.601.601 0 00.196-.473.635.635 0 00-.174-.455c-.116-.122-.279-.183-.488-.183h-1.125zm7.582 1.991h.758v-3.158l2.076 3.158h.758v-4.48h-.758v3.158l-2.076-3.159h-.758v4.481z"
        fill="#F44336"
      />
    </Svg>
  )
}

const FeatureSellHomeSvg = React.memo(SvgComponent)
export { FeatureSellHomeSvg }