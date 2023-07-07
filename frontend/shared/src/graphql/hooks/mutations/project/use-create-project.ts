import {useMutation} from "@apollo/client"
import {Project} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {CreateProjectMutation, CreateProjectMutationVariables} from "../../../generated/CreateProjectMutation"
import {ProjectCreation} from "../../../generated/globalTypes"
import {ProjectsQuery} from "../../../generated/ProjectsQuery"
import {createProjectMutation} from "../../../mutations"
import {projectsQuery} from "../../../queries"

export interface CreateProjectProps {
  readonly createProject: (creation: ProjectCreation) => Promise<Option<Project>>
  readonly createProjectLoading: boolean
}

export const useCreateProject = (): CreateProjectProps => {
  const [createProject, {loading}] = useMutation<CreateProjectMutation, CreateProjectMutationVariables>(
    createProjectMutation
  )

  return {
    createProject: (creation: ProjectCreation) =>
      new Promise<Option<Project>>((resolve, reject) => {
        createProject({
          variables: {creation},
          update: createEntityInCache<ProjectsQuery, CreateProjectMutation>(
            projectsQuery,
            "projects",
            query => query.projects,
            "createProject"
          )
        })
          .then(result => resolve(Option.of<Project>(result?.data?.createProject)))
          .catch(reject)
      }),
    createProjectLoading: loading
  }
}
