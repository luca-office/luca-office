import {IconName} from "../enums"
import {AutomatedCodingItemRule, FeatureType, OfficeTool} from "../graphql/generated/globalTypes"
import {
  AutomatedCodingCriterion,
  AutomatedCodingItem,
  CodingItem,
  DocumentViewScenarioCodingAutomatedCriterion,
  ToolUsageScenarioCodingAutomatedCriterion
} from "../models"
import {LucaI18nLangKey, LucaTFunction} from "../translations"
import {first} from "./array"

export const isAutomatedCodingItem = (item: CodingItem): item is AutomatedCodingItem =>
  item.__typename === "AutomatedCodingItem"

export const criterionsForAutomatedCodingItem = (criterions: AutomatedCodingCriterion[], item: AutomatedCodingItem) => {
  switch (item.rule) {
    case AutomatedCodingItemRule.DocumentView:
      return criterions.filter(criterion => criterion.__typename === "DocumentViewScenarioCodingAutomatedCriterion")
    case AutomatedCodingItemRule.InputValue:
      return criterions.filter(criterion => criterion.__typename === "InputValueScenarioCodingAutomatedCriterion")
    case AutomatedCodingItemRule.ToolUsage:
      return criterions.filter(criterion => criterion.__typename === "ToolUsageScenarioCodingAutomatedCriterion")
    case AutomatedCodingItemRule.FeatureUsage:
      return criterions.filter(criterion => criterion.__typename === "FeatureUsageScenarioCodingAutomatedCriterion")
    case AutomatedCodingItemRule.RScript:
      return criterions.filter(criterion => criterion.__typename === "RScriptScenarioCodingAutomatedCriterion")
    default:
      return []
  }
}

export const iconForOfficeTool = (officeTool: OfficeTool): IconName => {
  switch (officeTool) {
    case OfficeTool.Calculator:
      return IconName.Calculator
    case OfficeTool.EmailClient:
      return IconName.Email
    case OfficeTool.Erp:
      return IconName.Database
    case OfficeTool.FileBrowser:
      return IconName.File
    case OfficeTool.Notes:
      return IconName.Notes
    case OfficeTool.SpreadsheetEditor:
      return IconName.TableCalculation
    case OfficeTool.ReferenceBookViewer:
      return IconName.Book
    case OfficeTool.ImageViewer:
      return IconName.ImageViewer
    case OfficeTool.PdfViewer:
      return IconName.PDF
    case OfficeTool.VideoPlayer:
      return IconName.Film
    case OfficeTool.TextEditor:
      return IconName.TextEditor
    case OfficeTool.Chat:
      return IconName.SpeechBubble
    default:
      return IconName.File
  }
}
export const labelKeyForOfficeTool = (officeTool: OfficeTool): LucaI18nLangKey => {
  switch (officeTool) {
    case OfficeTool.Calculator:
      return "calculator__label"
    case OfficeTool.EmailClient:
      return "email__title"
    case OfficeTool.Erp:
      return "erp__title_full"
    case OfficeTool.FileBrowser:
      return "files_and_directories__title"
    case OfficeTool.Notes:
      return "notes__label"
    case OfficeTool.SpreadsheetEditor:
      return "viewer_tools__calc_type_label"
    case OfficeTool.ReferenceBookViewer:
      return "reference_book__title"
    case OfficeTool.ImageViewer:
      return "viewer_tools__image_type_label"
    case OfficeTool.PdfViewer:
      return "viewer_tools__pdf_type_label"
    case OfficeTool.VideoPlayer:
      return "viewer_tools__video_type_label"
    case OfficeTool.TextEditor:
      return "viewer_tools__text_type_label"
    case OfficeTool.Chat:
      return "chat__title"
    default:
      return "viewer_tools__general_type_label"
  }
}

interface FeatureTypeInfo {
  readonly featureType: FeatureType
  readonly languageKey: LucaI18nLangKey
}

export const featureUsageMap = new Map<OfficeTool, FeatureTypeInfo[]>([
  [
    OfficeTool.EmailClient,
    [
      {
        featureType: FeatureType.AnswerEmail,
        languageKey: "coding_models__automated_item_feature_usage_feature_type_answer_mail"
      },
      {
        featureType: FeatureType.Search,
        languageKey: "coding_models__automated_item_feature_usage_feature_type_search_mails"
      }
    ]
  ],
  [
    OfficeTool.Erp,
    [
      {
        featureType: FeatureType.Search,
        languageKey: "coding_models__automated_item_feature_usage_feature_type_search_erp"
      },
      {
        featureType: FeatureType.CopyToClipboard,
        languageKey: "coding_models__automated_item_feature_usage_feature_type_copy"
      },
      {
        featureType: FeatureType.PasteFromClipboard,
        languageKey: "coding_models__automated_item_feature_usage_feature_type_paste"
      }
    ]
  ],
  [
    OfficeTool.ReferenceBookViewer,
    [
      {
        featureType: FeatureType.Search,
        languageKey: "coding_models__automated_item_feature_usage_feature_type_search_reference_books"
      }
    ]
  ],
  [
    OfficeTool.Notes,
    [
      {
        featureType: FeatureType.CopyToClipboard,
        languageKey: "coding_models__automated_item_feature_usage_feature_type_copy"
      },
      {
        featureType: FeatureType.PasteFromClipboard,
        languageKey: "coding_models__automated_item_feature_usage_feature_type_paste"
      }
    ]
  ],
  [
    OfficeTool.SpreadsheetEditor,
    [
      {
        featureType: FeatureType.CopyToClipboard,
        languageKey: "coding_models__automated_item_feature_usage_feature_type_copy"
      },
      {
        featureType: FeatureType.PasteFromClipboard,
        languageKey: "coding_models__automated_item_feature_usage_feature_type_paste"
      },
      {
        featureType: FeatureType.FormulaUsage,
        languageKey: "coding_models__automated_item_feature_usage_feature_type_formula_usage"
      }
    ]
  ]
])

export const labelKeyForFeatureType = (featureType: FeatureType, officeTool: OfficeTool) =>
  featureUsageMap.get(officeTool)?.find(info => info.featureType === featureType)?.languageKey ??
  "coding_models__automated_item_feature_usage_feature_type_combination_error"

export const labelKeyForInputValue = (officeTool: OfficeTool): LucaI18nLangKey => {
  switch (officeTool) {
    case OfficeTool.EmailClient:
      return "coding_models__automated_item_input_value_position_mail"
    case OfficeTool.FileBrowser:
      return "files_and_directories__title"
    case OfficeTool.Notes:
      return "notes__label"
    case OfficeTool.SpreadsheetEditor:
      return "viewer_tools__calc_type_label"
    case OfficeTool.TextEditor:
      return "viewer_tools__text_type_label"
    default:
      return "coding_models__automated_item_input_value_position_mail"
  }
}

export const iconForInputValue = (officeTool: OfficeTool): IconName => {
  switch (officeTool) {
    case OfficeTool.EmailClient:
      return IconName.EmailOutgoing
    case OfficeTool.Notes:
      return IconName.Notes
    case OfficeTool.SpreadsheetEditor:
      return IconName.TableCalculation
    case OfficeTool.ReferenceBookViewer:
      return IconName.Book
    case OfficeTool.TextEditor:
      return IconName.TextEditor
    default:
      return IconName.Notes
  }
}

export const getNextNotUsedOfficeToolForToolUsage = (
  codingCriteria: AutomatedCodingCriterion[],
  codingItemId: UUID
) => {
  const officeToolsWithCodingCriterion = codingCriteria
    .filter(
      criterion =>
        criterion.__typename === "ToolUsageScenarioCodingAutomatedCriterion" && criterion.itemId === codingItemId
    )
    .map(criterion => (criterion as ToolUsageScenarioCodingAutomatedCriterion).officeTool)

  return first(Object.values(OfficeTool).filter(tool => !officeToolsWithCodingCriterion.includes(tool)))
}

export const iconForDocumentViewCodingCriterion = (
  criterion: DocumentViewScenarioCodingAutomatedCriterion
): IconName => {
  if (criterion.emailId) {
    return IconName.Email
  } else if (criterion.erpRowId) {
    return IconName.Database
  } else if (criterion.fileId) {
    return IconName.File
  } else if (criterion.referenceBookArticleId) {
    return IconName.Book
  } else {
    return IconName.TableCalculation
  }
}

export const labelDocumentViewCodingCriterionActionField = (
  criterion: DocumentViewScenarioCodingAutomatedCriterion,
  t: LucaTFunction
): string => {
  if (criterion.emailId) {
    return t("coding_models__automated_item_document_view_email_action_field")
  } else if (criterion.erpRowId) {
    return t("coding_models__automated_item_document_view_dataset_action_field")
  } else if (criterion.fileId) {
    return t("coding_models__automated_item_document_view_file_action_field")
  } else if (criterion.referenceBookArticleId) {
    return t("coding_models__automated_item_document_view_article_action_field")
  } else {
    return t("coding_models__automated_item_document_view_file_action_field")
  }
}

export const defaultOfficeToolDocumentViewCodingCriterion = (
  criterion: DocumentViewScenarioCodingAutomatedCriterion
): OfficeTool => {
  if (criterion.emailId) {
    return OfficeTool.EmailClient
  } else if (criterion.erpRowId) {
    return OfficeTool.Erp
  } else if (criterion.fileId) {
    return OfficeTool.FileBrowser
  } else if (criterion.referenceBookArticleId) {
    return OfficeTool.ReferenceBookViewer
  } else {
    return OfficeTool.FileBrowser
  }
}
