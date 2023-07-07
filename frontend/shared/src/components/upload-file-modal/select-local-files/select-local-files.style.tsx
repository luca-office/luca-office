import {css} from "@emotion/react"
import {spacingMedium, spacingTiny} from "../../../styles"

const minHeightForSelectedLocalFiles = 130

export const selectLocalFilesStyles = {
  selectedLocalFiles: css({
    maxHeight: "15vh",
    overflowY: "auto",
    paddingBottom: spacingTiny,
    minHeight: minHeightForSelectedLocalFiles,
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "flex-start"
  }),
  selectedLocalFilesPlaceholder: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "100%",
    minHeight: minHeightForSelectedLocalFiles
  }),
  spacerBottom: css({
    marginBottom: spacingMedium
  })
}
