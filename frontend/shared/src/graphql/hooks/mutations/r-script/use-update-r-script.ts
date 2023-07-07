import {useMutation} from "@apollo/client"
import {RScript} from "../../../../models"
import {Option} from "../../../../utils"
import {RScriptUpdate} from "../../../generated/globalTypes"
import {UpdateRScriptMutation, UpdateRScriptMutationVariables} from "../../../generated/UpdateRScriptMutation"
import {updateRScriptMutation} from "../../../mutations"

export interface UpdateRScriptProps {
  readonly updateRScript: (id: UUID, update: RScriptUpdate) => Promise<Option<RScript>>
  readonly updateRScriptLoading: boolean
}

export const useUpdateRScript = (): UpdateRScriptProps => {
  const [updateRScript, {loading}] = useMutation<UpdateRScriptMutation, UpdateRScriptMutationVariables>(
    updateRScriptMutation
  )

  return {
    updateRScript: (id: UUID, update: RScriptUpdate) =>
      new Promise<Option<RScript>>((resolve, reject) => {
        updateRScript({
          variables: {id, update}
        })
          .then(result => resolve(Option.of(result.data?.updateRScript)))
          .catch(reject)
      }),
    updateRScriptLoading: loading
  }
}
