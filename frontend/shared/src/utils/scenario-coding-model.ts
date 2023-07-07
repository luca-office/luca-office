import {hasCodingItemBeenRated} from "../components/rating/utils"
import {NodeType} from "../enums"
import {
  AutomatedCodingCriterion,
  AutomatedCodingItem,
  CodingCriterion,
  CodingDimension,
  CodingItem,
  CodingNode,
  Rating,
  ScenarioCodingItemRating,
  ScenarioRatingCriterionSelection
} from "../models"
import {find, isEmpty} from "./array"
import {isAutomatedCodingItem} from "./automated-coding-item"
import {isDefined} from "./common"
import {Option} from "./option"
import {sortByPosition} from "./sort"

interface BuildCodingModelTreeParams {
  readonly parentDimension: CodingDimension
  readonly allDimensions: CodingDimension[]
  readonly mainDimensionIndex: number
  readonly allCodingCriteria?: Array<CodingCriterion | AutomatedCodingCriterion>
  readonly criterionSelections?: ScenarioRatingCriterionSelection[]
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly ratings: Rating[]
}

export const buildCodingModelTree = ({
  parentDimension,
  allDimensions,
  mainDimensionIndex,
  allCodingCriteria,
  criterionSelections,
  scenarioCodingItemRatings,
  ratings
}: BuildCodingModelTreeParams): CodingNode => {
  const subDimensions: CodingNode[] = allDimensions
    .filter(dimension => dimension.parentDimensionId === parentDimension.id)
    .map((dimension: CodingDimension, subDimensionIndex) => ({
      id: dimension.id,
      parentId: dimension.parentDimensionId,
      name: `${createNumbering(mainDimensionIndex, subDimensionIndex)} ${dimension.title}`,
      type: NodeType.CodingModelSubDimension,
      children: sortByPosition(dimension.items).map(
        itemToNode({
          mainDimensionIndex,
          subDimensionIndex,
          allCodingCriteria,
          criterionSelections,
          scenarioCodingItemRatings,
          ratings
        })
      )
    }))

  const tree: CodingNode = {
    id: parentDimension.id,
    parentId: null,
    name: `${createNumbering(mainDimensionIndex)} ${parentDimension.title}`,
    type: NodeType.CodingModelMainDimension,
    children: isEmpty(parentDimension.items)
      ? subDimensions
      : sortByPosition(parentDimension.items).map(
          itemToNode({mainDimensionIndex, allCodingCriteria, criterionSelections, scenarioCodingItemRatings, ratings})
        )
  }

  return tree
}

interface ItemToNodeParams {
  readonly mainDimensionIndex: number
  readonly subDimensionIndex?: number
  readonly allCodingCriteria?: Array<CodingCriterion | AutomatedCodingCriterion>
  readonly criterionSelections?: ScenarioRatingCriterionSelection[]
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly ratings: Rating[]
}

const itemToNode = ({
  mainDimensionIndex,
  subDimensionIndex,
  allCodingCriteria,
  criterionSelections,
  scenarioCodingItemRatings,
  ratings
}: ItemToNodeParams) => (item: CodingItem, index: number): CodingNode => {
  const codingCriteria = allCodingCriteria?.filter(criterion => criterion.itemId === item.id) ?? []

  const isRated = hasCodingItemBeenRated({
    codingCriteria,
    codingItem: item,
    criterionSelections: criterionSelections ?? [],
    scenarioCodingItemRatings
  })
  const isAutomatedItem = isAutomatedCodingItem(item)
  return {
    id: item.id,
    name: `${createNumbering(mainDimensionIndex, subDimensionIndex, index)} ${item.title}`,
    type: isAutomatedItem ? NodeType.CodingModelAutomatedItem : NodeType.CodingModelManualItem,
    parentId: item.dimensionId,
    canBeEvaluatedAutomatically: isAutomatedItem,
    isRated: isRated,
    automatedCodingItemRule: isAutomatedItem ? (item as AutomatedCodingItem).rule : undefined
  }
}

const createNumbering = (mainDimensionIndex: number, subDimensionIndex?: number, itemIndex?: number) =>
  [mainDimensionIndex, subDimensionIndex, itemIndex]
    .filter(index => isDefined(index))
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map(definedIndex => definedIndex! + 1)
    .join(".")

export const getExpandedNodeIdsFromCodingDimensions = (
  codingDimensionId: Option<UUID>,
  codingDimensions: CodingDimension[]
) => {
  const codingDimension = codingDimensionId.flatMap(dimensionId =>
    find(dimension => dimension.id === dimensionId, codingDimensions)
  )
  return codingDimension
    .map(dimension =>
      !isDefined(dimension.parentDimensionId) ? [dimension.id] : [dimension.parentDimensionId ?? "", dimension.id]
    )
    .getOrElse([])
}
