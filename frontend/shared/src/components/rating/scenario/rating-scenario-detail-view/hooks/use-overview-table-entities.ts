import {flatten} from "lodash-es"
import {
  AutomatedCodingCriterion,
  CodingCriterion,
  CodingDimension,
  CodingItem,
  ScenarioCodingItemRating,
  ScenarioRatingCriterionSelection
} from "../../../../../models"
import {exists, isAutomatedCodingCriterion} from "../../../../../utils"
import {useCodingCriteriaByItemsList} from "../../../hooks"
import {TableEntity} from "../../../models"
import {
  getAverageScoreForAllParticipants,
  getCodingItemsFromCodingDimensions,
  getMaxScoreOfAllCodingItems,
  getScoreOfCodingCriteria,
  getSelectedCodingCriteria,
  getSubDimensions,
  wasCodingCriterionRated
} from "../../../utils"

export interface UseOverviewTableEntitiesHook {
  readonly convertCodingDimensions: (
    scenarioCodingItemRatings: ScenarioCodingItemRating[],
    criterionSelections: ScenarioRatingCriterionSelection[],
    codingDimensions: CodingDimension[],
    allSelectedCodingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
  ) => Promise<TableEntity[]>
  readonly convertCodingItems: (
    scenarioCodingItemRatings: ScenarioCodingItemRating[],
    criterionSelections: ScenarioRatingCriterionSelection[],
    codingItems: CodingItem[],
    allSelectedCodingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
  ) => Promise<TableEntity[]>
}

export const useOverviewTableEntities = (allCodingDimensions: CodingDimension[]): UseOverviewTableEntitiesHook => {
  const {getCodingCriteria} = useCodingCriteriaByItemsList()

  const isNoCriterionFulfilled = (scenarioCodingItemRatings: ScenarioCodingItemRating[], codingItem: CodingItem) =>
    exists(
      scenarioCodingItemRating =>
        scenarioCodingItemRating.codingItemId === codingItem.id && scenarioCodingItemRating.noCriterionFulfilled,
      scenarioCodingItemRatings
    )

  const convertCodingDimensions = (
    scenarioCodingItemRatings: ScenarioCodingItemRating[],
    criterionSelections: ScenarioRatingCriterionSelection[],
    codingDimensions: CodingDimension[],
    allSelectedCodingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
  ): Promise<TableEntity[]> =>
    Promise.all(
      codingDimensions.map(
        codingDimension =>
          new Promise<TableEntity>((resolve, reject) => {
            const subDimensions = getSubDimensions(codingDimension, allCodingDimensions)
            const items = getCodingItemsFromCodingDimensions([codingDimension, ...subDimensions])

            getCodingCriteria({
              items,
              onSuccess: codingCriteria => {
                const selectedCodingCriteria = getSelectedCodingCriteria(codingCriteria, criterionSelections)
                resolve({
                  position: codingDimension.position,
                  id: codingDimension.id,
                  title: codingDimension.title,
                  score: getScoreOfCodingCriteria(selectedCodingCriteria),
                  maxScore: getMaxScoreOfAllCodingItems(items),
                  averageScore: getAverageScoreForAllParticipants({
                    allSelectedCodingCriteria,
                    codingItems: items,
                    scenarioCodingItemRatings
                  }),
                  rated:
                    items.length === 0 ||
                    exists(item => isNoCriterionFulfilled(scenarioCodingItemRatings, item), items) ||
                    exists(
                      codingCriterion =>
                        wasCodingCriterionRated(
                          isAutomatedCodingCriterion(codingCriterion),
                          codingCriterion.id,
                          criterionSelections
                        ),
                      codingCriteria
                    ),
                  isEmptyDimension: items.length === 0
                })
              },
              onError: reject
            })
          })
      )
    ).then(flatten)

  const convertCodingItems = (
    scenarioCodingItemRatings: ScenarioCodingItemRating[],
    criterionSelections: ScenarioRatingCriterionSelection[],
    codingItems: CodingItem[],
    allSelectedCodingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
  ): Promise<TableEntity[]> =>
    Promise.all(
      codingItems.map(
        codingItem =>
          new Promise<TableEntity>((resolve, reject) => {
            getCodingCriteria({
              items: [codingItem],
              onSuccess: codingCriteria => {
                const selectedCodingCriteria = getSelectedCodingCriteria(codingCriteria, criterionSelections)
                resolve({
                  position: codingItem.position,
                  id: codingItem.id,
                  title: codingItem.title,
                  score: getScoreOfCodingCriteria(selectedCodingCriteria),
                  maxScore: codingItem.maximumScore,
                  averageScore: getAverageScoreForAllParticipants({
                    allSelectedCodingCriteria,
                    codingItems: [codingItem],
                    scenarioCodingItemRatings
                  }),
                  rated:
                    exists(codingItem => isNoCriterionFulfilled(scenarioCodingItemRatings, codingItem), codingItems) ||
                    exists(
                      codingCriterion =>
                        wasCodingCriterionRated(
                          isAutomatedCodingCriterion(codingCriterion),
                          codingCriterion.id,
                          criterionSelections
                        ),
                      codingCriteria
                    )
                })
              },
              onError: reject
            })
          })
      )
    ).then(flatten)

  return {convertCodingDimensions, convertCodingItems}
}
