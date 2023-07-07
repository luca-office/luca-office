import {IconName, InterventionGroupType, InterventionHeaderGroupType} from "shared/enums"
import {InterventionType} from "shared/graphql/generated/globalTypes"
import {
  EmailOpeningIntervention,
  ErpRowOpeningIntervention,
  FileOpeningIntervention,
  Intervention,
  NotesContentIntervention,
  RuntimeSurveyAnswerSelectionIntervention,
  ScenarioQuestionnaire,
  SpreadsheetCellContentIntervention,
  TextDocumentContentIntervention
} from "shared/models"
import {LucaI18nLangKey} from "shared/translations"
import {BaseTypeGroupEntity} from "."
import {NOTES_CONTENT_INTERVENTION_REPLACEMENT_GROUP_ID} from "./const"

export const toGroupTypeForRouting = (type: string): InterventionGroupType => {
  switch (type) {
    case "email":
      return InterventionGroupType.Email
    case "erp":
      return InterventionGroupType.Erp
    case "event":
      return InterventionGroupType.Event
    case "notes":
      return InterventionGroupType.Notes
    default:
      return InterventionGroupType.File
  }
}

export const getGroupTypeIconName = (groupType: InterventionGroupType): IconName => {
  switch (groupType) {
    case InterventionGroupType.Email:
      return IconName.Email
    case InterventionGroupType.Erp:
      return IconName.Database
    case InterventionGroupType.File:
      return IconName.File
    case InterventionGroupType.Notes:
      return IconName.Notes
    case InterventionGroupType.Event:
      return IconName.Bell
    case InterventionGroupType.Spreadsheet:
      return IconName.TableCalculation
  }
}

export const interventionTypeToGroupType = (type: InterventionType): InterventionGroupType => {
  switch (type) {
    case InterventionType.FileOpening:
    case InterventionType.SpreadsheetCellContent:
    case InterventionType.TextDocumentContent:
      return InterventionGroupType.File
    case InterventionType.EmailOpening:
      return InterventionGroupType.Email
    case InterventionType.NotesContent:
      return InterventionGroupType.Notes
    case InterventionType.RuntimeSurveyAnswerSelection:
      return InterventionGroupType.Event
    case InterventionType.ErpRowOpening:
      return InterventionGroupType.Erp
  }
}

export const interventionTypesForHeaderGroupType = (
  headerGroupType?: InterventionHeaderGroupType
): InterventionType[] => {
  switch (headerGroupType) {
    case InterventionHeaderGroupType.File:
      return [
        InterventionType.FileOpening,
        InterventionType.SpreadsheetCellContent,
        InterventionType.TextDocumentContent
      ]
    case InterventionHeaderGroupType.Email:
      return [InterventionType.EmailOpening]
    case InterventionHeaderGroupType.Notes:
      return [InterventionType.NotesContent]
    case InterventionHeaderGroupType.Event:
      return [InterventionType.RuntimeSurveyAnswerSelection]
    case InterventionHeaderGroupType.Erp:
      return [InterventionType.ErpRowOpening]
    default:
      return []
  }
}

export const getGroupEntityBaseFromIntervention = (
  intervention: Intervention,
  scenarioQuestionnaires: ScenarioQuestionnaire[]
): BaseTypeGroupEntity => {
  switch (intervention.__typename) {
    case "FileOpeningIntervention":
      return {id: intervention.fileId, title: intervention.file.name}
    case "SpreadsheetCellContentIntervention":
      return {id: intervention.fileId, title: intervention.file.name}
    case "EmailOpeningIntervention":
      return {id: intervention.emailId, title: intervention.email.sender ?? intervention.email.subject}
    case "NotesContentIntervention":
      return {id: NOTES_CONTENT_INTERVENTION_REPLACEMENT_GROUP_ID, title: intervention.title}
    case "TextDocumentContentIntervention":
      return {id: intervention.file.id, title: intervention.file.name}
    case "RuntimeSurveyAnswerSelectionIntervention": {
      const questionnaireForIntervention = scenarioQuestionnaires.find(scenarioQuestionnaire =>
        scenarioQuestionnaire.questionnaire.questions.some(question => question.id === intervention.answer.questionId)
      )

      return {
        id: questionnaireForIntervention?.questionnaireId ?? "",
        title: questionnaireForIntervention?.questionnaire.title ?? ""
      }
    }
    case "ErpRowOpeningIntervention":
      return {id: intervention.erpTableType, title: intervention.interventionEmail.sender ?? ""}
  }
}

export const getInterventionsForTypeName = (
  interventions: Intervention[],
  type:
    | "FileOpeningIntervention"
    | "EmailOpeningIntervention"
    | "RuntimeSurveyAnswerSelectionIntervention"
    | "NotesContentIntervention"
    | "ErpRowOpeningIntervention"
    | "SpreadsheetCellContentIntervention"
    | "TextDocumentContentIntervention"
) => {
  switch (type) {
    case "FileOpeningIntervention":
      return interventions.filter(intervention => intervention.__typename === type) as FileOpeningIntervention[]
    case "EmailOpeningIntervention":
      return interventions.filter(intervention => intervention.__typename === type) as EmailOpeningIntervention[]
    case "NotesContentIntervention":
      return interventions.filter(intervention => intervention.__typename === type) as NotesContentIntervention[]
    case "TextDocumentContentIntervention":
      return interventions.filter(intervention => intervention.__typename === type) as TextDocumentContentIntervention[]
    case "RuntimeSurveyAnswerSelectionIntervention":
      return interventions.filter(
        intervention => intervention.__typename === type
      ) as RuntimeSurveyAnswerSelectionIntervention[]
    case "ErpRowOpeningIntervention":
      return interventions.filter(intervention => intervention.__typename === type) as ErpRowOpeningIntervention[]
    case "SpreadsheetCellContentIntervention":
      return interventions.filter(
        intervention => intervention.__typename === type
      ) as SpreadsheetCellContentIntervention[]
    case undefined:
      return interventions
  }
}
export const getInterventionsForHeaderGroupType = (
  interventions: Intervention[],
  headerGroupType: InterventionHeaderGroupType
) =>
  interventions.filter(intervention =>
    headerGroupType !== InterventionHeaderGroupType.AllGroups
      ? interventionTypesForHeaderGroupType(headerGroupType).includes(intervention.interventionType)
      : true
  )

export const interventionGroupTypeToLanguageKey = (type: InterventionGroupType): LucaI18nLangKey => {
  switch (type) {
    case InterventionGroupType.File:
      return "file"
    case InterventionGroupType.Email:
      return "email"
    case InterventionGroupType.Notes:
      return "interventions__detail_view_table_of_contents_title_notes"
    case InterventionGroupType.Event:
      return "questionnaires__detail_header_event"
    case InterventionGroupType.Erp:
      return "interventions__detail_view_table_of_contents_title_erp_short"
    default:
      return "file"
  }
}

export const groupTypeToToolLabelKey = (groupType: InterventionGroupType): LucaI18nLangKey => {
  switch (groupType) {
    case InterventionGroupType.Spreadsheet:
      return "viewer_tools__calc_type_label"
    case InterventionGroupType.File:
      return "file"
    case InterventionGroupType.Email:
      return "email_short"
    case InterventionGroupType.Event:
      return "questionnaires__detail_header_event"
    case InterventionGroupType.Erp:
      return "interventions__group_type_erp_table"
    default:
      return "file"
  }
}
