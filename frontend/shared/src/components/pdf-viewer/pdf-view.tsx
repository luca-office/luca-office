import {css} from "@emotion/react"
import * as React from "react"
import {CustomStyle} from "../../styles"

export interface PdfViewProps extends CustomStyle {
  readonly binaryUrl: string
}

export const PdfView: React.FC<PdfViewProps> = ({binaryUrl, customStyles}) => (
  <div css={[styles.pdf, customStyles]}>
    <object css={styles.object} data={binaryUrl}>
      <a href={binaryUrl}></a>
    </object>
  </div>
)

const styles = {
  pdf: css({
    maxHeight: "100%",
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column"
  }),
  object: css({
    width: "100%",
    flexGrow: 1
  })
}
