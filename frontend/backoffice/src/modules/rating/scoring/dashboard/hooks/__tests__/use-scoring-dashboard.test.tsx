import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import React from "react"
import {
  UseFreetextQuestionRatingsByRatingsListHook,
  UseScenarioCodingItemRatingsByRatingsListHook
} from "shared/components"
import * as useFreetextQuestionRatingsByRatingsListHook from "shared/components/rating/hooks/use-freetext-question-ratings-by-ratings-list"
import * as useScenarioRatingsByRatingsListHook from "shared/components/rating/hooks/use-scenario-coding-item-ratings-by-ratings-list"
import {
  checkLoginMock,
  freetextQuestionRatingsMock,
  projectModulesMock,
  projectsMock,
  ratingsMock,
  scenarioManualCodingItemRatingsMock,
  surveyInvitationsMock,
  surveyLightMock,
  surveysMock,
  userAccountsMock
} from "shared/graphql/__mocks__"
import {
  checkLoginQuery,
  projectModulesQuery,
  ratingsQuery,
  surveyInvitationsQuery,
  surveyLightQuery,
  surveyQuery,
  surveyUserAccountsQuery
} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {useScoringDashboard} from "../use-scoring-dashboard"

const survey = surveysMock[0]
const surveyLight = surveyLightMock
const project = projectsMock[0]

const freetextQuestionRatingsByRatingsListHookValuesDefault: UseFreetextQuestionRatingsByRatingsListHook = {
  freetextQuestionRatings: freetextQuestionRatingsMock,
  freetextQuestionRatingsLoading: false,
  getFreetextQuestionRatings: jest.fn(() => Promise.resolve(freetextQuestionRatingsMock))
}
const freetextQuestionRatingsByRatingsListSpy = jest.spyOn(
  useFreetextQuestionRatingsByRatingsListHook,
  "useFreetextQuestionRatingsByRatingsList"
)

const scenarioRatingsByRatingsListHookValuesDefault: UseScenarioCodingItemRatingsByRatingsListHook = {
  scenarioCodingItemRatings: scenarioManualCodingItemRatingsMock,
  scenarioCodingItemRatingsLoading: false,
  getScenarioCodingItemRatings: jest.fn()
}
const scenarioRatingsByRatingsListSpy = jest.spyOn(
  useScenarioRatingsByRatingsListHook,
  "useScenarioCodingItemRatingsByRatingsList"
)

const getConnectedHook = () =>
  renderHook(() => useScoringDashboard(survey.id, project.id), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: checkLoginQuery
            },
            result: {
              data: {
                checkLogin: checkLoginMock
              }
            }
          },
          {
            request: {
              query: surveyInvitationsQuery,
              variables: {surveyId: survey.id}
            },
            result: {
              data: {
                surveyInvitations: surveyInvitationsMock.map(mock => ({...mock, surveyId: survey.id}))
              }
            }
          },
          
          {
            request: {
              query: projectModulesQuery,
              variables: {projectId: project.id}
            },
            result: {
              data: {
                projectModules: projectModulesMock.map(mock => ({...mock, projectId: project.id}))
              }
            }
          },
          {
            request: {
              query: surveyUserAccountsQuery,
              variables: {surveyId: survey.id}
            },
            result: {
              data: {
                userAccountsForSurvey: userAccountsMock
              }
            }
          },
          {
            request: {
              query: surveyLightQuery,
              variables: {id: survey.id}
            },
            result: {
              data: {surveyLight}
            }
          },
          {
            request: {
              query: ratingsQuery,
              variables: {surveyId: survey.id}
            },
            result: {
              data: {
                ratings: ratingsMock.map(mock => ({...mock, surveyId: survey.id}))
              }
            }
          },
          {
            request: {
              query: surveyLightQuery,
              variables: {id: survey.id}
            },
            result: {
              data: {surveyLight}
            }
          },
        ]}
        addTypename={true}>
        <>{children}</>
      </MockedProvider>
    )
  })

describe("use-rating-overview", () => {
  describe("selfInvited", () => {
    it("should have correct value", async () => {
      freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
      scenarioRatingsByRatingsListSpy.mockReturnValue(scenarioRatingsByRatingsListHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.selfInvited).toEqual(false)
      await act(() => wait(0))
    })
  })
  describe("selfInvitedRatingFinished", () => {
    it("should have correct value", async () => {
      freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
      scenarioRatingsByRatingsListSpy.mockReturnValue(scenarioRatingsByRatingsListHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.selfInvitedRatingFinished).toEqual(false)
      await act(() => wait(0))
    })
  })
})
