import {css} from "@emotion/react"
import React from "react"
import {backgroundColorDarker} from "../../styles"

interface Props {
  content: string
}

export const TextDocumentPreview: React.FC<Props> = ({content}) => {
  return (
    <div css={[styles.container]}>
      <div css={styles.document} dangerouslySetInnerHTML={{__html: content}} />
    </div>
  )
}

const styles = {
  container: css({
    height: "100%",
    display: "flex",
    overflow: "auto",
    width: "-webkit-fill-available",
    flexGrow: 1,
    flexDirection: "column",
    borderStyle: "solid",
    borderColor: backgroundColorDarker,
    borderWidth: "30px 70px",
    padding: "12px 15px"
  }),
  document: css({
    width: "100%",
    flexGrow: 1,
    overflow: "scroll",
    //content prop is string produced by Quill(TextEditor), which contains HTML,
    // following classes can be referenced inside string
    ".ql-align-center": {
      textAlign: "center"
    },
    ".ql-align-right": {
      textAlign: "right"
    },
    ".ql-align-justify": {
      textAlign: "justify"
    }
  })
}
