import {useQuery} from "@apollo/client"
import {Option} from "shared/utils"
import {ScenarioDocuments} from "../../../../models/scenario-documents"
import {ScenarioDocumentsQuery, ScenarioDocumentsQueryVariables} from "../../../generated/ScenarioDocumentsQuery"
import {scenarioDocumentsQuery} from "../../../queries"

export interface ScenarioDocumentProps {
  readonly scenarioDocuments: Option<ScenarioDocuments>
  readonly scenarioDocumentsLoading: boolean
}

export const useScenarioDocuments = (scenarioId: string): ScenarioDocumentProps => {
  const {data, loading} = useQuery<ScenarioDocumentsQuery, ScenarioDocumentsQueryVariables>(scenarioDocumentsQuery, {
    variables: {scenarioId}
  })
  return {
    scenarioDocuments: Option.of(data?.scenarioDocuments),
    scenarioDocumentsLoading: loading
  }
}
