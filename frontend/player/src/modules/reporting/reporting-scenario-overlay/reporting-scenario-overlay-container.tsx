import * as React from "react"
import {useState} from "react"
import {LoadingIndicator, Overlay, ReportingScenarioOverlay} from "shared/components"
import {
  useCodingDimensions,
  useCodingModel,
  useScenario,
  useScenarioSurveyResultsForParticipant
} from "shared/graphql/hooks"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"

interface Props {
  readonly surveyId: UUID
  readonly surveyInvitationId: UUID
  readonly participantName: string
  readonly scenarioId: UUID
  readonly onCloseOverlay: () => void
}

export const ReportingScenarioOverlayContainer: React.FC<Props> = props => {
  const {t} = useLucaTranslation()
  const {surveyId, surveyInvitationId, participantName, scenarioId, onCloseOverlay} = props
  const [selectedNodeId, updateSelectedNodeId] = useState(Option.none<string>())

  const {survey: surveyOption} = useSurveyLight(surveyId)
  const {scenario: scenarioOption} = useScenario(scenarioId)

  const codingModelId = scenarioOption.flatMap(scenario => Option.of(scenario.codingModel?.id)).getOrElse("")
  const {codingDimensions} = useCodingDimensions(codingModelId, scenarioOption.isEmpty())
  const {codingModel: codingModelOption} = useCodingModel(codingModelId, scenarioOption.isEmpty())

  const {scenarioSurveyResultsForParticipant} = useScenarioSurveyResultsForParticipant(
    scenarioId,
    surveyId,
    surveyInvitationId
  )

  const selectOverviewNode = () => updateSelectedNodeId(Option.none())

  return (
    <Overlay>
      {surveyOption
        .flatMap(survey =>
          scenarioOption.flatMap(scenario =>
            codingModelOption.flatMap(codingModel =>
              scenarioSurveyResultsForParticipant.map(results => (
                <ReportingScenarioOverlay
                  t={t}
                  participantName={participantName}
                  project={survey.project}
                  survey={survey}
                  codingDimensions={codingDimensions}
                  codingModel={codingModel}
                  scenario={scenario}
                  scenarioSurveyResultsForParticipant={results}
                  onCloseOverlay={onCloseOverlay}
                  selectedNodeId={selectedNodeId}
                  updateSelectedNodeId={id => updateSelectedNodeId(Option.of(id))}
                  navigateToOverview={selectOverviewNode}
                />
              ))
            )
          )
        )
        .getOrElse(<LoadingIndicator />)}
    </Overlay>
  )
}
