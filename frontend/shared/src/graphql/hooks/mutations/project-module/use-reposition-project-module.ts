import {useMutation} from "@apollo/client"
import {ProjectModule} from "../../../../models"
import {Option} from "../../../../utils"
import {
  RepositionProjectModuleMutation,
  RepositionProjectModuleMutationVariables
} from "../../../generated/RepositionProjectModuleMutation"
import {repositionProjectModuleMutation} from "../../../mutations"
import {projectModulesQuery} from "../../../queries"

export interface RepositionProjectModuleHook {
  readonly repositionProjectModule: (id: UUID, predecessorId?: UUID) => Promise<Option<ProjectModule>>
  readonly repositionProjectModuleLoading: boolean
}

export const useRepositionProjectModule = (projectId: UUID): RepositionProjectModuleHook => {
  const [repositionProjectModule, {loading: repositionProjectModuleLoading}] = useMutation<
    RepositionProjectModuleMutation,
    RepositionProjectModuleMutationVariables
  >(repositionProjectModuleMutation)

  return {
    repositionProjectModule: (id: UUID, predecessorId?: UUID) =>
      new Promise<Option<ProjectModule>>((resolve, reject) => {
        repositionProjectModule({
          variables: {id, predecessorId},
          refetchQueries: [{query: projectModulesQuery, variables: {projectId}}]
        })
          .then(result => resolve(Option.of(result.data?.repositionProjectModule)))
          .catch(reject)
      }),
    repositionProjectModuleLoading
  }
}
