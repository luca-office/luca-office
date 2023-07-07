import {useMutation} from "@apollo/client"
import {TextDocument} from "../../../../models"
import {Option, removeTypename} from "../../../../utils"
import {TextDocumentUpdate} from "../../../generated/globalTypes"
import {TextDocumentFragment} from "../../../generated/TextDocumentFragment"
import {UpdateTextDocument, UpdateTextDocumentVariables} from "../../../generated/UpdateTextDocument"
import {updateTextDocumentMutation} from "../../../mutations"

export interface UseUpdateTextDocumentHook {
  readonly updateTextDocument: (
    id: UUID,
    update: TextDocumentUpdate,
    onSuccess?: () => void
  ) => Promise<Option<TextDocument>>
  readonly updateTextDocumentLoading: boolean
}

export const useUpdateTextDocument = (): UseUpdateTextDocumentHook => {
  const [updateTextDocument, {loading}] = useMutation<UpdateTextDocument, UpdateTextDocumentVariables>(
    updateTextDocumentMutation
  )

  return {
    updateTextDocument: (id: UUID, update: TextDocumentUpdate, onSuccess?: () => void) =>
      new Promise<Option<TextDocument>>((resolve, reject) => {
        updateTextDocument({
          variables: {id, update}
        })
          .then(result => {
            onSuccess?.()
            return Option.of(removeTypename(result?.data?.updateTextDocument as TextDocumentFragment))
          })
          .catch(reject)
      }),
    updateTextDocumentLoading: loading
  }
}
