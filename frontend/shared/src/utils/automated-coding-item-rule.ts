import {AutomatedCodingItemRule} from "../graphql/generated/globalTypes"
import {LucaI18nLangKey} from "../translations"

// eslint-disable-next-line consistent-return
export const languageKeyForAutomatedRule = (rule: AutomatedCodingItemRule): LucaI18nLangKey => {
  switch (rule) {
    case AutomatedCodingItemRule.DocumentView:
      return "coding_models__create_item_label_rating_type_automated_document_view"
    case AutomatedCodingItemRule.FeatureUsage:
      return "coding_models__create_item_label_rating_type_automated_feature_usage"
    case AutomatedCodingItemRule.InputValue:
      return "coding_models__create_item_label_rating_type_automated_input_value"
    case AutomatedCodingItemRule.RScript:
      return "coding_models__create_item_label_rating_type_automated_r_script"
    case AutomatedCodingItemRule.ToolUsage:
      return "coding_models__create_item_label_rating_type_automated_tool_usage"
  }
}
// eslint-disable-next-line consistent-return
export const languageKeyForAutomatedRuleDescription = (rule: AutomatedCodingItemRule): LucaI18nLangKey => {
  switch (rule) {
    case AutomatedCodingItemRule.DocumentView:
      return "coding_models__create_item_label_rating_type_automated_document_view_hint"
    case AutomatedCodingItemRule.FeatureUsage:
      return "coding_models__create_item_label_rating_type_automated_feature_usage_hint"
    case AutomatedCodingItemRule.InputValue:
      return "coding_models__create_item_label_rating_type_automated_input_value_hint"
    case AutomatedCodingItemRule.RScript:
      return "coding_models__create_item_label_rating_type_automated_r_script_hint"
    case AutomatedCodingItemRule.ToolUsage:
      return "coding_models__create_item_label_rating_type_automated_tool_usage_hint"
  }
}
