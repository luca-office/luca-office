import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {ProjectCreation} from "shared/graphql/generated/globalTypes"
import {useCreateProject} from "shared/graphql/hooks"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"

export interface ProjectCreationForm {
  readonly name: string
  readonly description: string
}

export interface UseCreateProjectHook {
  readonly createProject: (creation: ProjectCreation) => void
  readonly createProjectLoading: boolean
  readonly formMethods: UseFormMethods<ProjectCreationForm>
  readonly dismissModal: () => void
}

export const useCreateProjectModal = (): UseCreateProjectHook => {
  const dispatch = useDispatch()
  const {createProject, createProjectLoading} = useCreateProject()
  const formMethods = useForm<ProjectCreationForm>()

  const dismissModal = () => dispatch(navigateToRouteAction(Route.Projects))
  const handleCreateProject = (creation: ProjectCreation) => {
    createProject(creation).then(response =>
      response.forEach(project => dispatch(navigateToRouteAction(Route.ProjectDetail, {id: project.id})))
    )
  }

  return {
    createProject: handleCreateProject,
    createProjectLoading,
    formMethods,
    dismissModal
  }
}
