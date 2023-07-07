import {css} from "@emotion/react"
import {
  fontColorLight,
  primaryColor,
  spacing,
  spacingCard,
  spacingLarge,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"

const Size = {
  metaContentBoxShadowOffsetY: 1
}
const Spacing = {
  binaryMetaButton: {right: spacingTiny, bottom: 10}
}

export const informationBinaryContentStyle = {
  grid: css({
    display: "grid",
    gridTemplateRows: "3fr 1fr"
  }),
  contentWidth: css({
    width: `calc(100% - ${2 * Size.metaContentBoxShadowOffsetY}px)`,
    marginLeft: `${Size.metaContentBoxShadowOffsetY}px`
  }),
  content: css({
    flex: 1
  }),
  metaContent: css({
    flex: 0
  }),
  marginTopLarge: css({
    marginTop: spacingLarge
  }),
  metaContentIcon: css({
    marginRight: spacingCard
  }),
  metaBinary: css({
    height: "100%",
    "> .content-wrapper": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "stretch",
      "> .content": {
        margin: spacing(0, 0, spacingSmall, 0),
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center"
      },
      "> button": {
        alignSelf: "flex-end",
        margin: spacing(0, Spacing.binaryMetaButton.right, Spacing.binaryMetaButton.bottom, 0)
      }
    }
  }),
  metaBinaryImage: css({
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto"
  }),
  metaBinaryImagePlaceholder: css({
    fontSize: TextSize.Medium,
    fontWeight: "normal",
    color: fontColorLight,
    letterSpacing: 0.15
  }),
  logoContainer: css({
    height: 256
  }),
  intro: {
    textButton: css({
      color: primaryColor,
      cursor: "pointer"
    })
  },
  binaryViewer: css({
    height: "80vh",
    width: "80vh"
  })
}
