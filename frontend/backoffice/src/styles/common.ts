import {css} from "@emotion/react"
import {headerHeight, spacing, spacingHeader, spacingLarge, spacingMedium, spacingTinier} from "shared/styles"

export const borderRadius = 4
export const borderRadiusLarge = 8
export const inputHeight = 32
export const headerBoxShadow = "0px 2px 4px 0px rgba(0, 0, 0, 0.16)"
export const subHeaderHeight = 58

export const overviewCardMinWidth = 430

export const cardOverview = css({
  padding: spacing(0, spacingHeader),
  maxHeight: `calc(100vh - ${headerHeight + subHeaderHeight + spacingLarge + spacingMedium + spacingTinier}px)`,
  overflow: "auto",
  boxSizing: "border-box",
  marginTop: spacingTinier // prevent content to overflow shadow of header
})
