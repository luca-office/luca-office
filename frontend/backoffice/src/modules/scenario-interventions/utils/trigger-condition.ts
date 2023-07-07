import {InterventionType} from "shared/graphql/generated/globalTypes"
import {LucaI18nLangKey} from "shared/translations"

export const interventionTypeToLanguageKey = (type: InterventionType, isNegated?: boolean): LucaI18nLangKey => {
  switch (type) {
    case InterventionType.FileOpening:
      return "interventions__interventions_check_file"
    case InterventionType.EmailOpening:
      return "interventions__interventions_check_mail"
    case InterventionType.NotesContent:
      return "interventions__interventions_check_notes_value"
    case InterventionType.TextDocumentContent:
      return "interventions__interventions_check_text_document_value"
    case InterventionType.RuntimeSurveyAnswerSelection:
      return isNegated
        ? "interventions__interventions_check_answer_runtime_survey_negated"
        : "interventions__interventions_check_answer_runtime_survey"
    case InterventionType.ErpRowOpening:
      return "interventions__interventions_check_erp"
    case InterventionType.SpreadsheetCellContent:
      return isNegated
        ? "interventions__interventions_check_spreadsheet_negated"
        : "interventions__interventions_check_spreadsheet"
  }
}
export const interventionTypeToDescriptionLanguageKey = (type: InterventionType): LucaI18nLangKey => {
  switch (type) {
    case InterventionType.FileOpening:
      return "interventions__interventions_check_file_description"
    case InterventionType.EmailOpening:
      return "interventions__interventions_check_mail_description"
    case InterventionType.NotesContent:
      return "interventions__interventions_check_notes_value_description"
    case InterventionType.TextDocumentContent:
      return "interventions__interventions_check_text_document_value_description"
    case InterventionType.RuntimeSurveyAnswerSelection:
      return "interventions__interventions_check_answer_runtime_survey_description"
    case InterventionType.ErpRowOpening:
      return "interventions__interventions_check_erp_row_description"
    case InterventionType.SpreadsheetCellContent:
      return "interventions__interventions_check_spreadsheet_cell_content_description"
  }
}
