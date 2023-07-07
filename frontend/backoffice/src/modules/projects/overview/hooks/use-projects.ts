import {useDispatch, useSelector} from "react-redux"
import {useCheckLogin, useProjects as useProjectsQuery} from "shared/graphql/hooks"
import {Project} from "shared/models"
import {Option} from "shared/utils"
import {EntityFilterConfig} from "../../../../models"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {AppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"
import {applyFilterAndSortEntities} from "../../../../utils"

export interface UseProjectsHook {
  readonly loading: boolean
  readonly navigateCreateProject: () => void
  readonly navigateProjectDetail: (id: string) => void
  readonly projects: Project[]
  readonly projectsLoading: boolean
}

export const useProjects = (): UseProjectsHook => {
  const {projects, projectsLoading} = useProjectsQuery()
  const dispatch = useDispatch()
  const {account: user} = useCheckLogin()
  const filterOptions = useSelector<AppState, EntityFilterConfig>(state => state.ui.common.entityFilters.projects)

  const searchableProjects = projects.map(project => ({...project, title: project.name}))

  return {
    loading: projectsLoading,
    projects: applyFilterAndSortEntities<Project>(
      filterOptions,
      searchableProjects,
      user.safeAsSubtype(),
      Option.none()
    ),
    projectsLoading,
    navigateCreateProject: () => dispatch(navigateToRouteAction(Route.ProjectCreation)),
    navigateProjectDetail: (id: string) => dispatch(navigateToRouteAction(Route.ProjectDetail, {id}))
  }
}
