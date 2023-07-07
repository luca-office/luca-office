import {ScenarioRatingCriterionSelection} from "../../../models"

export interface ScenarioCriterionSelection extends Omit<ScenarioRatingCriterionSelection, "__typename" | "createdAt"> {
  readonly createdAt?: string
}
