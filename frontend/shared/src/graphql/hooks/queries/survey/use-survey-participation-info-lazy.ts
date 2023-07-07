import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {SurveyParticipationInfo} from "../../../../models"
import {Option} from "../../../../utils/option"
import {
  SurveyParticipationInfoQuery,
  SurveyParticipationInfoQueryVariables
} from "../../../generated/SurveyParticipationInfoQuery"
import {surveyParticipationInfoQuery} from "../../../queries"

export interface UseSurveyParticipationInfoLazyHook {
  readonly surveyParticipationInfoLoading: boolean
  readonly surveyParticipationInfo: Option<SurveyParticipationInfo>
  readonly getSurveyParticipationInfo: (token: string) => Promise<Option<SurveyParticipationInfo>>
}

export const useSurveyParticipationInfoLazy = (): UseSurveyParticipationInfoLazyHook => {
  const client = useApolloClient()

  const [surveyParticipationInfoLoading, setSurveyParticipationInfoLoading] = React.useState(false)
  const [surveyParticipationInfo, setSurveyParticipationInfo] = React.useState<Option<SurveyParticipationInfo>>(
    Option.none()
  )

  const getSurveyParticipationInfo = (token: string) => {
    setSurveyParticipationInfoLoading(true)

    return new Promise<Option<SurveyParticipationInfo>>((resolve, reject) =>
      client
        .query<SurveyParticipationInfoQuery, SurveyParticipationInfoQueryVariables>({
          query: surveyParticipationInfoQuery,
          variables: {token},
          fetchPolicy: "network-only"
        })
        .then(result => {
          setSurveyParticipationInfoLoading(false)

          const data = Option.of(result.data?.surveyParticipationInfo)
          setSurveyParticipationInfo(data)
          resolve(data)
        })
        .catch(error => {
          setSurveyParticipationInfoLoading(false)
          setSurveyParticipationInfo(Option.none())
          reject(error)
        })
    )
  }

  return {surveyParticipationInfoLoading, surveyParticipationInfo, getSurveyParticipationInfo}
}
