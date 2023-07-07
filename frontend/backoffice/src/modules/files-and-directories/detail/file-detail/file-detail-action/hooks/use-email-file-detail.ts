import {useDispatch} from "react-redux"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {useEmail} from "shared/graphql/hooks"
import {Email} from "shared/models/email"
import {Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../../routes"

export interface UseEmailFileDetailHook {
  readonly email: Option<Email>
  readonly emailLoading: boolean
  readonly navigateToEmail: (dir: EmailDirectory) => void
}

export const useEmailFileDetail = (scenarioId: UUID, emailId: UUID): UseEmailFileDetailHook => {
  const {email, emailLoading} = useEmail(emailId)
  const dispatch = useDispatch()

  const navigateToEmail = (dir: EmailDirectory) =>
    dispatch(navigateToRouteAction(Route.ScenarioEmails, {directory: dir, scenarioId, emailId}))

  return {
    email,
    emailLoading,
    navigateToEmail
  }
}
