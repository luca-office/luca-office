import {from} from "@apollo/client"
import {css} from "@emotion/react"
import {
  Flex,
  fontColorLight,
  headerHeight,
  spacing,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  subHeaderHeight
} from "shared/styles"

const Size = {
  modalWidth: 750,
  modalHeight: 500,
  signatureContainer: 225
}

export const SampleCompanyDomainSignatureStyles = {
  fullHeight: css({
    height: "100%"
  }),
  container: css({
    maxHeight: `calc(100vh - ${headerHeight}px)`,
    overflow: "auto"
  }),
  contentContainer: css(Flex.column, {
    height: `calc(100vh - ${headerHeight + subHeaderHeight}px)`,
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: `1fr ${Size.signatureContainer}px`,
    gridGap: spacingMedium
  }),
  placeholderGeneral: css(Flex.row, {
    padding: spacingMedium,
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center"
  }),
  informationEntry: css({
    marginTop: spacingLarge
  }),
  domainControllers: css({
    display: "grid",
    gridTemplateColumns: `1fr ${spacingHuger}px 1fr`
  }),
  content: css({
    padding: spacing(spacingMedium, spacingLarge),
    overflowY: "auto"
  }),
  label: css({
    marginLeft: spacingSmall
  }),
  placeholderText: css({
    color: fontColorLight
  }),
  arrowIcon: css({
    marginLeft: spacingMedium,
    transform: "rotate(180deg)",
    alignSelf: "end",
    marginBottom: spacingSmall
  }),
  modal: css({
    width: Size.modalWidth,
    textarea: {
      height: Size.modalHeight
    }
  })
}
