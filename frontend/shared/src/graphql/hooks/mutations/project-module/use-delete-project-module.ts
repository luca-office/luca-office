import {useMutation} from "@apollo/client"
import {
  DeleteProjectModuleMutation,
  DeleteProjectModuleMutationVariables
} from "../../../generated/DeleteProjectModuleMutation"
import {deleteProjectModuleMutation} from "../../../mutations"
import {projectModulesQuery, projectQuery} from "../../../queries"

export interface DeleteProjectModuleHook {
  readonly deleteProjectModule: (id: UUID, skipCacheUpdate?: boolean) => Promise<void>
  readonly deleteProjectModuleLoading: boolean
}

export const useDeleteProjectModule = (projectId: UUID): DeleteProjectModuleHook => {
  const [deleteProjectModule, {loading: deleteProjectModuleLoading}] = useMutation<
    DeleteProjectModuleMutation,
    DeleteProjectModuleMutationVariables
  >(deleteProjectModuleMutation)

  return {
    deleteProjectModule: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteProjectModule({
          variables: {id},
          refetchQueries: [
            {query: projectModulesQuery, variables: {projectId}},
            {query: projectQuery, variables: {id: projectId}}
          ]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteProjectModuleLoading
  }
}
