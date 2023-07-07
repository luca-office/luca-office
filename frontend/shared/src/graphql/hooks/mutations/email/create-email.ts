import {PureQueryOptions, RefetchQueriesFunction, useMutation} from "@apollo/client"
import {Email} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {CreateEmailMutation, CreateEmailMutationVariables} from "../../../generated/CreateEmailMutation"
import {EmailsQuery, EmailsQueryVariables} from "../../../generated/EmailsQuery"
import {EmailCreation} from "../../../generated/globalTypes"
import {createEmailMutation} from "../../../mutations"
import {emailsQuery} from "../../../queries"

export interface UseCreateEmailHook {
  readonly createEmail: (creation: EmailCreation) => Promise<Option<Email>>
  readonly createEmailLoading: boolean
}

export const useCreateEmail = (
  refetchQueries?: (string | PureQueryOptions)[] | RefetchQueriesFunction
): UseCreateEmailHook => {
  const [createEmail, {loading}] = useMutation<CreateEmailMutation, CreateEmailMutationVariables>(createEmailMutation)

  return {
    createEmail: (creation: EmailCreation) =>
      new Promise<Option<Email>>((resolve, reject) => {
        createEmail({
          variables: {creation},
          update: createEntityInCache<EmailsQuery, CreateEmailMutation, EmailsQueryVariables>(
            emailsQuery,
            "emails",
            query => query.emails,
            "createEmail",
            {scenarioId: creation.scenarioId}
          ),
          refetchQueries
        })
          .then(result =>
            resolve(result.data && result.data.createEmail ? Option.of(result.data.createEmail) : Option.none())
          )
          .catch(reject)
      }),
    createEmailLoading: loading
  }
}
