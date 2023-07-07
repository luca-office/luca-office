import {useMutation} from "@apollo/client"
import {
  InviteScenarioContributorsMutation,
  InviteScenarioContributorsMutationVariables
} from "../../../generated/InviteScenarioContributorsMutation"
import {inviteScenarioContributorsMutation} from "../../../mutations"
import {userAccountsForScenarioQuery} from "../../../queries"

export interface InviteScenarioContributorsProps {
  readonly inviteScenarioContributors: (emails: string[]) => Promise<void>
  readonly inviteScenarioContributorsLoading: boolean
}

export const useInviteScenarioContributors = (scenarioId: UUID): InviteScenarioContributorsProps => {
  const [inviteProjectContributors, {loading}] = useMutation<
    InviteScenarioContributorsMutation,
    InviteScenarioContributorsMutationVariables
  >(inviteScenarioContributorsMutation)

  return {
    inviteScenarioContributors: (emails: string[]) =>
      new Promise<void>((resolve, reject) => {
        inviteProjectContributors({
          variables: {scenarioId, emails},
          refetchQueries: [{query: userAccountsForScenarioQuery, variables: {scenarioId}}]
        })
          .then(result => resolve())
          .catch(reject)
      }),
    inviteScenarioContributorsLoading: loading
  }
}
