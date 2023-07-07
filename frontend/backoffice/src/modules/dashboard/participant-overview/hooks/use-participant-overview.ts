import * as React from "react"
import {ProjectProgressType} from "shared/enums"
import {ProjectModuleProgressType, ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {
  useProjectModules,
  useSurveyInvitations,
  useSurveyInvitationsProgress,
  useSurveyResultsOverview
} from "shared/graphql/hooks"
import {useSurveyResultsForParticipant} from "shared/graphql/hooks/queries/reporting/use-survey-results-for-participant"
import {
  CompletedParticipantCount,
  ParticipantProjectProgress,
  ProjectModuleScore,
  SurveyResultsOverview
} from "shared/models"
import {
  computeSurveyProgress,
  getCompletedParticipantsCount,
  getProjectModuleScores,
  getProjectProgress,
  Option,
  sortByCreatedAt
} from "shared/utils"
import {surveyPollingRate} from "../../../monitoring/config/config"

export interface UseParticipantOverviewHook {
  readonly dataLoading: boolean
  readonly surveyProgress: Option<ParticipantProjectProgress>
  readonly projectProgress: ProjectProgressType
  readonly projectModuleScores: ProjectModuleScore[]
  readonly participantIndex: number
  readonly surveyResultsOverview: Option<SurveyResultsOverview>
  readonly navigateToModule: (moduleType: ProjectModuleType, moduleId: UUID) => void
  readonly completedParticipantsCount: CompletedParticipantCount
}

export const useParticipantOverview = (
  projectId: UUID,
  surveyId: UUID,
  surveyInvitationId: UUID,
  navigateToScenarioDetail: (scenarioId: UUID) => void,
  navigateToQuestionnaireDetail: (questionnaireId: UUID) => void
): UseParticipantOverviewHook => {
  const {surveyInvitations} = useSurveyInvitations(surveyId)

  const pollingRate =
    surveyInvitations.length > 0 &&
    surveyInvitations.every(invitation =>
      invitation.projectModuleProgresses.every(
        projectModuleProgress => projectModuleProgress.status === ProjectModuleProgressType.Completed
      )
    )
      ? undefined
      : surveyPollingRate

  const {surveyInvitationsProgress, surveyInvitationsProgressLoading} = useSurveyInvitationsProgress(
    surveyId,
    pollingRate
  )
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)
  const {surveyResultsForParticipant, surveyResultsForParticipantLoading} = useSurveyResultsForParticipant(
    surveyId,
    surveyInvitationId
  )
  const projectModuleScores: ProjectModuleScore[] = surveyResultsForParticipant
    .map(getProjectModuleScores)
    .getOrElse([])

  const {surveyResultsOverview} = useSurveyResultsOverview(
    surveyId,
    !projectModuleScores.every(module => module.score !== null)
  )

  const surveyProgress = React.useMemo(
    () =>
      computeSurveyProgress(projectModules, surveyInvitationsProgress, projectModuleScores).find(
        progress => progress.id === surveyInvitationId
      ),
    [surveyInvitationsProgressLoading, projectModulesLoading, surveyResultsForParticipantLoading]
  )

  const projectProgress = getProjectProgress(surveyProgress?.moduleProgress, projectModuleScores)

  const participantIndex =
    sortByCreatedAt(surveyInvitations).findIndex(invitation => invitation.id === surveyInvitationId) + 1

  const navigateToModule = (moduleType: ProjectModuleType, moduleId: UUID) => {
    if (moduleType === ProjectModuleType.Scenario) {
      navigateToScenarioDetail(moduleId)
    } else {
      navigateToQuestionnaireDetail(moduleId)
    }
  }

  const completedParticipantsCount = surveyResultsOverview
    .map(getCompletedParticipantsCount)
    .getOrElse({numCompletedParticipants: 0, totalParticipants: 0})

  return {
    dataLoading: surveyInvitationsProgressLoading || projectModulesLoading,
    surveyProgress: Option.of(surveyProgress),
    projectProgress,
    projectModuleScores,
    participantIndex,
    surveyResultsOverview,
    navigateToModule,
    completedParticipantsCount
  }
}
