import {isEqual} from "lodash-es"
import * as React from "react"
import {useDispatch} from "react-redux"
import {ParticipantScenarioDetail} from "shared/components"
import {ScenarioState} from "shared/enums"
import {
  useScenario,
  useSurveyParticipationInfo,
  useSurveyResultsForParticipant,
  useSurveyResultsOverview
} from "shared/graphql/hooks"
import {SurveyInvitation} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {navigateToRouteAction} from "../../../redux/actions/routing-action"
import {Route} from "../../../routes"
import {useMonitoringLazy} from "../hooks"
import {getParticipantName} from "../utils/participant-name"

export interface ParticipantScenarioDetailContainerProps {
  readonly surveyId: UUID
  readonly invitationId: UUID
  readonly scenarioId: UUID
  readonly token: string
  readonly onNavigateBack: () => void
}

export const ParticipantScenarioDetailContainer: React.FC<ParticipantScenarioDetailContainerProps> = ({
  surveyId,
  scenarioId,
  onNavigateBack,
  token,
  invitationId
}) => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()

  const surveyInvitationRef = React.useRef<SurveyInvitation | null>()

  const {scenario, scenarioLoading} = useScenario(scenarioId)
  const {surveyResultsOverview, surveyResultsOverviewLoading} = useSurveyResultsOverview(surveyId)
  const {surveyResultsForParticipant} = useSurveyResultsForParticipant(surveyId, invitationId)
  const {
    isManualExecutionTypeSurvey: isChatEnabledForSurvey,
    isLoading: isMonitoringStatusLoading,
    getMonitoring
  } = useMonitoringLazy()

  const {averageScore, maximumScore} = surveyResultsOverview
    .map(resultsOverview => {
      const moduleResult = resultsOverview.projectModuleResults.find(result => result.scenarioId === scenarioId)

      return {
        averageScore: moduleResult?.averageScore,
        maximumScore: moduleResult?.maximumScore
      }
    })
    .getOrElse({averageScore: undefined, maximumScore: undefined})

  const {surveyParticipationInfoLoading, surveyParticipationInfo} = useSurveyParticipationInfo(token)

  const participantScore = surveyResultsForParticipant.flatMap(results =>
    Option.of(
      results.projectModuleScores.find(
        module => module.__typename === "ScenarioScore" && module.scenarioId === scenarioId
      )?.score
    )
  )

  const disableFinalScoreButton = scenario.map(s => s.codingModel === null).getOrElse(false)

  const showScoringOverlay = () =>
    dispatch(
      navigateToRouteAction({
        routeType: Route.ReportScenarioScoringOverlay,
        parameters: {
          surveyInvitationId: invitationId,
          scenarioId,
          surveyId,
          token,
          participantName: participantName.getOrElse("")
        }
      })
    )

  const surveyInvitation = surveyParticipationInfo.map(_ => _.surveyInvitation)

  const participantName = getParticipantName(surveyInvitation)

  const isLoading =
    surveyResultsOverviewLoading || surveyParticipationInfoLoading || isMonitoringStatusLoading || scenarioLoading

  if (!isEqual(surveyInvitationRef.current, surveyInvitation.orNull())) {
    surveyInvitationRef.current = surveyInvitation.orNull()
  }

  React.useEffect(() => {
    const projectId = surveyInvitationRef.current?.survey.projectId
    if (projectId !== undefined) {
      getMonitoring(projectId, surveyId)
    }
  }, [surveyInvitationRef.current])

  return (
    <>
      <ParticipantScenarioDetail
        moduleDescription={scenario.map(s => s.description).getOrElse("")}
        moduleName={scenario.map(s => s.name).getOrElse("")}
        scenarioState={ScenarioState.Completed}
        finalScore={participantScore.getOrElse(0)}
        finalScoreMax={maximumScore}
        finalScoreAverage={averageScore}
        showScoringOverlay={showScoringOverlay}
        onNavigateBack={onNavigateBack}
        navigateBackLabel={t("reporting_result__participant_overview_back_label", {
          name: participantName.getOrElse("")
        })}
        isLoading={isLoading}
        isOfficeReporting={true}
        isChatEnabled={isChatEnabledForSurvey}
        disableFinalScoreButton={disableFinalScoreButton}
      />
    </>
  )
}
