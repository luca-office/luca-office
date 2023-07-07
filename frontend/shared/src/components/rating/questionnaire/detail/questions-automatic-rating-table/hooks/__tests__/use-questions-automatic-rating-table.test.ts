import {renderHook} from "@testing-library/react-hooks"
import {act} from "react-test-renderer"
import wait from "waait"
import {
  surveyIdMock,
  surveyInvitationIdMock,
  surveyInvitationsMock,
  userAccountsMock
} from "../../../../../../../graphql/__mocks__"
import {
  questionnaireQuestionMockWithAnswers,
  questionnaireQuestionsMock
} from "../../../../../../../graphql/__mocks__/questionnaire-questions.mock"
import {
  SurveyInvitationsProps as UseSurveyInvitationsHook,
  SurveyUserAccountsHook
} from "../../../../../../../graphql/hooks"
import * as useSurveyInvitationsHook from "../../../../../../../graphql/hooks/queries/survey/use-survey-invitations"
import * as surveyUserAccountsHook from "../../../../../../../graphql/hooks/queries/survey/use-survey-user-accounts"
import * as useSelectedAnswersForParticipantBySurveyInvitationListHook from "../../../../../../rating/hooks/use-selected-answers-for-participant-by-survey-invitation-list"
import {
  SelectedAnswersForParticipantByQuestionListMap,
  UseSelectedAnswersForParticipantBySurveyInvitationListHook
} from "../../../../../hooks"
import {useQuestionsAutomaticRatingTable} from "../use-questions-automatic-rating-table"

const surveyInvitationId = surveyInvitationIdMock
const questionnaireQuestion = questionnaireQuestionMockWithAnswers
const selectedAnswersForParticipantsMock = questionnaireQuestionsMock.reduce(
  (accumulator, question) => ({
    [question.id]: question.answers.filter((_, index) => index % 2 === 0).map(answer => answer.id)
  }),
  {} as SelectedAnswersForParticipantByQuestionListMap
)

const surveyUserAccountsHookValuesDefault: SurveyUserAccountsHook = {
  surveyUserAccountsLoading: false,
  surveyUserAccounts: userAccountsMock
}
const surveyUserAccountsSpy = jest.spyOn(surveyUserAccountsHook, "useSurveyUserAccounts")

const surveyInvitationsHookValuesDefault: UseSurveyInvitationsHook = {
  surveyInvitationsLoading: false,
  surveyInvitations: surveyInvitationsMock
}
const surveyInvitationsSpy = jest.spyOn(useSurveyInvitationsHook, "useSurveyInvitations")

const selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault: UseSelectedAnswersForParticipantBySurveyInvitationListHook = {
  selectedAnswersForParticipantsLoading: false,
  selectedAnswersForParticipants: selectedAnswersForParticipantsMock,
  getSelectedAnswersForParticipants: jest.fn(() => Promise.resolve(selectedAnswersForParticipantsMock))
}
const selectedAnswersForParticipantBySurveyInvitationListSpy = jest.spyOn(
  useSelectedAnswersForParticipantBySurveyInvitationListHook,
  "useSelectedAnswersForParticipantBySurveyInvitationList"
)

const getConnectedHook = () =>
  renderHook(() =>
    useQuestionsAutomaticRatingTable({surveyId: surveyIdMock, surveyInvitationId, question: questionnaireQuestion})
  )

describe("use-questions-automatic-rating-table", () => {
  describe("dataLoading", () => {
    it("should be defined", async () => {
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isSelected", () => {
    it("should be defined", async () => {
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.isSelected).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("ratersCount", () => {
    it("contains correct value", async () => {
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.ratersCount).toEqual(userAccountsMock.length)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("getRatingsCount", () => {
    it("is a function", async () => {
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(typeof result.current.getRatingsCount).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("returns correct value", async () => {
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.getRatingsCount(questionnaireQuestion.answers[0])).toEqual(0)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
