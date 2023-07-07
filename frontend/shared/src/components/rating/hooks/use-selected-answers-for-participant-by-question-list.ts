import {useApolloClient} from "@apollo/client"
import {FetchPolicy} from "@apollo/client/core/watchQueryOptions"
import * as React from "react"
import {
  SelectedAnswersForParticipantQuery,
  SelectedAnswersForParticipantQueryVariables
} from "../../../graphql/generated/SelectedAnswersForParticipantQuery"
import {selectedAnswersForParticipantQuery} from "../../../graphql/queries"
import {QuestionnaireQuestion} from "../../../models"
import {requiresScoring} from "../utils"

export interface SelectedAnswersForParticipantByQuestionListMap {
  readonly [questionId: string]: UUID[]
}

export interface UseSelectedAnswersForParticipantByQuestionListHook {
  readonly selectedAnswersForParticipant: SelectedAnswersForParticipantByQuestionListMap
  readonly selectedAnswersForParticipantLoading: boolean
  readonly getSelectedAnswersForParticipant: (
    surveyInvitationId: UUID,
    questions: QuestionnaireQuestion[],
    fetchPolicy?: FetchPolicy
  ) => Promise<SelectedAnswersForParticipantByQuestionListMap>
}

export const useSelectedAnswersForParticipantByQuestionList = (): UseSelectedAnswersForParticipantByQuestionListHook => {
  const client = useApolloClient()

  const [selectedAnswersForParticipantLoading, setSelectedAnswersForParticipantLoading] = React.useState<boolean>(false)
  const [
    selectedAnswersForParticipant,
    setSelectedAnswersForParticipant
  ] = React.useState<SelectedAnswersForParticipantByQuestionListMap>({})

  const getSelectedAnswersForParticipant = (
    surveyInvitationId: UUID,
    questions: QuestionnaireQuestion[],
    fetchPolicy?: FetchPolicy
  ) =>
    new Promise<SelectedAnswersForParticipantByQuestionListMap>((resolve, reject) => {
      setSelectedAnswersForParticipantLoading(true)
      Promise.all(
        questions
          .filter(question => !requiresScoring(question))
          .map(question =>
            client
              .query<SelectedAnswersForParticipantQuery, SelectedAnswersForParticipantQueryVariables>({
                query: selectedAnswersForParticipantQuery,
                variables: {questionId: question.id, surveyInvitationId},
                fetchPolicy
              })
              .then(result => ({
                questionId: question.id,
                selectedAnswers: result.data?.selectedAnswersForParticipant ?? []
              }))
          )
      )
        .then(results =>
          results.reduce(
            (accumulator, result) => ({...accumulator, [result.questionId]: result.selectedAnswers}),
            {} as SelectedAnswersForParticipantByQuestionListMap
          )
        )
        .then(selectedAnswersByQuestionList => {
          setSelectedAnswersForParticipant(selectedAnswersByQuestionList)
          setSelectedAnswersForParticipantLoading(false)
          resolve(selectedAnswersByQuestionList)
        })
        .catch(error => {
          setSelectedAnswersForParticipantLoading(false)
          reject(error)
        })
    })

  return {selectedAnswersForParticipant, selectedAnswersForParticipantLoading, getSelectedAnswersForParticipant}
}
