import * as React from "react"
import {InterventionHeaderGroupType} from "shared/enums"
import {
  EmailOpeningInterventionUpdate,
  EmailUpdate,
  ErpRowOpeningInterventionUpdate,
  FileOpeningInterventionUpdate,
  InterventionType,
  NotesContentInterventionUpdate,
  RuntimeSurveyAnswerSelectionInterventionUpdate,
  SpreadsheetCellContentInterventionUpdate,
  TextDocumentContentInterventionUpdate
} from "shared/graphql/generated/globalTypes"
import {
  useEmail,
  useUpdateEmail,
  useUpdateEmailOpeningIntervention,
  useUpdateErpRowOpeningIntervention,
  useUpdateFileOpeningIntervention,
  useUpdateNotesContentIntervention,
  useUpdateRuntimeSurveyAnswerSelectionIntervention,
  useUpdateSpreadsheetCellContentIntervention,
  useUpdateTextDocumentContentIntervention
} from "shared/graphql/hooks"
import {Intervention, RuntimeSurveyAnswerSelectionIntervention, ScenarioQuestionnaire} from "shared/models"
import {Option} from "shared/utils"
import {useNavigate} from "../../../../hooks/use-navigate"
import {useDeleteInterventionWithAssignedInterventionMail} from "../../hooks/use-delete-intervention-with-mail"
import {isRuntimeSurveyIntervention} from "../../utils/common"
import {InterventionDetailView} from "./intervention-detail-view"

export interface Props {
  readonly headerGroupType: InterventionHeaderGroupType
  readonly intervention: Intervention
  readonly isReadOnly: boolean
  readonly scenarioQuestionnaires: ScenarioQuestionnaire[]
}

export type InterventionUpdateWithTimeoffset =
  | FileOpeningInterventionUpdate
  | EmailOpeningInterventionUpdate
  | NotesContentInterventionUpdate
  | TextDocumentContentInterventionUpdate
  | ErpRowOpeningInterventionUpdate

export const InterventionDetailViewContainer: React.FC<Props> = ({
  headerGroupType,
  intervention,
  isReadOnly,
  scenarioQuestionnaires
}) => {
  const {navigate} = useNavigate()
  const {updateFileOpeningIntervention} = useUpdateFileOpeningIntervention(intervention.scenarioId)
  const {updateEmailOpeningIntervention} = useUpdateEmailOpeningIntervention(intervention.scenarioId)
  const {updateNotesContentIntervention} = useUpdateNotesContentIntervention(intervention.scenarioId)
  const {updateTextDocumentContentIntervention} = useUpdateTextDocumentContentIntervention(intervention.scenarioId)
  const {updateRuntimeSurveyAnswerSelectionIntervention} = useUpdateRuntimeSurveyAnswerSelectionIntervention(
    intervention.scenarioId
  )
  const {updateErpRowOpeningIntervention} = useUpdateErpRowOpeningIntervention(intervention.scenarioId)
  const {updateSpreadsheetCellContentIntervention} = useUpdateSpreadsheetCellContentIntervention(
    intervention.scenarioId
  )

  const {updateEmail} = useUpdateEmail()
  const {email: emailOption} = useEmail(intervention.interventionEmailId)

  const {handleDeleteInterventionWithEmail} = useDeleteInterventionWithAssignedInterventionMail(
    intervention.scenarioId,
    headerGroupType,
    scenarioQuestionnaires
  )

  const [isEditTimeModalVisible, setIsEditTimeModalVisible] = React.useState(false)

  const toggleIsEditTimeModalVisible = () => setIsEditTimeModalVisible(!isEditTimeModalVisible)

  const getInterventionUpdateMutationByIntervention = (update: InterventionUpdateWithTimeoffset) => {
    switch (intervention.interventionType) {
      case InterventionType.FileOpening:
        return () => updateFileOpeningIntervention(intervention.id, update as FileOpeningInterventionUpdate)
      case InterventionType.EmailOpening:
        return () => updateEmailOpeningIntervention(intervention.id, update as EmailOpeningInterventionUpdate)
      case InterventionType.NotesContent:
        return () => updateNotesContentIntervention(intervention.id, update as NotesContentInterventionUpdate)
      case InterventionType.TextDocumentContent:
        return () =>
          updateTextDocumentContentIntervention(intervention.id, update as TextDocumentContentInterventionUpdate)
      case InterventionType.ErpRowOpening:
        return () => updateErpRowOpeningIntervention(intervention.id, update as ErpRowOpeningInterventionUpdate)
      case InterventionType.SpreadsheetCellContent:
        return () =>
          updateSpreadsheetCellContentIntervention(intervention.id, update as SpreadsheetCellContentInterventionUpdate)
      default:
        return undefined
    }
  }

  const handleUpdateOfInterventionsWithTimeoffset = (
    update: Partial<InterventionUpdateWithTimeoffset>
  ): Promise<unknown> => {
    const interventionUpdate = getUpdateByInterventionType(update, intervention)

    const interventionEmailUpdate: Option<EmailUpdate> = emailOption.map<EmailUpdate>(email => ({
      ccRecipients: email.ccRecipients,
      directory: email.directory,
      isInitiallyRead: email.isInitiallyRead,
      message: email.message,
      relevance: email.relevance,
      scenarioId: email.scenarioId,
      subject: email.subject,
      recipient: email.recipient,
      sender: email.sender,
      receptionDelayInSeconds: update.timeOffsetInSeconds ?? email.receptionDelayInSeconds
    }))

    if (interventionUpdate) {
      const isTimeOffsetUpdated = update.timeOffsetInSeconds !== undefined

      return (
        getInterventionUpdateMutationByIntervention(interventionUpdate)?.().then(() =>
          isTimeOffsetUpdated
            ? interventionEmailUpdate.forEach(update => updateEmail(intervention.interventionEmailId, update))
            : Promise.resolve()
        ) ?? Promise.resolve()
      )
    }

    return Promise.resolve(Option.none<Intervention>())
  }

  const handleUpdateRuntimeSurveyAnswerSelectionIntervention = (
    update: Partial<RuntimeSurveyAnswerSelectionInterventionUpdate>
  ): Promise<unknown> => {
    if (isRuntimeSurveyIntervention(intervention)) {
      const runtimeSurveyAnswerSelectionUpdate: RuntimeSurveyAnswerSelectionInterventionUpdate = {
        interventionEmailId: update.interventionEmailId ?? intervention.interventionEmailId,
        title: update.title ?? intervention.title,
        answerId: update.answerId ?? intervention.answerId,
        isNegated: update.isNegated ?? intervention.isNegated
      }

      return updateRuntimeSurveyAnswerSelectionIntervention(intervention.id, runtimeSurveyAnswerSelectionUpdate)
    } else {
      return Promise.reject()
    }
  }

  const questionTitleForIntervention = isRuntimeSurveyIntervention(intervention)
    ? scenarioQuestionnaires
        .map(scenarioQuestionnaires => scenarioQuestionnaires.questionnaire)
        .flatMap(questionnaire => questionnaire.questions)
        .find(question => question.id === (intervention as RuntimeSurveyAnswerSelectionIntervention).answer.questionId)
        ?.text
    : undefined

  return (
    <InterventionDetailView
      toggleIsEditTimeModalVisible={toggleIsEditTimeModalVisible}
      handleUpdateOfInterventionsWithTimeoffset={handleUpdateOfInterventionsWithTimeoffset}
      handleUpdateRuntimeSurveyAnswerSelectionIntervention={handleUpdateRuntimeSurveyAnswerSelectionIntervention}
      handleDeleteIntervention={() => handleDeleteInterventionWithEmail(intervention)}
      intervention={intervention}
      isReadOnly={isReadOnly}
      isEditTimeModalVisible={isEditTimeModalVisible}
      navigate={navigate}
      questionTitle={questionTitleForIntervention}
    />
  )
}

const getUpdateByInterventionType = (
  update: Partial<InterventionUpdateWithTimeoffset>,
  intervention: Intervention
): InterventionUpdateWithTimeoffset | undefined => {
  switch (intervention.__typename) {
    case "FileOpeningIntervention": {
      const fileOpeningUpdate = update as FileOpeningInterventionUpdate
      return {
        interventionEmailId: fileOpeningUpdate.interventionEmailId ?? intervention.interventionEmailId,
        fileId: fileOpeningUpdate.fileId ?? intervention.fileId,
        timeOffsetInSeconds: fileOpeningUpdate.timeOffsetInSeconds ?? intervention.timeOffsetInSeconds,
        title: fileOpeningUpdate.title ?? intervention.title
      } as FileOpeningInterventionUpdate
    }
    case "EmailOpeningIntervention": {
      const emailOpeningUpdate = update as EmailOpeningInterventionUpdate
      return {
        interventionEmailId: emailOpeningUpdate.interventionEmailId ?? intervention.interventionEmailId,
        emailId: emailOpeningUpdate.emailId ?? intervention.emailId,
        timeOffsetInSeconds: emailOpeningUpdate.timeOffsetInSeconds ?? intervention.timeOffsetInSeconds,
        title: emailOpeningUpdate.title ?? intervention.title
      } as EmailOpeningInterventionUpdate
    }
    case "NotesContentIntervention": {
      const notesContentUpdate = update as NotesContentInterventionUpdate
      return {
        interventionEmailId: notesContentUpdate.interventionEmailId ?? intervention.interventionEmailId,
        timeOffsetInSeconds: notesContentUpdate.timeOffsetInSeconds ?? intervention.timeOffsetInSeconds,
        title: notesContentUpdate.title ?? intervention.title,
        value: notesContentUpdate.value ?? intervention.value
      } as NotesContentInterventionUpdate
    }
    case "TextDocumentContentIntervention": {
      const textDocumentUpdate = update as TextDocumentContentInterventionUpdate
      return {
        interventionEmailId: textDocumentUpdate.interventionEmailId ?? intervention.interventionEmailId,
        timeOffsetInSeconds: textDocumentUpdate.timeOffsetInSeconds ?? intervention.timeOffsetInSeconds,
        title: textDocumentUpdate.title ?? intervention.title,
        value: textDocumentUpdate.value ?? intervention.value,
        fileId: textDocumentUpdate.fileId ?? intervention.file.id,
        textDocumentId: textDocumentUpdate.textDocumentId ?? intervention.textDocumentId
      } as TextDocumentContentInterventionUpdate
    }

    case "ErpRowOpeningIntervention": {
      const erpRowOpeningUpdate = update as ErpRowOpeningInterventionUpdate
      return {
        interventionEmailId: erpRowOpeningUpdate.interventionEmailId ?? intervention.interventionEmailId,
        timeOffsetInSeconds: erpRowOpeningUpdate.timeOffsetInSeconds ?? intervention.timeOffsetInSeconds,
        title: erpRowOpeningUpdate.title ?? intervention.title
      } as ErpRowOpeningInterventionUpdate
    }
    case "SpreadsheetCellContentIntervention": {
      const spreadsheetCellContentUpdate = update as SpreadsheetCellContentInterventionUpdate
      return {
        interventionEmailId: spreadsheetCellContentUpdate.interventionEmailId ?? intervention.interventionEmailId,
        timeOffsetInSeconds: spreadsheetCellContentUpdate.timeOffsetInSeconds ?? intervention.timeOffsetInSeconds,
        title: spreadsheetCellContentUpdate.title ?? intervention.title,
        fileId: spreadsheetCellContentUpdate.fileId ?? intervention.fileId,
        isNegated: spreadsheetCellContentUpdate.isNegated ?? intervention.isNegated,
        value: spreadsheetCellContentUpdate.value ?? intervention.value,
        spreadsheetColumnIndex:
          spreadsheetCellContentUpdate.spreadsheetColumnIndex ?? intervention.spreadsheetColumnIndex,
        spreadsheetId: spreadsheetCellContentUpdate.spreadsheetId ?? intervention.spreadsheetId,
        spreadsheetRowIndex: spreadsheetCellContentUpdate.spreadsheetRowIndex ?? intervention.spreadsheetRowIndex
      } as SpreadsheetCellContentInterventionUpdate
    }

    default: {
      return undefined
    }
  }
}
