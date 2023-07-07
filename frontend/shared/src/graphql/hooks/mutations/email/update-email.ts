import {useMutation} from "@apollo/client"
import {Email} from "../../../../models"
import {Option, removeTypename} from "../../../../utils"
import {EmailFragment} from "../../../generated/EmailFragment"
import {EmailUpdate} from "../../../generated/globalTypes"
import {UpdateEmailMutation, UpdateEmailMutationVariables} from "../../../generated/UpdateEmailMutation"
import {updateEmailMutation} from "../../../mutations"

export interface UseUpdateEmailHook {
  readonly updateEmail: (id: UUID, update: EmailUpdate, onSuccess?: () => void) => Promise<Option<Email>>
  readonly updateEmailLoading: boolean
}

export const useUpdateEmail = (): UseUpdateEmailHook => {
  const [updateEmail, {loading}] = useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(updateEmailMutation)

  return {
    updateEmail: (id: UUID, update: EmailUpdate, onSuccess?: () => void) =>
      new Promise<Option<Email>>((resolve, reject) => {
        updateEmail({
          variables: {id, update}
        })
          .then(result => {
            if (onSuccess) {
              onSuccess()
            }
            return Option.of(removeTypename(result?.data?.updateEmail as EmailFragment))
          })
          .catch(reject)
      }),
    updateEmailLoading: loading
  }
}
