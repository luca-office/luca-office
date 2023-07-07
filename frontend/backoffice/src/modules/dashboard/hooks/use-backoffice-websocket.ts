import {indexOf} from "lodash"
import {useDispatch, useSelector} from "react-redux"
import {useCheckLogin, useProjectModules} from "shared/graphql/hooks"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {useLucaWebsocket} from "shared/hooks"
import {
  addParticipantChatAction,
  addSupervisorChatMessageAction,
  addUnreadMessageFromParticipant,
  updateAvailableParticipantsAction
} from "shared/redux/actions/data/chat-action"
import {now, Option, sortByPosition} from "shared/utils"
import {ProjectModuleManualSurvey} from "src/redux/state/ui/synchron-survey-state"
import {WebsocketMessages} from "../../../models/websocket"
import {setActiveModuleAction, setActiveModuleIndexAction} from "../../../redux/actions/ui/synchron-survey-action"
import {AppState} from "../../../redux/state/app-state"
import {getWebsocketUrl} from "../../../utils/websocket"
import {isManualSurvey} from "../../surveys/utils/common"

export const useBackofficeWebsocket = (surveyId: UUID | null, projectId: UUID | null) => {
  const dispatch = useDispatch()
  const {account: userAccount} = useCheckLogin()
  const {survey} = useSurveyLight(surveyId ?? "", undefined, surveyId === null)
  const {projectModules} = useProjectModules(projectId ?? "", projectId === null)

  const isChatOpen = useSelector<AppState, boolean>(state => state.ui.common.isChatOpen)
  const currentChatParticipantIds = useSelector<AppState, UUID[]>(state => state.chat.currentChatParticipantIds)
  const activeModule = useSelector<AppState, Option<ProjectModuleManualSurvey>>(
    state => state.ui.synchronSurvey.activeModule
  )

  const url = getWebsocketUrl(surveyId ?? "")
  const shouldConnect = isManualSurvey(survey.map(survey => survey.executionType))

  const sortedProjectModules = sortByPosition(projectModules)

  const setActiveModule = (scenarioId: UUID | null, questionnaireId: UUID | null) => {
    const correspondingProjectModule = sortedProjectModules.find(module =>
      questionnaireId !== null
        ? module.questionnaireId === questionnaireId
        : scenarioId !== null
        ? module.scenarioId === scenarioId
        : false
    )

    if (
      correspondingProjectModule !== undefined &&
      !activeModule.exists(module => module.id === correspondingProjectModule.id)
    ) {
      const indexOfProjectModule = indexOf(sortedProjectModules, correspondingProjectModule)
      dispatch(setActiveModuleIndexAction(Option.of(indexOfProjectModule)))
      dispatch(setActiveModuleAction(Option.of(correspondingProjectModule), now()))
    }
  }

  const onMessage = (message: WebsocketMessages) => {
    switch (message.type) {
      case "SendParticipantChatMessageMessage": {
        if (surveyId !== null) {
          dispatch(
            addParticipantChatAction({
              message: message.message,
              invitationId: message.invitationId,
              surveyId: surveyId
            })
          )

          if (!isChatOpen || (isChatOpen && !currentChatParticipantIds.includes(message.invitationId))) {
            dispatch(addUnreadMessageFromParticipant(message.invitationId))
          }
        }
        break
      }

      // receive other supervisors' chat messages
      case "SendSupervisorChatMessageMessage": {
        if (surveyId !== null) {
          dispatch(
            addSupervisorChatMessageAction({
              userAccountId: userAccount.map(({id}) => id).getOrElse(""),
              recipientInvitationIds: [message.recipientInvitationId],
              message: message.message,
              surveyId: surveyId
            })
          )
        }

        break
      }

      case "AvailableParticipantsMessage":
        dispatch(updateAvailableParticipantsAction(Option.of(message)))
        break
      case "StartScenarioMessage":
        setActiveModule(message.scenarioId, null)
        break
      case "StartQuestionnaireMessage":
        setActiveModule(null, message.questionnaireId)

        break

      default:
        break
    }
  }

  useLucaWebsocket<WebsocketMessages>({
    url,
    shouldConnect,
    onMessage
  })
}
