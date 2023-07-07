import {useQuery} from "@apollo/client"
import {Survey} from "../../../../models"
import {
  SurveysForUserAccountQuery,
  SurveysForUserAccountQueryVariables
} from "../../../generated/SurveysForUserAccountQuery"
import {surveysForUserAccountQuery} from "../../../queries"

export interface UseSurveysForUserAccountHook {
  readonly surveysForUserAccount: Survey[]
  readonly surveysForUserAccountLoading: boolean
}

export const useSurveysForUserAccount = (userAccountId: UUID): UseSurveysForUserAccountHook => {
  const {data, loading} = useQuery<SurveysForUserAccountQuery, SurveysForUserAccountQueryVariables>(
    surveysForUserAccountQuery,
    {variables: {userAccountId}}
  )
  return {surveysForUserAccount: data?.surveysForUserAccount ?? [], surveysForUserAccountLoading: loading}
}
