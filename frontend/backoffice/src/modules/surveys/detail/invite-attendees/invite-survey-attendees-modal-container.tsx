import * as React from "react"
import {SurveyInvitationCreation} from "shared/graphql/generated/globalTypes"
import {useCreateSurveyInvitations, useSurveyInvitations} from "shared/graphql/hooks"
import {ManageInvitationsModal} from "../../../common"

interface Props {
  readonly surveyId: UUID
  readonly projectId: UUID
  readonly onDismiss: () => void
}

export const InviteSurveyAttendeesModalContainer: React.FunctionComponent<Props> = ({
  surveyId,
  projectId,
  onDismiss
}) => {
  const {surveyInvitations} = useSurveyInvitations(surveyId)
  const existingEmailAddresses = surveyInvitations
    .filter(invitation => invitation.email !== null)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map(invitation => invitation.email!)
  const {createSurveyInvitations, isCreateSurveyInvitationsLoading} = useCreateSurveyInvitations(surveyId, projectId)

  const handleCreateSurveyInvitations = (uniqueAddresses: string[]) => {
    const creations: SurveyInvitationCreation[] = uniqueAddresses.map(address => ({
      email: address,
      surveyId
    }))
    if (creations.length > 0) {
      createSurveyInvitations(getOnlyNewSurveyInvitations(creations, existingEmailAddresses)).then(() => onDismiss())
    }
  }

  return (
    <ManageInvitationsModal
      onDismiss={onDismiss}
      existingInvitations={existingEmailAddresses}
      handleInvitations={handleCreateSurveyInvitations}
      invitationProcessLoading={isCreateSurveyInvitationsLoading}
      labelKey={"projects__survey_details_invite_title"}
    />
  )
}

const getOnlyNewSurveyInvitations = (creations: SurveyInvitationCreation[], existingEmailAddresses: string[]) =>
  creations.filter(creation => !existingEmailAddresses.includes(creation.email))
