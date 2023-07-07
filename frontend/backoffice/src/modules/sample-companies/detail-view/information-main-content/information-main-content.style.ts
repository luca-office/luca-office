import {css} from "@emotion/react"
import {spacingCard, spacingHuge, spacingLarge, spacingMedium, spacingSmall, TextSize} from "shared/styles"

const Size = {
  companyNameLabel: 32,
  companyTypeLabel: 24,
  companyDescription: 80,
  metaContentFiles: 292,
  metaContentBoxShadowOffsetY: 1
}
const Color = {
  companyNameLabel: "#727272"
}

export const informationMainContentStyle = {
  grid: css({
    display: "grid",
    gridTemplateRows: "minmax(0,3fr) auto",
    height: "100%"
  }),
  content: css({
    flex: "1 1 auto"
  }),
  metaContent: css({
    flex: 0,
    marginLeft: `${Size.metaContentBoxShadowOffsetY}px`,
    justifyContent: "space-between",
    alignItems: "flex-end"
  }),
  marginTopLarge: css({
    marginTop: spacingLarge
  }),
  marginTopMedium: css({
    marginTop: spacingMedium
  }),
  textOverflowHidden: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }),
  companyNameLabel: css({
    fontSize: TextSize.Larger,
    fontWeight: "normal",
    height: Size.companyNameLabel,
    lineHeight: `${Size.companyNameLabel}`,
    marginLeft: -spacingSmall,

    ".hover-icon": {
      position: "relative",

      "> svg": {
        position: "absolute",
        width: "100%",
        height: "100%"
      }
    }
  }),
  companyTypeLabel: css({
    height: Size.companyTypeLabel,
    lineHeight: `${Size.companyTypeLabel}px`,
    color: Color.companyNameLabel,
    fontSize: TextSize.Medium,
    letterSpacing: 0.15
  }),
  companyDescription: css({
    height: Size.companyDescription,
    overflow: "auto"
  }),
  metaContentTags: css({
    flex: 1,
    marginRight: spacingLarge
  }),
  metaContentFiles: css({
    flexBasis: Size.metaContentFiles
  }),
  tag: css({
    "&:not(:last-of-type)": {
      marginRight: spacingSmall
    }
  }),
  metaContentIcon: css({
    marginRight: spacingCard
  }),
  description: css({
    marginLeft: -spacingSmall
  }),
  informationEntrySpacing: css({
    marginBottom: spacingHuge
  })
}
