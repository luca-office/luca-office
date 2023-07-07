import {ApolloClient} from "@apollo/client"
import {has, isObject} from "lodash-es"
import {AutomatedCodingCriterion, AutomatedCodingCriterionMetadata} from "../models"
import {LucaTFunction} from "../translations"
import {iconForOfficeTool, labelKeyForFeatureType, labelKeyForOfficeTool} from "./automated-coding-item"
import {getDocumentViewScenarioCodingAutomatedCriterionData} from "./document-view-scenario-coding-automated-criterion"
import {getInputValueScenarioCodingAutomatedCriterionData} from "./input-value-scenario-coding-automated-criterion"
import {getRScriptScenarioCodingAutomatedCriterionData} from "./r-script-scenario-coding-automated-criterion"

export const isAutomatedCodingCriterion = (value: unknown): value is AutomatedCodingCriterion => {
  if (!isObject(value) || !has(value, "__typename")) {
    return false
  }

  const val = value as {__typename: string}
  return (
    val.__typename === "ToolUsageScenarioCodingAutomatedCriterion" ||
    val.__typename === "InputValueScenarioCodingAutomatedCriterion" ||
    val.__typename === "DocumentViewScenarioCodingAutomatedCriterion" ||
    val.__typename === "FeatureUsageScenarioCodingAutomatedCriterion" ||
    val.__typename === "RScriptScenarioCodingAutomatedCriterion"
  )
}

export const getAutomatedCodingCriterionDescriptionData = (
  t: LucaTFunction,
  client: ApolloClient<unknown>,
  criterion: AutomatedCodingCriterion
): Promise<AutomatedCodingCriterionMetadata> => {
  switch (criterion.__typename) {
    case "DocumentViewScenarioCodingAutomatedCriterion":
      return getDocumentViewScenarioCodingAutomatedCriterionData(t, client, criterion).then(({name, icon}) => ({
        name:
          criterion.referenceBookArticleId !== null
            ? t("rating__document_reference_opened", {name})
            : t("rating__document_opened", {name}),
        icon
      }))
    case "FeatureUsageScenarioCodingAutomatedCriterion":
      return Promise.resolve({
        name: t("rating__feature_usage", {
          featureName: t(labelKeyForFeatureType(criterion.featureType, criterion.officeTool)),
          toolName: t(labelKeyForOfficeTool(criterion.officeTool))
        }),
        icon: iconForOfficeTool(criterion.officeTool)
      })
    case "ToolUsageScenarioCodingAutomatedCriterion":
      return Promise.resolve({
        name: t("rating__tool_usage", {toolName: t(labelKeyForOfficeTool(criterion.officeTool))}),
        icon: iconForOfficeTool(criterion.officeTool)
      })
    case "InputValueScenarioCodingAutomatedCriterion":
      return getInputValueScenarioCodingAutomatedCriterionData(t, client, criterion)
    case "RScriptScenarioCodingAutomatedCriterion":
      return getRScriptScenarioCodingAutomatedCriterionData(t, client, criterion)
    default:
      return Promise.reject("Criterion type is not yet supported!")
  }
}
