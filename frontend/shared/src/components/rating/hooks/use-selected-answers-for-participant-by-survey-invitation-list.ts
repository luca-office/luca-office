import {FetchPolicy} from "@apollo/client/core/watchQueryOptions"
import * as React from "react"
import {QuestionnaireQuestion} from "../../../models"
import {
  SelectedAnswersForParticipantByQuestionListMap,
  useSelectedAnswersForParticipantByQuestionList
} from "./use-selected-answers-for-participant-by-question-list"

export interface UseSelectedAnswersForParticipantBySurveyInvitationListHook {
  readonly selectedAnswersForParticipants: SelectedAnswersForParticipantByQuestionListMap
  readonly selectedAnswersForParticipantsLoading: boolean
  readonly getSelectedAnswersForParticipants: (
    surveyInvitationIds: UUID[],
    questions: QuestionnaireQuestion[],
    fetchPolicy?: FetchPolicy
  ) => Promise<SelectedAnswersForParticipantByQuestionListMap>
}

export const useSelectedAnswersForParticipantBySurveyInvitationList = (): UseSelectedAnswersForParticipantBySurveyInvitationListHook => {
  const [
    selectedAnswersForParticipants,
    setSelectedAnswersForParticipants
  ] = React.useState<SelectedAnswersForParticipantByQuestionListMap>({})

  const {
    getSelectedAnswersForParticipant: getAllSelectedAnswers,
    selectedAnswersForParticipantLoading: selectedAnswersForParticipantsLoading
  } = useSelectedAnswersForParticipantByQuestionList()

  const getSelectedAnswersForParticipantsFromResults = (results: SelectedAnswersForParticipantByQuestionListMap[]) =>
    results.reduce(
      (accumulator, map) =>
        Object.keys(map).reduce(
          (mapAccumulator, questionId) => ({
            ...mapAccumulator,
            [questionId]: [
              ...(accumulator[questionId] ?? []),
              ...(mapAccumulator[questionId] ?? []),
              ...map[questionId]
            ]
          }),
          {} as SelectedAnswersForParticipantByQuestionListMap
        ),
      {} as SelectedAnswersForParticipantByQuestionListMap
    )

  const getSelectedAnswersForParticipants = (
    surveyInvitationIds: UUID[],
    questions: QuestionnaireQuestion[],
    fetchPolicy?: FetchPolicy
  ) =>
    new Promise<SelectedAnswersForParticipantByQuestionListMap>((resolve, reject) =>
      Promise.all(surveyInvitationIds.map(id => getAllSelectedAnswers(id, questions, fetchPolicy)))
        .then(results => {
          const selectedAnswers = getSelectedAnswersForParticipantsFromResults(results)
          setSelectedAnswersForParticipants(selectedAnswers)
          resolve(selectedAnswers)
        })
        .catch(error => {
          setSelectedAnswersForParticipants({})
          reject(error)
        })
    )

  return {
    selectedAnswersForParticipantsLoading,
    selectedAnswersForParticipants,
    getSelectedAnswersForParticipants
  }
}
