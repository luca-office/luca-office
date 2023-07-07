import * as apolloClient from "@apollo/client"
import {act, renderHook} from "@testing-library/react-hooks"
import wait from "waait"
import {makeFakeClient} from "../../../../../tests/react-apollo/apollo-fake-client"
import {surveyInvitationIdMock} from "../../../../graphql/__mocks__"
import {questionnaireQuestionsMock} from "../../../../graphql/__mocks__/questionnaire-questions.mock"
import {QuestionType} from "../../../../graphql/generated/globalTypes"
import {requiresScoring} from "../../utils"
import {useSelectedAnswersForParticipantByQuestionList} from "../use-selected-answers-for-participant-by-question-list"

const questionWithAnswers = {...questionnaireQuestionsMock[1], questionType: QuestionType.MultipleChoice}
const questions = [
  ...questionnaireQuestionsMock.slice(0, 1),
  questionWithAnswers,
  ...questionnaireQuestionsMock.slice(2)
]
const correctAnswers = questionWithAnswers.answers.map(({id}) => id)

const fakeClient = makeFakeClient({})
fakeClient.query = jest.fn(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve({data: {selectedAnswersForParticipant: correctAnswers}}), 100)
    })
) as any

const apolloClientSpy = jest.spyOn(apolloClient, "useApolloClient")

const getConnectedHook = () => renderHook(() => useSelectedAnswersForParticipantByQuestionList())

describe("use-selected-answers-for-participant-by-question-list", () => {
  describe("selectedAnswersForParticipantLoading", () => {
    it("should default to be false", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(result.current.selectedAnswersForParticipantLoading).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("should be true while fetching data", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      act(() => result.current.getSelectedAnswersForParticipant(surveyInvitationIdMock, questions) as Promise<any>)
      expect(result.current.selectedAnswersForParticipantLoading).toEqual(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedAnswersForParticipant", () => {
    it("should default to be empty", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(result.current.selectedAnswersForParticipant).toEqual({})
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("should contain correct data after fetch", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result, waitForNextUpdate} = getConnectedHook()
      act(() => result.current.getSelectedAnswersForParticipant(surveyInvitationIdMock, questions) as Promise<any>)
      await waitForNextUpdate()
      expect(result.current.selectedAnswersForParticipant).toEqual(
        questions.reduce(
          (accumulator, question) =>
            requiresScoring(question) ? accumulator : {...accumulator, [question.id]: correctAnswers},
          {}
        )
      )
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("getSelectedAnswersForParticipant", () => {
    it("should be a function", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(typeof result.current.getSelectedAnswersForParticipant).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
