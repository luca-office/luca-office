import {css} from "@emotion/react"
import * as React from "react"
import {Modal, Overlay, TextArea, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {QuestionnaireType} from "shared/graphql/generated/globalTypes"
import {spacingMedium, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {QuestionnaireCreationForm, useCreateQuestionnaireModal} from "./hooks/use-create-questionnaire-modal"

export interface CreateQuestionnaireProps {
  readonly isRuntimeSurvey?: boolean
}

export const CreateQuestionnaireModal: React.FC<CreateQuestionnaireProps> = ({isRuntimeSurvey = false}) => {
  const {t} = useLucaTranslation()
  const {formMethods, dismissModal, createQuestionnaire, createQuestionnaireLoading} = useCreateQuestionnaireModal(
    isRuntimeSurvey
  )
  const {register, handleSubmit, errors} = formMethods

  const onSubmit = (formValues: QuestionnaireCreationForm) => {
    createQuestionnaire({
      description: formValues.description,
      title: formValues.title,
      questionnaireType: isRuntimeSurvey ? QuestionnaireType.RuntimeSurvey : QuestionnaireType.Global
    })
  }

  return (
    <Overlay>
      <Modal
        title={t(isRuntimeSurvey ? "events__create_event" : "questionnaires__create_event")}
        onDismiss={dismissModal}
        customStyles={styles.modal}
        onConfirm={handleSubmit(onSubmit)}
        preventSubmitOnEnter={true}
        confirmButtonDisabled={createQuestionnaireLoading}>
        <div css={styles.inputWrapper}>
          <TextInput
            ref={register({
              required: true
            })}
            placeholderKey={
              isRuntimeSurvey
                ? "events__create_event_title_placeholder"
                : "questionnaires__create_event_title_placeholder"
            }
            customStyles={styles.input}
            name="title"
            hasValidationError={!!errors?.title}
            type={InputType.text}
            labelKey={"title"}
          />
          <TextArea
            placeholder={t(
              isRuntimeSurvey
                ? "events__create_event_description_placeholder"
                : "questionnaires__create_event_description_placeholder"
            )}
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
