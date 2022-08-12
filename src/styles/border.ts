
interface BorderProps {
  borderWidth: number
  borderColor: string
}

interface EdgeProps {
  top: BorderProps
  left: BorderProps
  right: BorderProps
  bottom: BorderProps
}

export function border(borderWidth: number, borderColor: string) {
  return {
    borderColor,
    borderWidth,
  };
}

export function borderEdge(edge: EdgeProps) {
  // return {
  //   borderColor,
  //   borderWidth,
  // };
}
