import {css} from "@emotion/react"
import {Flex, spacingLarge, spacingMedium, spacingSmall} from "../../../styles"

export const spreadsheetViewerStyles = {
  viewer: css(Flex.column),
  editor: css({
    flex: 1,
    display: "flex",
    height: "initial"
  }),
  binary: css({
    flex: 1
  }),
  select: css({
    width: "100%"
  }),
  selectionFooterWrapper: css({
    display: "grid",
    gridTemplateColumns: "3fr 1fr 1fr 1fr",
    gap: spacingSmall,
    marginTop: spacingSmall,
    alignItems: "end",
    marginBottom: spacingSmall
  }),
  confirmButton: css({
    marginTop: spacingLarge,
    width: "100%"
  }),
  cellInput: css({
    marginTop: spacingMedium
  })
}
