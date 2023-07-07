import {useDispatch, useSelector} from "react-redux"
import {ProjectModuleEndType} from "shared/enums/project-module-end-type"
import {ProjectModuleType, SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {useLucaWebsocket} from "shared/hooks"
import {addSupervisorChatMessageAction, addUnreadMessageFromSupervisor} from "shared/redux/actions/data/chat-action"
import {sendEndQuestionnaireEvent, sendEndScenarioEvent, sendReceiveSupervisorChatMessageEvent} from "shared/utils"
import {getPlayerWebsocketUrl} from "shared/utils/websocket"
import {WebsocketMessages} from "../models/websocket"
import {useSurveyProgress} from "../modules/common/hooks/use-survey-progress"
import {AppState} from "../redux/state/app-state"
import {Route} from "../routes"
import {useGetSurveyInvitationFromRedux} from "./use-get-survey-invitation"

export const usePlayerWebsocket = (isChatOpened: boolean) => {
  const dispatch = useDispatch()
  const {
    handleEndProject,
    startSpecificModuleById,
    resetLocalStateAndCloseWindows,
    activeModuleOption
  } = useSurveyProgress()
  const {executionTypeOption, surveyIdOption, invitationIdOption} = useGetSurveyInvitationFromRedux()
  const url = getPlayerWebsocketUrl(surveyIdOption.getOrElse(""), invitationIdOption.getOrElse(""))

  const withSurveyParams = (handler: (surveyId: UUID, invitationId: UUID) => void) =>
    surveyIdOption.forEach(surveyId => invitationIdOption.forEach(invitationId => handler(surveyId, invitationId)))

  const activeRoute = useSelector<AppState, Route>(state => state.routing.activeRoute)

  const isInWaitingOrEndRoom =
    activeRoute === Route.WaitForManualSurveyStart ||
    activeRoute === Route.EndOfProject ||
    activeRoute === Route.WaitForNextModule

  const shouldConnect =
    (activeModuleOption.isDefined() || isInWaitingOrEndRoom) &&
    !executionTypeOption.contains(SurveyExecutionType.AutomaticAsynchronous) &&
    surveyIdOption.isDefined() &&
    invitationIdOption.isDefined()

  const handleModuleInterruption = () => {
    activeModuleOption.forEach(module => {
      if (module.moduleType === ProjectModuleType.Questionnaire && module.questionnaireId !== null) {
        withSurveyParams(
          sendEndQuestionnaireEvent(module.questionnaireId, {
            questionnaireId: module.questionnaireId,
            endType: ProjectModuleEndType.ByCommand
          })
        )
      } else if (module.moduleType === ProjectModuleType.Scenario && module.scenarioId !== null) {
        withSurveyParams((surveyId, invitationId) =>
          sendEndScenarioEvent(ProjectModuleEndType.ByCommand)(surveyId, invitationId, module.scenarioId!)
        )
      }
    })
  }

  const onMessage = (message: WebsocketMessages) => {
    switch (message.type) {
      case "SendSupervisorChatMessageMessage":
        dispatch(
          addSupervisorChatMessageAction({
            userAccountId: "",
            recipientInvitationIds: [],
            message: message.message,
            surveyId: message.surveyId
          })
        )

        withSurveyParams(sendReceiveSupervisorChatMessageEvent(message.message))

        if (!isChatOpened) {
          dispatch(addUnreadMessageFromSupervisor())
        }
        break
      case "StartQuestionnaireMessage":
        handleModuleInterruption()
        resetLocalStateAndCloseWindows()
        startSpecificModuleById(ProjectModuleType.Questionnaire, message.questionnaireId)
        break
      case "StartScenarioMessage":
        handleModuleInterruption()
        resetLocalStateAndCloseWindows()
        startSpecificModuleById(ProjectModuleType.Scenario, message.scenarioId)
        break
      case "EndSurveyMessage":
        if (!(activeRoute === Route.EndOfProject) && activeModuleOption.isDefined()) {
          handleModuleInterruption()
          handleEndProject()
        }
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
