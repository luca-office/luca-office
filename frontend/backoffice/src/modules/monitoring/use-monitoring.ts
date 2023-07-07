import {useProject, useProjectModules, useSurveyInvitationsProgress} from "shared/graphql/hooks"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {computeSurveyProgress} from "shared/utils"
import {isSurveyFinished} from "shared/utils/survey-finished"
import {isManualSurvey, isManualSynchronousSurvey} from "../surveys/utils/common"
import {surveyPollingRate} from "./config/config"

export const useMonitoring = (projectId: UUID, surveyId: UUID) => {
  const {project, projectLoading} = useProject(projectId)
  const {survey, surveyLoading} = useSurveyLight(surveyId)
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)

  const {surveyInvitationsProgress, surveyInvitationsProgressLoading} = useSurveyInvitationsProgress(
    surveyId,
    survey.exists(survey => isSurveyFinished(survey)) ? undefined : surveyPollingRate
  )

  const isManualExecutionTypeSurvey = isManualSurvey(survey.map(survey => survey.executionType))
  const isManualSynchronExecutionTypeSurvey = isManualSynchronousSurvey(survey.map(survey => survey.executionType))

  const surveyProgress = computeSurveyProgress(projectModules, surveyInvitationsProgress)

  return {
    projectOption: project,
    isManualExecutionTypeSurvey,
    isManualSynchronExecutionTypeSurvey,
    surveyProgress,
    isLoading: projectLoading || surveyLoading || projectModulesLoading || surveyInvitationsProgressLoading
  }
}
