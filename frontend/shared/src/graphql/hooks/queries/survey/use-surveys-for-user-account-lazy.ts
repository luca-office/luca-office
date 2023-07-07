import {useLazyQuery} from "@apollo/client"
import {Survey} from "../../../../models"
import {
  SurveysForUserAccountQuery,
  SurveysForUserAccountQueryVariables
} from "../../../generated/SurveysForUserAccountQuery"
import {surveysForUserAccountQuery} from "../../../queries"

export interface UseSurveysForUserAccountLazyHook {
  readonly surveysForUserAccount: Survey[]
  readonly surveysForUserAccountLoading: boolean
  readonly getSurveysForUserAccount: (userAccountId: UUID) => void
}

export const useSurveysForUserAccountLazy = (): UseSurveysForUserAccountLazyHook => {
  const [getSurveysForUserAccount, {data, loading}] = useLazyQuery<
    SurveysForUserAccountQuery,
    SurveysForUserAccountQueryVariables
  >(surveysForUserAccountQuery)
  return {
    surveysForUserAccount: data?.surveysForUserAccount ?? [],
    surveysForUserAccountLoading: loading,
    getSurveysForUserAccount: (userAccountId: UUID) => getSurveysForUserAccount({variables: {userAccountId}})
  }
}
