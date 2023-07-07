import {css} from "@emotion/react"
import {
  backgroundMenuInactive,
  borderRadius,
  Flex,
  flex1,
  primaryColor,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTinier,
  spacingTiny,
  zIndexToolbar
} from "../../styles"
import {SlideMenuVisibility} from "./slide-menu"

const Sizes = {
  wrapperFull: 1020,
  wrapperDetail: 570,
  wrapperList: 394,
  control: spacingLarge
}

const collapsedWidth = Sizes.control + spacingSmall
const leftOffsetToCollapsed = Sizes.wrapperFull - collapsedWidth
const leftOffsetToDetail = Sizes.wrapperFull - collapsedWidth - Sizes.wrapperDetail - spacingMedium

export const slideMenuStyles = {
  wrapper: (visibility: SlideMenuVisibility, showAsPopup: boolean) => {
    return css({
      display: "flex",
      boxSizing: "border-box",
      width: Sizes.wrapperFull,
      position: "relative",
      left: 0,

      marginLeft:
        visibility === SlideMenuVisibility.Full
          ? 0
          : visibility === SlideMenuVisibility.Detail
          ? -leftOffsetToDetail
          : -leftOffsetToCollapsed,
      transition: "0.2s ease transform",
      zIndex: zIndexToolbar,
      ...(!showAsPopup
        ? {
            "+ div": {
              transition: "0.2s ease margin"
            }
          }
        : {})
    })
  },
  content: (visibility: SlideMenuVisibility, active: boolean) =>
    css({
      boxSizing: "border-box",
      flex: flex1,
      display: "grid",
      padding: spacing(spacingSmall, spacingMedium, spacingSmall, spacingSmall),
      gridTemplateColumns:
        visibility === SlideMenuVisibility.Detail
          ? `${Sizes.wrapperDetail}px`
          : `${Sizes.wrapperList}px ${Sizes.wrapperDetail}px`,
      justifyContent: "end",
      gridColumnGap: spacingSmall,
      gridRowGap: 0,
      height: "100%",
      width: Sizes.wrapperFull - Sizes.control,
      backgroundColor: active ? primaryColor : backgroundMenuInactive,
      boxShadow: "4px 2px 6px 0px rgba(0, 0, 0, 0.24)"
    }),
  control: (active: boolean) =>
    css(Flex.column, {
      bottom: spacingMedium,
      justifyContent: "end",
      alignSelf: "end",
      boxSizing: "border-box",
      right: 0,
      background: active ? primaryColor : backgroundMenuInactive,
      width: Sizes.control,
      padding: spacing(spacingTiny, 0, spacingTinier, 0),
      boxShadow: "6px 2px 6px -2px rgba(0, 0, 0, 0.24)",
      borderRadius: spacing(0, borderRadius, borderRadius, 0),
      zIndex: 3
    }),
  controlButton: css({
    cursor: "pointer",
    boxSizing: "border-box",
    width: spacingMedium + spacingSmall,
    height: spacingMedium + spacingTiny + spacingSmall,
    padding: spacing(spacingTiny, spacingSmall, spacingSmall, 0)
  }),
  controlButtonDisabled: css({
    opacity: 0.5,
    cursor: "not-allowed"
  })
}
