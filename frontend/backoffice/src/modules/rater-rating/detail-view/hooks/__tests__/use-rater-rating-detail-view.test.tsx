import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import React from "react"
import * as useCodingCriteriaByItemsListHook from "shared/components/rating/hooks/use-coding-criteria-by-items-list"
import {UseCodingCriteriaByItemsListHook} from "shared/components/rating/hooks/use-coding-criteria-by-items-list"
import * as useFreetextQuestionRatingsByRatingsListHook from "shared/components/rating/hooks/use-freetext-question-ratings-by-ratings-list"
import {UseFreetextQuestionRatingsByRatingsListHook} from "shared/components/rating/hooks/use-freetext-question-ratings-by-ratings-list"
import * as useRatingsHook from "shared/components/rating/hooks/use-ratings"
import {UseRatingsHook} from "shared/components/rating/hooks/use-ratings"
import * as useScenarioCodingItemRatingsByRatingsListHook from "shared/components/rating/hooks/use-scenario-coding-item-ratings-by-ratings-list"
import {UseScenarioCodingItemRatingsByRatingsListHook} from "shared/components/rating/hooks/use-scenario-coding-item-ratings-by-ratings-list"
import {
  checkLoginMock,
  codingCriteriaMock,
  codingItemMock,
  freetextQuestionRatingsMock,
  projectModulesMock,
  questionnairesMock,
  ratingsMock,
  scenarioManualCodingItemRatingsMock,
  surveyIdMock,
  surveyInvitationsMock,
  surveyLightMock,
  userAccountsMock
} from "shared/graphql/__mocks__"
import {QuestionnairesProps as UseQuestionnairesHook, SurveyUserAccountsHook} from "shared/graphql/hooks"
import * as useQuestionnairesHook from "shared/graphql/hooks/queries/questionnaires/use-questionnaires"
import * as surveyUserAccountsHook from "shared/graphql/hooks/queries/survey/use-survey-user-accounts"
import {checkLoginQuery, projectModulesQuery, surveyInvitationsQuery, surveyLightQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {Option} from "shared/utils"
import wait from "waait"
import {
  FreetextQuestionRatingsForParticipants,
  ProjectModuleCodingItemsMap,
  UseFreetextQuestionRatingsForParticipantsHook,
  UseProjectModuleCodingItemsHook
} from "../../../hooks"
import * as useFreetextQuestionRatingsForParticipantsHook from "../../../hooks/use-freetext-question-ratings-for-participants"
import * as useProjectModuleCodingItemsHook from "../../../hooks/use-project-module-coding-items"
import {useRaterRatingDetailView} from "../use-rater-rating-detail-view"

const freetextQuestionRatingsHookValuesDefault: UseFreetextQuestionRatingsByRatingsListHook = {
  freetextQuestionRatings: freetextQuestionRatingsMock,
  freetextQuestionRatingsLoading: false,
  getFreetextQuestionRatings: jest.fn(() => Promise.resolve(freetextQuestionRatingsMock))
}

const freetextQuestionRatingsSpy = jest.spyOn(
  useFreetextQuestionRatingsByRatingsListHook,
  "useFreetextQuestionRatingsByRatingsList"
)

const scenarioCodingItemRatingsByRatingsListHookValuesDefault: UseScenarioCodingItemRatingsByRatingsListHook = {
  scenarioCodingItemRatings: scenarioManualCodingItemRatingsMock,
  scenarioCodingItemRatingsLoading: false,
  getScenarioCodingItemRatings: jest.fn()
}

const scenarioCodingItemRatingsByRatingsListSpy = jest.spyOn(
  useScenarioCodingItemRatingsByRatingsListHook,
  "useScenarioCodingItemRatingsByRatingsList"
)

const freetextQuestionRatingsForParticipantsHookValuesDefault: UseFreetextQuestionRatingsForParticipantsHook = {
  freetextQuestionRatingsForParticipantsLoading: false,
  freetextQuestionRatingsForParticipants: surveyInvitationsMock.reduce(
    (surveyInvitationAccumulator, surveyInvitation) => ({
      ...surveyInvitationAccumulator,
      [surveyInvitation.id]: freetextQuestionRatingsMock
    }),
    {} as FreetextQuestionRatingsForParticipants
  ),
  getFreetextQuestionRatingsForParticipants: jest.fn()
}

const freetextQuestionRatingsForParticipantsSpy = jest.spyOn(
  useFreetextQuestionRatingsForParticipantsHook,
  "useFreetextQuestionRatingsForParticipants"
)

const projectModuleCodingItemsHookValuesDefault: UseProjectModuleCodingItemsHook = {
  projectModuleCodingItemsLoading: false,
  projectModuleCodingItems: projectModulesMock.reduce(
    (accumulator, projectModule) => ({
      ...accumulator,
      [projectModule.id]: [codingItemMock]
    }),
    {} as ProjectModuleCodingItemsMap
  ),
  getProjectModuleCodingItems: jest.fn()
}

const projectModuleCodingItemsSpy = jest.spyOn(useProjectModuleCodingItemsHook, "useProjectModuleCodingItems")

const codingCriteriaHookValuesDefault: UseCodingCriteriaByItemsListHook = {
  codingCriteriaLoading: false,
  codingCriteria: codingCriteriaMock,
  getCodingCriteria: jest.fn()
}

const codingCriteriaSpy = jest.spyOn(useCodingCriteriaByItemsListHook, "useCodingCriteriaByItemsList")

const ratingsHookValuesDefault: UseRatingsHook = {
  ratingsLoading: false,
  ratings: ratingsMock,
  allRatings: ratingsMock
}
const ratingsSpy = jest.spyOn(useRatingsHook, "useRatings")

const surveyUserAccountsHookValuesDefault: SurveyUserAccountsHook = {
  surveyUserAccountsLoading: false,
  surveyUserAccounts: userAccountsMock
}
const surveyUserAccountsSpy = jest.spyOn(surveyUserAccountsHook, "useSurveyUserAccounts")

const questionnairesHookValuesDefault: UseQuestionnairesHook = {
  questionnairesLoading: false,
  questionnaires: Option.of(questionnairesMock)
}
const questionnairesSpy = jest.spyOn(useQuestionnairesHook, "useQuestionnaires")

const getConnectedHook = () =>
  renderHook(() => useRaterRatingDetailView(surveyIdMock), {
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
              query: surveyLightQuery,
              variables: {id: surveyIdMock}
            },
            result: {
              data: {
                survey: surveyLightMock
              }
            }
          },
          {
            request: {
              query: projectModulesQuery,
              variables: {projectId: surveyLightMock.project.id}
            },
            result: {
              data: {
                projectModules: projectModulesMock
              }
            }
          },
          {
            request: {
              query: surveyInvitationsQuery,
              variables: {surveyId: surveyIdMock}
            },
            result: {
              data: {
                surveyInvitations: surveyInvitationsMock
              }
            }
          }
        ]}
        addTypename={true}>
        <>{children}</>
      </MockedProvider>
    )
  })

describe("use-rater-rating-detail-view", () => {
  describe("dataLoading", () => {
    it("should contain correct value", async () => {
      freetextQuestionRatingsSpy.mockReturnValue(freetextQuestionRatingsHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      projectModuleCodingItemsSpy.mockReturnValue(projectModuleCodingItemsHookValuesDefault)
      codingCriteriaSpy.mockReturnValue(codingCriteriaHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      questionnairesSpy.mockReturnValue(questionnairesHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toEqual(true)
      await act(() => wait(0))
    })
  })
  describe("ratingPercentage", () => {
    it("should contain correct value", async () => {
      freetextQuestionRatingsSpy.mockReturnValue(freetextQuestionRatingsHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      projectModuleCodingItemsSpy.mockReturnValue(projectModuleCodingItemsHookValuesDefault)
      codingCriteriaSpy.mockReturnValue(codingCriteriaHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      questionnairesSpy.mockReturnValue(questionnairesHookValuesDefault)
      const {result, waitForNextUpdate} = getConnectedHook()
      await waitForNextUpdate()
      expect(result.current.ratingPercentage).toEqual(0)
      await act(() => wait(0))
    })
  })
  describe("totalEntitiesCount", () => {
    it("should contain correct value", async () => {
      freetextQuestionRatingsSpy.mockReturnValue(freetextQuestionRatingsHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      projectModuleCodingItemsSpy.mockReturnValue(projectModuleCodingItemsHookValuesDefault)
      codingCriteriaSpy.mockReturnValue(codingCriteriaHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      questionnairesSpy.mockReturnValue(questionnairesHookValuesDefault)
      const {result, waitForNextUpdate} = getConnectedHook()
      await waitForNextUpdate()
      expect(result.current.totalEntitiesCount).toEqual(0)
      await act(() => wait(0))
    })
  })
  describe("ratedEntitiesCount", () => {
    it("should contain correct value", async () => {
      freetextQuestionRatingsSpy.mockReturnValue(freetextQuestionRatingsHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      projectModuleCodingItemsSpy.mockReturnValue(projectModuleCodingItemsHookValuesDefault)
      codingCriteriaSpy.mockReturnValue(codingCriteriaHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      questionnairesSpy.mockReturnValue(questionnairesHookValuesDefault)
      const {result, waitForNextUpdate} = getConnectedHook()
      await waitForNextUpdate()
      expect(result.current.ratedEntitiesCount).toEqual(0)
      await act(() => wait(0))
    })
  })
  describe("userAccount", () => {
    it("should contain correct value", async () => {
      freetextQuestionRatingsSpy.mockReturnValue(freetextQuestionRatingsHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      projectModuleCodingItemsSpy.mockReturnValue(projectModuleCodingItemsHookValuesDefault)
      codingCriteriaSpy.mockReturnValue(codingCriteriaHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      questionnairesSpy.mockReturnValue(questionnairesHookValuesDefault)

      const {result, waitForNextUpdate} = getConnectedHook()
      await waitForNextUpdate()
      expect(result.current.userAccount.orNull()).toEqual(checkLoginMock)
      await act(() => wait(0))
    })
  })
})
