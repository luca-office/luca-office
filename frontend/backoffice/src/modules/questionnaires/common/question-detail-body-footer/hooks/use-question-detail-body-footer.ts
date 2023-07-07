import React from "react"
import {useScenario, useScenarioQuestionnaires, useUpdateScenarioQuestionnaire} from "shared/graphql/hooks"
import {convertSecondsToMinutes} from "shared/utils"
import {defaultEventActivationDelaySeconds} from "../../../config"

export interface UseQuestionDetailBodyFooterHook {
  readonly displayEventDelayModal: boolean
  readonly setDisplayEventDelayModal: (isVisible: boolean) => void
  readonly loading: boolean
  readonly activationDelaySeconds: number
  readonly onUpdateDelay: (activationDelaySeconds: number) => void
  readonly maxScenarioDuration: number
  readonly existingDurations: number[]
}

export const useQuestionDetailBodyFooter = (
  questionnaireId: UUID,
  scenarioId: UUID
): UseQuestionDetailBodyFooterHook => {
  const [displayEventDelayModal, setDisplayEventDelayModal] = React.useState<boolean>(false)

  const {scenario: scenarioOption, scenarioLoading} = useScenario(scenarioId)
  const {scenarioQuestionnaires, scenarioQuestionnairesLoading} = useScenarioQuestionnaires(scenarioId)
  const {updateScenarioQuestionnaire} = useUpdateScenarioQuestionnaire()

  const selectedQuestionnaire = scenarioQuestionnaires.map(questionnaires =>
    questionnaires.find(questionnaire => questionnaire.questionnaireId === questionnaireId)
  )

  const maxScenarioDuration = scenarioOption
    .map(scenario => (scenario.maxDurationInSeconds ? convertSecondsToMinutes(scenario.maxDurationInSeconds) : -1))
    .getOrElse(-1)

  const activationDelaySeconds = selectedQuestionnaire
    .map(questionnaire => questionnaire?.activationDelayInSeconds ?? defaultEventActivationDelaySeconds)
    .getOrElse(defaultEventActivationDelaySeconds)

  const onUpdateDelay = (activationDelayInSeconds: number) =>
    updateScenarioQuestionnaire(scenarioId, questionnaireId, {activationDelayInSeconds: activationDelayInSeconds})

  return {
    loading: scenarioLoading || scenarioQuestionnairesLoading,
    activationDelaySeconds,
    displayEventDelayModal,
    setDisplayEventDelayModal,
    onUpdateDelay,
    maxScenarioDuration,
    existingDurations: scenarioQuestionnaires
      .getOrElse([])
      .filter(sq => sq.questionnaireId !== questionnaireId)
      .map(sq => convertSecondsToMinutes(sq.activationDelayInSeconds))
  }
}
