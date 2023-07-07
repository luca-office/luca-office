import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import {omit} from "lodash-es"
import * as React from "react"
import {
  projectModulesMock,
  projectsMock,
  ratingsMock,
  surveyInvitationsMock,
  surveysMock,
  userAccountsMock
} from "shared/graphql/__mocks__"
import {SurveyUpdate} from "shared/graphql/generated/globalTypes"
import {SurveyInvitationsProps, SurveyUserAccountsHook} from "shared/graphql/hooks"
import * as useSurveyInvitationsHook from "shared/graphql/hooks/queries/survey/use-survey-invitations"
import * as surveyUserAccountsHook from "shared/graphql/hooks/queries/survey/use-survey-user-accounts"
import {updateSurveyMutation} from "shared/graphql/mutations"
import {
  projectModulesQuery,
  projectQuery,
  ratingsQuery,
  surveyQuery,
  surveyResultsOverviewQuery
} from "shared/graphql/queries"
import {Survey} from "shared/models"
import {Children} from "shared/styles"
import wait from "waait"
import {surveyResultsOverviewMock} from "../../../../../graphql/__mocks__"
import {useSurveyDetail} from "../use-survey-detail"

const survey = surveysMock[0]
const project = projectsMock[0]

const surveyUserAccountsHookValuesDefault: SurveyUserAccountsHook = {
  surveyUserAccountsLoading: false,
  surveyUserAccounts: userAccountsMock
}
const surveyUserAccountsSpy = jest.spyOn(surveyUserAccountsHook, "useSurveyUserAccounts")

const surveyInvitationsHookValuesDefault: SurveyInvitationsProps = {
  surveyInvitationsLoading: false,
  surveyInvitations: surveyInvitationsMock
}
const surveyInvitationsSpy = jest.spyOn(useSurveyInvitationsHook, "useSurveyInvitations")

const getConnectedHook = () =>
  renderHook(() => useSurveyDetail(project.id, survey.id), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: updateSurveyMutation,
              variables: {
                id: survey.id,
                update: omit<Survey, keyof Omit<Survey, keyof SurveyUpdate>>(survey, [
                  "__typename",
                  "id",
                  "createdAt",
                  "modifiedAt",
                  "projectId",
                  "invitationsCount",
                  "inProgressParticipationsCount",
                  "completedParticipationsCount",
                  "isCompleted",
                  "project",
                  "projectModuleProgresses"
                ])
              }
            },
            result: {
              data: {
                updateSurvey: survey
              }
            }
          },
          {
            request: {
              query: surveyQuery,
              variables: {id: survey.id}
            },
            result: {
              data: {survey}
            }
          },
          {
            request: {
              query: projectQuery,
              variables: {id: project.id}
            },
            result: {
              data: {
                project: project
              }
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
              query: surveyResultsOverviewQuery,
              variables: {surveyId: survey.id}
            },
            result: {
              data: {
                surveyResultsOverview: surveyResultsOverviewMock
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
                projectModules: projectModulesMock
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-survey-detail", () => {
  describe("isRatingFinalized", () => {
    it("should contain correct value", async () => {
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.isRatingFinalized).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("raters", () => {
    it("should contain correct value", async () => {
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.raters).toEqual(userAccountsMock)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
