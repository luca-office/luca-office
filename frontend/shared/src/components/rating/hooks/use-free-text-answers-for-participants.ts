import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {
  FreeTextAnswerForParticipantQuery,
  FreeTextAnswerForParticipantQueryVariables
} from "../../../graphql/generated/FreeTextAnswerForParticipantQuery"
import {freeTextAnswerForParticipantQuery} from "../../../graphql/queries"
import {Option} from "../../../utils"

export interface FreeTextAnswersForParticipantsMap {
  readonly [participantId: string]: Option<string>
}

export interface UseFreeTextAnswersForParticipantsHook {
  readonly freeTextAnswersForParticipantsLoading: boolean
  readonly freeTextAnswersForParticipants: FreeTextAnswersForParticipantsMap
  readonly getFreeTextAnswersForParticipants: (
    surveyInvitationIds: UUID[],
    questionId: UUID
  ) => Promise<FreeTextAnswersForParticipantsMap>
}

export const useFreeTextAnswersForParticipants = (): UseFreeTextAnswersForParticipantsHook => {
  const client = useApolloClient()

  const [freeTextAnswersForParticipantsLoading, setFreeTextAnswersForParticipantsLoading] = React.useState(false)
  const [
    freeTextAnswersForParticipants,
    setFreeTextAnswersForParticipants
  ] = React.useState<FreeTextAnswersForParticipantsMap>({})

  const getFreeTextAnswersForParticipants = (surveyInvitationIds: UUID[], questionId: UUID) => {
    setFreeTextAnswersForParticipantsLoading(true)
    return new Promise<FreeTextAnswersForParticipantsMap>((resolve, reject) =>
      Promise.all(
        surveyInvitationIds.map(surveyInvitationId =>
          client
            .query<FreeTextAnswerForParticipantQuery, FreeTextAnswerForParticipantQueryVariables>({
              query: freeTextAnswerForParticipantQuery,
              variables: {questionId, surveyInvitationId}
            })
            .then(result => ({[surveyInvitationId]: Option.of(result.data?.freeTextAnswerForParticipant)}))
        )
      )
        .then(results => {
          const freeTextAnswersMap = results.reduce(
            (accumulator, result) => ({...accumulator, ...result}),
            {} as FreeTextAnswersForParticipantsMap
          )
          setFreeTextAnswersForParticipants(freeTextAnswersMap)
          setFreeTextAnswersForParticipantsLoading(false)
          resolve(freeTextAnswersMap)
        })
        .catch(error => {
          setFreeTextAnswersForParticipants({})
          setFreeTextAnswersForParticipantsLoading(false)
          reject(error)
        })
    )
  }

  return {freeTextAnswersForParticipantsLoading, freeTextAnswersForParticipants, getFreeTextAnswersForParticipants}
}
