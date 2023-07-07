import {Relevance} from "../../graphql/generated/globalTypes"

export interface ScenarioErpEntitySelector {
  readonly [selectorKey: string]: number
}

export interface ScenarioErpEntity {
  readonly selector: ScenarioErpEntitySelector
  readonly scenarioId: UUID
  readonly sampleCompanyId: UUID
  readonly relevance: Relevance
}
