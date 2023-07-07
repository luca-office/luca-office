import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {deleteIdEntityFromCache} from "../../../cache"
import {DeleteRScriptMutation, DeleteRScriptMutationVariables} from "../../../generated/DeleteRScriptMutation"
import {RScriptFragment} from "../../../generated/RScriptFragment"
import {RScriptsQuery} from "../../../generated/RScriptsQuery"
import {deleteRScriptMutation} from "../../../mutations"
import {rScriptsQuery} from "../../../queries"

export const useDeleteRScript = (): DeleteEntityHook => {
  const [deleteRScript, {loading}] = useMutation<DeleteRScriptMutation, DeleteRScriptMutationVariables>(
    deleteRScriptMutation
  )

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteRScript({
          variables: {id},
          update: deleteIdEntityFromCache<RScriptsQuery, DeleteRScriptMutation, unknown, RScriptFragment>(
            rScriptsQuery,
            "rScripts",
            id
          )
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
