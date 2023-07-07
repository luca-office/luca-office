import {css} from "@emotion/react"
import {borderRadius, spacingMedium, spacingSmall, spacingTiny} from "../../styles"

export const getSelectedListItemStyle = (isSelected: boolean) => ({
  padding: spacingTiny,
  borderRadius: borderRadius,
  ...(isSelected && {backgroundColor: "rgba(79, 130, 207, 0.08)"})
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

export const getContentListStyle = (avoidSpacing: boolean) =>
  css({
    marginLeft: avoidSpacing ? -spacingTiny : spacingMedium
  })
