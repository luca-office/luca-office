import {useMutation} from "@apollo/client"
import {Option} from "../../../../utils"
import {
  CreateProjectUserAccountMutation,
  CreateProjectUserAccountMutationVariables
} from "../../../generated/CreateProjectUserAccountMutation"
import {ProjectUserAccountFragment} from "../../../generated/ProjectUserAccountFragment"
import {createProjectUserAccountMutation} from "../../../mutations"
import {projectUserAccountsQuery} from "../../../queries"

export interface CreateProjectUserAccountProps {
  readonly createProjectUserAccount: (userId: UUID) => Promise<Option<ProjectUserAccountFragment>>
  readonly createProjectUserAccountLoading: boolean
}

export const useCreateProjectUserAccount = (projectId: UUID): CreateProjectUserAccountProps => {
  const [createProjectUserAccount, {loading}] = useMutation<
    CreateProjectUserAccountMutation,
    CreateProjectUserAccountMutationVariables
  >(createProjectUserAccountMutation)

  return {
    createProjectUserAccount: (userId: UUID) =>
      new Promise<Option<ProjectUserAccountFragment>>((resolve, reject) => {
        createProjectUserAccount({
          variables: {projectId, userAccountId: userId},
          refetchQueries: [{query: projectUserAccountsQuery, variables: {projectId}}]
        })
          .then(result => resolve(Option.of<ProjectUserAccountFragment>(result?.data?.createProjectUserAccount)))
          .catch(reject)
      }),
    createProjectUserAccountLoading: loading
  }
}
