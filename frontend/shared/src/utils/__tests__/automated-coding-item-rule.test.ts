import {AutomatedCodingItemRule} from "../../graphql/generated/globalTypes"
import {languageKeyForAutomatedRule, languageKeyForAutomatedRuleDescription} from "../automated-coding-item-rule"

describe("automated-coding-item-rule", () => {
  describe("languageKeyForAutomatedRule", () => {
    it("returns correct key for AutomatedCodingItemRule.DocumentView", () => {
      expect(languageKeyForAutomatedRule(AutomatedCodingItemRule.DocumentView)).toEqual(
        "coding_models__create_item_label_rating_type_automated_document_view"
      )
    })
    it("returns correct key for AutomatedCodingItemRule.FeatureUsage", () => {
      expect(languageKeyForAutomatedRule(AutomatedCodingItemRule.FeatureUsage)).toEqual(
        "coding_models__create_item_label_rating_type_automated_feature_usage"
      )
    })
    it("returns correct key for AutomatedCodingItemRule.InputValue", () => {
      expect(languageKeyForAutomatedRule(AutomatedCodingItemRule.InputValue)).toEqual(
        "coding_models__create_item_label_rating_type_automated_input_value"
      )
    })
    it("returns correct key for AutomatedCodingItemRule.RScript", () => {
      expect(languageKeyForAutomatedRule(AutomatedCodingItemRule.RScript)).toEqual(
        "coding_models__create_item_label_rating_type_automated_r_script"
      )
    })
    it("returns correct key for AutomatedCodingItemRule.ToolUsage", () => {
      expect(languageKeyForAutomatedRule(AutomatedCodingItemRule.ToolUsage)).toEqual(
        "coding_models__create_item_label_rating_type_automated_tool_usage"
      )
    })
  })
  describe("languageKeyForAutomatedRuleDescription", () => {
    it("returns correct key for AutomatedCodingItemRule.DocumentView", () => {
      expect(languageKeyForAutomatedRuleDescription(AutomatedCodingItemRule.DocumentView)).toEqual(
        "coding_models__create_item_label_rating_type_automated_document_view_hint"
      )
    })
    it("returns correct key for AutomatedCodingItemRule.FeatureUsage", () => {
      expect(languageKeyForAutomatedRuleDescription(AutomatedCodingItemRule.FeatureUsage)).toEqual(
        "coding_models__create_item_label_rating_type_automated_feature_usage_hint"
      )
    })
    it("returns correct key for AutomatedCodingItemRule.InputValue", () => {
      expect(languageKeyForAutomatedRuleDescription(AutomatedCodingItemRule.InputValue)).toEqual(
        "coding_models__create_item_label_rating_type_automated_input_value_hint"
      )
    })
    it("returns correct key for AutomatedCodingItemRule.RScript", () => {
      expect(languageKeyForAutomatedRuleDescription(AutomatedCodingItemRule.RScript)).toEqual(
        "coding_models__create_item_label_rating_type_automated_r_script_hint"
      )
    })
    it("returns correct key for AutomatedCodingItemRule.ToolUsage", () => {
      expect(languageKeyForAutomatedRuleDescription(AutomatedCodingItemRule.ToolUsage)).toEqual(
        "coding_models__create_item_label_rating_type_automated_tool_usage_hint"
      )
    })
  })
})
