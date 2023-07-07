import {meanBy, sumBy} from "lodash-es"
import {AutomatedCodingCriterion, CodingCriterion, ScenarioRatingCriterionSelection} from "../../../models"
import {exists, isAutomatedCodingCriterion} from "../../../utils"
import {ScenarioCriterionSelection} from "../models"

export const getScoreOfCodingCriteria = (codingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>): number =>
  sumBy(codingCriteria, codingCriterion => codingCriterion.score)

// make sure criterionSelections is not empty, otherwise meanBy would return NaN
export const getAverageScoreOfCodingCriteria = (
  criterionSelections: Array<CodingCriterion | AutomatedCodingCriterion>
): number =>
  criterionSelections.length > 0 ? meanBy(criterionSelections, codingCriterion => codingCriterion.score) : 0

export const wasCodingCriterionRated = (
  isAutomatedCodingCriterion: boolean,
  codingCriterionId: UUID,
  scenarioRatingCriterionSelections: ScenarioRatingCriterionSelection[]
) =>
  exists(
    scenarioRatingCriterionSelection =>
      isAutomatedCodingCriterion
        ? scenarioRatingCriterionSelection.automatedCriterionId === codingCriterionId
        : scenarioRatingCriterionSelection.manualCriterionId === codingCriterionId,
    scenarioRatingCriterionSelections
  )

export const getSelectedCodingCriteria = (
  codingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>,
  criterionSelections: Array<ScenarioCriterionSelection>
): Array<CodingCriterion | AutomatedCodingCriterion> =>
  codingCriteria.reduce<Array<CodingCriterion | AutomatedCodingCriterion>>(
    (accumulator, codingCriterion) =>
      exists(
        criterionSelection =>
          isAutomatedCodingCriterion(codingCriterion)
            ? criterionSelection.automatedCriterionId === codingCriterion.id
            : criterionSelection.manualCriterionId === codingCriterion.id,
        criterionSelections
      )
        ? [...accumulator, codingCriterion]
        : accumulator,
    []
  )
