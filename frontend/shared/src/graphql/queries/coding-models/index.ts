import * as codingCriteria from "./coding-criteria.graphql"
import * as codingDimension from "./coding-dimension.graphql"
import * as codingDimensions from "./coding-dimensions.graphql"
import * as codingItem from "./coding-item.graphql"
import * as codingItems from "./coding-items.graphql"
import * as codingModel from "./coding-model.graphql"
import * as codingModels from "./coding-models.graphql"
import * as evaluationResultsForAutomatedCodingItem from "./evaluation-results-for-automated-coding-item.graphql"

export * from "./automated-coding-items"

export const codingCriteriaQuery = codingCriteria
export const codingDimensionQuery = codingDimension
export const codingDimensionsQuery = codingDimensions
export const codingItemQuery = codingItem
export const codingItemsQuery = codingItems
export const codingModelQuery = codingModel
export const codingModelsQuery = codingModels
export const evaluationResultsForAutomatedCodingItemQuery = evaluationResultsForAutomatedCodingItem
