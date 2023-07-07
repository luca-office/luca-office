import {css} from "@emotion/react"
import * as React from "react"
import {Modal, Overlay, TextArea, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {UsageField} from "shared/graphql/generated/globalTypes"
import {spacingMedium, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {ProjectCreationForm, useCreateProjectModal} from "./hooks/use-create-project-modal"

export const CreateProjectModal: React.FC = () => {
  const {t} = useLucaTranslation()
  const {formMethods, dismissModal, createProject, createProjectLoading} = useCreateProjectModal()
  const {register, handleSubmit, errors} = formMethods

  const onSubmit = (formValues: ProjectCreationForm) => {
    createProject({
      ...formValues,
      audience: "",
      usageField: UsageField.Demonstration,
      welcomeText: ""
    })
  }

  return (
    <Overlay>
      <Modal
        title={t("project_create_project")}
        onDismiss={dismissModal}
        customStyles={styles.modal}
        onConfirm={handleSubmit(onSubmit)}
        preventSubmitOnEnter={true}
        confirmButtonDisabled={createProjectLoading}>
        <div css={styles.inputWrapper}>
          <TextInput
            ref={register({
              required: true
            })}
            placeholderKey="project_create_project_name_placeholder"
            customStyles={styles.input}
            name="name"
            hasValidationError={!!errors?.name}
            type={InputType.text}
            labelKey={"name"}
          />
          <TextArea
            placeholder={t("project_create_project_description_placeholder")}
            customStyles={[styles.input, styles.textarea]}
            ref={register({
              required: true
            })}
            name="description"
            rows={5}
            labelKey={"project_create_project_description_label"}
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
