import {pick, sumBy} from "lodash-es"
import {
  codingCriteriaMock,
  codingDimensionsMock,
  scenarioManualCodingItemRatingsMock
} from "../../../../../graphql/__mocks__"
import {ScenarioCodingItemRatingCreation} from "../../../../../graphql/generated/globalTypes"
import {createScenarioCodingItemRatingMutation} from "../../../../../graphql/mutations"
import {
  codingCriteriaQuery,
  codingDimensionsQuery,
  scenarioCodingItemRatingsQuery
} from "../../../../../graphql/queries"
import {ScenarioCodingItemRating} from "../../../../../models"
import {MockedResponse} from "@apollo/client/testing"

export const ratingScenarioDetailViewResponsesMock: MockedResponse[] = [
  {
    request: {
      query: codingDimensionsQuery,
      variables: {modelId: codingDimensionsMock[0].codingModelId}
    },
    result: {
      data: {
        codingDimensions: codingDimensionsMock.map((mock, index) => ({
          ...mock,
          parentDimensionId: index !== 1 ? codingDimensionsMock[1].id : mock.parentDimensionId,
          items: mock.items.map((item, index) => ({
            ...item,
            maximumScore: sumBy(codingCriteriaMock, ({score}) => score + index)
          }))
        }))
      }
    }
  },
  {
    request: {
      query: codingCriteriaQuery,
      variables: {itemId: codingDimensionsMock[0].items[0].id}
    },
    result: {
      data: {
        codingCriteria: codingCriteriaMock.map(mock => ({...mock, itemId: codingDimensionsMock[0].items[0].id}))
      }
    }
  },
  {
    request: {
      query: codingCriteriaQuery,
      variables: {itemId: codingDimensionsMock[2].items[0].id}
    },
    result: {
      data: {
        codingCriteria: codingCriteriaMock.map(mock => ({...mock, itemId: codingDimensionsMock[2].items[0].id}))
      }
    }
  },
  {
    request: {
      query: codingCriteriaQuery,
      variables: {itemId: codingDimensionsMock[2].items[1].id}
    },
    result: {
      data: {
        codingCriteria: codingCriteriaMock.map(mock => ({...mock, itemId: codingDimensionsMock[2].items[1].id}))
      }
    }
  },
  {
    request: {
      query: codingCriteriaQuery,
      variables: {itemId: codingDimensionsMock[2].items[2].id}
    },
    result: {
      data: {
        codingCriteria: codingCriteriaMock.map(mock => ({...mock, itemId: codingDimensionsMock[2].items[2].id}))
      }
    }
  },
  {
    request: {
      query: scenarioCodingItemRatingsQuery,
      variables: {ratingId: scenarioManualCodingItemRatingsMock[0].ratingId}
    },
    result: {
      data: {
        scenarioCodingItemRatings: scenarioManualCodingItemRatingsMock
      }
    }
  },
  {
    request: {
      query: createScenarioCodingItemRatingMutation,
      variables: {
        creation: pick<ScenarioCodingItemRating, keyof ScenarioCodingItemRatingCreation>(
          scenarioManualCodingItemRatingsMock[0],
          ["ratingId", "surveyInvitationId", "codingItemId"]
        )
      }
    },
    result: {
      data: {
        createScenarioCodingItemRating: scenarioManualCodingItemRatingsMock[0]
      }
    }
  }
]
