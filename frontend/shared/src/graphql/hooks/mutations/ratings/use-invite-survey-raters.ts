import {useMutation} from "@apollo/client"
import {PureQueryOptions} from "@apollo/client/core/types"
import {
  InviteSurveyRatersMutation,
  InviteSurveyRatersMutationVariables
} from "../../../generated/InviteSurveyRatersMutation"
import {inviteSurveyRatersMutation} from "../../../mutations"
import {surveyUserAccountsQuery} from "../../../queries"

export interface UseInviteSurveyRatersHook {
  readonly inviteSurveyRaters: (emails: string[]) => Promise<void>
  readonly inviteSurveyRatersLoading: boolean
}

export const useInviteSurveyRaters = (
  surveyId: UUID,
  refetchQueries?: PureQueryOptions[]
): UseInviteSurveyRatersHook => {
  const [inviteSurveyRaters, {loading}] = useMutation<InviteSurveyRatersMutation, InviteSurveyRatersMutationVariables>(
    inviteSurveyRatersMutation
  )

  return {
    inviteSurveyRaters: (emails: string[]) =>
      new Promise<void>((resolve, reject) => {
        inviteSurveyRaters({
          variables: {surveyId, emails},
          refetchQueries: [{query: surveyUserAccountsQuery, variables: {surveyId}}, ...(refetchQueries ?? [])]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    inviteSurveyRatersLoading: loading
  }
}
