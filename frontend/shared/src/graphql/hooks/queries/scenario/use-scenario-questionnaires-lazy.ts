import {useLazyQuery} from "@apollo/client"
import {ScenarioQuestionnaire} from "../../../../models"
import {
  ScenarioQuestionnairesQuery,
  ScenarioQuestionnairesQueryVariables
} from "../../../generated/ScenarioQuestionnairesQuery"
import {scenarioQuestionnairesQuery} from "../../../queries"

export interface ScenarioQuestionnairesLazyProps {
  readonly scenarioQuestionnaires: ScenarioQuestionnaire[]
  readonly scenarioQuestionnairesLoading: boolean
  readonly getScenarioQuestionnaires: (scenarioId: UUID) => void
}

export const useScenarioQuestionnairesLazy = (): ScenarioQuestionnairesLazyProps => {
  const [getScenarioQuestionnaires, {data, loading}] = useLazyQuery<
    ScenarioQuestionnairesQuery,
    ScenarioQuestionnairesQueryVariables
  >(scenarioQuestionnairesQuery)

  return {
    scenarioQuestionnaires: data?.scenarioQuestionnaires ?? [],
    scenarioQuestionnairesLoading: loading,
    getScenarioQuestionnaires: (scenarioId: UUID) => getScenarioQuestionnaires({variables: {scenarioId}})
  }
}
