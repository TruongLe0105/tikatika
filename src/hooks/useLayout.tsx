import React, { useEffect, useState, useCallback } from "react";

export const useLayout = (): [
  { width?: number; height?: number; x?: number; y?: number },
  (event?: any) => void
] => {
  const [size, setSize] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const onLayout = useCallback((event) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    setSize({ width, height, x, y });
  }, []);
  return [size, onLayout];
};
