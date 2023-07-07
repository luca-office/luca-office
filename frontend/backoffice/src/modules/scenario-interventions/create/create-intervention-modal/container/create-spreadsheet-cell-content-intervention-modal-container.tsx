import {css} from "@emotion/react"
import * as React from "react"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {CustomSelect, indexToCellName, TextInput} from "shared/components"
import {IconName, InputType, TimeUnit} from "shared/enums"
import {EmailDirectory, SpreadsheetCellContentInterventionCreation} from "shared/graphql/generated/globalTypes"
import {useCreateEmail, useCreateSpreadsheetCellContentIntervention} from "shared/graphql/hooks"
import {emailsQuery} from "shared/graphql/queries"
import {CellIndex} from "shared/models"
import {spacingMedium, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {secondsToGivenTimeUnit} from "shared/utils"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {getReceptionDelayInSeconds} from "../../../../scenario-emails/emails/email/email-delay-modal/email-delay-modal-utils"
import {CreateInterventionModal, InterventionCreationBaseFormType} from "../create-intervention-modal"
import {emailCreationValues} from "../util/email-creation"

interface Props {
  readonly onDismiss: () => void
  readonly scenarioId: UUID
  readonly fileId: UUID
  readonly spreadsheetId: UUID
  readonly scenarioMaxDurationInSeconds: number
  readonly selectedCellIndex: CellIndex
}

export enum CellInterventionType {
  Equal = "Equal",
  NotEqual = "NotEqual"
}

export const CreateSpreadsheetCellContentInterventionModalContainer = ({
  scenarioMaxDurationInSeconds,
  onDismiss,
  scenarioId,
  fileId,
  spreadsheetId,
  selectedCellIndex
}: Props) => {
  const formMethods = useForm<InterventionCreationBaseFormType>()
  const {t} = useLucaTranslation()

  const [text, setText] = React.useState("")

  const [selectedType, setSelectedType] = React.useState<CellInterventionType>(CellInterventionType.Equal)

  const {
    createSpreadsheetCellContentIntervention,
    createSpreadsheetCellContentInterventionLoading
  } = useCreateSpreadsheetCellContentIntervention(scenarioId)

  const {createEmail, createEmailLoading} = useCreateEmail([{query: emailsQuery, variables: {scenarioId}}])

  const dispatch = useDispatch()

  const renderTriggerCondition = () => (
    <>
      <CustomSelect
        optionList={[
          {
            label: t("files_and_directories__intervention_spreadsheet_is_included"),
            value: CellInterventionType.Equal
          },
          {
            label: t("files_and_directories__intervention_spreadsheet_is_not_included"),
            value: CellInterventionType.NotEqual
          }
        ]}
        labelKey="interventions__interventions_table_trigger_condition"
        value={selectedType}
        customStyles={{marginBottom: spacingMedium}}
        onChange={value => setSelectedType(value as CellInterventionType)}
      />
      <TextInput
        type={InputType.text}
        name="value"
        value={text}
        onChange={setText}
        placeholderKey="coding_models__automated_item_input_value_choose_document_modal_notes_text_placeholder"
        labelKey="interventions__interventions_check_notes_value_label"
      />
    </>
  )

  const handleCreateIntervention = (creation: InterventionCreationBaseFormType) => {
    const timeOffsetInSeconds = getReceptionDelayInSeconds(creation.timeUnit, creation.timeOffset)
    if (timeOffsetInSeconds > scenarioMaxDurationInSeconds) {
      formMethods.setError("timeOffset", {message: t("email__future_email_error")})
    } else {
      const getCreationValues = (emailId: UUID): SpreadsheetCellContentInterventionCreation => ({
        interventionEmailId: emailId,
        scenarioId,
        timeOffsetInSeconds: timeOffsetInSeconds,
        title: creation.title,
        value: text,
        isNegated: selectedType === CellInterventionType.NotEqual,
        spreadsheetColumnIndex: selectedCellIndex.columnIndex,
        spreadsheetRowIndex: selectedCellIndex.rowIndex,
        fileId,
        spreadsheetId
      })

      createEmail(emailCreationValues(timeOffsetInSeconds, scenarioId, creation.sender)).then(emailOption =>
        emailOption.forEach(email =>
          createSpreadsheetCellContentIntervention(getCreationValues(email.id)).then(() =>
            dispatch(
              navigateToRouteAction(Route.ScenarioEmails, {
                scenarioId,
                directory: EmailDirectory.Inbox,
                emailId: email.id
              })
            )
          )
        )
      )
    }
  }

  return (
    <CreateInterventionModal
      creationIsLoading={createSpreadsheetCellContentInterventionLoading || createEmailLoading}
      timeOffsetDescription={t("interventions__interventions_create_modal_time_hint", {
        durationInMinutes: secondsToGivenTimeUnit(TimeUnit.Minute, scenarioMaxDurationInSeconds)
      })}
      titleKey="interventions__interventions_create_modal_title_spreadsheet"
      formMethods={formMethods}
      onConfirm={handleCreateIntervention}
      onDismiss={onDismiss}
      triggerConditionConfig={{
        descriptionKey: "interventions__interventions_check_spreadsheet_cell_content_description",
        titleKey:
          selectedType === CellInterventionType.Equal
            ? "interventions__interventions_check_spreadsheet"
            : "interventions__interventions_check_spreadsheet_negated",
        titleKeyOptions: {cellName: indexToCellName(selectedCellIndex)},
        icon: IconName.TableCalculation,
        renderCondition: renderTriggerCondition
      }}
    />
  )
}

const styles = {
  icon: css({
    marginLeft: spacingSmall
  })
}
