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

export interface SelectedAnswersForParticipantBySurveyInvitationsListMapEntry {
  readonly [questionId: string]: UUID[]
}

export interface SelectedAnswersForParticipantBySurveyInvitationsListMap {
  readonly [surveyInvitationId: string]: SelectedAnswersForParticipantBySurveyInvitationsListMapEntry
}

export interface UseSelectedAnswersForParticipantBySurveyInvitationsListHook {
  readonly selectedAnswersForParticipant: SelectedAnswersForParticipantBySurveyInvitationsListMap
  readonly selectedAnswersForParticipantLoading: boolean
  readonly getSelectedAnswersForParticipant: (
    surveyInvitationIds: UUID[],
    questions: QuestionnaireQuestion[],
    fetchPolicy?: FetchPolicy
  ) => void
}

export const useSelectedAnswersForParticipantBySurveyInvitationsList = (): UseSelectedAnswersForParticipantBySurveyInvitationsListHook => {
  const client = useApolloClient()

  const [selectedAnswersForParticipantLoading, setSelectedAnswersForParticipantLoading] = React.useState<boolean>(false)
  const [
    selectedAnswersForParticipant,
    setSelectedAnswersForParticipant
  ] = React.useState<SelectedAnswersForParticipantBySurveyInvitationsListMap>({})

  const getSelectedAnswersForParticipant = (
    surveyInvitationIds: UUID[],
    questions: QuestionnaireQuestion[],
    fetchPolicy?: FetchPolicy
  ) => {
    setSelectedAnswersForParticipantLoading(true)
    Promise.all(
      surveyInvitationIds.map(surveyInvitationId =>
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
              {} as SelectedAnswersForParticipantBySurveyInvitationsListMapEntry
            )
          )
          .then(mapEntry => ({[surveyInvitationId]: mapEntry}))
      )
    )
      .then(results =>
        results.reduce((accumulator, result) => {
          const surveyInvitationId = Object.keys(result)[0]
          return surveyInvitationId !== undefined
            ? {...accumulator, [surveyInvitationId]: result[surveyInvitationId]}
            : accumulator
        }, {} as SelectedAnswersForParticipantBySurveyInvitationsListMap)
      )
      .then(results => {
        setSelectedAnswersForParticipant(results)
        setSelectedAnswersForParticipantLoading(false)
      })
      .catch(() => {
        setSelectedAnswersForParticipant({})
        setSelectedAnswersForParticipantLoading(false)
      })
  }

  return {selectedAnswersForParticipant, selectedAnswersForParticipantLoading, getSelectedAnswersForParticipant}
}
