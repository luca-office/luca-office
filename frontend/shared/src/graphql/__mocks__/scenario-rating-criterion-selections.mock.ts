import {ScenarioRatingCriterionSelection} from "../../models"
import {automatedCodingCriteriaMock, codingCriteriaMock} from "./coding-criteria.mock"

export const scenarioRatingManualCriterionSelectionsMock: ScenarioRatingCriterionSelection[] = [
  {
    __typename: "ScenarioRatingCriterionSelection",
    createdAt: new Date(2020, 10, 5).toISOString(),
    scenarioCodingItemRatingId: "5a04d90c-3743-4b8c-bac6-3139b7f1fb70",
    automatedCriterionId: null,
    manualCriterionId: codingCriteriaMock[0].id
  },
  {
    __typename: "ScenarioRatingCriterionSelection",
    createdAt: new Date(2020, 10, 5).toISOString(),
    scenarioCodingItemRatingId: "5c2f06ea-821d-4579-9f5d-27567863023f",
    automatedCriterionId: null,
    manualCriterionId: codingCriteriaMock[1].id
  },
  {
    __typename: "ScenarioRatingCriterionSelection",
    createdAt: new Date(2020, 10, 5).toISOString(),
    scenarioCodingItemRatingId: "cb3c9ae1-c2ac-4baa-ac7e-4f269415be2c",
    automatedCriterionId: null,
    manualCriterionId: codingCriteriaMock[2].id
  }
]

export const scenarioRatingAutomatedCriterionSelectionsMock = scenarioRatingManualCriterionSelectionsMock.map(
  (mock, index) => ({
    ...mock,
    automatedCriterionId: automatedCodingCriteriaMock[index].id,
    manualCriterionId: null
  })
)

export const scenarioRatingCriterionSelectionHolisticMock: ScenarioRatingCriterionSelection[] = [
  {
    __typename: "ScenarioRatingCriterionSelection",
    createdAt: new Date(2020, 10, 5).toISOString(),
    scenarioCodingItemRatingId: "5a04d90c-3743-4b8c-bac6-3139b7f1fb70",
    automatedCriterionId: null,
    manualCriterionId: codingCriteriaMock[0].id
  }
]
