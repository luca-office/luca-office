import {ScenarioErpEntity} from "../../../models"

export const toScenarioErpEntity = <T extends Omit<ScenarioErpEntity, "selector">>(
  data: T,
  selectorKeys: (keyof T)[]
): ScenarioErpEntity => ({
  scenarioId: data.scenarioId,
  sampleCompanyId: data.sampleCompanyId,
  relevance: data.relevance,
  selector: selectorKeys.reduce((accumulator, key) => ({...accumulator, [key]: data[key]}), {})
})
