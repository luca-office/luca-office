import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {SurveyResultsForParticipant} from "../../../../models"
import {Option} from "../../../../utils"
import {
  SurveyResultsForParticipantQuery,
  SurveyResultsForParticipantQueryVariables
} from "../../../generated/SurveyResultsForParticipantQuery"
import {surveyResultsForParticipantQuery} from "../../../queries"

export interface UseSurveyResultsForParticipantLazyHook {
  readonly surveyResultsForParticipantLoading: boolean
  readonly surveyResultsForParticipant: Option<SurveyResultsForParticipant>
  readonly getSurveyResultsForParticipant: (
    surveyId: UUID,
    surveyInvitationId: UUID
  ) => Promise<Option<SurveyResultsForParticipant>>
}

export const useSurveyResultsForParticipantLazy = (): UseSurveyResultsForParticipantLazyHook => {
  const client = useApolloClient()

  const [surveyResultsForParticipantLoading, setSurveyResultsForParticipantLoading] = React.useState(false)
  const [surveyResultsForParticipant, setSurveyResultsForParticipant] = React.useState<
    Option<SurveyResultsForParticipant>
  >(Option.none())

  const getSurveyResultsForParticipant = (surveyId: UUID, surveyInvitationId: UUID) => {
    setSurveyResultsForParticipantLoading(true)

    return new Promise<Option<SurveyResultsForParticipant>>((resolve, reject) =>
      client
        .query<SurveyResultsForParticipantQuery, SurveyResultsForParticipantQueryVariables>({
          query: surveyResultsForParticipantQuery,
          variables: {surveyId, surveyInvitationId}
        })
        .then(result => {
          setSurveyResultsForParticipantLoading(false)

          const data = Option.of(result.data?.surveyResultsForParticipant)
          setSurveyResultsForParticipant(data)
          resolve(data)
        })
        .catch(error => {
          setSurveyResultsForParticipantLoading(false)
          setSurveyResultsForParticipant(Option.none())
          reject(error)
        })
    )
  }

  return {surveyResultsForParticipantLoading, surveyResultsForParticipant, getSurveyResultsForParticipant}
}
