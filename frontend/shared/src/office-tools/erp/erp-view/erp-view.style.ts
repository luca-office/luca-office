import {css} from "@emotion/react"
import {spacing, spacingHuge, spacingMedium} from "../../../styles"

const SIZE = {
  navigation: 292
}

export const styles = {
  erpView: css({
    display: "grid",
    flex: "1 1 auto",
    gridTemplateColumns: "350px minmax(0, 4fr)",
    gridColumnGap: spacingMedium,
    overflow: "hidden",
    height: "100%",
    margin: spacing(spacingMedium, spacingHuge)
  }),
  downloadLink: css({
    display: "none"
  }),
  navigation: css({
    height: "100%",
    flex: `0 0 ${SIZE.navigation}px`,
    marginRight: spacingMedium,
    overflow: "auto"
  }),
  content: css({
    flex: 1,
    height: "100%"
  }),
  placeholderCard: css({
    height: "100%",
    width: "100%"
  })
}
