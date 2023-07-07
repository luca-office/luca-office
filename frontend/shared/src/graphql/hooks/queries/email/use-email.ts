import {useQuery} from "@apollo/client"
import {Email} from "../../../../models"
import {Option} from "../../../../utils"
import {EmailQuery, EmailQueryVariables} from "../../../generated/EmailQuery"
import {emailQuery} from "../../../queries"

export interface UseEmailHook {
  readonly email: Option<Email>
  readonly emailLoading: boolean
}

export const useEmail = (id: UUID): UseEmailHook => {
  const {data, loading} = useQuery<EmailQuery, EmailQueryVariables>(emailQuery, {variables: {id}})
  return {
    email: data && data.email ? Option.of(data.email) : Option.none(),
    emailLoading: loading
  }
}
