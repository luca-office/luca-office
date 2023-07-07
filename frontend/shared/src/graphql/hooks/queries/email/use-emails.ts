import {useQuery} from "@apollo/client"
import {Email} from "../../../../models"
import {Option} from "../../../../utils"
import {EmailsQuery, EmailsQueryVariables} from "../../../generated/EmailsQuery"
import {emailsQuery} from "../../../queries"

export interface UseEmailsHook {
  readonly emails: Option<Email[]>
  readonly emailsLoading: boolean
}

export const useEmails = (scenarioId: UUID, skip = false): UseEmailsHook => {
  const {data, loading} = useQuery<EmailsQuery, EmailsQueryVariables>(emailsQuery, {variables: {scenarioId}, skip})
  return {
    emails: data && data.emails ? Option.of(data.emails) : Option.none(),
    emailsLoading: loading
  }
}
