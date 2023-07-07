import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {deleteIdEntityFromCache} from "../../../cache"
import {DeleteProjectMutation, DeleteProjectMutationVariables} from "../../../generated/DeleteProjectMutation"
import {ProjectFragment} from "../../../generated/ProjectFragment"
import {ProjectsQuery} from "../../../generated/ProjectsQuery"
import {deleteProjectMutation} from "../../../mutations"
import {projectsQuery} from "../../../queries"

export const useDeleteProject = (): DeleteEntityHook => {
  const [deleteProject, {loading}] = useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(
    deleteProjectMutation
  )

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteProject({
          variables: {id},
          update: deleteIdEntityFromCache<ProjectsQuery, DeleteProjectMutation, unknown, ProjectFragment>(
            projectsQuery,
            "projects",
            id
          )
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
