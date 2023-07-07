import {useDispatch, useSelector} from "react-redux"
import {Payload} from "redux-first-router"
import {Email} from "shared/models"
import {Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../../../redux/actions/navigation-action"
import {AppState} from "../../../../../../redux/state/app-state"
import {Route} from "../../../../../../routes"

export interface UseEmailDirectoriesFooterHook {
  readonly handleCreateClick?: () => void
  readonly showCreateEmailModal?: () => void
}

export const useEmailDirectoriesFooter = (
  actionsDisabled: boolean,
  introductionEmail: Option<Email>
): UseEmailDirectoriesFooterHook => {
  const dispatch = useDispatch()
  const directory = useSelector<AppState, Payload | undefined>(store => store.location?.payload?.directory)
  const emailId = useSelector<AppState, Payload | undefined>(store => store.location?.payload?.emailId)
  const scenarioId = useSelector<AppState, Payload | undefined>(store => store.location?.payload?.scenarioId)

  const showCreateEmailModal = !actionsDisabled
    ? () => {
        if (directory && scenarioId) {
          dispatch(
            navigateToRouteAction(Route.ScenarioEmailsEmailCreation, {
              scenarioId,
              emailId,
              directory
            })
          )
        }
      }
    : undefined

  const handleCreateClick =
    !actionsDisabled || introductionEmail.isDefined()
      ? () => {
          if (introductionEmail.isDefined()) {
            introductionEmail.forEach(({id, directory, scenarioId}) => {
              dispatch(
                navigateToRouteAction(Route.ScenarioEmails, {
                  scenarioId,
                  directory,
                  emailId: id
                })
              )
            })
          } else if (scenarioId && directory) {
            dispatch(
              navigateToRouteAction(Route.ScenarioEmailsIntroductionEmailCreation, {
                scenarioId,
                directory,
                emailId
              })
            )
          }
        }
      : undefined

  return {handleCreateClick, showCreateEmailModal}
}
