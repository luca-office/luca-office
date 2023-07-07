import {css} from "@emotion/react"
import {OfficeWindowType} from "shared/enums"
import {
  backgroundColorBright,
  border,
  boxHeightLarge,
  fontColor,
  fontColorDark,
  fontFamily,
  FontWeight,
  primaryColor,
  spacingMedium,
  spacingSmall
} from "shared/styles"
import {colors, DocumentActivity} from "./utils/acitvity-overview-config"

export const styles = {
  checkBox: (tool: OfficeWindowType | DocumentActivity) =>
    css({
      background: colors.get(tool),
      backgroundImage: colors.get(tool)
    }),

  backgroundCheckBox: (tool: OfficeWindowType) => css({backgroundColor: colors.get(tool)}),
  card: css({
    fontFamily: fontFamily,
    height: "90vh",
    width: "90vw"
  }),
  subheader: (isActive: boolean) =>
    css({
      color: isActive ? primaryColor : fontColor,
      borderBottom: isActive ? border(2, primaryColor) : "unset",
      padding: spacingSmall,
      cursor: "pointer"
    }),
  header: css({
    justifyContent: "space-between"
  }),
  closeButton: css({
    fontWeight: FontWeight.Regular,
    backgroundColor: "transparent",
    border: "none",
    width: "auto"
  }),
  content: css({
    boxSizing: "border-box",
    padding: spacingMedium,
    justifyContent: "unset"
  }),
  leftDiagramButton: (isActive: boolean) =>
    css({
      borderColor: "transparent",
      borderRadius: "4px 0px 0px 4px",
      background: isActive ? primaryColor : backgroundColorBright
    }),
  diagramButtonIcon: (isActive: boolean) =>
    css({
      color: isActive ? backgroundColorBright : fontColorDark
    }),
  rightDiagramButton: (isActive: boolean) =>
    css({
      borderColor: "transparent",
      borderRadius: "0px 4px 4px 0px",
      background: isActive ? primaryColor : backgroundColorBright
    }),
  footer: css({
    height: boxHeightLarge,
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    justifyItems: "baseline"
  }),
  diagramCard: css({
    padding: spacingMedium,
    height: "70%",
    width: "100%",
    position: "relative"
  }),
  emptyFooter: css({
    height: 0
  }),
  diagramTitle: css({
    paddingRight: spacingMedium
  })
}
