import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function AskLocationSvg({ size = 100 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Path
        d="M78.14 89.314c4.293 1.873 16.16 7.26 20.376 8.978.468.234 1.561.156 1.405-.86-.937-10.148-6.636-68.311-7.65-78.617-.157-1.483-.626-1.718-1.719-2.108-3.357-1.249-11.476-4.138-14.833-5.309-1.171-.468-1.874-.468-3.123 0-5.23 1.484-21.782 6.558-21.782 6.558s-17.254-5.23-22.64-6.714c-1.172-.39-1.796-.468-3.123.078-3.435 1.093-11.399 4.06-14.834 5.31-1.405.546-1.561 1.17-1.718 2.107C7.407 28.808 1.161 87.206.068 97.433c-.078 1.171.937 1.093 1.874.78 4.684-1.873 16.55-7.026 20.767-8.743.858-.39 1.717-.625 3.122 0 4.763 1.951 18.738 8.275 23.344 10.149 1.015.468 1.952.546 3.123 0 4.606-1.952 18.112-8.198 22.64-10.228.86-.468 2.186-.546 3.201-.078z"
        fill="#fff"
      />
      <Path
        opacity={0.1}
        d="M78.14 89.314c4.293 1.873 16.16 7.26 20.376 8.978.468.234 1.561.156 1.405-.86-.937-10.148-6.636-68.311-7.65-78.617-.157-1.483-.626-1.718-1.719-2.108-3.357-1.249-11.476-4.138-14.833-5.309-1.171-.468-1.874-.468-3.123 0-5.23 1.484-21.782 6.558-21.782 6.558s-17.254-5.23-22.64-6.714c-1.172-.39-1.796-.468-3.123.078-3.435 1.093-11.399 4.06-14.834 5.31-1.405.546-1.561 1.17-1.718 2.107C7.407 28.808 1.161 87.206.068 97.433c-.078 1.171.937 1.093 1.874.78 4.684-1.873 16.55-7.026 20.767-8.743.858-.39 1.717-.625 3.122 0 4.763 1.951 18.738 8.275 23.344 10.149 1.015.468 1.952.546 3.123 0 4.606-1.952 18.112-8.198 22.64-10.228.86-.468 2.186-.546 3.201-.078z"
        fill="#F44336"
      />
      <Path
        d="M27.159 11.008c-.625-.078-1.25 0-2.108.312-3.435 1.093-11.399 4.06-14.834 5.31-1.405.546-1.561 1.17-1.717 2.107C7.407 28.808 1.16 87.206.068 97.433c-.078 1.171.937 1.093 1.874.78 4.684-1.873 16.55-7.026 20.767-8.743.624-.235 1.17-.469 2.03-.313l2.42-78.149zm46.608 0c-.312.078-.624.156-1.015.312-5.23 1.562-21.157 6.402-21.86 6.636v81.975c.469 0 1.015-.156 1.562-.39 4.606-1.952 18.112-8.198 22.64-10.228.313-.156.703-.234 1.094-.312l-2.42-77.993z"
        fill="#F44336"
        opacity={0.1}
      />
      <Path
        opacity={0.2}
        d="M36.527 94.076L50.19 80.414 64.087 94.31c2.888-1.327 5.699-2.654 7.963-3.67L22.162 40.832 46.364 16.63c-2.498-.78-5.777-1.718-8.9-2.654l-21.08 21.079-8.665-8.666c-.312 2.967-.703 6.558-1.093 10.54l37.787 37.786-15.849 15.849a340.33 340.33 0 017.963 3.513z"
        fill="#F44336"
      />
      <Path
        d="M26.378 36.615l.39-11.944-10.383 10.305-8.666-8.588c-.312 2.967-.703 6.558-1.093 10.54l19.206 19.205.312-11.32-3.904-3.904 4.138-4.294zm24.436 44.501L64.008 94.31c2.889-1.327 5.7-2.654 7.964-3.67L50.814 69.484v11.633z"
        fill="#F44336"
        opacity={0.15}
      />
      <Path
        d="M62.525 0c12.491 0 22.64 10.15 22.64 22.719 0 .234-.078 6.09-2.03 10.227-4.606 10.696-15.692 22.016-19.361 25.685-.937.86-1.327 1.015-2.498-.078-3.748-3.67-14.678-14.833-19.284-25.45-1.64-3.124-2.108-9.838-2.108-10.385C39.884 10.15 50.034 0 62.525 0z"
        fill="#F44336"
      />
      <Path
        d="M62.525 10.93c-6.48 0-11.71 5.23-11.71 11.71s5.23 11.711 11.71 11.711 11.71-5.23 11.71-11.71-5.23-11.711-11.71-11.711zm0 18.737a6.997 6.997 0 01-7.026-7.026 6.997 6.997 0 017.026-7.027 6.997 6.997 0 017.026 7.027 6.997 6.997 0 01-7.026 7.026z"
        fill="#fff"
      />
    </Svg>
  );
}