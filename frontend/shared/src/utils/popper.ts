import * as PopperJS from "@popperjs/core"

export const isPlacedHorizontal = (placement: PopperJS.Placement): boolean =>
  placement.startsWith("left") || placement.startsWith("right")
