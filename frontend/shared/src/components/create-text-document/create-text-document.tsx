import {css} from "@emotion/react"
import * as React from "react"
import {IconName} from "../../enums"
import {LocalTextDocument} from "../../models"
import {TextEditor} from "../../office-tools/text-editor/text-editor"
import {Flex, spacingMedium, TextSize} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {createUUID, Option} from "../../utils"
import {Button} from "../button/button"
import {Overlay} from "../overlay/overlay"
import {Text} from "../typography/typography"

export interface CreateTextDocumentProps {
  readonly selectTextDocument?: (textDocument: LocalTextDocument) => void
}

export const CreateTextDocument: React.FC<CreateTextDocumentProps> = ({selectTextDocument}) => {
  const {t} = useLucaTranslation()
  const id = createUUID()

  const defaultTitle = `${t("directories_and_files__type_file_text_document")}.txt`

  const [showTextEditor, setShowTextEditor] = React.useState(false)
  const [title, setTitle] = React.useState(defaultTitle)
  const [content, setContent] = React.useState("")

  const createTextDocument = () => {
    setShowTextEditor(true)
  }

  const confirmTextDocument = () => {
    selectTextDocument && selectTextDocument({id, title, content})
    setShowTextEditor(false)
    setTitle(defaultTitle)
    setContent("")
  }

  const handleTextDocumentContentChange = (content: string) => {
    setContent(content)
  }

  return (
    <div css={styles.wrapper}>
      <Text customStyles={styles.text} size={TextSize.Medium}>
        {t("text_editor__create_message")}
      </Text>
      <Button customStyles={styles.button} icon={IconName.Add} onClick={createTextDocument}>
        {t("text_editor__create_button")}
      </Button>
      {showTextEditor && (
        <Overlay>
          <TextEditor
            textDocument={Option.of({content, title, id})}
            onChange={handleTextDocumentContentChange}
            onTitleChange={setTitle}
            onClose={() => setShowTextEditor(false)}
            onConfirm={confirmTextDocument}
            customStyles={styles.textEditor}
          />
        </Overlay>
      )}
    </div>
  )
}

const styles = {
  modal: css({
    height: "80vh"
  }),
  text: css({
    textAlign: "center",
    maxWidth: "35vw",
    paddingBottom: spacingMedium
  }),
  button: css({
    alignSelf: "center",
    width: "fit-content"
  }),
  wrapper: [
    Flex.column,
    css({
      alignItems: "center"
    })
  ],
  textEditor: css({
    height: "80%"
  })
}
