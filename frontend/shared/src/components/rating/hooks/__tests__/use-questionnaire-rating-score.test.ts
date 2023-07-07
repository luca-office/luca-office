import * as apolloClient from "@apollo/client"
import {act, renderHook} from "@testing-library/react-hooks"
import wait from "waait"
import {makeFakeClient} from "../../../../../tests/react-apollo/apollo-fake-client"
import {
  freetextQuestionRatingCriterionSelectionMock,
  freetextQuestionRatingsMock,
  surveyInvitationIdMock
} from "../../../../graphql/__mocks__"
import {questionnaireQuestionsMock} from "../../../../graphql/__mocks__/questionnaire-questions.mock"
import {useQuestionnaireRatingScore} from "../use-questionnaire-rating-score"

const fakeClient = makeFakeClient({})
fakeClient.query = jest.fn(
  () =>
    new Promise(resolve => {
      setTimeout(
        () => resolve({data: {selectedAnswersForParticipant: questionnaireQuestionsMock[1].answers.map(({id}) => id)}}),
        100
      )
    })
) as any

const apolloClientSpy = jest.spyOn(apolloClient, "useApolloClient")

const getConnectedHook = () =>
  renderHook(() =>
    useQuestionnaireRatingScore({
      surveyInvitationIds: [surveyInvitationIdMock],
      criterionSelections: [
        {
          ...freetextQuestionRatingCriterionSelectionMock,
          criterionId: questionnaireQuestionsMock[0].freetextQuestionCodingCriteria[0].id
        }
      ],
      questions: questionnaireQuestionsMock.map((question, index) => ({
        ...question,
        freetextQuestionCodingCriteria: question.freetextQuestionCodingCriteria.map(criterion => ({
          ...criterion,
          questionId: question.id,
          id: freetextQuestionRatingsMock[index]?.criterionSelections[0].criterionId ?? criterion.id
        }))
      })),
      freetextQuestionRatings: freetextQuestionRatingsMock,
      selectedSurveyInvitationId: surveyInvitationIdMock
    })
  )

describe("use-questionnaire-rating-score", () => {
  describe("overallScore", () => {
    it("should be correct", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(result.current.overallScore).toEqual(6)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("getScoreByQuestion", () => {
    it("should be a function", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(typeof result.current.getScoreByQuestion).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("should return correct score", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(result.current.getScoreByQuestion(questionnaireQuestionsMock[0].id)).toEqual(3)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
