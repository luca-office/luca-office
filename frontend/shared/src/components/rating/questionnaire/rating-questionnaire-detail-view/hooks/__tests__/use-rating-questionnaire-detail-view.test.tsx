import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {act} from "react-test-renderer"
import wait from "waait"
import {RaterMode} from "../../../../../../enums"
import {
  freetextQuestionRatingsMock,
  questionnaireMock,
  ratingsMock,
  surveyIdMock,
  surveyInvitationIdMock,
  surveyInvitationsMock
} from "../../../../../../graphql/__mocks__"
import {
  questionnaireQuestionMockWithAnswers,
  questionnaireQuestionsMock
} from "../../../../../../graphql/__mocks__/questionnaire-questions.mock"
import {QuestionScoringType, QuestionType} from "../../../../../../graphql/generated/globalTypes"
import {SurveyInvitationsProps as UseSurveyInvitationsHook} from "../../../../../../graphql/hooks"
import * as useSurveyInvitationsHook from "../../../../../../graphql/hooks/queries/survey/use-survey-invitations"
import {ratingsQuery} from "../../../../../../graphql/queries"
import {Children} from "../../../../../../styles"
import {flatten} from "../../../../../../utils"
import {
  SelectedAnswersForParticipantByQuestionListMap,
  UseFreetextQuestionRatingsByRatingsListHook,
  UseQuestionnaireRatingScoreHook,
  UseRatingsHook,
  UseSelectedAnswersForParticipantByQuestionListHook,
  UseSelectedAnswersForParticipantBySurveyInvitationListHook
} from "../../../../hooks"
import * as useFreetextQuestionRatingsByRatingsListHook from "../../../../hooks/use-freetext-question-ratings-by-ratings-list"
import * as useQuestionnaireRatingScoreHook from "../../../../hooks/use-questionnaire-rating-score"
import * as useRatingsHook from "../../../../hooks/use-ratings"
import * as useSelectedAnswersForParticipantByQuestionListHook from "../../../../hooks/use-selected-answers-for-participant-by-question-list"
import * as useSelectedAnswersForParticipantBySurveyInvitationListHook from "../../../../hooks/use-selected-answers-for-participant-by-survey-invitation-list"
import {useRatingQuestionnaireDetailView} from "../use-rating-questionnaire-detail-view"

const questionnaire = {
  ...questionnaireMock,
  questions: questionnaireMock.questions.map((question, index) => ({
    ...question,
    scoringType:
      question.questionType === QuestionType.FreeText ? QuestionScoringType.Holistic : QuestionScoringType.Analytical,
    freetextQuestionCodingCriteria: question.freetextQuestionCodingCriteria.map(criterion => ({
      ...criterion,
      questionId: question.id,
      id: freetextQuestionRatingsMock[index]?.criterionSelections[0].criterionId ?? criterion.id
    }))
  }))
}
const selectedAnswersForParticipantsMock = questionnaireQuestionsMock.reduce(
  (accumulator, question) => ({
    [question.id]: question.answers.filter((_, index) => index % 2 === 0).map(answer => answer.id)
  }),
  {} as SelectedAnswersForParticipantByQuestionListMap
)

const getFreeTextQuestionRatingsHookValues = (questionId?: UUID): UseFreetextQuestionRatingsByRatingsListHook => ({
  freetextQuestionRatings: freetextQuestionRatingsMock.map(mock => ({
    ...mock,
    questionId: questionId ?? questionnaireMock.questions[0].id
  })),
  freetextQuestionRatingsLoading: false,
  getFreetextQuestionRatings: jest.fn(() => Promise.resolve(freetextQuestionRatingsMock))
})

const freeTextQuestionRatingsStateSpy = jest.spyOn(
  useFreetextQuestionRatingsByRatingsListHook,
  "useFreetextQuestionRatingsByRatingsList"
)

const scoreHookValuesDefault: UseQuestionnaireRatingScoreHook = {
  overallScore: 40,
  getScoreByQuestion: jest.fn(() => 11),
  getAverageScoreByQuestion: jest.fn(() => 3)
}

const scoreStateSpy = jest.spyOn(useQuestionnaireRatingScoreHook, "useQuestionnaireRatingScore")

const selectedAnswersHookValuesDefault: UseSelectedAnswersForParticipantByQuestionListHook = {
  selectedAnswersForParticipant: {
    [questionnaireMock.questions[0].id]: questionnaireQuestionMockWithAnswers.answers.map(({id}) => id)
  },
  selectedAnswersForParticipantLoading: false,
  getSelectedAnswersForParticipant: jest.fn()
}

const selectedAnswersSpy = jest.spyOn(
  useSelectedAnswersForParticipantByQuestionListHook,
  "useSelectedAnswersForParticipantByQuestionList"
)

const ratingsHookValuesDefault: UseRatingsHook = {
  ratingsLoading: false,
  ratings: ratingsMock,
  allRatings: ratingsMock
}
const ratingsSpy = jest.spyOn(useRatingsHook, "useRatings")

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

const getConnectedHook = (selectedQuestionId?: UUID) =>
  renderHook(
    () =>
      useRatingQuestionnaireDetailView({
        surveyId: surveyIdMock,
        surveyInvitationId: surveyInvitationIdMock,
        questionnaire,
        selectedQuestionId,
        mode: RaterMode.FinalRater
      }),
    {
      wrapper: ({children}: Children) => (
        <MockedProvider
          mocks={[
            {
              request: {
                query: ratingsQuery,
                variables: {surveyId: surveyIdMock}
              },
              result: {
                data: {
                  ratings: ratingsMock
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

describe("use-rating-questionnaire-detail-view", () => {
  describe("questions", () => {
    it("should be defined", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.questions).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("has questions", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.questions).toEqual(questionnaire.questions)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedQuestion", () => {
    it("should be defined", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.selectedQuestion).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("has no selected question", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.selectedQuestion.orNull()).toBeNull()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("has selected question", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[0].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[0].id)
      expect(result.current.selectedQuestion.orNull()).toEqual(questionnaire.questions[0])
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("label", () => {
    it("should be defined", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.label).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("has correct label (selected question)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[0].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[0].id)
      expect(result.current.label).toEqual(questionnaire.questions[0].text)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("has correct label (no selected question)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.label).toEqual(questionnaire.title)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("description", () => {
    it("should be defined", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.description).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("has undefined description (selected question)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[0].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[0].id)
      expect(result.current.description).toEqual(undefined)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("has correct description (no selected question)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.description).toEqual(questionnaire.description)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isOverviewPage", () => {
    it("should be defined", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.isOverviewPage).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets isOverviewPage (no selected question)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.isOverviewPage).toEqual(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets isOverviewPage (selected question)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[0].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[0].id)
      expect(result.current.isOverviewPage).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("requiresScoring", () => {
    it("should be defined", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.requiresScoring).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets requiresScoring (no selected question)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.requiresScoring).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets requiresScoring (QuestionType.FreeText)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[5].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[5].id)
      expect(result.current.requiresScoring).toEqual(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets requiresScoring (QuestionType.MultipleChoice)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[2].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[2].id)
      expect(result.current.requiresScoring).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets requiresScoring (QuestionType.SingleChoice)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[0].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[0].id)
      expect(result.current.requiresScoring).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("score", () => {
    it("should be defined", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.score).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets score (no question selected)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.score).toEqual(40)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets score (QuestionType.FreeText)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[5].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[5].id)
      expect(result.current.score).toEqual(11)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets score (QuestionType.MultipleChoice)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[2].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[2].id)
      expect(result.current.score).toEqual(11)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets score (QuestionType.SingleChoice)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[0].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[0].id)
      expect(result.current.score).toEqual(11)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("maxScore", () => {
    it("should be defined", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      console.log(result.current.questions)
      expect(result.current.maxScore).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets max score (no question selected)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.maxScore).toEqual(12)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets max score (QuestionType.FreeText)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[5].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[5].id)
      expect(result.current.maxScore).toEqual(2)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets max score (QuestionType.MultipleChoice)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[2].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[2].id)
      expect(result.current.maxScore).toEqual(2)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets max score (QuestionType.SingleChoice)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[0].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[0].id)
      expect(result.current.maxScore).toEqual(2)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("backgroundIcon", () => {
    it("should be defined", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.backgroundIcon).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets backgroundIcon (no question selected)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.backgroundIcon).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets backgroundIcon (question selected, requiresScoring=false)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[0].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[0].id)
      expect(result.current.backgroundIcon).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly sets backgroundIcon (question selected, requiresScoring=true)", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(
        getFreeTextQuestionRatingsHookValues(questionnaire.questions[5].id)
      )
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook(questionnaire.questions[5].id)
      expect(result.current.backgroundIcon).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedRatingAction", () => {
    it("should be defined", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.selectedRatingAction).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("refetchFreetextQuestionRatings", () => {
    it("should be a function", async () => {
      freeTextQuestionRatingsStateSpy.mockReturnValue(getFreeTextQuestionRatingsHookValues())
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(typeof result.current.refetchFreetextQuestionRatings).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("criterionSelections", () => {
    it("should have correct value", async () => {
      const freeTextQuestionRatingsHookValues = getFreeTextQuestionRatingsHookValues()
      const criterionSelectionsMock = flatten(
        freeTextQuestionRatingsHookValues.freetextQuestionRatings.map(mock => mock.criterionSelections)
      )
      freeTextQuestionRatingsStateSpy.mockReturnValue(freeTextQuestionRatingsHookValues)
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.criterionSelections).toEqual(criterionSelectionsMock)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("freetextQuestionRatingsForParticipant", () => {
    it("should have correct value", async () => {
      const freeTextQuestionRatingsHookValues = getFreeTextQuestionRatingsHookValues()
      freeTextQuestionRatingsStateSpy.mockReturnValue(freeTextQuestionRatingsHookValues)
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.freetextQuestionRatingsForParticipant).toEqual(
        freeTextQuestionRatingsHookValues.freetextQuestionRatings
      )
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("dataLoading", () => {
    it("should have correct value", async () => {
      const freeTextQuestionRatingsHookValues = getFreeTextQuestionRatingsHookValues()
      freeTextQuestionRatingsStateSpy.mockReturnValue(freeTextQuestionRatingsHookValues)
      scoreStateSpy.mockReturnValue(scoreHookValuesDefault)
      selectedAnswersSpy.mockReturnValue(selectedAnswersHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyInvitationsSpy.mockReturnValue(surveyInvitationsHookValuesDefault)
      selectedAnswersForParticipantBySurveyInvitationListSpy.mockReturnValue(
        selectedAnswersForParticipantBySurveyInvitationListHookValuesDefault
      )
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
