import {useApolloClient} from "@apollo/client"
import {isManualSurvey, isManualSynchronousSurvey} from "backoffice/src/modules/surveys/utils/common"
import * as React from "react"
import {GetSurveyQuery, GetSurveyQueryVariables} from "shared/graphql/generated/GetSurveyQuery"
import {ProjectModulesQuery, ProjectModulesQueryVariables} from "shared/graphql/generated/ProjectModulesQuery"
import {ProjectQuery, ProjectQueryVariables} from "shared/graphql/generated/ProjectQuery"
import {
  SurveyInvitationsProgressQuery,
  SurveyInvitationsProgressQueryVariables
} from "shared/graphql/generated/SurveyInvitationsProgressQuery"
import {projectModulesQuery, projectQuery, surveyInvitationsProgressQuery, surveyQuery} from "shared/graphql/queries"
import {ParticipantProjectProgress, Project, ProjectModule, Survey, SurveyInvitationProgress} from "shared/models"
import {computeSurveyProgress, Option, removeTypename} from "shared/utils"

export interface UseMonitoringLazyHook {
  readonly isLoading: boolean
  readonly project: Option<Project>
  readonly isManualExecutionTypeSurvey: boolean
  readonly isManualSynchronExecutionTypeSurvey: boolean
  readonly surveyProgress: ParticipantProjectProgress[]
  readonly getMonitoring: (projectId: UUID, surveyId: UUID) => void
}

export const useMonitoringLazy = (): UseMonitoringLazyHook => {
  const client = useApolloClient()

  const [isLoading, setIsLoading] = React.useState(false)
  const [project, setProject] = React.useState<Option<Project>>(Option.none())
  const [isManualExecutionTypeSurvey, setIsManualExecutionTypeSurvey] = React.useState(false)
  const [isManualSynchronExecutionTypeSurvey, setIsManualSynchronExecutionTypeSurvey] = React.useState(false)
  const [surveyProgress, setSurveyProgress] = React.useState<ParticipantProjectProgress[]>([])

  const resetAllData = () => {
    setIsLoading(false)
    setProject(Option.none())
    setIsManualExecutionTypeSurvey(false)
    setIsManualSynchronExecutionTypeSurvey(false)
    setSurveyProgress([])
  }

  const getMonitoring = async (projectId: UUID, surveyId: UUID) => {
    setIsLoading(true)

    let projectObject = Option.none<Project>()
    try {
      const projectResult = await client.query<ProjectQuery, ProjectQueryVariables>({
        query: projectQuery,
        variables: {id: projectId}
      })
      projectObject = Option.of(projectResult.data?.project)
    } catch (error) {
      resetAllData()
      return
    }

    let survey = Option.none<Survey>()
    try {
      const surveyResult = await client.query<GetSurveyQuery, GetSurveyQueryVariables>({
        query: surveyQuery,
        variables: {id: surveyId}
      })
      survey = Option.of(surveyResult.data?.survey)
    } catch (error) {
      resetAllData()
      return
    }

    let projectModules: ProjectModule[] = []
    try {
      const projectModulesResult = await client.query<ProjectModulesQuery, ProjectModulesQueryVariables>({
        query: projectModulesQuery,
        variables: {projectId}
      })
      projectModules = projectModulesResult.data?.projectModules ?? []
    } catch (error) {
      resetAllData()
      return
    }

    let surveyInvitationsProgress = Option.none<SurveyInvitationProgress[]>()
    try {
      const surveyInvitationsProgressResult = await client.query<
        SurveyInvitationsProgressQuery,
        SurveyInvitationsProgressQueryVariables
      >({query: surveyInvitationsProgressQuery, variables: {surveyId}})
      surveyInvitationsProgress = Option.of(surveyInvitationsProgressResult.data?.surveyInvitations.map(removeTypename))
    } catch (error) {
      resetAllData()
      return
    }

    setIsLoading(false)
    setProject(projectObject)
    setIsManualExecutionTypeSurvey(isManualSurvey(survey.map(survey => survey.executionType)))
    setIsManualSynchronExecutionTypeSurvey(isManualSynchronousSurvey(survey.map(survey => survey.executionType)))
    setSurveyProgress(computeSurveyProgress(projectModules, surveyInvitationsProgress))
  }

  return {
    isLoading,
    project,
    isManualExecutionTypeSurvey,
    isManualSynchronExecutionTypeSurvey,
    surveyProgress,
    getMonitoring
  }
}
