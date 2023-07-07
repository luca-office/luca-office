import {useQuery} from "@apollo/client"
import {
  ScenarioQuestionnairesQuery,
  ScenarioQuestionnairesQueryVariables
} from "shared/graphql/generated/ScenarioQuestionnairesQuery"
import {Option} from "shared/utils"
import {scenarioQuestionnairesQuery} from "../../../queries"

export const useScenarioQuestionnaires = (scenarioId?: UUID) => {
  const {data, loading} = useQuery<ScenarioQuestionnairesQuery, ScenarioQuestionnairesQueryVariables>(
    scenarioQuestionnairesQuery,
    {
      skip: !scenarioId,
      variables: {scenarioId: scenarioId || ""}
    }
  )

  return {
    scenarioQuestionnaires: Option.of(data?.scenarioQuestionnaires),
    scenarioQuestionnairesLoading: loading
  }
}
