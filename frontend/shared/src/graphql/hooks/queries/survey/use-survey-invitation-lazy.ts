import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {SurveyInvitation} from "../../../../models"
import {Option} from "../../../../utils"
import {SurveyInvitationQuery, SurveyInvitationQueryVariables} from "../../../generated/SurveyInvitationQuery"
import {surveyInvitationQuery} from "../../../queries"

export interface UseSurveyInvitationLazyHook {
  readonly surveyInvitationLoading: boolean
  readonly surveyInvitation: Option<SurveyInvitation>
  readonly getSurveyInvitation: (token: string) => Promise<Option<SurveyInvitation>>
}

export const useSurveyInvitationLazy = (): UseSurveyInvitationLazyHook => {
  const client = useApolloClient()

  const [surveyInvitationLoading, setSurveyInvitationLoading] = React.useState(false)
  const [surveyInvitation, setSurveyInvitation] = React.useState<Option<SurveyInvitation>>(Option.none())

  const getSurveyInvitation = (token: string) => {
    setSurveyInvitationLoading(true)
    return new Promise<Option<SurveyInvitation>>((resolve, reject) =>
      client
        .query<SurveyInvitationQuery, SurveyInvitationQueryVariables>({
          query: surveyInvitationQuery,
          variables: {token}
        })
        .then(result => {
          setSurveyInvitationLoading(false)

          const data = Option.of(result.data?.surveyInvitation)
          setSurveyInvitation(data)
          resolve(data)
        })
        .catch(error => {
          setSurveyInvitationLoading(false)
          setSurveyInvitation(Option.none())
          reject(error)
        })
    )
  }

  return {
    surveyInvitationLoading,
    surveyInvitation,
    getSurveyInvitation
  }
}
