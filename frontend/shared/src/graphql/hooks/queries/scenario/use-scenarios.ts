import {useQuery} from "@apollo/client"
import {ScenarioLight} from "../../../../models"
import {Option} from "../../../../utils"
import {ScenariosQuery} from "../../../generated/ScenariosQuery"
import {scenariosQuery} from "../../../queries"

export interface ScenariosProps {
  readonly scenarios: Option<ScenarioLight[]>
  readonly areScenariosLoading: boolean
}

export const useScenarios = (): ScenariosProps => {
  const {data, loading} = useQuery<ScenariosQuery>(scenariosQuery)

  return {
    scenarios: Option.of(data?.scenarios),
    areScenariosLoading: loading
  }
}
