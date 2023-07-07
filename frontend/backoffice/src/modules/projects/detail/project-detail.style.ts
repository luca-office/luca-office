import {css} from "@emotion/react"
import {
  boxHeightLarge,
  boxHeightSmall,
  boxHeightSmaller,
  Flex,
  FontWeight,
  headerHeight,
  spacingHuge,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  subHeaderHeight,
  TextSize,
  zIndex0
} from "shared/styles"

export const projectDetailStyles = {
  placeholderGeneral: css({
    padding: spacingMedium,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center"
  }),
  content: css(Flex.column, {
    overflow: "hidden",
    boxSizing: "border-box"
  }),
  contentCard: css(Flex.column, {
    maxHeight: "100%",
    overflowY: "auto"
  }),
  detailHeader: css({
    padding: 0,
    marginBottom: spacingMedium,
    marginLeft: -spacingSmall
  }),
  description: css({
    marginLeft: -spacingSmall
  }),
  header: css({
    zIndex: zIndex0
  }),
  cardDecorativeBorder: css({
    height: boxHeightSmaller,
    padding: 0
  }),
  label: css({
    overflow: "visible",
    flex: 0
  }),
  selectField: css({
    width: "100%"
  }),
  informationContent: css({
    padding: spacingLarge,
    width: "auto",
    overflowY: "auto",
    // header + content and card spacing + card header/footer + action footer + borders
    maxHeight: `calc(100vh - ${
      headerHeight + subHeaderHeight + 2 * spacingHuge + 2 * boxHeightSmall + boxHeightLarge + 2
    }px)`
  }),
  informationHeader: css({
    display: "grid",
    gridGap: spacingMedium,
    gridTemplateColumns: "1fr 186px"
  }),
  fieldLabel: css({
    marginTop: spacingLarge
  }),
  fieldWrapper: css({
    display: "grid",
    marginTop: spacingLarge,
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridGap: spacingMedium
  }),
  cardFooterStatus: css(Flex.row, {
    flex: 1,
    justifyContent: "flex-end",
    textAlign: "right" as const,
    fontSize: TextSize.Smaller
  }),
  statusLabel: css({
    fontWeight: FontWeight.Bold,
    marginRight: spacingSmall
  }),
  welcomeModal: css({
    width: "85vw",

    textarea: {
      height: "70vh"
    }
  }),
  welcomeModalFinalized: css({
    width: "85vw",

    textarea: {
      height: "78vh"
    }
  }),
  moduleCard: css({
    marginTop: spacingHuger
  })
}
