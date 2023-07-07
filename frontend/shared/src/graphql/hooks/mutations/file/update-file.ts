import {useMutation} from "@apollo/client"
import {toFile} from "../../../../converters"
import {File} from "../../../../models"
import {Option} from "../../../../utils"
import {FileUpdate} from "../../../generated/globalTypes"
import {UpdateFileMutation, UpdateFileMutationVariables} from "../../../generated/UpdateFileMutation"
import {updateFileMutation} from "../../../mutations"

export interface UseUpdateFileHook {
  readonly updateFile: (id: UUID, update: FileUpdate) => Promise<Option<File>>
  readonly updateFileLoading: boolean
}

export const useUpdateFile = (): UseUpdateFileHook => {
  const [updateFile, {loading}] = useMutation<UpdateFileMutation, UpdateFileMutationVariables>(updateFileMutation)

  return {
    updateFile: (id: UUID, update: FileUpdate) =>
      new Promise<Option<File>>((resolve, reject) => {
        updateFile({
          variables: {id, update}
        })
          .then(result => resolve(Option.of(result.data?.updateFile).map(toFile)))
          .catch(reject)
      }),
    updateFileLoading: loading
  }
}
