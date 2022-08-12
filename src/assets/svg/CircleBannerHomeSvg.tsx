import * as React from "react"
import Svg, { G, Ellipse, Defs, ClipPath, Path, Mask, EMaskUnits } from "react-native-svg"

function SvgComponent({ size = 20 }) {
  return (
    <Svg width={size} height={size * 64 / 375} viewBox="0 0 375 64" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Ellipse cx={188} cy={-32} rx={320} ry={95} fill="#FF8080" />
        <Ellipse opacity={0.5} cx={188} rx={320} ry={63} fill="#FF8080" />
        <Ellipse cx={188} cy={-122.5} rx={320} ry={187.5} fill="#F44336" />
        <G mask="url(#mask0)" fillRule="evenodd" clipRule="evenodd">
          <Path
            d="M298.237 46h-28.094v2.615h-3.435v1.593H264v.891h2.708v73.64h34.964v-73.64h2.713v-.891h-2.713v-1.593h-3.435V46z"
            fill="#FF4949"
          />
          <Path
            d="M265.972 35h-16.553v5.285h-5.409V35h-2.779v5.285h-2.784V35h-3.058v5.285H229v1.948h.755V80h44V53h-6V42.233h2.084v-1.948h-3.867V35z"
            fill="#FF6969"
          />
          <Path
            d="M121.972 47h-16.553v5.285h-5.409V47h-2.78v5.285h-2.783V47h-3.058v5.285H85v1.948h.755V92h44V65h-6V54.233h2.084v-1.948h-3.867V47z"
            fill="#FF4949"
          />
          <Path
            d="M212.237 21h-28.094v2.615h-3.435v1.593H178v.891h2.708v73.64h34.964V26.1h2.713v-.892h-2.713v-1.592h-3.435V21z"
            fill="#FF8484"
          />
          <Path
            d="M147.237 33h-28.094v2.615h-3.435v1.593H113v.891h2.708v73.64h34.964v-73.64h2.713v-.891h-2.713v-1.593h-3.435V33z"
            fill="#FF6969"
          />
          <Path
            d="M238.226 43h7.926v2.85h1.105V50h4.032v-1.808h1.947V50h.689v-4.751h2.779V50h.523L264 101h-28V50h1.11v-4.15h1.116V43z"
            fill="#EBF1F4"
          />
          <Path
            d="M149.8 16h.739v4.755h1.646l1 2.664h6.68v4.071h17.477v2.681h2.199v2.096H179V72h-36V32.267h-1V30.17h2.204V27.49h2.538V20.755h3.058V16z"
            fill="#FF7676"
          />
          <Path
            d="M146.774 40h-7.926v2.85h-1.105V47h-4.032v-1.808h-1.947V47h-.689v-4.751h-2.779V47h-.523L121 98h28V47h-1.11v-4.15h-1.116V40zM170.809 33h-7.134v.53h.428v1.826H151v1.647h.702v.603H153v7.76h-.726v.599H153v7.5h-.726v.6H153v7.5h-.726v.6H153v7.5h-.726v.599H153v7.504h-.726v.6H153v7.5h-.726v.6H153V96h19v-9.533h.353v-.6H172v-7.5h.353v-.6H172v-7.503h.353v-.6H172v-7.5h.353v-.6H172v-7.5h.353v-.6H172v-7.499h.353v-.6H172v-7.759h.929v-.603h.702v-1.647h-3.246V33.53h.424V33zM226.249 18.928a.548.548 0 01-.143-.266.62.62 0 01.547-.662.548.548 0 11-.404.928zm.716.396v4.75h2.571V30.808h2.128v2.686h1.849v2.096H233V109h-30V35.59h-1v-2.095h1.849V30.81h14.671v-4.071h5.609l.84-2.665h1.378v-4.749h.618zM188.007 4v10.915h-.739V8.832h-.612v6.085h-1.833v3.058h-1.914v.69h.601v3.238h-3.856v.903h.547v5.63H176v.936h.591v87.275h22.099V29.371h.585v-.936h-4.195v-5.63h.536v-.902h-3.852v-3.24h.345v-.689h-1.657v-3.059H188.619V4h-.612z"
            fill="#EBF1F4"
          />
        </G>
      </G>
      <Defs>
        <Mask
          id="mask0"
          maskUnits={'useSpaceOnUse' as EMaskUnits.USER_SPACE_ON_USE}
          x={-132}
          y={-310}
          width={640}
          height={375}
        >
          {/* <Ellipse cx={188} cy={-122.5} rx={320} ry={187.5} fill="#F44336" /> */}
          <Ellipse cx={188} cy={-122.5} rx={320} ry={187.5} fill="#FFF" />
        </Mask>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h375v64H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

const CircleBannerHomeSvg = React.memo(SvgComponent)
export { CircleBannerHomeSvg }
