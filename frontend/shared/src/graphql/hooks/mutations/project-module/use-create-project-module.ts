import {useMutation} from "@apollo/client"
import {ProjectModule} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateProjectModuleMutation,
  CreateProjectModuleMutationVariables
} from "../../../generated/CreateProjectModuleMutation"
import {ProjectModuleCreation} from "../../../generated/globalTypes"
import {createProjectModuleMutation} from "../../../mutations"
import {projectModulesQuery, projectQuery} from "../../../queries"

export interface CreateProjectModuleHook {
  readonly createProjectModule: (
    creation: ProjectModuleCreation,
    skipCacheUpdate?: boolean
  ) => Promise<Option<ProjectModule>>
  readonly createProjectModuleLoading: boolean
}

export const useCreateProjectModule = (): CreateProjectModuleHook => {
  const [createProjectModule, {loading: createProjectModuleLoading}] = useMutation<
    CreateProjectModuleMutation,
    CreateProjectModuleMutationVariables
  >(createProjectModuleMutation)

  return {
    createProjectModule: (creation: ProjectModuleCreation) =>
      new Promise<Option<ProjectModule>>((resolve, reject) => {
        createProjectModule({
          variables: {creation},
          refetchQueries: [
            {query: projectModulesQuery, variables: {projectId: creation.projectId}},
            {query: projectQuery, variables: {id: creation.projectId}}
          ]
        })
          .then(result => resolve(Option.of(result.data?.createProjectModule)))
          .catch(reject)
      }),
    createProjectModuleLoading
  }
}
