import {omit} from "lodash-es"
import {
  automatedCodingCriterionEvaluationResultMock,
  automatedCodingItemMock,
  scenarioAutomatedCodingItemRatingsMock,
  scenariosMock
} from "../../../../../graphql/__mocks__"
import {ScenarioRatingCriterionSelectionCreation} from "../../../../../graphql/generated/globalTypes"
import {
  createScenarioRatingCriterionSelectionMutation,
  deleteScenarioRatingCriterionSelectionMutation,
  updateScenarioCodingItemRatingMutation
} from "../../../../../graphql/mutations"
import {evaluationResultsForAutomatedCodingItemQuery} from "../../../../../graphql/queries"
import {ScenarioRatingCriterionSelection} from "../../../../../models"
import {MockedResponse} from "@apollo/client/testing"

const scenario = scenariosMock[0]
const scenarioRating = {...scenarioAutomatedCodingItemRatingsMock[0], scenarioId: scenario.id}

export const scenarioAutomaticRatingTableResponsesMock: MockedResponse[] = [
  {
    request: {
      query: createScenarioRatingCriterionSelectionMutation,
      variables: {
        creation: omit<
          ScenarioRatingCriterionSelection,
          keyof Omit<ScenarioRatingCriterionSelection, keyof ScenarioRatingCriterionSelectionCreation>
        >(scenarioRating.criterionSelections[0], ["__typename", "createdAt"])
      }
    },
    result: {
      data: {
        createScenarioRatingCriterionSelection: scenarioRating.criterionSelections[0]
      }
    }
  },
  {
    request: {
      query: deleteScenarioRatingCriterionSelectionMutation,
      variables: {
        scenarioRatingId: scenarioRating.id,
        automatedCriterionId: scenarioRating.criterionSelections[0].automatedCriterionId
      }
    },
    result: {
      data: {
        deleteScenarioRatingCriterionSelection: scenarioRating.criterionSelections[0]
      }
    }
  },
  {
    request: {
      query: evaluationResultsForAutomatedCodingItemQuery,
      variables: {
        id: automatedCodingItemMock.id,
        surveyInvitationId: scenarioRating.surveyInvitationId,
        scenarioId: scenarioRating.scenarioId
      }
    },
    result: {
      data: {
        evaluationResultsForAutomatedCodingItem: automatedCodingCriterionEvaluationResultMock
      }
    }
  },
  {
    request: {
      query: updateScenarioCodingItemRatingMutation,
      variables: {
        id: scenarioAutomatedCodingItemRatingsMock[0].id,
        update: {noCriterionFulfilled: scenarioAutomatedCodingItemRatingsMock[0].noCriterionFulfilled}
      }
    },
    result: {
      data: {
        updateScenarioCodingItemRating: scenarioAutomatedCodingItemRatingsMock[0]
      }
    }
  }
]
