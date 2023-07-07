import {css} from "@emotion/react"
import {
  backgroundColorLight,
  borderRadiusSmall,
  boxHeightLarge,
  fontColorBright,
  fontColorLight,
  fontFamily,
  gradientPrimary,
  primaryColor,
  spacing,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize,
  zIndexToolbar
} from "../../styles"

const Sizes = {
  taskbarHeight: boxHeightLarge,
  bounceOffset: spacingSmall
}

export const taskbarStyles = {
  taskbar: css({
    flex: "0 0 auto",
    height: Sizes.taskbarHeight,
    transform: `translateY(${Sizes.taskbarHeight + Sizes.bounceOffset}px)`,
    position: "fixed",
    right: 0,
    left: 0,
    opacity: 1,
    boxShadow: "0px -2px 4px 0px rgba(0, 0, 0, 0.14)",
    zIndex: zIndexToolbar
  }),
  taskbarVisible: css({
    transform: "translateY(0)",
    transitionDuration: "0.9s",
    transitionTimingFunction: "ease-in-out"
  }),
  taskbarInvisible: css({
    transform: `translateY(${Sizes.taskbarHeight + Sizes.bounceOffset}px)`,
    transitionDuration: "0.9s",
    transitionTimingFunction: "ease-in-out"
  }),
  container: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: Sizes.taskbarHeight,
    backgroundColor: "white",
    padding: spacing(spacingSmall, 0, spacingTiny, 0),
    boxSizing: "border-box"
  }),
  items: css({
    display: "flex",
    height: "100%",
    alignItems: "flex-end"
  }),
  item: css({
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: spacing(0, spacingMedium),

    "&:not(:last-child)": {
      paddingRight: spacingSmall
    }
  }),
  icon: (isDisabled: boolean, isActive: boolean) =>
    css({
      flex: "0 0 auto",
      cursor: isDisabled ? "not-allowed" : isActive ? "default" : "pointer",

      "> svg > g > g": {
        stroke: isDisabled ? fontColorLight : undefined
      },

      "&:hover > svg > g > g": {
        stroke: isDisabled ? undefined : isActive ? primaryColor : fontColorLight
      }
    }),
  activeIcon: css({
    "> svg > g > g": {
      stroke: primaryColor
    }
  }),
  circle: css({
    flex: "0 0 auto",
    width: 8,
    height: 8,
    marginTop: spacingTiny,
    borderRadius: "50%",
    background: gradientPrimary
  }),
  invisible: css({
    background: "white"
  }),
  separator: css({
    background: backgroundColorLight,
    borderRadius: borderRadiusSmall,
    boxShadow: "inset 0px 0px 4px 0px rgba(0, 0, 0, 0.16)",
    height: 48,
    width: 4,
    margin: spacing(0, spacingSmall, spacingTiny, spacingMedium)
  }),
  notification: css({
    background: "linear-gradient(-180deg, rgb(231, 112, 112) 0%, rgb(207, 79, 127) 100%)",
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    right: -15,
    top: 12,
    marginLeft: 2
  }),
  notificationNumber: (count: number) =>
    css({
      color: fontColorBright,
      fontSize: count > 99 ? TextSize.Smaller : TextSize.Small,
      fontFamily: fontFamily
    })
}
