import {css} from "@emotion/react"
import {Flex, flex1, fontColor, spacingHuge, spacingLarge, spacingMedium, spacingSmall, TextSize} from "shared/styles"

export const informationStyles = {
  detailHeader: css({
    padding: 0,
    marginBottom: spacingMedium
  }),
  detailHeaderTime: css({
    flexGrow: 1
  }),
  titleAndTime: css({
    flex: flex1
  }),
  textInput: css({
    marginRight: 0
  }),
  minLabel: css({
    fontSize: TextSize.Larger,
    color: fontColor,
    marginRight: spacingMedium
  }),
  detailHeaderName: css({
    flex: 4,
    marginLeft: -spacingSmall
  }),
  description: css({
    marginLeft: -spacingSmall
  }),
  descriptionColumn: css({
    marginTop: spacingLarge
  }),
  metadataWrapper: css({
    marginTop: spacingMedium
  }),
  metadataRowMarginTop: css({
    marginTop: spacingHuge
  }),
  smallPaddingLeft: css({
    paddingLeft: spacingSmall
  }),
  noTime: css(Flex.row, {
    marginRight: spacingMedium
  }),
  spacedLabel: css({
    marginTop: spacingLarge,
    overflow: "auto"
  }),
  noTimeIcon: css({
    marginRight: spacingSmall
  })
}
