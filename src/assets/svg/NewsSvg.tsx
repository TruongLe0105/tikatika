import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function NewsSvg({ size = 14 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.28 4.999h-3.57V.714A.714.714 0 0014.996 0H.714A.714.714 0 000 .714v16.424a2.856 2.856 0 002.856 2.856h14.282a2.856 2.856 0 002.856-2.856V5.713a.714.714 0 00-.714-.714zM5.713 3.57h4.284a.714.714 0 110 1.429H5.713a.714.714 0 110-1.429zm6.426 13.568H3.57a.714.714 0 110-1.428h8.57a.714.714 0 010 1.428zm0-2.856H3.57a.714.714 0 110-1.428h8.57a.714.714 0 010 1.428zm0-2.857H3.57a.714.714 0 110-1.428h8.57a.714.714 0 010 1.428zm0-2.856H3.57a.714.714 0 110-1.428h8.57a.714.714 0 010 1.428zm6.427 8.57a1.428 1.428 0 01-2.856 0V6.426h2.856v10.711z"
        fill="#FD6C9F"
      />
    </Svg>
  );
}
