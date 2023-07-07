import {css} from "@emotion/react"
import * as React from "react"
import {Modal, Overlay, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {spacingMedium, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {
  ReferenceBookArticleCreationForm,
  useCreateReferenceBookArticleModal
} from "./hooks/use-create-reference-book-article-modal"

export interface CreateReferenceBookArticleModalProps {
  readonly referenceBookChapterId: UUID
  readonly articleId?: UUID
}

export const CreateReferenceBookArticleModal: React.FC<CreateReferenceBookArticleModalProps> = ({
  referenceBookChapterId,
  articleId
}) => {
  const {t} = useLucaTranslation()
  const {formMethods, dismissModal, createReferenceBookArticle, dataLoading} = useCreateReferenceBookArticleModal(
    referenceBookChapterId,
    articleId
  )
  const {register, handleSubmit, errors} = formMethods

  const onSubmit = (formValues: ReferenceBookArticleCreationForm) => {
    createReferenceBookArticle({
      ...formValues
    })
  }

  return (
    <Overlay>
      <Modal
        title={t("reference_books__create_reference_book_article_title")}
        onDismiss={dismissModal}
        customStyles={styles.modal}
        onConfirm={handleSubmit(onSubmit)}
        preventSubmitOnEnter={true}
        confirmButtonDisabled={dataLoading}>
        <div css={styles.inputWrapper}>
          <TextInput
            ref={register({
              required: true
            })}
            placeholderKey="reference_books__create_reference_book_article_title_placeholder"
            customStyles={styles.input}
            name="title"
            hasValidationError={!!errors?.title}
            type={InputType.text}
            labelKey={"title"}
            autoFocus={true}
          />
        </div>
      </Modal>
    </Overlay>
  )
}

const styles = {
  modal: css({width: "50vw"}),
  input: css({
    width: "100%",
    marginBottom: spacingSmall
  }),
  textarea: css({
    resize: "none"
  }),
  inputWrapper: css({
    marginTop: spacingMedium
  })
}
