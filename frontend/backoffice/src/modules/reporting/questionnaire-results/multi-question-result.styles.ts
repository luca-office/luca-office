import {css} from "@emotion/react"
import {
  backgroundColorLight,
  borderColorDarker,
  borderRadiusLarge,
  Flex,
  flex1,
  fontColor,
  fontFamily,
  FontWeight,
  insetShadow,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"

export const styles = {
  container: css({
    padding: spacingMedium,
    backgroundColor: backgroundColorLight,
    border: `1px solid ${borderColorDarker}`,
    boxShadow: insetShadow,
    borderRadius: borderRadiusLarge
  }),
  header: css(Flex.row, {
    justifyContent: "space-between",
    marginBottom: spacingMedium
  }),
  title: css({
    fontWeight: FontWeight.Bold,
    color: fontColor
  }),
  questionTypeContainer: css(Flex.row),
  questionTypeTitle: css({
    fontFamily: fontFamily,
    fontsize: TextSize.Medium,
    fontWeight: FontWeight.Regular,
    color: fontColor,
    marginRight: spacingSmall
  }),
  descriptionContainer: (isExtraEnlarged: boolean) =>
    css(isExtraEnlarged ? Flex.column : Flex.row, {
      marginBottom: spacingLarge
    }),
  questionText: css({
    flex: flex1,
    alignSelf: "flex-start"
  }),
  answersTitle: css({
    fontFamily,
    fontSize: TextSize.Medium,
    fontWeight: FontWeight.Bold,
    color: fontColor,
    marginBottom: spacingTiny
  }),
  answersContainer: css({
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: spacingSmall
  }),
  inlineMediaViewer: (isZoomed: boolean) =>
    css({
      marginLeft: isZoomed ? 0 : spacingLarge,
      marginTop: isZoomed ? spacingLarge : 0
    })
}
