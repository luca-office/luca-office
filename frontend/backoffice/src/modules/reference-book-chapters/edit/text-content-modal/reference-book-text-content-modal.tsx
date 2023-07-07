import * as React from "react"
import {ReferenceBookContentType} from "shared/graphql/generated/globalTypes"
import {CreateReferenceBookContentProps} from "shared/graphql/hooks/mutations"
import {ReferenceBookArticleContent} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {MarkdownTextUpdateModal} from "../../../../components"

interface Props extends Pick<CreateReferenceBookContentProps, "createReferenceBookContent"> {
  readonly onDismiss: () => void
  readonly onSuccess: (data?: Option<ReferenceBookArticleContent>) => void
  readonly selectedArticleId: Option<UUID>
  readonly markdownDefaultText?: string
}

export const ReferenceBookTextContentModal: React.FC<Props> = ({
  onSuccess,
  onDismiss,
  createReferenceBookContent,
  selectedArticleId,
  markdownDefaultText
}) => {
  const {t} = useLucaTranslation()

  const handleTextContentCreation = (referenceBookArticleId: string, markdown: string) => {
    createReferenceBookContent({
      contentType: ReferenceBookContentType.TextContent,
      referenceBookArticleId,
      text: markdown
    }).then(onSuccess)
  }
  const onConfirm = (text: string) => selectedArticleId.map(articleId => handleTextContentCreation(articleId, text))

  return (
    <MarkdownTextUpdateModal
      text={markdownDefaultText}
      confirmLabelKey={"reference_books__create_text_content_confirm"}
      title={t("reference_books__create_text_content_title")}
      onDismiss={onDismiss}
      onConfirm={onConfirm}
    />
  )
}
