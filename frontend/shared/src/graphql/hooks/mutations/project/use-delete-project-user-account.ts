import {useMutation} from "@apollo/client"
import {Option} from "../../../../utils"
import {
  DeleteProjectUserAccountMutation,
  DeleteProjectUserAccountMutationVariables
} from "../../../generated/DeleteProjectUserAccountMutation"
import {ProjectUserAccountFragment} from "../../../generated/ProjectUserAccountFragment"
import {deleteProjectUserAccountMutation} from "../../../mutations"
import {projectUserAccountsQuery} from "../../../queries"

export interface DeleteProjectUserAccountProps {
  readonly deleteProjectUserAccount: (userId: UUID) => Promise<Option<ProjectUserAccountFragment>>
  readonly deleteProjectUserAccountLoading: boolean
}

export const useDeleteProjectUserAccount = (projectId: UUID): DeleteProjectUserAccountProps => {
  const [deleteProjectUserAccount, {loading}] = useMutation<
    DeleteProjectUserAccountMutation,
    DeleteProjectUserAccountMutationVariables
  >(deleteProjectUserAccountMutation)

  return {
    deleteProjectUserAccount: (userId: UUID) =>
      new Promise<Option<ProjectUserAccountFragment>>((resolve, reject) => {
        deleteProjectUserAccount({
          variables: {projectId, userAccountId: userId},
          refetchQueries: [{query: projectUserAccountsQuery, variables: {projectId}}]
        })
          .then(result => resolve(Option.of<ProjectUserAccountFragment>(result?.data?.deleteProjectUserAccount)))
          .catch(reject)
      }),
    deleteProjectUserAccountLoading: loading
  }
}
