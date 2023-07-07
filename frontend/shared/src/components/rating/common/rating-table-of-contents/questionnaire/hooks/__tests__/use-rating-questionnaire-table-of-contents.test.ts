import * as apolloClient from "@apollo/client"
import {renderHook} from "@testing-library/react-hooks"
import {act as actRenderer} from "react-test-renderer"
import wait from "waait"
import {makeFakeClient} from "../../../../../../../../tests/react-apollo/apollo-fake-client"
import {RaterMode} from "../../../../../../../enums"
import {
  freetextQuestionRatingsMock,
  projectModulesMockWithQuestionnaire,
  questionnaireMock,
  ratingsMock,
  surveyIdMock,
  surveyInvitationIdMock,
  surveyInvitationsMock
} from "../../../../../../../graphql/__mocks__"
import {SurveyInvitationsProps} from "../../../../../../../graphql/hooks"
import * as useSurveyInvitationsHook from "../../../../../../../graphql/hooks/queries/survey/use-survey-invitations"
import {Option, Subject} from "../../../../../../../utils"
import * as useFreetextQuestionRatingsByRatingsListHook from "../../../../../../rating/hooks/use-freetext-question-ratings-by-ratings-list"
import * as useRatingsHook from "../../../../../../rating/hooks/use-ratings"
import * as useSelectedAnswersForParticipantBySurveyInvitationsListHook from "../../../../../../rating/hooks/use-selected-answers-for-participant-by-survey-invitations-list"
import {
  SelectedAnswersForParticipantBySurveyInvitationsListMap,
  SelectedAnswersForParticipantBySurveyInvitationsListMapEntry,
  UseSelectedAnswersForParticipantBySurveyInvitationsListHook
} from "../../../../../../rating/hooks/use-selected-answers-for-participant-by-survey-invitations-list"
import {UseFreetextQuestionRatingsByRatingsListHook, UseRatingsHook} from "../../../../../hooks"
import {useRatingQuestionnaireTableOfContents} from "../use-rating-questionnaire-table-of-contents"

const questionnaire = questionnaireMock
const fetchFreetextQuestionRatingsSubject = new Subject<void>()

const fakeClient = makeFakeClient({})
fakeClient.query = jest.fn(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve({data: {freetextQuestionRatings: freetextQuestionRatingsMock}}), 100)
    })
) as any

const apolloClientSpy = jest.spyOn(apolloClient, "useApolloClient")

const ratingsHookValuesDefault: UseRatingsHook = {
  ratingsLoading: false,
  ratings: ratingsMock,
  allRatings: ratingsMock
}
const ratingsSpy = jest.spyOn(useRatingsHook, "useRatings")

const freetextQuestionRatingsByRatingsListHookValuesDefault: UseFreetextQuestionRatingsByRatingsListHook = {
  freetextQuestionRatings: freetextQuestionRatingsMock,
  freetextQuestionRatingsLoading: false,
  getFreetextQuestionRatings: jest.fn(() => Promise.resolve(freetextQuestionRatingsMock))
}
const freetextQuestionRatingsByRatingsListSpy = jest.spyOn(
  useFreetextQuestionRatingsByRatingsListHook,
  "useFreetextQuestionRatingsByRatingsList"
)

const surveyInvitationsHookValuesDefault: SurveyInvitationsProps = {
  surveyInvitationsLoading: false,
  surveyInvitations: surveyInvitationsMock
}
const surveyInvitationsSpy = jest.spyOn(useSurveyInvitationsHook, "useSurveyInvitations")

const selectedAnswersForParticipantBySurveyInvitationsListHookValuesDefault: UseSelectedAnswersForParticipantBySurveyInvitationsListHook = {
  selectedAnswersForParticipantLoading: false,
  selectedAnswersForParticipant: surveyInvitationsMock.reduce(
    (accumulator, surveyInvitation) => ({
      ...accumulator,
      [surveyInvitation.id]: (projectModulesMockWithQuestionnaire[3].questionnaire?.questions ?? []).reduce(
        (questionsAccumulator, question) => ({
          ...questionsAccumulator,
          [question.id]: [
            ...(question.answers[0] !== undefined ? [question.answers[0].id] : []),
            ...(question.answers[1] !== undefined ? [question.answers[1].id] : [])
          ]
        }),
        {} as SelectedAnswersForParticipantBySurveyInvitationsListMapEntry
      )
    }),
    {} as SelectedAnswersForParticipantBySurveyInvitationsListMap
  ),
  getSelectedAnswersForParticipant: jest.fn()
}
const selectedAnswersForParticipantBySurveyInvitationsListSpy = jest.spyOn(
  useSelectedAnswersForParticipantBySurveyInvitationsListHook,
  "useSelectedAnswersForParticipantBySurveyInvitationsList"
)

const getConnectedHook = () =>
  renderHook(() =>
    useRatingQuestionnaireTableOfContents({
      surveyId: surveyIdMock,
      surveyInvitationId: surveyInvitationIdMock,
      questionnaire: Option.of(questionnaire),
      fetchFreetextQuestionRatingsSubject,
      mode: RaterMode.FinalRater
    })
  )

describe("use-rating-questionnaire-table-of-contents", () => {
  describe("allRated", () => {
    it("should default to be defined", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationsListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationsListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.allRated).toBeDefined()
      // Silence mock provider act warnings
      await actRenderer(() => wait(0))
    })
  })
  describe("score", () => {
    it("should default to be defined", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationsListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationsListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.score).toBeDefined()
      // Silence mock provider act warnings
      await actRenderer(() => wait(0))
    })
  })
  describe("maxScore", () => {
    it("should default to be defined", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationsListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationsListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.maxScore).toBeDefined()
      // Silence mock provider act warnings
      await actRenderer(() => wait(0))
    })
  })
  describe("isRated", () => {
    it("should default to be defined", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationsListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationsListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.isRated).toBeDefined()
      // Silence mock provider act warnings
      await actRenderer(() => wait(0))
    })
  })
  describe("dataLoading", () => {
    it("should contain correct value", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      freetextQuestionRatingsByRatingsListSpy.mockReturnValue(freetextQuestionRatingsByRatingsListHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationsListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationsListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toEqual(false)
      // Silence mock provider act warnings
      await actRenderer(() => wait(0))
    })
  })
})
