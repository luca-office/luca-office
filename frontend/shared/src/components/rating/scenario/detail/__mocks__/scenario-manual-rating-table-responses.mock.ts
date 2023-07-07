import {omit} from "lodash-es"
import {scenarioManualCodingItemRatingsMock} from "../../../../../graphql/__mocks__"
import {
  ScenarioCodingItemRatingCreation,
  ScenarioRatingCriterionSelectionCreation
} from "../../../../../graphql/generated/globalTypes"
import {
  createScenarioCodingItemRatingMutation,
  createScenarioRatingCriterionSelectionMutation,
  deleteScenarioRatingCriterionSelectionMutation,
  updateScenarioCodingItemRatingMutation
} from "../../../../../graphql/mutations"
import {ScenarioCodingItemRating, ScenarioRatingCriterionSelection} from "../../../../../models"
import {MockedResponse} from "@apollo/client/testing"

export const scenarioManualRatingTableResponsesMock: MockedResponse[] = [
  {
    request: {
      query: createScenarioCodingItemRatingMutation,
      variables: {
        creation: omit<
          ScenarioCodingItemRating,
          keyof Omit<ScenarioCodingItemRating, keyof ScenarioCodingItemRatingCreation>
        >(scenarioManualCodingItemRatingsMock[0], [
          "__typename",
          "id",
          "createdAt",
          "modifiedAt",
          "criterionSelections"
        ])
      }
    },
    result: {
      data: {
        createScenarioRating: scenarioManualCodingItemRatingsMock[0]
      }
    }
  },
  {
    request: {
      query: updateScenarioCodingItemRatingMutation,
      variables: {
        id: scenarioManualCodingItemRatingsMock[0].id,
        update: {noCriterionFulfilled: scenarioManualCodingItemRatingsMock[0].noCriterionFulfilled}
      }
    },
    result: {
      data: {
        updateScenarioCodingItemRating: scenarioManualCodingItemRatingsMock[0]
      }
    }
  },
  {
    request: {
      query: createScenarioRatingCriterionSelectionMutation,
      variables: {
        creation: omit<
          ScenarioRatingCriterionSelection,
          keyof Omit<ScenarioRatingCriterionSelection, keyof ScenarioRatingCriterionSelectionCreation>
        >(scenarioManualCodingItemRatingsMock[0].criterionSelections[0], ["__typename", "createdAt"])
      }
    },
    result: {
      data: {
        createScenarioRatingCriterionSelection: scenarioManualCodingItemRatingsMock[0].criterionSelections[0]
      }
    }
  },
  {
    request: {
      query: deleteScenarioRatingCriterionSelectionMutation,
      variables: {
        scenarioRatingId: scenarioManualCodingItemRatingsMock[0].id,
        manualCriterionId: scenarioManualCodingItemRatingsMock[0].criterionSelections[0].manualCriterionId
      }
    },
    result: {
      data: {
        deleteScenarioRatingCriterionSelection: scenarioManualCodingItemRatingsMock[0].criterionSelections[0]
      }
    }
  }
]
