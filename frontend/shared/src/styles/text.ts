import {css} from "@emotion/react"

export const textEllipsis = css({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
})

export const wordBreak = css({
  // "overflow-wrap: break-word" makes sure a long word will
  // wrap and not bust out of the container. If there is an
  // acceptable break character, it will break there.
  overflowWrap: "break-word",
  // hyphens will try to add a hyphen on breaks if the browser
  // supports it
  hyphens: "auto"
})
