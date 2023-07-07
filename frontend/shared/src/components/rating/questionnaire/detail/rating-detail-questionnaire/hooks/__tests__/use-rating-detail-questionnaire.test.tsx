import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {act} from "react-test-renderer"
import wait from "waait"
import {RaterMode} from "../../../../../../../enums"
import {
  checkLoginMock,
  projectModulesMockWithQuestionnaire,
  projectsMock,
  questionnairesMock,
  ratingsMock,
  surveyInvitationsMock,
  surveyInvitationsProgressMock
} from "../../../../../../../graphql/__mocks__"
import {
  checkLoginQuery,
  projectModulesQuery,
  projectQuery,
  questionnaireQuery,
  ratingsQuery,
  surveyInvitationsProgressQuery,
  surveyInvitationsQuery
} from "../../../../../../../graphql/queries"
import {Children} from "../../../../../../../styles"
import {useRatingDetailQuestionnaire} from "../use-rating-detail-questionnaire"

const surveyId = surveyInvitationsProgressMock[0].id
const questionnaireId = questionnairesMock[0].id
const ratings = ratingsMock.map(rating => ({...rating, surveyId}))
const surveyInvitations = surveyInvitationsMock.map((surveyInvitation, index) =>
  index === 0 ? {...surveyInvitation, surveyId} : surveyInvitation
)

const getConnectedHook = () =>
  renderHook(
    () =>
      useRatingDetailQuestionnaire({
        projectId: projectsMock[0].id,
        surveyId,
        moduleId: "Non-Valid-ModuleId",
        surveyInvitationId: surveyInvitationsProgressMock[0].id,
        mode: RaterMode.FinalRater,
        disabled: false,
        navigateTo: jest.fn()
      }),
    {
      wrapper: ({children}: Children) => (
        <MockedProvider
          mocks={[
            {
              request: {
                query: projectQuery,
                variables: {id: projectsMock[0].id}
              },
              result: {
                data: {
                  project: projectsMock[0]
                }
              }
            },
            {
              request: {
                query: projectModulesQuery,
                variables: {projectId: projectsMock[0].id}
              },
              result: {
                data: {
                  projectModules: projectModulesMockWithQuestionnaire
                }
              }
            },
            {
              request: {
                query: surveyInvitationsProgressQuery,
                variables: {surveyId}
              },
              result: {
                data: {
                  surveyInvitations: surveyInvitationsProgressMock
                }
              }
            },
            {
              request: {
                query: questionnaireQuery,
                variables: {id: questionnaireId}
              },
              result: {
                data: {
                  questionnaire: questionnairesMock[0]
                }
              }
            },
            {
              request: {
                query: ratingsQuery,
                variables: {surveyId}
              },
              result: {
                data: {
                  ratings
                }
              }
            },
            {
              request: {
                query: surveyInvitationsQuery,
                variables: {surveyId}
              },
              result: {
                data: {
                  surveyInvitations: surveyInvitations
                }
              }
            },
            {
              request: {
                query: checkLoginQuery
              },
              result: {
                data: {
                  checkLogin: checkLoginMock
                }
              }
            }
          ]}
          addTypename={true}>
          <React.Fragment>{children}</React.Fragment>
        </MockedProvider>
      )
    }
  )

describe("use-rating-detail-questionnaire", () => {
  describe("project", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.projectName).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("projectModules", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.projectModules).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("participant", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.participant).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("participants", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.participants).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("participantIndex", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.participantIndex).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("participantName", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.participantName).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("dataLoading", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("questionnaire", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.questionnaire).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedEntityId", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedEntityId).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("ratingId", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.ratingId).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("participantFinishedModule", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.participantFinishedModule).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("fetchFreetextQuestionRatingsSubject", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.fetchFreetextQuestionRatingsSubject).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isReadonly", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isReadonly).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isNotRatable", () => {
    it("should contain correct value", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isNotRatable).toEqual(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isContentMissing", () => {
    it("should contain correct value", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isContentMissing).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
