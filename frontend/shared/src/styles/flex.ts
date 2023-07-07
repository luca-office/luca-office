import {css} from "@emotion/react"

export const Flex = {
  column: css({
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }),
  row: css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center"
  })
}

export const flex0 = "0 0 auto"
export const flex1 = "1 1 auto"
