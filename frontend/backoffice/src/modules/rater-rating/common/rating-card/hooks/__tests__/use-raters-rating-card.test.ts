import * as apolloClient from "@apollo/client"
import {act, renderHook} from "@testing-library/react-hooks"
import * as useCodingCriteriaByItemsListHook from "shared/components/rating/hooks/use-coding-criteria-by-items-list"
import {UseCodingCriteriaByItemsListHook} from "shared/components/rating/hooks/use-coding-criteria-by-items-list"
import * as useFreetextQuestionRatingsByRatingsListHook from "shared/components/rating/hooks/use-freetext-question-ratings-by-ratings-list"
import {UseFreetextQuestionRatingsByRatingsListHook} from "shared/components/rating/hooks/use-freetext-question-ratings-by-ratings-list"
import * as useRatingsHook from "shared/components/rating/hooks/use-ratings"
import {UseRatingsHook} from "shared/components/rating/hooks/use-ratings"
import * as useScenarioCodingItemRatingsByRatingsListHook from "shared/components/rating/hooks/use-scenario-coding-item-ratings-by-ratings-list"
import {UseScenarioCodingItemRatingsByRatingsListHook} from "shared/components/rating/hooks/use-scenario-coding-item-ratings-by-ratings-list"
import {RatingStatus} from "shared/enums"
import {
  codingCriteriaMock,
  codingDimensionsMock,
  codingItemMock,
  freetextQuestionRatingsMock,
  projectModulesMock,
  questionnairesMock,
  ratingsMock,
  scenarioManualCodingItemRatingsMock,
  surveyIdMock,
  surveyInvitationsMock,
  surveysMock,
  userAccountMock,
  userAccountsMock
} from "shared/graphql/__mocks__"
import {
  ProjectModulesHook as UseProjectModulesHook,
  QuestionnairesProps as UseQuestionnairesHook,
  SurveyInvitationsProps as UseSurveyInvitationsHook,
  SurveyUserAccountsHook
} from "shared/graphql/hooks"
import * as useProjectModulesHook from "shared/graphql/hooks/queries/project/use-project-modules"
import * as useQuestionnairesHook from "shared/graphql/hooks/queries/questionnaires/use-questionnaires"
import * as useSurveyInvitationsHook from "shared/graphql/hooks/queries/survey/use-survey-invitations"
import * as surveyUserAccountsHook from "shared/graphql/hooks/queries/survey/use-survey-user-accounts"
import {Option} from "shared/utils"
import {makeFakeClient} from "sharedTests/react-apollo/apollo-fake-client"
import wait from "waait"
import {
  FreetextQuestionRatingsForParticipants,
  ProjectModuleCodingItemsMap,
  UseFreetextQuestionRatingsForParticipantsHook,
  UseProjectModuleCodingItemsHook
} from "../../../../hooks"
import * as useFreetextQuestionRatingsForParticipantsHook from "../../../../hooks/use-freetext-question-ratings-for-participants"
import * as useProjectModuleCodingItemsHook from "../../../../hooks/use-project-module-coding-items"
import {useRatersRatingCard} from "../use-raters-rating-card"

const surveyInvitationsHookValuesDefault: UseSurveyInvitationsHook = {
  surveyInvitationsLoading: false,
  surveyInvitations: surveyInvitationsMock
}
const surveyInvitationsSpy = jest.spyOn(useSurveyInvitationsHook, "useSurveyInvitations")

const projectModulesHookValuesDefault: UseProjectModulesHook = {
  projectModulesLoading: false,
  projectModules: projectModulesMock
}
const projectModulesSpy = jest.spyOn(useProjectModulesHook, "useProjectModules")

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

const ratingsHookValuesDefault: UseRatingsHook = {
  ratingsLoading: false,
  ratings: ratingsMock,
  allRatings: ratingsMock
}
const ratingsSpy = jest.spyOn(useRatingsHook, "useRatings")

const codingCriteriaByItemsListHookValuesDefault: UseCodingCriteriaByItemsListHook = {
  codingCriteria: codingCriteriaMock,
  codingCriteriaLoading: false,
  getCodingCriteria: jest.fn()
}
const codingCriteriaByItemsListSpy = jest.spyOn(useCodingCriteriaByItemsListHook, "useCodingCriteriaByItemsList")

const scenarioCodingItemRatingsByRatingsListHookValuesDefault: UseScenarioCodingItemRatingsByRatingsListHook = {
  scenarioCodingItemRatings: scenarioManualCodingItemRatingsMock,
  scenarioCodingItemRatingsLoading: false,
  getScenarioCodingItemRatings: jest.fn()
}
const scenarioCodingItemRatingsByRatingsListSpy = jest.spyOn(
  useScenarioCodingItemRatingsByRatingsListHook,
  "useScenarioCodingItemRatingsByRatingsList"
)

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

const freetextQuestionRatingsHookValuesDefault: UseFreetextQuestionRatingsByRatingsListHook = {
  freetextQuestionRatings: freetextQuestionRatingsMock,
  freetextQuestionRatingsLoading: false,
  getFreetextQuestionRatings: jest.fn(() => Promise.resolve(freetextQuestionRatingsMock))
}
const freetextQuestionRatingsSpy = jest.spyOn(
  useFreetextQuestionRatingsByRatingsListHook,
  "useFreetextQuestionRatingsByRatingsList"
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

const fakeClient = makeFakeClient({})
fakeClient.query = jest.fn(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve({data: {codingDimensions: codingDimensionsMock}}), 100)
    })
) as any

const apolloClientSpy = jest.spyOn(apolloClient, "useApolloClient")

const getConnectedHook = () =>
  renderHook(() => useRatersRatingCard({...surveysMock[0], id: surveyIdMock}, Option.of(userAccountMock)))

describe("use-raters-rating-card", () => {
  describe("ratingStatus", () => {
    it("contains correct value", async () => {
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModulesSpy.mockReturnValue(projectModulesHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      apolloClientSpy.mockReturnValue(fakeClient)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      questionnairesSpy.mockReturnValue(questionnairesHookValuesDefault)
      freetextQuestionRatingsSpy.mockReturnValue(freetextQuestionRatingsHookValuesDefault)
      projectModuleCodingItemsSpy.mockReturnValue(projectModuleCodingItemsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.ratingStatus).toEqual(RatingStatus.Completed)
      await act(() => wait(0))
    })
  })
  describe("ratingPercentage", () => {
    it("contains correct value", async () => {
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModulesSpy.mockReturnValue(projectModulesHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      apolloClientSpy.mockReturnValue(fakeClient)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      questionnairesSpy.mockReturnValue(questionnairesHookValuesDefault)
      freetextQuestionRatingsSpy.mockReturnValue(freetextQuestionRatingsHookValuesDefault)
      projectModuleCodingItemsSpy.mockReturnValue(projectModuleCodingItemsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.ratingPercentage).toEqual(0)
      await act(() => wait(0))
    })
  })
  describe("totalEntitiesCount", () => {
    it("contains correct value", async () => {
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModulesSpy.mockReturnValue(projectModulesHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      apolloClientSpy.mockReturnValue(fakeClient)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      questionnairesSpy.mockReturnValue(questionnairesHookValuesDefault)
      freetextQuestionRatingsSpy.mockReturnValue(freetextQuestionRatingsHookValuesDefault)
      projectModuleCodingItemsSpy.mockReturnValue(projectModuleCodingItemsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.totalEntitiesCount).toEqual(0)
      await act(() => wait(0))
    })
  })
  describe("ratedEntitiesCount", () => {
    it("contains correct value", async () => {
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModulesSpy.mockReturnValue(projectModulesHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      apolloClientSpy.mockReturnValue(fakeClient)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      questionnairesSpy.mockReturnValue(questionnairesHookValuesDefault)
      freetextQuestionRatingsSpy.mockReturnValue(freetextQuestionRatingsHookValuesDefault)
      projectModuleCodingItemsSpy.mockReturnValue(projectModuleCodingItemsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.ratedEntitiesCount).toEqual(0)
      await act(() => wait(0))
    })
  })
})
