import "react-quill/dist/quill.snow.css"
import React from "react"
import ReactQuill from "react-quill"
import {Button, CardFooter, LoadingIndicator, OfficeWindow, TextInput} from "../../components"
import {InputType, ViewerToolsType} from "../../enums"
import {LocalTextDocument} from "../../models"
import {CustomStyle, Flex} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {Option} from "../../utils"
import {styles} from "./text-editor-styles"

export interface TextEditorProps extends CustomStyle {
  readonly textDocument: Option<LocalTextDocument>
  readonly onChange: (content: string) => void
  readonly onClose: () => void
  readonly onTitleChange?: (value: string) => void
  readonly onMinimize?: () => void
  readonly onConfirm?: () => void
  readonly isLoading?: boolean
}

const modules = {
  toolbar: [
    [{header: [1, 2, 3, 4, 5, false]}],
    ["bold", "italic", "underline", "strike"],
    [{list: "ordered"}, {list: "bullet"}],
    [{align: ""}, {align: "center"}, {align: "right"}, {align: "justify"}]
  ]
}

export const TextEditor: React.FC<TextEditorProps> = ({
  textDocument,
  onChange,
  onClose,
  onMinimize,
  onTitleChange,
  onConfirm,
  isLoading,
  customStyles
}) => {
  const {t} = useLucaTranslation()

  return textDocument
    .map(textDocument => (
      <OfficeWindow
        onClose={onClose}
        isFooterVisible={onConfirm === undefined}
        onMinimize={onMinimize}
        toolType={ViewerToolsType.TextEditor}
        customStyles={[Flex.column, customStyles]}>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <React.Fragment>
            <div css={styles.subheader}>
              <TextInput
                disabled={onTitleChange === undefined}
                isClearable={false}
                customStyles={styles.customTextInput}
                type={InputType.text}
                value={textDocument.title}
                placeholder={t("text_editor__title_placeholder")}
                onChange={onTitleChange}
                customInputContainerStyles={styles.titleInput}
              />
            </div>
            <ReactQuill
              css={[
                styles.customToolbar(
                  t("text_editor__dropdown_text"),
                  t("text_editor__dropdown_title"),
                  t("text_editor__dropdown_headline")
                ),
                styles.quillEditor
              ]}
              value={textDocument.content}
              onChange={onChange}
              modules={modules}
            />
            {onConfirm && (
              <CardFooter customStyles={styles.footer}>
                <Button onClick={onConfirm}>Hinzufügen</Button>
              </CardFooter>
            )}
          </React.Fragment>
        )}
      </OfficeWindow>
    ))
    .orNull()
}
