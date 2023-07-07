import {useQuery, WatchQueryFetchPolicy} from "@apollo/client"
import {SurveyResultsOverview} from "../../../../models"
import {find, getParticipantNameOrToken, Option} from "../../../../utils"
import {
  SurveyResultsOverviewQuery,
  SurveyResultsOverviewQueryVariables
} from "../../../generated/SurveyResultsOverviewQuery"
import {surveyResultsOverviewQuery} from "../../../queries"
import {useSurveyInvitations} from "../survey"

export interface SurveyResultsOverviewProps {
  readonly surveyResultsOverview: Option<SurveyResultsOverview>
  readonly surveyResultsOverviewLoading: boolean
}

export const useSurveyResultsOverview = (
  surveyId: UUID,
  skip = false,
  pollingIntervall?: number,
  fetchPolicy?: WatchQueryFetchPolicy
): SurveyResultsOverviewProps => {
  const {surveyInvitationsLoading, surveyInvitations} = useSurveyInvitations(surveyId, skip)

  const {data, loading} = useQuery<SurveyResultsOverviewQuery, SurveyResultsOverviewQueryVariables>(
    surveyResultsOverviewQuery,
    {
      variables: {
        surveyId
      },
      fetchPolicy,
      skip,
      pollInterval: pollingIntervall
    }
  )

  return {
    surveyResultsOverview: Option.of(data?.surveyResultsOverview).map(surveyResultsOverview => ({
      ...surveyResultsOverview,
      participantResults: surveyResultsOverview.participantResults.map(participantResult => ({
        ...participantResult,
        participantName: find(
          surveyInvitation => surveyInvitation.id === participantResult.surveyInvitationId,
          surveyInvitations
        )
          .map<string | null>(surveyInvitation =>
            getParticipantNameOrToken(surveyInvitation.participantData, surveyInvitation.token)
          )
          .getOrElse(participantResult.participantName)
      }))
    })),
    surveyResultsOverviewLoading: loading || surveyInvitationsLoading
  }
}
