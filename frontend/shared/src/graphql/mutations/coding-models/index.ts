import * as createAutomatedCodingItem from "./create-automated-coding-item.graphql"
import * as createCodingCriterion from "./create-coding-criterion.graphql"
import * as createCodingDimension from "./create-coding-dimension.graphql"
import * as createCodingModel from "./create-coding-model.graphql"
import * as createManualCodingItem from "./create-manual-coding-item.graphql"
import * as deleteCodingCriterion from "./delete-coding-criterion.graphql"
import * as deleteCodingDimension from "./delete-coding-dimension.graphql"
import * as deleteCodingItem from "./delete-coding-item.graphql"
import * as deleteCodingModel from "./delete-coding-model.graphql"
import * as duplicateCodingModel from "./duplicate-coding-model.graphql"
import * as repositionCodingDimension from "./reposition-coding-dimension.graphql"
import * as repositionCodingItem from "./reposition-coding-item.graphql"
import * as updateAutomatedCodingItem from "./update-automated-coding-item.graphql"
import * as updateCodingCriterion from "./update-coding-criterion.graphql"
import * as updateCodingDimension from "./update-coding-dimension.graphql"
import * as updateCodingModel from "./update-coding-model.graphql"
import * as updateManualCodingItem from "./update-manual-coding-item.graphql"

export const createCodingCriterionMutation = createCodingCriterion
export const createCodingDimensionMutation = createCodingDimension
export const createManualCodingItemMutation = createManualCodingItem
export const createAutomatedCodingItemMutation = createAutomatedCodingItem
export const createCodingModelMutation = createCodingModel
export const deleteCodingCriterionMutation = deleteCodingCriterion
export const deleteCodingDimensionMutation = deleteCodingDimension
export const deleteCodingItemMutation = deleteCodingItem
export const deleteCodingModelMutation = deleteCodingModel
export const duplicateCodingModelMutation = duplicateCodingModel
export const repositionCodingDimensionMutation = repositionCodingDimension
export const repositionCodingItemMutation = repositionCodingItem
export const updateCodingCriterionMutation = updateCodingCriterion
export const updateCodingDimensionMutation = updateCodingDimension
export const updateManualCodingItemMutation = updateManualCodingItem
export const updateAutomatedCodingItemMutation = updateAutomatedCodingItem
export const updateCodingModelMutation = updateCodingModel

export * from "./automated"
