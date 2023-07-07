import {css} from "@emotion/react"
import {
  backgroundColorBright,
  boxHeightMedium,
  boxHeightSmall,
  boxHeightSmaller,
  flex1,
  fontColorLight,
  spacing,
  spacingHuge,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  TextSize
} from "shared/styles"

export const scenarioDetailStyles = {
  wrapper: css({
    height: `calc(100vh - ${boxHeightMedium}px)`
  }),
  card: css({
    margin: spacing(spacingLarge, spacingHuge),
    overflow: "auto",
    border: "none",
    flex: flex1,
    background: "none"
  }),
  cardFooter: css({
    height: 0,
    padding: spacingSmall
  }),
  content: css({
    flexGrow: 0,
    backgroundColor: backgroundColorBright,
    padding: spacing(spacingLarge, spacingLarge),
    overflow: "auto",
    boxSizing: "border-box"
  }),
  detailViewHeader: css({
    position: "relative"
  }),
  placeholderGeneral: css({
    padding: spacingMedium,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center"
  }),
  placeholder: css({
    color: fontColorLight,
    fontSize: TextSize.Medium,
    userSelect: "none"
  }),
  headerUnit: css({
    position: "absolute",
    right: spacingMedium
  }),
  settings: css({
    marginTop: spacingHuge
  })
}
