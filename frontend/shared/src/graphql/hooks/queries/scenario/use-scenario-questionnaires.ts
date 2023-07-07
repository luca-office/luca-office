import {useQuery} from "@apollo/client"
import {ScenarioQuestionnaire} from "../../../../models"
import {Option, removeTypename} from "../../../../utils"
import {
  ScenarioQuestionnairesQuery,
  ScenarioQuestionnairesQueryVariables
} from "../../../generated/ScenarioQuestionnairesQuery"
import {scenarioQuestionnairesQuery} from "../../../queries"

export interface ScenarioQuestionnairesProps {
  readonly scenarioQuestionnaires: Option<ScenarioQuestionnaire[]>
  readonly scenarioQuestionnairesLoading: boolean
}

export const useScenarioQuestionnaires = (scenarioId?: UUID): ScenarioQuestionnairesProps => {
  const {data, loading} = useQuery<ScenarioQuestionnairesQuery, ScenarioQuestionnairesQueryVariables>(
    scenarioQuestionnairesQuery,
    {
      variables: {scenarioId: scenarioId || ""},
      skip: !scenarioId
    }
  )

  return {
    scenarioQuestionnaires: Option.of(data?.scenarioQuestionnaires).map(
      sqs => sqs.map(removeTypename) as ScenarioQuestionnaire[]
    ),
    scenarioQuestionnairesLoading: loading
  }
}
