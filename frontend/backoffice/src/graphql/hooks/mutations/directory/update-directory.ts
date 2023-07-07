import {useMutation} from "@apollo/client"
import {Option, removeTypename} from "shared/utils"
import {Directory} from "../../../../models"
import {DirectoryUpdate} from "../../../generated/globalTypes"
import {UpdateDirectoryMutation, UpdateDirectoryMutationVariables} from "../../../generated/UpdateDirectoryMutation"
import {updateDirectoryMutation} from "../../../mutations"

export interface UseUpdateDirectoryHook {
  readonly updateDirectory: (id: UUID, update: DirectoryUpdate) => Promise<Option<Directory>>
  readonly updateDirectoryLoading: boolean
}

export const useUpdateDirectory = (): UseUpdateDirectoryHook => {
  const [updateDirectory, {loading}] = useMutation<UpdateDirectoryMutation, UpdateDirectoryMutationVariables>(
    updateDirectoryMutation
  )

  return {
    updateDirectory: (id: UUID, update: DirectoryUpdate) =>
      new Promise<Option<Directory>>((resolve, reject) => {
        updateDirectory({
          variables: {id, update}
        })
          .then(result =>
            resolve(
              result.data && result.data.updateDirectory
                ? Option.of(removeTypename(result.data.updateDirectory))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    updateDirectoryLoading: loading
  }
}
