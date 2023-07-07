import {useLazyQuery} from "@apollo/client"
import {Email} from "../../../../models"
import {Option} from "../../../../utils"
import {EmailQuery, EmailQueryVariables} from "../../../generated/EmailQuery"
import {emailQuery} from "../../../queries"

export interface UseEmailLazyHook {
  readonly email: Option<Email>
  readonly emailLoading: boolean
  readonly getEmail: (id: UUID) => void
}

export const useEmailLazy = (): UseEmailLazyHook => {
  const [getEmail, {data, loading}] = useLazyQuery<EmailQuery, EmailQueryVariables>(emailQuery)
  return {
    email: Option.of(data?.email),
    emailLoading: loading,
    getEmail: (id: UUID) => getEmail({variables: {id}})
  }
}
