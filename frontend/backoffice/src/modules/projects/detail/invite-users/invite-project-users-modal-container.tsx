import * as React from "react"
import {useInviteProjectContributors, useProjectUserAccounts} from "shared/graphql/hooks"
import {ManageInvitationsModal} from "../../../common"

interface Props {
  readonly projectId: UUID
  readonly onDismiss: () => void
}

export const InviteProjectUsersModalContainer: React.FunctionComponent<Props> = ({projectId, onDismiss}) => {
  const getOnlyNewInvitations = (creations: string[], existingEmailAddresses: string[]) =>
    creations.filter(creation => !existingEmailAddresses.includes(creation))

  const {projectUserAccounts: projectUserAccountsOption} = useProjectUserAccounts(projectId)

  const existingEmailAddresses = React.useMemo(
    () => projectUserAccountsOption.map(accounts => accounts.map(account => account.email)).getOrElse([]),
    [projectUserAccountsOption.getOrElse([]).length]
  )
  const {inviteProjectContributors, inviteProjectContributorsLoading} = useInviteProjectContributors(projectId)

  const handleCreateInvitations = (uniqueAddresses: string[]) => {
    if (uniqueAddresses.length > 0) {
      inviteProjectContributors(getOnlyNewInvitations(uniqueAddresses, existingEmailAddresses)).then(() => onDismiss())
    }
  }

  return (
    <ManageInvitationsModal
      onDismiss={onDismiss}
      existingInvitations={existingEmailAddresses}
      handleInvitations={handleCreateInvitations}
      invitationProcessLoading={inviteProjectContributorsLoading}
      labelKey={"projects__users_invite"}
      customInfoTextKey={"scenario_details__users_invite_help_text"}
    />
  )
}
