import {useMutation} from "@apollo/client"
import {RScript} from "../../../../models"
import {Option} from "../../../../utils"
import {CreateRScriptMutation, CreateRScriptMutationVariables} from "../../../generated/CreateRScriptMutation"
import {RScriptCreation} from "../../../generated/globalTypes"
import {createRScriptMutation} from "../../../mutations"
import {rScriptsQuery} from "../../../queries"

export interface CreateRScriptProps {
  readonly createRScript: (creation: RScriptCreation) => Promise<Option<RScript>>
  readonly createRScriptLoading: boolean
}

export const useCreateRScript = (): CreateRScriptProps => {
  const [createRScript, {loading}] = useMutation<CreateRScriptMutation, CreateRScriptMutationVariables>(
    createRScriptMutation
  )

  return {
    createRScript: (creation: RScriptCreation) =>
      new Promise<Option<RScript>>((resolve, reject) => {
        createRScript({
          variables: {creation},
          refetchQueries: [{query: rScriptsQuery}]
        })
          .then(result => resolve(Option.of<RScript>(result?.data?.createRScript)))
          .catch(reject)
      }),
    createRScriptLoading: loading
  }
}
