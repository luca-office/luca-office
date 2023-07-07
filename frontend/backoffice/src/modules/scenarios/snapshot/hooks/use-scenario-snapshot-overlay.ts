import {useSurveyInvitations} from "shared/graphql/hooks"
import {find, getParticipantNameOrToken} from "shared/utils"

export interface UseScenarioSnapshotOverlayHook {
  readonly dataLoading: boolean
  readonly participantName: string
}

export const useScenarioSnapshotOverlay = (
  surveyId: UUID,
  surveyInvitationId: UUID
): UseScenarioSnapshotOverlayHook => {
  const {surveyInvitationsLoading, surveyInvitations} = useSurveyInvitations(surveyId)

  const surveyInvitation = find(({id}) => id === surveyInvitationId, surveyInvitations)
  const participantName = surveyInvitation
    .map(({participantData, token}) => getParticipantNameOrToken(participantData, token))
    .getOrElse("")

  return {dataLoading: surveyInvitationsLoading, participantName}
}
