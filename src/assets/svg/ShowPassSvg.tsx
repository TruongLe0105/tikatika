import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function ShowPassSvg({
  size = 20,
  color = "#607D8B",
  showPass = false,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {showPass ? (
        <G clipPath="url(#prefix__clip0)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.135 3.936c3.42 0 6.682 1.886 9.703 5.6a.741.741 0 01.02.899c-.04.057-1.053 1.428-2.771 2.804a14.3 14.3 0 01-3.14 1.931c-1.355.592-2.726.894-4.082.894-3.42 0-6.686-1.882-9.703-5.6a.741.741 0 01-.02-.899c.04-.057 1.053-1.429 2.771-2.804a14.298 14.298 0 013.14-1.931c1.355-.592 2.726-.894 4.082-.894zm-.27 10.659c2.613 0 4.85-1.348 6.27-2.478a15.902 15.902 0 002.18-2.107c-2.612-3.053-5.364-4.6-8.184-4.6-2.613 0-4.85 1.347-6.27 2.477a16.15 16.15 0 00-2.18 2.107c2.612 3.053 5.364 4.6 8.184 4.6zm2.107-4.593c0-.404.33-.735.735-.735.404 0 .734.331.734.735a3.449 3.449 0 01-3.445 3.445 3.449 3.449 0 01-3.445-3.445 3.449 3.449 0 013.445-3.445c.404 0 .735.33.735.735 0 .404-.33.734-.735.734-1.09 0-1.976.886-1.976 1.976 0 1.09.886 1.976 1.976 1.976 1.09 0 1.976-.886 1.976-1.976z"
            fill={color}
          />
        </G>
      ) : (
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.74 2.217a.735.735 0 111.041 1.04L3.251 17.783a.733.733 0 01-1.036 0 .74.74 0 010-1.04l2.298-2.299c-1.494-.93-2.955-2.265-4.351-3.979a.741.741 0 01-.02-.898c.06-.086 1.55-2.098 4.003-3.698 3.294-2.15 6.747-2.51 9.983-1.04l2.612-2.612zM8.023 10c0 .273.053.534.159.775l2.595-2.596a1.982 1.982 0 00-2.175.42c-.375.376-.58.874-.58 1.4zm-.458-2.44a3.452 3.452 0 014.298-.462L13.01 5.95c-2.636-1.008-5.342-.624-8.06 1.147C3.377 8.122 2.23 9.35 1.687 9.988c1.27 1.481 2.576 2.616 3.902 3.383l1.514-1.514a3.423 3.423 0 01-.547-1.861 3.42 3.42 0 011.008-2.437zm9.159-1.14c1.061.829 2.106 1.874 3.114 3.114a.741.741 0 01.014.907c-.113.15-1.33 1.762-3.332 3.228-1.22.89-2.481 1.543-3.75 1.938a9.711 9.711 0 01-2.903.454c-.64 0-1.277-.066-1.91-.2a.733.733 0 01-.567-.87.732.732 0 01.87-.567c2.428.514 4.905-.13 7.358-1.914a16.11 16.11 0 002.694-2.502c-.817-.955-1.657-1.771-2.498-2.428a.739.739 0 01-.127-1.033.743.743 0 011.037-.127z"
          fill={color}
        />
      )}

      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
