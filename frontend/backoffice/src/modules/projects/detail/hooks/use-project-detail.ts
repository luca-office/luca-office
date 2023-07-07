import * as React from "react"
import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import {ProjectUpdate} from "shared/graphql/generated/globalTypes"
import {
  ProjectProps,
  SurveysProps,
  useDeleteProjectModule,
  useDeleteSurvey,
  useProject,
  useProjectModules,
  useProjectUserAccounts,
  useRepositionProjectModule,
  useSurveys,
  useUpdateProject
} from "shared/graphql/hooks"
import {ProjectModule, Survey} from "shared/models"
import {Option, sortByPosition} from "shared/utils"
import {ResortableEntity, ResortedEntity} from "../../../../models"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {selectListTabIndexAction} from "../../../../redux/actions/ui/projects-action"
import {setActiveModuleAction, setActiveModuleIndexAction} from "../../../../redux/actions/ui/synchron-survey-action"
import {AppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"
import {convertModulesToSortables} from "../../utils"

export interface ProjectDetailForm {
  readonly name: string
  readonly description: string
  readonly usageField: string
  readonly audience: string
}

export interface UseProjectDetailHook extends Pick<ProjectProps, "project">, Pick<SurveysProps, "surveys"> {
  readonly createModuleModalVisible: boolean
  readonly dataLoading: boolean
  readonly defaultSelectedListTabIndex: number
  readonly deleteProjectModule: (id: UUID) => void
  readonly deleteSurvey: (id: UUID) => void
  readonly formMethods: UseFormMethods<ProjectDetailForm>
  readonly inviteUserModalVisible: boolean
  readonly navigateToOverview: () => void
  readonly navigateToSurvey: (surveyId: UUID) => void
  readonly navigateToSurveyCreation: (isTestSurvey?: boolean) => void
  readonly projectModules: ProjectModule[]
  readonly projectUsersCount: number
  readonly repositionProjectModules: (orderedEntities: ResortedEntity[]) => Promise<Option<ProjectModule>[]>
  readonly resortModalVisible: boolean
  readonly selectListTabIndex: (activeIndex: number) => void
  readonly setCreateModuleModalVisible: (visible: boolean) => void
  readonly setInviteUserModalVisible: (visible: boolean) => void
  readonly setResortModalVisible: (visible: boolean) => void
  readonly surveysLoading: boolean
  readonly sortableModules: ResortableEntity[]
  readonly updateInProgress: boolean
  readonly updateProject: (id: UUID, update: ProjectUpdate) => void
}

export const useProjectDetail = (projectId: UUID): UseProjectDetailHook => {
  const dispatch = useDispatch()
  const formMethods = useForm<ProjectDetailForm>()
  const defaultSelectedTabOption = useSelector<AppState, Option<Map<UUID, number>>>(s => s.ui.projects.selectedListTab)

  const [createModuleModalVisible, setCreateModuleModalVisible] = React.useState(false)
  const [resortModalVisible, setResortModalVisible] = React.useState(false)
  const [inviteUserModalVisible, setInviteUserModalVisible] = React.useState(false)

  const {updateProject, updateProjectLoading} = useUpdateProject()
  const {project, projectLoading} = useProject(projectId)
  const {surveys, surveysLoading} = useSurveys(projectId)
  const {projectUserAccounts} = useProjectUserAccounts(projectId)
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)
  const {deleteEntity: deleteSurvey} = useDeleteSurvey(projectId)
  const {deleteProjectModule} = useDeleteProjectModule(projectId)
  const {repositionProjectModule} = useRepositionProjectModule(projectId)

  const selectedTabIndex = defaultSelectedTabOption.map(data => data.get(projectId) || 0).getOrElse(0)
  const selectTabIndex = (index: number) => {
    if (index !== selectedTabIndex) {
      dispatch(selectListTabIndexAction(projectId, index))
    }
  }

  React.useEffect(() => {
    dispatch(setActiveModuleAction(Option.none()))
    dispatch(setActiveModuleIndexAction(Option.none()))
  }, [])

  const navigateToOverview = () => dispatch(navigateToRouteAction(Route.Projects))
  const navigateToSurveyCreation = (isTestSurvey?: boolean) =>
    dispatch(navigateToRouteAction(isTestSurvey ? Route.TestSurveyCreation : Route.SurveyCreation, {id: projectId}))
  const navigateToSurvey = (surveyId: UUID) =>
    dispatch(navigateToRouteAction(Route.SurveyDetail, {id: projectId, surveyId}))

  const deleteTestSurveys = (surveys: Survey[]) => {
    // all test surveys should be deleted on module repositioning and deletion
    return Promise.all(surveys.filter(survey => survey.isTestSurvey).map(({id}) => deleteSurvey(id)))
  }

  const handleUpdateProject = (id: string, update: ProjectUpdate) => {
    updateProject(id, update).then(response =>
      response.forEach(project => dispatch(navigateToRouteAction(Route.ProjectDetail, {id: project.id})))
    )
  }

  const handleProjectModuleDeletion = (id: UUID) => {
    deleteTestSurveys(surveys).then(() => deleteProjectModule(id))
  }

  const sortableModules: ResortableEntity[] = convertModulesToSortables(projectModules)
  const repositionProjectModules = (orderedEntities: ResortedEntity[]) => {
    return deleteTestSurveys(surveys).then(() =>
      Promise.all(orderedEntities.map(({id, predecessorId}) => repositionProjectModule(id, predecessorId)))
    )
  }

  return {
    createModuleModalVisible,
    dataLoading: projectLoading,
    surveysLoading: surveysLoading,
    defaultSelectedListTabIndex: selectedTabIndex,
    deleteProjectModule: handleProjectModuleDeletion,
    deleteSurvey,
    formMethods,
    inviteUserModalVisible,
    navigateToOverview,
    navigateToSurvey,
    navigateToSurveyCreation,
    project,
    projectModules: sortByPosition(projectModules),
    projectUsersCount: projectUserAccounts.getOrElse([]).length,
    repositionProjectModules,
    resortModalVisible,
    selectListTabIndex: selectTabIndex,
    setCreateModuleModalVisible,
    setInviteUserModalVisible,
    setResortModalVisible,
    sortableModules,
    surveys,
    updateInProgress: updateProjectLoading || projectModulesLoading || surveysLoading,
    updateProject: handleUpdateProject
  }
}
