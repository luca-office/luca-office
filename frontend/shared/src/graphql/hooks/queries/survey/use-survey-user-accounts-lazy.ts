import {useLazyQuery} from "@apollo/client"
import {UserAccount} from "../../../../models"
import {SurveyUserAccountsQuery, SurveyUserAccountsQueryVariables} from "../../../generated/SurveyUserAccountsQuery"
import {surveyUserAccountsQuery} from "../../../queries"

export interface UseSurveyUserAccountsLazyHook {
  readonly surveyUserAccounts: UserAccount[]
  readonly surveyUserAccountsLoading: boolean
  readonly getSurveyUserAccounts: (surveyId: UUID) => void
}

export const useSurveyUserAccountsLazy = (): UseSurveyUserAccountsLazyHook => {
  const [getSurveyUserAccounts, {data, loading}] = useLazyQuery<
    SurveyUserAccountsQuery,
    SurveyUserAccountsQueryVariables
  >(surveyUserAccountsQuery)

  return {
    surveyUserAccounts: data?.userAccountsForSurvey ?? [],
    surveyUserAccountsLoading: loading,
    getSurveyUserAccounts: (surveyId: UUID) => getSurveyUserAccounts({variables: {surveyId}})
  }
}
