import * as React from "react"
import {useState} from "react"
import {LoadingIndicator, Overlay} from "shared/components"
import {
  useCodingDimensions,
  useCodingModel,
  useScenario,
  useScenarioSurveyResultsForParticipants
} from "shared/graphql/hooks"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {ReportingScenarioAllParticipantsOverlay} from "./reporting-scenario-all-participants-overlay"

interface Props {
  readonly surveyId: UUID
  readonly scenarioId: UUID
  readonly onCloseOverlay: () => void
}

export const ReportingScenarioAllParticipantsOverlayContainer: React.FC<Props> = props => {
  const {t} = useLucaTranslation()
  const {surveyId, scenarioId, onCloseOverlay} = props
  const [selectedNodeId, updateSelectedNodeId] = useState(Option.none<string>())

  const {survey: surveyOption} = useSurveyLight(surveyId)
  const {scenario: scenarioOption} = useScenario(scenarioId)

  const codingModelId = scenarioOption.flatMap(scenario => Option.of(scenario.codingModel?.id)).getOrElse("")
  const {codingDimensions} = useCodingDimensions(codingModelId, scenarioOption.isEmpty())
  const {codingModel: codingModelOption} = useCodingModel(codingModelId, scenarioOption.isEmpty())

  const {scenarioSurveyResultsForParticipants} = useScenarioSurveyResultsForParticipants(scenarioId, surveyId)

  const selectOverviewNode = () => updateSelectedNodeId(Option.none())

  return (
    <Overlay>
      {surveyOption
        .flatMap(survey =>
          scenarioOption.flatMap(scenario =>
            codingModelOption.map(codingModel => (
              <ReportingScenarioAllParticipantsOverlay
                t={t}
                project={survey.project}
                survey={survey}
                codingDimensions={codingDimensions}
                codingModel={codingModel}
                scenario={scenario}
                scenarioSurveyResultsForParticipants={scenarioSurveyResultsForParticipants}
                onCloseOverlay={onCloseOverlay}
                selectedNodeId={selectedNodeId}
                updateSelectedNodeId={id => updateSelectedNodeId(Option.of(id))}
                navigateToOverview={selectOverviewNode}
              />
            ))
          )
        )
        .getOrElse(<LoadingIndicator />)}
    </Overlay>
  )
}
