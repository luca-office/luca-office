import * as React from "react"
import {useInviteScenarioContributors, useScenarioUserAccounts} from "shared/graphql/hooks"
import {ManageInvitationsModal} from "../../../common"

interface Props {
  readonly scenarioId: UUID
  readonly onDismiss: () => void
}

export const InviteScenarioContributorsModalContainer: React.FunctionComponent<Props> = ({scenarioId, onDismiss}) => {
  const getOnlyNewInvitations = (creations: string[], existingEmailAddresses: string[]) =>
    creations.filter(creation => !existingEmailAddresses.includes(creation))

  const {scenarioContributors} = useScenarioUserAccounts(scenarioId)

  const existingEmailAddresses = scenarioContributors.map(account => account.email)

  const {inviteScenarioContributors, inviteScenarioContributorsLoading} = useInviteScenarioContributors(scenarioId)

  const handleCreateInvitations = (uniqueAddresses: string[]) => {
    if (uniqueAddresses.length > 0) {
      inviteScenarioContributors(
        getOnlyNewInvitations(
          uniqueAddresses.map(address => address.toLowerCase()),
          existingEmailAddresses.map(address => address.toLowerCase())
        )
      ).then(() => onDismiss())
    }
  }

  return (
    <ManageInvitationsModal
      onDismiss={onDismiss}
      existingInvitations={existingEmailAddresses}
      handleInvitations={handleCreateInvitations}
      invitationProcessLoading={inviteScenarioContributorsLoading}
      labelKey={"scenario_details__users_invite"}
      customInfoTextKey={"scenario_details__users_invite_help_text"}
    />
  )
}
