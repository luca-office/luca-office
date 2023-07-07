import {useMutation} from "@apollo/client"
import {
  InviteProjectContributorsMutation,
  InviteProjectContributorsMutationVariables
} from "../../../generated/InviteProjectContributorsMutation"
import {inviteProjectContributorsMutation} from "../../../mutations"
import {projectUserAccountsQuery} from "../../../queries"

export interface InviteProjectContributorsProps {
  readonly inviteProjectContributors: (emails: string[]) => Promise<void>
  readonly inviteProjectContributorsLoading: boolean
}

export const useInviteProjectContributors = (projectId: UUID): InviteProjectContributorsProps => {
  const [inviteProjectContributors, {loading}] = useMutation<
    InviteProjectContributorsMutation,
    InviteProjectContributorsMutationVariables
  >(inviteProjectContributorsMutation)

  return {
    inviteProjectContributors: (emails: string[]) =>
      new Promise<void>((resolve, reject) => {
        inviteProjectContributors({
          variables: {projectId, emails},
          refetchQueries: [{query: projectUserAccountsQuery, variables: {projectId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    inviteProjectContributorsLoading: loading
  }
}
