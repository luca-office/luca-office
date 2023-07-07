import {useQuery} from "@apollo/client"
import {UserAccount} from "../../../../models"
import {SurveyUserAccountsQuery, SurveyUserAccountsQueryVariables} from "../../../generated/SurveyUserAccountsQuery"
import {surveyUserAccountsQuery} from "../../../queries"

export interface SurveyUserAccountsHook {
  readonly surveyUserAccounts: UserAccount[]
  readonly surveyUserAccountsLoading: boolean
}

export const useSurveyUserAccounts = (surveyId: UUID): SurveyUserAccountsHook => {
  const {data, loading} = useQuery<SurveyUserAccountsQuery, SurveyUserAccountsQueryVariables>(surveyUserAccountsQuery, {
    variables: {surveyId}
  })

  return {
    surveyUserAccounts: data?.userAccountsForSurvey ?? [],
    surveyUserAccountsLoading: loading
  }
}
