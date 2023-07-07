import {Option} from "../../../../utils"
import {useScenario} from "../../queries"
import {useSurveyLight} from "../../queries/survey/use-survey-light"

export interface UseScenarioInfoProps {
  readonly surveyId: UUID
  readonly scenarioId?: UUID
}

export interface ScenarioInfo {
  readonly projectName: string
  readonly scenarioName: string
  readonly surveyTitle: string
  readonly participantCount: number
}

export interface UseScenarioInfo {
  readonly isLoading: boolean
  readonly scenarioInfoOption: Option<ScenarioInfo>
}

export const useScenarioInfo = ({surveyId, scenarioId}: UseScenarioInfoProps): UseScenarioInfo => {
  const {scenario: scenarioOption, scenarioLoading} = useScenario(scenarioId ?? "", scenarioId === undefined)
  const {survey: surveyOption, surveyLoading} = useSurveyLight(surveyId)

  return {
    isLoading: scenarioLoading || surveyLoading,
    scenarioInfoOption: scenarioOption.flatMap(scenario =>
      surveyOption.map(survey => ({
        projectName: survey.project.name,
        scenarioName: scenario.name,
        surveyTitle: survey.title,
        participantCount: survey.invitationsCount
      }))
    )
  }
}
