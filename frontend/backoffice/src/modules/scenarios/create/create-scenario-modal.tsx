import {css} from "@emotion/react"
import * as React from "react"
import {Modal, Overlay, TextArea, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {spacingMedium, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Route} from "../../../routes"
import {ScenarioCreationForm, useCreateScenarioModal} from "./hooks/use-create-scenario-modal"

export const CreateScenarioModal: React.FC = () => {
  const {t} = useLucaTranslation()
  const {formMethods, navigate, createScenario, createScenarioLoading} = useCreateScenarioModal()
  const {register, handleSubmit, errors} = formMethods

  const onSubmit = (formValues: ScenarioCreationForm) => {
    createScenario({
      description: formValues.description,
      name: formValues.title,
      shouldDisplayTime: true,
      shouldHideReferenceBookChapters: false,
      tags: []
    })
  }

  return (
    <Overlay>
      <Modal
        title={t("scenario_create_scenario")}
        onDismiss={() => navigate(Route.Scenarios)}
        customStyles={styles.modal}
        onConfirm={handleSubmit(onSubmit)}
        preventSubmitOnEnter={true}
        confirmButtonDisabled={createScenarioLoading}>
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
            placeholder={t("scenario_create_scenario_description_placeholder")}
            customStyles={[styles.input, styles.textarea]}
            ref={register({
              required: true
            })}
            name="description"
            rows={5}
            labelKey={"scenario_create_scenario_description_label"}
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
