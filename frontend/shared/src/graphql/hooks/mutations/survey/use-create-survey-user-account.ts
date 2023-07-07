import {useMutation} from "@apollo/client"
import {Option} from "../../../../utils"
import {
  CreateSurveyUserAccountMutation,
  CreateSurveyUserAccountMutationVariables
} from "../../../generated/CreateSurveyUserAccountMutation"
import {SurveyUserAccountFragment} from "../../../generated/SurveyUserAccountFragment"
import {createSurveyUserAccountMutation} from "../../../mutations"
import {surveyUserAccountsQuery} from "../../../queries"

export interface CreateSurveyUserAccountProps {
  readonly createSurveyUserAccount: (userId: UUID) => Promise<Option<SurveyUserAccountFragment>>
  readonly createSurveyUserAccountLoading: boolean
}

export const useCreateSurveyUserAccount = (surveyId: UUID): CreateSurveyUserAccountProps => {
  const [createSurveyUserAccount, {loading}] = useMutation<
    CreateSurveyUserAccountMutation,
    CreateSurveyUserAccountMutationVariables
  >(createSurveyUserAccountMutation)

  return {
    createSurveyUserAccount: (userId: UUID) =>
      new Promise<Option<SurveyUserAccountFragment>>((resolve, reject) => {
        createSurveyUserAccount({
          variables: {surveyId, userAccountId: userId},
          refetchQueries: [{query: surveyUserAccountsQuery, variables: {surveyId}}]
        })
          .then(result => resolve(Option.of<SurveyUserAccountFragment>(result?.data?.createSurveyUserAccount)))
          .catch(reject)
      }),
    createSurveyUserAccountLoading: loading
  }
}
