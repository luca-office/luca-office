import {css} from "@emotion/react"
import {spacing, spacingHuge, spacingHuger, spacingMedium, spacingSmall, spacingTiny, TextSize} from "shared/styles"

export const detailViewStyles = {
  header: css({
    display: "flex",
    justifyContent: "space-between"
  }),
  content: css({
    padding: spacingHuge,
    width: "initial",
    justifyContent: "flex-start",
    minHeight: 0
  }),
  title: css({
    display: "flex",
    alignItems: "center"
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  directoryNameInput: css({
    margin: spacing(0, -spacingSmall),

    "form > div": {
      padding: spacing(spacingTiny, spacingSmall, spacingTiny, spacingSmall)
    },

    input: {
      fontSize: TextSize.Larger
    }
  }),
  nameAndDirectoryWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr minmax(0, 1fr)",
    gap: spacingMedium
  }),
  contentListHeading: {
    marginTop: spacingHuger
  },
  contentList: css({
    marginTop: spacingTiny
  }),
  actionField: css({
    width: "100%",

    ".content": {minWidth: 0}
  }),
  hintText: css({
    margin: spacing(-spacingMedium, 0, spacingSmall)
  })
}
