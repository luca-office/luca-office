import {css} from "@emotion/react"
import {Flex, spacing, spacingCard, spacingHuge, spacingMedium, spacingSmall, spacingTiny} from "shared/styles"

export const createSurveyStyles = {
  createOrly: css({
    width: "50vw"
  }),
  createModal: css({
    width: "90vw"
  }),
  modalHeaderContent: (isEditing: boolean) =>
    css({
      display: "grid",
      gridTemplateRows: isEditing ? "minmax(min-content, max-content)" : "minmax(min-content, max-content) 1fr",
      gridRowGap: spacingCard
    }),
  modalHeader: css({
    marginBottom: 0
  }),
  modalContent: css({
    marginBottom: spacingHuge
  }),
  input: css({
    width: "100%",
    marginBottom: spacingSmall
  }),
  textarea: css({
    resize: "none"
  }),
  inputWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: spacingMedium,
    marginTop: spacingMedium
  }),
  inputWrapperFull: css({
    gridTemplateColumns: "1fr"
  }),
  tooltipLabel: css({
    height: 20,
    marginBottom: spacingTiny,
    "> div": {
      marginRight: spacingSmall
    }
  }),
  checkBoxWrapper: css(
    Flex.row,
    css({
      "> div": {
        marginRight: spacingSmall
      }
    })
  ),
  cardHeader: css({
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: spacingMedium,
    cursor: "pointer"
  }),
  progressHint: css({
    marginTop: spacingSmall
  }),
  cardContent: css({
    boxSizing: "border-box",
    padding: spacingCard,
    paddingTop: 0,
    cursor: "pointer"
  }),
  cardWithSingleCheckbox: css({
    minHeight: 30,
    justifyContent: "center",
    padding: spacing(0, spacingCard)
  })
}
