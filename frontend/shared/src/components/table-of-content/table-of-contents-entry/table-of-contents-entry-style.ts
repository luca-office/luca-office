import {css} from "@emotion/react"
import {borderRadius, spacingCard, spacingMedium, spacingSmall, spacingTiny, textEllipsis} from "../../../styles"

export const tocEntryStyles = {
  entryText: css({
    cursor: "pointer",
    minWidth: 0
  }),
  listitem: css({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: spacingSmall
  }),
  listItemText: css(textEllipsis, {
    userSelect: "none"
  }),
  contentItem: css({
    marginBottom: spacingSmall
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  triangle: (isCollapsible: boolean) =>
    css({
      cursor: "pointer",
      marginBottom: spacingCard,
      marginRight: spacingSmall,
      visibility: isCollapsible ? "visible" : "hidden"
    }),
  fadedItem: css({
    opacity: 0.5
  }),
  hiddenIcon: css({
    marginLeft: "auto",
    marginRight: 0
  }),
  footer: css({
    justifyContent: "center"
  })
}

export const getSelectedListItemStyle = (isSelected: boolean) => ({
  padding: spacingTiny,
  borderRadius: borderRadius,
  ...(isSelected && {backgroundColor: "rgba(79, 130, 207, 0.14)"})
})

export const getListHeaderStyles = (isSelected: boolean) => ({
  icon: css({marginRight: spacingSmall}),
  header: css({
    display: "flex",
    cursor: "pointer",
    ...getSelectedListItemStyle(isSelected)
  })
})

export const getListItemStyle = (isSelected: boolean) =>
  css({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: spacingSmall,
    ...getSelectedListItemStyle(isSelected)
  })

export const getContentListStyle = (avoidSpacing: boolean, noIndent?: boolean) =>
  css({
    marginLeft: noIndent ? -spacingMedium : avoidSpacing ? -spacingTiny : spacingMedium
  })
