import {useQuery} from "@apollo/client"
import {ProjectModuleResults} from "../../../../models"
import {find, getParticipantNameOrToken, Option} from "../../../../utils"
import {
  SurveyResultsForProjectModuleQuery,
  SurveyResultsForProjectModuleQueryVariables
} from "../../../generated/SurveyResultsForProjectModuleQuery"
import {surveyResultsForProjectModuleQuery} from "../../../queries"
import {useSurveyInvitations} from "../survey"

export interface SurveyResultsForProjectModuleProps {
  readonly surveyResultsForProjectModule: Option<ProjectModuleResults>
  readonly surveyResultsForProjectModuleLoading: boolean
}

export const useSurveyResultsForProjectModule = (
  surveyId: UUID,
  projectModuleId: UUID
): SurveyResultsForProjectModuleProps => {
  const {surveyInvitationsLoading, surveyInvitations} = useSurveyInvitations(surveyId)

  const {data, loading} = useQuery<SurveyResultsForProjectModuleQuery, SurveyResultsForProjectModuleQueryVariables>(
    surveyResultsForProjectModuleQuery,
    {
      variables: {
        surveyId,
        projectModuleId
      }
    }
  )

  return {
    surveyResultsForProjectModule: Option.of(data?.surveyResultsForProjectModule).map(
      surveyResultsForProjectModule => ({
        ...surveyResultsForProjectModule,
        participantResults: surveyResultsForProjectModule.participantResults.map(participantResult => ({
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
      })
    ),
    surveyResultsForProjectModuleLoading: loading || surveyInvitationsLoading
  }
}
