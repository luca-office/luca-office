import {css} from "@emotion/react"
import {
  backgroundColorDarker,
  borderRadius,
  FontWeight,
  spacingCard,
  spacingHuger,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  textEllipsis,
  TextSize
} from "../../styles"

export const accordionCardStyles = {
  card: css({
    border: "initial"
  }),
  header: css({
    display: "grid",
    gridTemplateColumns: "1fr",
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    padding: 0
  }),
  headerContent: (hasAdditionalHeaderLabel: boolean) =>
    css({
      display: "grid",
      gridColumnGap: spacingMedium + spacingTiny,
      gridTemplateColumns: `1fr repeat(${hasAdditionalHeaderLabel ? 2 : 1}, minmax(min-content, max-content))`,
      alignItems: "center",
      cursor: "pointer",
      padding: spacingCard
    }),
  headerLabelWrapper: css({
    display: "grid",
    gridColumnGap: spacingTiny,
    gridTemplateColumns: "minmax(0, max-content) minmax(min-content,max-content)"
  }),
  headerLabel: (isAdditionalLabel: boolean) =>
    css(textEllipsis, {
      fontSize: TextSize.Medium,
      fontWeight: isAdditionalLabel ? FontWeight.Regular : FontWeight.Bold
    }),
  content: (hasFooter: boolean) =>
    css({
      padding: spacingSmall,
      backgroundColor: backgroundColorDarker,
      boxSizing: "border-box",

      ...(!hasFooter && {
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius
      })
    }),
  footer: css({
    display: "grid",
    gridTemplateColumns: "1fr",
    height: spacingHuger,
    boxSizing: "border-box",
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius
  })
}
