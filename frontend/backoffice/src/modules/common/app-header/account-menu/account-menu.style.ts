import {css} from "@emotion/react"
import {
  borderColor,
  borderRadiusSmall,
  fontColor,
  spacingHuge,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize,
  zIndex1,
  zIndex2
} from "shared/styles"

export const accountMenuStyle = {
  container: css({
    position: "relative",
    flex: "1 1 25%",
    justifyContent: "flex-end",
    zIndex: zIndex2
  }),
  menu: css({
    position: "absolute",
    width: 347,
    top: 20,
    right: 32,
    paddingInlineStart: 0,
    padding: `${spacingSmall}px 2px 2px`,
    border: `1px solid ${borderColor}`,
    backgroundColor: "white",
    borderRadius: borderRadiusSmall,
    fontSize: TextSize.Medium
  }),
  infoLine: css({
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    paddingRight: spacingHuge,
    justifyContent: "flex-end",
    fontSize: TextSize.Smaller,
    cursor: "pointer",
    userSelect: "none"
  }),
  infoLineIcon: css({
    marginLeft: spacingSmall
  }),
  menuHeadline: css({
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    marginBottom: spacingMedium,
    paddingLeft: spacingSmall,
    paddingRight: spacingSmall,
    opacity: 0.4,
    userSelect: "none"
  }),
  link: css({
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    padding: spacingSmall,
    transition: "padding .2s ease",
    textDecoration: "none",
    color: fontColor,
    cursor: "pointer",

    ":hover, :active": {
      paddingLeft: spacingTiny,
      paddingRight: spacingTiny,
      backgroundColor: "rgba(79, 130, 207, 0.08)",
      color: fontColor,

      menu: {
        display: "block"
      }
    }
  }),
  menuIcon: css({
    marginRight: spacingSmall
  }),
  backdrop: css({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255,255,255,.01)",
    zIndex: zIndex1
  }),
  languageMenu: css({
    display: "none",
    position: "absolute",
    left: -95,
    top: spacingHuge,
    backgroundColor: "white",
    width: 100,
    paddingLeft: 0,
    border: `1px solid ${borderColor}`,
    borderRadius: borderRadiusSmall,
    ":hover": {
      display: "block"
    }
  })
}
