import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {SurveyInvitationProgress} from "../../../../models"
import {Option} from "../../../../utils"
import {
  SurveyInvitationsProgressQuery,
  SurveyInvitationsProgressQueryVariables
} from "../../../generated/SurveyInvitationsProgressQuery"
import {surveyInvitationsProgressQuery} from "../../../queries"

export interface UseSurveyInvitationsProgressLazyHook {
  readonly surveyInvitationsProgressLoading: boolean
  readonly surveyInvitationsProgress: Option<SurveyInvitationProgress[]>
  readonly getSurveyInvitationsProgress: (surveyId: UUID) => Promise<Option<SurveyInvitationProgress[]>>
}

export const useSurveyInvitationsProgressLazy = (): UseSurveyInvitationsProgressLazyHook => {
  const client = useApolloClient()

  const [surveyInvitationsProgressLoading, setSurveyInvitationsProgressLoading] = React.useState(false)
  const [surveyInvitationsProgress, setSurveyInvitationsProgress] = React.useState<Option<SurveyInvitationProgress[]>>(
    Option.none()
  )

  const getSurveyInvitationsProgress = (surveyId: UUID) => {
    setSurveyInvitationsProgressLoading(true)

    return new Promise<Option<SurveyInvitationProgress[]>>((resolve, reject) =>
      client
        .query<SurveyInvitationsProgressQuery, SurveyInvitationsProgressQueryVariables>({
          query: surveyInvitationsProgressQuery,
          variables: {surveyId}
        })
        .then(result => {
          setSurveyInvitationsProgressLoading(false)

          const data = Option.of(result.data?.surveyInvitations as SurveyInvitationProgress[])
          setSurveyInvitationsProgress(data)
          resolve(data)
        })
        .catch(error => {
          setSurveyInvitationsProgressLoading(false)
          setSurveyInvitationsProgress(Option.none())
          reject(error)
        })
    )
  }

  return {
    surveyInvitationsProgressLoading,
    surveyInvitationsProgress,
    getSurveyInvitationsProgress
  }
}
