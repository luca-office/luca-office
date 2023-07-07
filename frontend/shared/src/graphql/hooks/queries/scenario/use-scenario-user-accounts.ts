import {useQuery} from "@apollo/client"
import {UserAccount} from "../../../../models"
import {
  ScenarioUserAccountsQuery,
  ScenarioUserAccountsQueryVariables
} from "../../../generated/ScenarioUserAccountsQuery"
import {userAccountsForScenarioQuery} from "../../../queries"

export interface ScenarioUserAccountsHook {
  readonly scenarioContributors: UserAccount[]
  readonly scenarioContributorsLoading: boolean
}

export const useScenarioUserAccounts = (scenarioId: UUID): ScenarioUserAccountsHook => {
  const {data, loading} = useQuery<ScenarioUserAccountsQuery, ScenarioUserAccountsQueryVariables>(
    userAccountsForScenarioQuery,
    {
      variables: {scenarioId}
    }
  )

  return {
    scenarioContributors: data?.userAccountsForScenario ?? [],
    scenarioContributorsLoading: loading
  }
}
