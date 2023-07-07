import {css} from "@emotion/react"
import * as React from "react"
import {Modal, Overlay, TextArea, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {spacingMedium, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Route} from "../../../routes"
import {CodingModelCreationForm, useCreateCodingModelModal} from "./hooks/use-create-coding-model-modal"

interface Props {
  readonly scenarioId: UUID
}

export const CreateCodingModelModal: React.FC<Props> = ({scenarioId}) => {
  const {t} = useLucaTranslation()
  const {formMethods, navigate, createCodingModel, createCodingModelLoading} = useCreateCodingModelModal(scenarioId)
  const {register, handleSubmit, errors} = formMethods

  const onSubmit = (formValues: CodingModelCreationForm) => {
    createCodingModel({
      description: formValues.description,
      scenarioId: scenarioId,
      title: formValues.title
    })
  }

  return (
    <Overlay>
      <Modal
        title={t("coding_models__create_modal_title")}
        onDismiss={() => navigate(Route.ScenarioCodingModelSelection, {scenarioId})}
        customStyles={styles.modal}
        onConfirm={handleSubmit(onSubmit)}
        preventSubmitOnEnter={true}
        confirmButtonDisabled={createCodingModelLoading}>
        <div css={styles.inputWrapper}>
          <TextInput
            ref={register({
              required: true
            })}
            placeholderKey="scenario_create_scenario_title_placeholder"
            customStyles={styles.input}
            name="title"
            hasValidationError={!!errors?.title}
            type={InputType.text}
            labelKey={"title"}
          />
          <TextArea
            placeholder={t("coding_models__create_modal_description_placeholder")}
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
