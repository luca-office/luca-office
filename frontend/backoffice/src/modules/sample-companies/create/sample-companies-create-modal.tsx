import {css} from "@emotion/react"
import * as React from "react"
import {Modal, Overlay, TextArea, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {spacingMedium, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {SampleCompanyCreationForm, useCreateSampleCompanyModal} from "./hooks/use-create-sample-company-modal"

export const CreateSampleCompaniesModal: React.FC = () => {
  const {t} = useLucaTranslation()
  const {formMethods, dismissModal, createSampleCompany, createSampleCompanyLoading} = useCreateSampleCompanyModal()
  const {register, handleSubmit, errors} = formMethods

  const onSubmit = (formValues: SampleCompanyCreationForm) => {
    createSampleCompany({
      description: formValues.description,
      name: formValues.title,
      tags: []
    })
  }

  return (
    <Overlay>
      <Modal
        title={t("sample_companies__create_sample_company")}
        onDismiss={dismissModal}
        customStyles={styles.modal}
        onConfirm={handleSubmit(onSubmit)}
        preventSubmitOnEnter={true}
        confirmButtonDisabled={createSampleCompanyLoading}>
        <div css={styles.inputWrapper}>
          <TextInput
            ref={register({
              required: true
            })}
            placeholderKey="sample_companies__create_sample_company_title_placeholder"
            customStyles={styles.input}
            name="title"
            hasValidationError={!!errors?.title}
            type={InputType.text}
            labelKey={"title"}
          />
          <TextArea
            placeholder={t("sample_companies__create_sample_company_description_placeholder")}
            customStyles={[styles.input, styles.textarea]}
            ref={register({
              required: true
            })}
            name="description"
            rows={5}
            labelKey={"description"}
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
