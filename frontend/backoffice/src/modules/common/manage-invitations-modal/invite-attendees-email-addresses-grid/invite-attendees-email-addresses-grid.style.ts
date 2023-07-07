import {css} from "@emotion/react"
import {
  backgroundColorDarker,
  borderRadius,
  cardBottomColor,
  errorColor,
  headerBoxShadow,
  radius,
  spacing,
  spacingCard,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  textEllipsis
} from "shared/styles"

export const styles = {
  wrapper: css({
    flex: 2
  }),
  heading: css({
    marginTop: spacingLarge
  }),
  gridWrapper: css({
    margin: spacing(spacingTiny, 0, 0, 0),
    height: "100%"
  }),
  gridTopBar: css({
    height: 16,
    background: cardBottomColor,
    boxShadow: headerBoxShadow,
    borderRadius: radius(borderRadius, borderRadius, 0, 0)
  }),
  gridBottomBar: (displayError: boolean) =>
    css({
      height: 16,
      background: cardBottomColor,
      borderRadius: radius(0, 0, borderRadius, borderRadius),
      marginBottom: displayError ? spacingMedium : spacingLarge
    }),
  gridScrollWrapper: css({
    backgroundColor: backgroundColorDarker,
    padding: spacingMedium,
    marginTop: 0.5 * spacingTiny,
    position: "relative",
    flex: 1
  }),
  emptyText: css({
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    top: 7.5 * spacingMedium
  }),
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: spacingCard,
    maxHeight: 280,
    overflowY: "auto",
    paddingBottom: spacingTiny,
    marginTop: spacingSmall
  }),
  loadingIndicator: css({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.08)"
  }),
  errorMessage: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingTiny,
    marginBottom: spacingMedium
  }),
  errorMessageText: css(textEllipsis, {
    color: errorColor
  })
}
