import {css} from "@emotion/react"
import {boxHeightSmaller, spacingCard, spacingLarge, spacingMedium} from "shared/styles"

export const emailDelayModalStyles = {
  modal: css({
    width: "50vw",

    header: {
      marginBottom: spacingCard
    }
  }),
  selectableCard: css({
    height: 120
  }),
  input: css({
    width: "50%"
  }),
  unitSelectColumn: css({
    flexBasis: "30%",
    marginRight: `${spacingMedium}px !important` // override margins from columns component
  }),
  unitSelect: css({
    width: "100%"
  }),
  inputContainer: css({
    width: "100%"
  }),
  error: css({
    height: boxHeightSmaller
  }),
  instruction: css({
    marginBottom: spacingMedium
  }),
  selectTimeWrapper: css({
    marginBottom: spacingLarge
  }),
  selectTimeWrapperLabel: css({
    marginTop: spacingLarge
  })
}
