import {useMutation} from "@apollo/client"
import {RScript} from "../../../../models"
import {Option} from "../../../../utils"
import {ArchiveRScriptMutation, ArchiveRScriptMutationVariables} from "../../../generated/ArchiveRScriptMutation"
import {archiveRScriptMutation} from "../../../mutations"
import {rScriptsQuery} from "../../../queries"

export interface ArchiveRScriptProps {
  readonly archiveRScript: (id: UUID) => Promise<Option<RScript>>
  readonly archiveRScriptLoading: boolean
}

export const useArchiveRScript = (): ArchiveRScriptProps => {
  const [archiveRScript, {loading}] = useMutation<ArchiveRScriptMutation, ArchiveRScriptMutationVariables>(
    archiveRScriptMutation
  )

  return {
    archiveRScript: (id: UUID) =>
      new Promise<Option<RScript>>((resolve, reject) => {
        archiveRScript({
          variables: {id}
        })
          .then(result => resolve(Option.of(result.data?.archiveRScript)))
          .catch(reject)
      }),
    archiveRScriptLoading: loading
  }
}
