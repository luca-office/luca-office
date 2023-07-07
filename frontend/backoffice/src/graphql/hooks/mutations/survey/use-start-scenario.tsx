import {useMutation} from "@apollo/client"
import {latestStartedProjectModuleQuery} from "shared/graphql/queries"
import {Option} from "shared/utils"
import {startScenarioMutation} from "../../../../graphql/mutations"
import {StartScenarioMutation, StartScenarioMutationVariables} from "../../../generated/StartScenarioMutation"

export interface UseStartScenarioHook {
  readonly startScenario: (scenarioId: UUID, surveyId: UUID) => Promise<Option<string>>
  readonly startScenarioLoading: boolean
}

export const useStartScenario = (): UseStartScenarioHook => {
  const [startScenario, {loading}] = useMutation<StartScenarioMutation, StartScenarioMutationVariables>(
    startScenarioMutation
  )

  return {
    startScenario: (scenarioId: UUID, surveyId: UUID) =>
      new Promise<Option<string>>((resolve, reject) => {
        startScenario({
          variables: {scenarioId, surveyId},
          refetchQueries: [{query: latestStartedProjectModuleQuery, variables: {surveyId}}]
        })
          .then(result => resolve(Option.of(result.data?.startScenario)))
          .catch(reject)
      }),
    startScenarioLoading: loading
  }
}
