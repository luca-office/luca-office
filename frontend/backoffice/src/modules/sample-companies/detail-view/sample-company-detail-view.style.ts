import {css} from "@emotion/react"
import {
  backgroundColorDarker,
  buttonHeight,
  Flex,
  fontColorLight,
  FontWeight,
  headerHeight,
  spacing,
  spacingHuge,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  spacingTiny,
  subHeaderHeight,
  TextSize
} from "shared/styles"

const Size = {
  headerButton: {width: 252},
  footerButton: {width: 292},
  footer: buttonHeight + 2 * spacingMedium,
  headerFooterHeight: spacingMedium
}

export const sampleCompanyDetailViewStyles = {
  container: css({
    overflow: "auto",
    height: `calc(100vh - ${headerHeight + subHeaderHeight + Size.footer + 2 * spacingMedium}px)`
  }),
  contentContainer: css(Flex.column, {
    maxHeight: `calc(100vh - ${headerHeight + subHeaderHeight + Size.footer}px)`,
    boxSizing: "border-box"
  }),
  footerContainer: css(Flex.row, {
    justifyContent: "space-between",
    alignItems: "space-between",
    width: "100%",
    margin: spacing(0, spacingMedium)
  }),
  headerFooterContent: css({
    minHeight: `calc(100% - ${5 * spacingMedium}px)`
  }),
  settingsContainer: css({
    backgroundColor: backgroundColorDarker
  }),
  settingsContent: css({
    padding: spacingMedium
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
  author: css({
    marginLeft: spacingLarge
  }),
  label: css({
    margin: spacing(spacingHuge, 0, spacingTiny, 0),
    fontWeight: FontWeight.Bold
  }),
  selectedForScenarioSpacing: css({
    margin: spacing(0, spacingLarge)
  })
}
