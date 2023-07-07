import {Data} from "react-minimal-pie-chart/types/commonTypes"
import {ProjectModuleProgressType, ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {ModuleProgress, Project, ProjectModule, Survey, UserAccount} from "shared/models"
import {
  borderColorDarker,
  chartCompleteColor,
  chartIncompleteColor,
  chartProgressColor,
  errorColor,
  onlineColor,
  primaryColor,
  successColor
} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {find, Option} from "shared/utils"

export const getSurveyProgressData = (survey: Survey, activeModuleId: Option<UUID>, t: LucaTFunction): Data => {
  const activeModuleProgress = find(
    progress => progress.projectModuleId === activeModuleId.orUndefined(),
    survey.projectModuleProgresses
  )

  const data: {inProgressCount: number; completedCount: number} = activeModuleProgress
    .map(progress => ({
      inProgressCount: progress.inProgressParticipationsCount,
      completedCount: progress.completedParticipationsCount
    }))
    .getOrElse({
      inProgressCount: survey.inProgressParticipationsCount,
      completedCount: survey.completedParticipationsCount
    })

  return [
    {
      color: chartIncompleteColor,
      key: "invited",
      title: t("dashboard__progress_chart_invited"),
      value: survey.invitationsCount - data.inProgressCount - data.completedCount
    },
    {
      color: chartProgressColor,
      key: "active",
      title: t("dashboard__progress_chart_active"),
      value: data.inProgressCount
    },
    {
      color: chartCompleteColor,
      key: "completed",
      title: t("dashboard__progress_chart_completed"),
      value: data.completedCount
    }
  ]
}

export const getProgressColor = (element: ModuleProgress) => {
  switch (element.status) {
    case ProjectModuleProgressType.Completed:
      return chartCompleteColor
    case ProjectModuleProgressType.InProgress:
      return chartProgressColor
    default:
      return chartIncompleteColor
  }
}

interface DashBoardCardData {
  readonly author: Option<UserAccount>
  readonly isFinalized: boolean
  readonly questionsCount: number
  readonly showModules: boolean
  readonly createdAt: string
  readonly description?: string
  readonly maxDurationInSeconds?: number | null
  readonly moduleType?: ProjectModuleType
  readonly title?: string
}

export const getDashBoardCardData = (
  projectOption: Option<Project>,
  currentModuleOption: Option<ProjectModule>
): Option<DashBoardCardData> =>
  projectOption.map<DashBoardCardData>(project => ({
    title: project.name,
    description: project.description,
    maxDurationInSeconds: project.maxDurationInSeconds,
    createdAt: project.createdAt,
    author: Option.of(project.author as UserAccount),
    isFinalized: project.isFinalized,
    questionsCount: -1,
    showModules: true,
    ...currentModuleOption
      .map(module => {
        switch (module.moduleType) {
          case ProjectModuleType.Questionnaire:
            return {
              title: module.questionnaire?.title,
              description: module.questionnaire?.description,
              createdAt: module.questionnaire?.createdAt ?? project.createdAt,
              author: Option.of(module.questionnaire?.author as UserAccount),
              isFinalized: !!module.questionnaire?.finalizedAt,
              questionsCount: module.questionnaire?.questions.length ?? 0,
              showModules: false,
              moduleType: module.moduleType,
              maxDurationInSeconds: module.questionnaire?.maxDurationInSeconds
            }
          case ProjectModuleType.Scenario:
          default:
            return {
              title: module.scenario?.name,
              description: module.scenario?.description,
              createdAt: module.scenario?.createdAt ?? project.createdAt,
              author: Option.of(module.scenario?.author as UserAccount),
              isFinalized: !!module.scenario?.finalizedAt,
              questionsCount: -1,
              showModules: false,
              maxDurationInSeconds: module.scenario?.maxDurationInSeconds,
              moduleType: module.moduleType
            }
        }
      })
      .orUndefined()
  }))

export const getDashBoardCardLabel = (moduleIndex: number, moduleCount: number, t: LucaTFunction) => {
  if (moduleIndex >= 0) {
    return t("dashboard__project_project_module_title", {index: moduleIndex + 1, count: moduleCount})
  } else {
    return t("dashboard__project_project_title")
  }
}

export const getManualSynchronSurveyData = (
  survey: Survey,
  t: LucaTFunction,
  activeModuleId: Option<UUID>,
  onlineCount: number
): Data => {
  const invitationsCount = survey.invitationsCount
  const isProjectOverviewActive = activeModuleId.isEmpty()

  const progressOfCurrentModule = activeModuleId
    .map(moduleId => survey.projectModuleProgresses.find(progress => progress.projectModuleId === moduleId))
    .orNull()

  const hasSurveySomeProgress = survey.projectModuleProgresses.some(
    module => module.inProgressParticipationsCount > 0 || module.completedParticipationsCount > 0
  )

  if (hasSurveySomeProgress) {
    const activeParticipants = isProjectOverviewActive
      ? survey.inProgressParticipationsCount
      : progressOfCurrentModule?.inProgressParticipationsCount ?? 0

    const completedParticipants = isProjectOverviewActive
      ? survey.completedParticipationsCount
      : progressOfCurrentModule?.completedParticipationsCount ?? 0

    const notJoinedParticipants = invitationsCount - activeParticipants - completedParticipants

    return [
      {
        color: borderColorDarker,
        key: "notJoined",
        title: t("dashboard__progress_chart_not_joined"),
        value: notJoinedParticipants
      },
      {
        color: primaryColor,
        key: "active",
        title: t("dashboard__progress_chart_active"),
        value: activeParticipants
      },
      {
        color: onlineColor,
        key: "completed",
        title: t("dashboard__progress_chart_completed"),
        value: completedParticipants
      }
    ]
  }

  // in case that websocket online count is faster then invitationscount of survey query
  const liveInvitationsCount = onlineCount > invitationsCount ? onlineCount : invitationsCount

  return [
    {
      color: errorColor,
      key: "offline",
      title: t("dashboard__progress_chart_offline"),
      value: liveInvitationsCount - onlineCount
    },
    {
      color: successColor,
      key: "online",
      title: t("dashboard__progress_chart_online"),
      value: onlineCount
    }
  ]
}
