import * as apolloClient from "@apollo/client"
import {act, renderHook} from "@testing-library/react-hooks"
import * as useCodingCriteriaByItemsListHook from "shared/components/rating/hooks/use-coding-criteria-by-items-list"
import {UseCodingCriteriaByItemsListHook} from "shared/components/rating/hooks/use-coding-criteria-by-items-list"
import * as useScenarioCodingItemRatingsByRatingsListHook from "shared/components/rating/hooks/use-scenario-coding-item-ratings-by-ratings-list"
import {UseScenarioCodingItemRatingsByRatingsListHook} from "shared/components/rating/hooks/use-scenario-coding-item-ratings-by-ratings-list"
import {
  checkLoginMock,
  codingCriteriaMock,
  codingDimensionsMock,
  freetextQuestionRatingsMock,
  projectModulesMock,
  ratingsMock,
  scenarioCodingItemRatingMock,
  surveyInvitationsMock,
  surveysMock,
  userAccountMock
} from "shared/graphql/__mocks__"
import {ProjectModulesHook, SurveyInvitationsProps, UseCheckLogin, UseRatingsHook} from "shared/graphql/hooks"
import * as useProjectModulesHook from "shared/graphql/hooks/queries/project/use-project-modules"
import * as useRatingsHook from "shared/graphql/hooks/queries/ratings/use-ratings"
import * as useSurveyInvitationsHook from "shared/graphql/hooks/queries/survey/use-survey-invitations"
import * as useCheckLoginHook from "shared/graphql/hooks/queries/use-check-login"
import {Option} from "shared/utils"
import {makeFakeClient} from "sharedTests/react-apollo/apollo-fake-client"
import wait from "waait"
import {
  FreetextQuestionRatingsForParticipants,
  UseFreetextQuestionRatingsForParticipantsHook
} from "../../../../../hooks"
import * as useFreetextQuestionRatingsForParticipantsHook from "../../../../../hooks/use-freetext-question-ratings-for-participants"
import {useRaterRatingContentParticipantList} from "../use-rater-rating-content-participant-list"

const survey = surveysMock[0]

const fakeClient = makeFakeClient({})
fakeClient.query = jest.fn(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve({data: {codingDimensions: codingDimensionsMock}}), 100)
    })
) as any

const apolloClientSpy = jest.spyOn(apolloClient, "useApolloClient")

const checkLoginHookValuesDefault: UseCheckLogin = {
  account: Option.of(checkLoginMock),
  checkLoginLoading: false
}
const checkLoginSpy = jest.spyOn(useCheckLoginHook, "useCheckLogin")

const ratingsHookValuesDefault: UseRatingsHook = {
  ratings: ratingsMock,
  ratingsLoading: false
}
const ratingsSpy = jest.spyOn(useRatingsHook, "useRatings")

const scenarioCodingItemRatingsByRatingsListHookValuesDefault: UseScenarioCodingItemRatingsByRatingsListHook = {
  scenarioCodingItemRatings: [scenarioCodingItemRatingMock],
  scenarioCodingItemRatingsLoading: false,
  getScenarioCodingItemRatings: jest.fn()
}
const scenarioCodingItemRatingsByRatingsListSpy = jest.spyOn(
  useScenarioCodingItemRatingsByRatingsListHook,
  "useScenarioCodingItemRatingsByRatingsList"
)

const codingCriteriaByItemsListHookValuesDefault: UseCodingCriteriaByItemsListHook = {
  codingCriteria: codingCriteriaMock,
  codingCriteriaLoading: false,
  getCodingCriteria: jest.fn()
}
const codingCriteriaByItemsListSpy = jest.spyOn(useCodingCriteriaByItemsListHook, "useCodingCriteriaByItemsList")

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

const surveyInvitationsHookValuesDefault: SurveyInvitationsProps = {
  surveyInvitations: surveyInvitationsMock,
  surveyInvitationsLoading: false
}
const surveyInvitationsSpy = jest.spyOn(useSurveyInvitationsHook, "useSurveyInvitations")

const projectModulesHookValuesDefault: ProjectModulesHook = {
  projectModules: projectModulesMock,
  projectModulesLoading: false
}
const projectModulesSpy = jest.spyOn(useProjectModulesHook, "useProjectModules")

const getConnectedHook = () => renderHook(() => useRaterRatingContentParticipantList(userAccountMock.id, survey))

describe("use-rater-rating-content-participant-list", () => {
  describe("dataLoading", () => {
    it("should be correct", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      checkLoginSpy.mockReturnValue(checkLoginHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModulesSpy.mockReturnValue(projectModulesHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toEqual(false)
      await act(() => wait(0))
    })
  })
  describe("participantCount", () => {
    it("should be correct", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      checkLoginSpy.mockReturnValue(checkLoginHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModulesSpy.mockReturnValue(projectModulesHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.participantCount).toEqual(0)
      await act(() => wait(0))
    })
  })
  describe("fullyRatedParticipantsCount", () => {
    it("should be correct", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      checkLoginSpy.mockReturnValue(checkLoginHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModulesSpy.mockReturnValue(projectModulesHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.fullyRatedParticipantsCount).toEqual(3)
      await act(() => wait(0))
    })
  })
  describe("projectModulesCount", () => {
    it("should be correct", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      checkLoginSpy.mockReturnValue(checkLoginHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModulesSpy.mockReturnValue(projectModulesHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.projectModulesCount).toEqual(3)
      await act(() => wait(0))
    })
  })
  describe("fullyRatedProjectModulesCount", () => {
    it("should be correct", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      checkLoginSpy.mockReturnValue(checkLoginHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModulesSpy.mockReturnValue(projectModulesHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.fullyRatedProjectModulesCount).toEqual(0)
      await act(() => wait(0))
    })
  })
  describe("surveyInvitations", () => {
    it("should be correct", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      checkLoginSpy.mockReturnValue(checkLoginHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModulesSpy.mockReturnValue(projectModulesHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.surveyInvitations).toEqual(surveyInvitationsMock)
      await act(() => wait(0))
    })
  })
  describe("ratingProjectModules", () => {
    it("should be correct", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      checkLoginSpy.mockReturnValue(checkLoginHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModulesSpy.mockReturnValue(projectModulesHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.ratingProjectModules).toEqual(
        projectModulesMock.map(mock => ({
          ...mock,
          participantCount: 0,
          ratingsByParticipants: surveyInvitationsMock.map(({id}) => ({
            participantId: id,
            isFullyRated: true,
            isNotRatable: true
          })),
          ratedParticipantCount: surveyInvitationsMock.length
        }))
      )
      await act(() => wait(0))
    })
  })
  describe("allCodingDimensions", () => {
    it("should be correct", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      checkLoginSpy.mockReturnValue(checkLoginHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      freetextQuestionRatingsForParticipantsSpy.mockReturnValue(freetextQuestionRatingsForParticipantsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      projectModulesSpy.mockReturnValue(projectModulesHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.allCodingDimensions).toEqual([])
      await act(() => wait(0))
    })
  })
})
