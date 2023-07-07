import * as React from "react"
import {useDispatch} from "react-redux"
import {ProjectProgressType} from "shared/enums"
import {
  useProjectModulesLazy,
  useSurveyParticipationInfo,
  useSurveyResultsForParticipantLazy,
  useSurveyResultsOverview
} from "shared/graphql/hooks"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {ParticipantProjectProgress, ProjectModuleScore, SurveyLight} from "shared/models"
import {find, getProjectModuleScores, getProjectProgress, Option} from "shared/utils"
import {navigateToRouteAction, navigateToRouteLegacyAction} from "../../../../redux/actions/routing-action"
import {Route} from "../../../../routes"
import {getParticipantProjectProgress} from "../../utils"
import {getParticipantName} from "../../utils/participant-name"

export interface UseReportingOverviewHook {
  readonly dataLoading: boolean
  readonly survey: Option<SurveyLight>
  readonly participantName: Option<string>
  readonly averageScore: number
  readonly maximumScore: number
  readonly participantScore: number
  readonly participantProjectProgress: Option<ParticipantProjectProgress>
  readonly projectProgress: ProjectProgressType
  readonly navigateToScenarioDetail: (scenarioId: UUID) => void
  readonly navigateToQuestionnaireDetail: (questionnaireId: UUID) => void
  readonly navigateToOverview: () => void
  readonly surveyInvitationId: UUID | null
}

interface UseReportingOverviewParams {
  readonly surveyId: UUID
  readonly token: string
}

export const useReportingOverview = ({surveyId, token}: UseReportingOverviewParams): UseReportingOverviewHook => {
  const {surveyLoading, survey} = useSurveyLight(surveyId)
  const {surveyResultsOverviewLoading, surveyResultsOverview} = useSurveyResultsOverview(surveyId)
  const {surveyParticipationInfoLoading, surveyParticipationInfo} = useSurveyParticipationInfo(token)
  const {projectModulesLoading, projectModules, getProjectModules} = useProjectModulesLazy()
  const {
    surveyResultsForParticipantLoading,
    surveyResultsForParticipant,
    getSurveyResultsForParticipant
  } = useSurveyResultsForParticipantLazy()

  const dispatch = useDispatch()

  const projectId = surveyParticipationInfo.map(({surveyInvitation}) => surveyInvitation?.survey?.projectId).orNull()
  const surveyInvitationId = surveyParticipationInfo.map(({surveyInvitation}) => surveyInvitation?.id).orNull()

  const participantName = getParticipantName(surveyParticipationInfo.map(_ => _.surveyInvitation))

  const navigateToScenarioDetail = (scenarioId: UUID) => {
    if (surveyInvitationId) {
      dispatch(
        navigateToRouteLegacyAction({routeType: Route.ReportScenario, parameters: {surveyId, token, scenarioId}})
      )
    }
  }
  const navigateToQuestionnaireDetail = (questionnaireId: UUID) => {
    if (surveyInvitationId) {
      dispatch(
        navigateToRouteLegacyAction({
          routeType: Route.ReportQuestionnaire,
          parameters: {surveyId, token, questionnaireId}
        })
      )
    }
  }
  const navigateToOverview = () =>
    dispatch(navigateToRouteAction({routeType: Route.Report, parameters: {surveyId, token}}))

  const projectModulesScores: ProjectModuleScore[] = surveyResultsForParticipant
    .map(getProjectModuleScores)
    .getOrElse([])

  const {averageScore, maximumScore, participantScore} = surveyResultsOverview
    .map(({averageScore, maximumScore, participantResults}) => {
      const participantResult = surveyParticipationInfo.flatMap(({surveyInvitation}) =>
        find(
          ({surveyInvitationId: invitationId}) =>
            surveyInvitation?.id !== undefined && surveyInvitation.id === invitationId,
          participantResults
        )
      )

      return {
        averageScore: averageScore ?? 0,
        maximumScore,
        participantScore: participantResult.map(({score}) => score).getOrElse(0)
      }
    })
    .getOrElse({averageScore: 0, maximumScore: 0, participantScore: 0})

  const participantProjectProgress = surveyParticipationInfo.map(({surveyInvitation}) =>
    surveyInvitation !== null
      ? getParticipantProjectProgress({surveyInvitation, participantName, projectModules, projectModulesScores})
      : null
  ) as Option<ParticipantProjectProgress>

  const projectProgress = getProjectProgress(
    participantProjectProgress.map(({moduleProgress}) => moduleProgress).getOrElse([]),
    projectModulesScores
  )

  const dataLoading =
    surveyLoading ||
    surveyResultsOverviewLoading ||
    surveyParticipationInfoLoading ||
    projectModulesLoading ||
    surveyResultsForParticipantLoading

  React.useEffect(() => {
    if (projectId !== null) {
      getProjectModules(projectId)
    }
  }, [projectId])

  React.useEffect(() => {
    if (surveyInvitationId !== null) {
      getSurveyResultsForParticipant(surveyId, surveyInvitationId)
    }
  }, [surveyId, surveyInvitationId])

  return {
    dataLoading,
    survey,
    participantName,
    averageScore,
    maximumScore,
    participantScore,
    participantProjectProgress,
    projectProgress,
    navigateToScenarioDetail,
    navigateToOverview,
    navigateToQuestionnaireDetail,
    surveyInvitationId
  }
}
