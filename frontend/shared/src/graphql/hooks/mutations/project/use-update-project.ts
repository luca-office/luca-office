import {useMutation} from "@apollo/client"
import {Project} from "../../../../models"
import {Option} from "../../../../utils"
import {ProjectUpdate} from "../../../generated/globalTypes"
import {UpdateProjectMutation, UpdateProjectMutationVariables} from "../../../generated/UpdateProjectMutation"
import {updateProjectMutation} from "../../../mutations"

export interface UpdateProjectProps {
  readonly updateProject: (id: UUID, update: ProjectUpdate) => Promise<Option<Project>>
  readonly updateProjectLoading: boolean
}

export const useUpdateProject = (): UpdateProjectProps => {
  const [updateProject, {loading}] = useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(
    updateProjectMutation
  )

  return {
    updateProject: (id: UUID, update: ProjectUpdate) =>
      new Promise<Option<Project>>((resolve, reject) => {
        updateProject({
          variables: {id, update}
        })
          .then(result => resolve(Option.of(result.data?.updateProject)))
          .catch(reject)
      }),
    updateProjectLoading: loading
  }
}
