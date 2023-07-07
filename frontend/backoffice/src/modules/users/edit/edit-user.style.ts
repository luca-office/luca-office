import {css} from "@emotion/react"
import {spacingLarge, spacingMedium, spacingSmall} from "shared/styles"

export const editUserStyle = {
  container: css({
    display: "flex",
    flexDirection: "column",
    flex: "0 0 55vw",
    width: "55vw",
    padding: spacingMedium,
    margin: `${spacingSmall * 8}px auto`
  }),
  header: css({
    marginBottom: spacingLarge
  }),
  field: css({
    marginBottom: spacingLarge
  }),
  combinedField: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: spacingMedium,
    marginBottom: spacingLarge
  }
}
