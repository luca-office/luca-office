import {useScenarioQuestionnaires} from "shared/graphql/hooks"
import {ScenarioQuestionnaire, SelectOption} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {getRelevanceCriteria} from "shared/utils"

export interface UseEmailBodyFooterHook {
  readonly relevanceOptions: SelectOption[]
  readonly scenarioQuestionnaires: ScenarioQuestionnaire[]
}

export const useEmailBodyFooter = (scenarioId: UUID): UseEmailBodyFooterHook => {
  const {t} = useLucaTranslation()

  const relevanceOptions = getRelevanceCriteria(t)

  const {scenarioQuestionnaires} = useScenarioQuestionnaires(scenarioId)

  return {
    relevanceOptions,
    scenarioQuestionnaires: scenarioQuestionnaires
      .getOrElse([])
      .filter(questionnaire => questionnaire.scenarioId === scenarioId)
  }
}
