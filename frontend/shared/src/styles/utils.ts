export const spacing = (first: number, second?: number, third?: number, fourth?: number) =>
  [first, second, third, fourth]
    .filter(value => value !== undefined)
    .map(value => `${value}px`)
    .join(" ")

export const radius = (first: number, second?: number, third?: number, fourth?: number) =>
  spacing(first, second, third, fourth)

export const border = (
  width: number,
  color: string,
  style?: "dashed" | "dotted" | "double" | "inset" | "outset" | "solid"
) => `${width}px ${style ?? "solid"} ${color}`
