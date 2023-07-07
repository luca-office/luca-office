import {css} from "@emotion/react"
import * as React from "react"
import {MarkdownEditor, Modal} from "shared/components"
import {spacingMedium} from "shared/styles"
import {LucaI18nLangKey} from "shared/translations"

export interface MarkdownTextUpdateModalProps {
  readonly confirmLabelKey?: LucaI18nLangKey
  readonly onConfirm: (markdown: string) => void
  readonly onDismiss: () => void
  readonly text?: string
  readonly title: string
}

export const MarkdownTextUpdateModal: React.FC<MarkdownTextUpdateModalProps> = ({
  confirmLabelKey,
  onConfirm,
  onDismiss,
  text = "",
  title
}) => {
  const [markdownText, setMarkdownText] = React.useState(text)

  return (
    <Modal
      customStyles={styles.modal}
      onConfirm={() => onConfirm(markdownText)}
      onDismiss={onDismiss}
      preventSubmitOnEnter={true}
      confirmButtonKey={confirmLabelKey}
      title={title}>
      <div css={styles.editor}>
        <MarkdownEditor onChange={setMarkdownText} defaultValue={text} autoFocus={true} />
      </div>
    </Modal>
  )
}

const styles = {
  modal: css({
    width: 900
  }),
  editor: css({
    marginBottom: spacingMedium
  })
}
