import * as React from "react"
import {useDispatch} from "react-redux"
import {InterventionGroupType, InterventionHeaderGroupType} from "shared/enums"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {useEmailLazy} from "shared/graphql/hooks"
import {Email, Scenario} from "shared/models"
import {isUUID, Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface UseEmailHook {
  readonly email: Option<Email>
  readonly emailLoading: boolean
  readonly isIntroductionEmail: boolean
  readonly isCreateInterventionModalVisible: boolean
  readonly toggleIsCreateInterventionModalVisible: () => void
  readonly navigateToEmails: () => void
  readonly navigateToIntervention: () => void
}

export const useEmail = (scenario: Option<Scenario>, selectedEmailId: Option<UUID>): UseEmailHook => {
  const dispatch = useDispatch()

  const {email, emailLoading, getEmail} = useEmailLazy()

  const [isCreateInterventionModalVisible, setIsCreateInterventionModalVisible] = React.useState(false)

  const isIntroductionEmail = React.useMemo<boolean>(
    () =>
      email
        .flatMap(mail => scenario.map(scenarioValue => scenarioValue.introductionEmailId === mail.id))
        .getOrElse(false),
    [email]
  )

  React.useEffect(() => {
    selectedEmailId.forEach(id => {
      if (!emailLoading && isUUID(id) && email.map(currentEmail => currentEmail.id !== id).getOrElse(true)) {
        getEmail(id)
      }
    })
  }, [selectedEmailId, email])

  const navigateToEmails = () =>
    scenario.forEach(({id: scenarioId}) =>
      dispatch(
        navigateToRouteAction(Route.ScenarioEmails, {
          scenarioId,
          directory: email.map(mail => mail.directory).getOrElse(EmailDirectory.Inbox)
        })
      )
    )

  const navigateToIntervention = () => {
    scenario.forEach(({id: scenarioId}) =>
      email.forEach(mail =>
        dispatch(
          navigateToRouteAction(Route.ScenarioInterventionsGroupEntityDetail, {
            scenarioId,
            groupType: InterventionGroupType.Email,
            headerGroupType: InterventionHeaderGroupType.Email,
            groupEntityId: mail.id
          })
        )
      )
    )
  }

  return {
    email: selectedEmailId.flatMap(() => email),
    emailLoading,
    isCreateInterventionModalVisible,
    toggleIsCreateInterventionModalVisible: () =>
      setIsCreateInterventionModalVisible(!isCreateInterventionModalVisible),
    isIntroductionEmail,
    navigateToEmails,
    navigateToIntervention
  }
}
