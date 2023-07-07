import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {deleteIdEntityFromCache} from "../../../cache"
import {DeleteEmailMutation, DeleteEmailMutationVariables} from "../../../generated/DeleteEmailMutation"
import {EmailFragment} from "../../../generated/EmailFragment"
import {EmailsQuery, EmailsQueryVariables} from "../../../generated/EmailsQuery"
import {deleteEmailMutation} from "../../../mutations"
import {emailsQuery} from "../../../queries"

export const useDeleteEmail = (scenarioId: UUID): DeleteEntityHook => {
  const [deleteEmail, {loading}] = useMutation<DeleteEmailMutation, DeleteEmailMutationVariables>(deleteEmailMutation)

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteEmail({
          variables: {id},
          update: deleteIdEntityFromCache<EmailsQuery, DeleteEmailMutation, EmailsQueryVariables, EmailFragment>(
            emailsQuery,
            "emails",
            id,
            {scenarioId}
          )
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
