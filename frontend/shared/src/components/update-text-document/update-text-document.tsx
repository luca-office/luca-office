import {css} from "@emotion/react"
import React, {useState} from "react"
import {useUpdateTextDocument} from "../../graphql/hooks/mutations/text-document/use-update-textdocument"
import {LocalTextDocument, TextDocumentFile} from "../../models"
import {TextEditor} from "../../office-tools/text-editor/text-editor"
import {Option} from "../../utils"
import {Overlay} from "../overlay/overlay"

export interface UpdateTextDocumentProps {
  readonly file: TextDocumentFile
  readonly onClose: () => void
}

export const UpdateTextDocument: React.FC<UpdateTextDocumentProps> = ({file, onClose}) => {
  const [content, setContent] = useState<string>(file.textDocument.content)
  const {updateTextDocument} = useUpdateTextDocument()

  const handleClose = () => {
    updateTextDocument(file.textDocumentId, {content})
    onClose()
  }

  return (
    <Overlay>
      <TextEditor
        textDocument={Option.of({
          content: content,
          title: file.name,
          id: file.textDocumentId,
          fileId: file.id
        } as LocalTextDocument)}
        onChange={setContent}
        onClose={handleClose}
        customStyles={styles.textEditor}
      />
    </Overlay>
  )
}

const styles = {
  textEditor: css({height: "80%"})
}
