import * as React from "react"
import {Controller} from "react-hook-form"
import {
  Card,
  CardContent,
  Checkbox,
  Heading,
  Icon,
  Label,
  LoadingIndicator,
  Modal,
  Overlay,
  Text,
  TextInput,
  Tooltip
} from "shared/components"
import {HeadingLevel, IconName, InputType} from "shared/enums"
import {Flex, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {SurveyForm} from "../models"
import {SurveyConditions, SurveyPeriodSelection} from "./cards"
import {useCreateSurvey} from "./hooks/use-create-survey"
import {useEditSurvey} from "./hooks/use-edit-survey"
import {createSurveyStyles as styles} from "./survey-form-modal.style"

export interface SurveyFormModalProps {
  readonly projectId: UUID
  readonly createTestSurvey?: boolean
  readonly surveyId?: UUID
}

export const SurveyFormModal: React.FunctionComponent<SurveyFormModalProps> = ({
  createTestSurvey,
  projectId,
  surveyId
}) => {
  const {t} = useLucaTranslation()
  const isEditing = !!surveyId
  const {
    onConfirm,
    onCancel,
    firstProjectSurveyOrlyVisible,
    submitSurvey,
    formMethods,
    initialized,
    submitSurveyLoading
  } = surveyId ? useEditSurvey(projectId, surveyId) : useCreateSurvey(projectId, !!createTestSurvey)
  const {register, handleSubmit, errors, control} = formMethods

  register("dateRange", {
    required: true
  })

  const onSubmit = (formValues: SurveyForm) => {
    if (!formValues.isAutomaticStartEnabled) {
      submitSurvey({...formValues, dateRange: []})
    } else {
      submitSurvey(formValues)
    }
  }

  if (!initialized) {
    return (
      <Overlay>
        <LoadingIndicator />
      </Overlay>
    )
  }

  const createOrly = (
    <Modal
      customStyles={styles.createOrly}
      title={t("projects__surveys_creation_orly_title")}
      onDismiss={onCancel}
      onConfirm={onConfirm}
      confirmButtonKey={"projects__surveys_creation_orly_confirm"}>
      <Text>{t("projects__surveys_creation_orly_text")}</Text>
    </Modal>
  )

  const renderModalHeader = () => (
    <div css={styles.modalHeaderContent(isEditing)}>
      <Heading level={HeadingLevel.h3}>
        {t(
          isEditing
            ? "projects__surveys_update_form_title"
            : createTestSurvey
            ? "projects__surveys_test_creation_form_title"
            : "projects__surveys_creation_form_title"
        )}
      </Heading>
      {!isEditing && <Text>{t("projects__surveys_creation_form_hint")}</Text>}
    </div>
  )

  const createModal = (
    <Modal
      customStyles={styles.createModal}
      customHeaderStyles={styles.modalHeader}
      customContentStyles={styles.modalContent}
      title={""}
      onDismiss={onCancel}
      onConfirm={handleSubmit(onSubmit)}
      confirmButtonDisabled={submitSurveyLoading}
      renderHeader={renderModalHeader}>
      <div css={[styles.inputWrapper, isEditing && styles.inputWrapperFull]}>
        {!isEditing && (
          <TextInput
            ref={register({
              required: true
            })}
            customStyles={styles.input}
            name="title"
            hasValidationError={!!errors.title}
            type={InputType.text}
            labelKey={"projects__surveys_title_label"}
          />
        )}

        <div>
          <div css={[Flex.row, styles.tooltipLabel]}>
            <Label label={t("projects__survey_overlay_anon_participation_auth")} />
            <Tooltip
              title={t("projects__survey_overlay_anon_participation_auth")}
              text={t("projects__survey_overlay_anon_participation_auth_tooltip")}
              icon={IconName.Information}>
              <Icon name={IconName.Information} />
            </Tooltip>
          </div>
          <Controller
            render={({onChange, value}) => (
              <Card hasShadow onClick={() => onChange(!value)}>
                <CardContent customStyles={[styles.cardContent, styles.cardWithSingleCheckbox]}>
                  <div css={styles.checkBoxWrapper}>
                    <Checkbox checked={value} readonlyInput={true} />
                    <Text size={TextSize.Medium}>{t("projects__survey_overlay_anon_participation_label")}</Text>
                  </div>
                </CardContent>
              </Card>
            )}
            control={control}
            defaultValue={false}
            name="isAnonymousAuthAllowed"
          />
        </div>
      </div>

      <SurveyConditions formMethods={formMethods} />
      <SurveyPeriodSelection formMethods={formMethods} />
    </Modal>
  )

  return firstProjectSurveyOrlyVisible && !isEditing && !createTestSurvey ? createOrly : createModal
}
