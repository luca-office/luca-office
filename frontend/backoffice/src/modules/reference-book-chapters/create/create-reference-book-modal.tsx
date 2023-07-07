import {css} from "@emotion/react"
import * as React from "react"
import {Modal, Overlay, TextArea, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {spacingMedium, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {ReferenceBookChapterCreationForm, useCreateReferenceBookModal} from "./hooks/use-create-reference-book-modal"

export const CreateReferenceBookModal: React.FC = () => {
  const {t} = useLucaTranslation()
  const {formMethods, dismissModal, createReferenceBook, createReferenceBookLoading} = useCreateReferenceBookModal()
  const {register, handleSubmit, errors} = formMethods

  const onSubmit = (formValues: ReferenceBookChapterCreationForm) => {
    createReferenceBook({
      ...formValues
    })
  }

  return (
    <Overlay>
      <Modal
        title={t("reference_books__create_reference_book")}
        onDismiss={dismissModal}
        customStyles={styles.modal}
        onConfirm={handleSubmit(onSubmit)}
        preventSubmitOnEnter={true}
        confirmButtonDisabled={createReferenceBookLoading}>
        <div css={styles.inputWrapper}>
          <TextInput
            ref={register({
              required: true
            })}
            placeholderKey="reference_books__create_reference_book_title_placeholder"
            customStyles={styles.input}
            name="title"
            hasValidationError={!!errors?.title}
            type={InputType.text}
            labelKey={"title"}
          />
          <TextArea
            placeholder={t("reference_books__create_reference_book_description_placeholder")}
            customStyles={[styles.input, styles.textarea]}
            ref={register({
              required: true
            })}
            name="description"
            rows={5}
            labelKey={"reference_books__create_reference_book_description_label"}
            hasValidationError={!!errors?.description}
          />
        </div>
      </Modal>
    </Overlay>
  )
}

const styles = {
  modal: css({width: 600}),
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
