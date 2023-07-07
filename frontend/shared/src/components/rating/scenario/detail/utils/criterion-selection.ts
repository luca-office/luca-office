import {isEqual} from "lodash-es"
import {AutomatedCodingCriterion, CodingCriterion, ScenarioCodingItemRating} from "../../../../../models"
import {exists, find, isAutomatedCodingCriterion, Option, sort} from "../../../../../utils"
import {ScenarioCriterionSelection} from "../../../models"

export const haveManualCriterionSelectionsChanged = (
  scenarioCodingItemRating: Option<ScenarioCodingItemRating>,
  criterionSelections: ScenarioCriterionSelection[]
): boolean =>
  scenarioCodingItemRating
    .map(
      rating =>
        !isEqual(
          sort(
            id => id ?? -1,
            rating.criterionSelections.map(selection => selection.manualCriterionId)
          ),
          sort(
            id => id ?? -1,
            criterionSelections.map(selection => selection.manualCriterionId)
          )
        )
    )
    .getOrElse(criterionSelections.length > 0)

export const haveAutomatedCriterionSelectionsChanged = (
  scenarioCodingItemRating: Option<ScenarioCodingItemRating>,
  criterionSelections: ScenarioCriterionSelection[]
): boolean =>
  scenarioCodingItemRating
    .map(
      rating =>
        !isEqual(
          sort(
            id => id ?? -1,
            rating.criterionSelections.map(selection => selection.automatedCriterionId)
          ),
          sort(
            id => id ?? -1,
            criterionSelections.map(selection => selection.automatedCriterionId)
          )
        )
    )
    .getOrElse(criterionSelections.length > 0)

export const getManualCriterionSelection = (
  criterionSelections: ScenarioCriterionSelection[],
  codingCriterion: CodingCriterion
): Option<ScenarioCriterionSelection> =>
  find(criterionSelection => criterionSelection.manualCriterionId === codingCriterion.id, criterionSelections)

export const getAutomatedCriterionSelection = (
  criterionSelections: ScenarioCriterionSelection[],
  codingCriterion: AutomatedCodingCriterion
): Option<ScenarioCriterionSelection> =>
  find(criterionSelection => criterionSelection.automatedCriterionId === codingCriterion.id, criterionSelections)

export const getCriterionSelections = (
  scenarioCodingItemRating: ScenarioCodingItemRating,
  codingCriteria: Array<AutomatedCodingCriterion | CodingCriterion>
): ScenarioCriterionSelection[] =>
  scenarioCodingItemRating.criterionSelections.filter(criterionSelection =>
    exists(
      codingCriterion =>
        isAutomatedCodingCriterion(codingCriterion)
          ? criterionSelection.automatedCriterionId === codingCriterion.id
          : criterionSelection.manualCriterionId === codingCriterion.id,
      codingCriteria
    )
  )
