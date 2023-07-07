import {useQuery} from "@apollo/client"
import {Scenario} from "../../../../models"
import {Option} from "../../../../utils"
import {ScenarioQuery, ScenarioQueryVariables} from "../../../generated/ScenarioQuery"
import {scenarioQuery} from "../../../queries"

export interface ScenarioProps {
  readonly scenario: Option<Scenario>
  readonly scenarioLoading: boolean
}

export const useScenario = (scenarioId: UUID, skip = false): ScenarioProps => {
  const {data, loading} = useQuery<ScenarioQuery, ScenarioQueryVariables>(scenarioQuery, {
    variables: {id: scenarioId},
    skip: !scenarioId || skip
  })

  return {
    scenario: Option.of(data?.scenario),
    scenarioLoading: loading
  }
}
