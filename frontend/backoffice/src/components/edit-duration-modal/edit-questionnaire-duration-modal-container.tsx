import {omit} from "lodash-es"
import * as React from "react"
import {useForm} from "react-hook-form"
import {TimeUnit} from "shared/enums"
import {useUpdateQuestionnaire} from "shared/graphql/hooks"
import {Questionnaire, SelectOption} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes} from "shared/utils"
import {scenarioDurationOptionsConfig} from "../../modules/scenarios/config/delays-config"
import {EditDurationModal} from "./edit-duration-modal"

interface Props {
  readonly questionnaire: Questionnaire
  readonly onConfirm: () => void
  readonly onDismiss: () => void
}

export interface EditDurationForm {
  readonly timeUnit: TimeUnit
  readonly duration: number
}

export const EditQuestionnaireDurationModalContainer: React.FC<Props> = ({questionnaire, onConfirm, onDismiss}) => {
  const {t} = useLucaTranslation()

  const {updateQuestionnaire, updateQuestionnaireLoading} = useUpdateQuestionnaire(questionnaire.id, false)

  const formMethods = useForm<EditDurationForm>({
    defaultValues: {
      duration: convertSecondsToMinutes(questionnaire.maxDurationInSeconds ?? 0),
      timeUnit: TimeUnit.Minute
    }
  })

  const timeUnitOptions: SelectOption[] = scenarioDurationOptionsConfig.map(config => ({
    ...omit(config, "labelKey"),
    label: t(config.labelKey)
  }))

  const handleSubmit = (timeInSeconds: number) => {
    updateQuestionnaire({
      description: questionnaire.description,
      questionnaireType: questionnaire.questionnaireType,
      title: questionnaire.title,
      binaryFileId: questionnaire.binaryFileId,
      maxDurationInSeconds: timeInSeconds
    }).then(onConfirm)
  }

  return (
    <EditDurationModal
      onConfirm={handleSubmit}
      areMaximumReceptionDelaysLoading={false}
      onDismiss={onDismiss}
      timeUnitOptions={timeUnitOptions}
      formMethods={formMethods}
      titleKey="scenario_details__edit_duration_modal_title"
      descriptionKey="questionnaires__detail_edit_time_modal_description"
      selectLabelKey="questionnaires__detail_edit_time_modal_label"
    />
  )
}
