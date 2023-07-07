import {useDispatch} from "react-redux"
import useWebSocket, {ReadyState} from "react-use-websocket"
import {NotificationSeverity} from "../enums"
import {AppNotification, defaultWebSocketConfig, WebSocketConfig} from "../models"
import {updateNotification} from "../redux/actions"
import {updateIsChatAccessibleAction} from "../redux/actions/data/chat-action"
import {parseWebsocketMessage} from "../utils/websocket"
import {Option} from "./../utils"

interface UseLucaWebsocketHookParams<T extends unknown> {
  readonly url: string
  readonly shouldConnect: boolean
  readonly onMessage: (messages: T) => void
  readonly websocketConfig?: WebSocketConfig
  readonly onOpen?: () => void
  readonly onClose?: () => void
  readonly onError?: () => void
}

interface UseLucaWebsocketHook {
  readonly readyState: ReadyState
}

export const useLucaWebsocket = <T extends unknown>({
  url,
  shouldConnect,
  websocketConfig = defaultWebSocketConfig,
  onMessage,
  onClose,
  onOpen,
  onError
}: UseLucaWebsocketHookParams<T>): UseLucaWebsocketHook => {
  const dispatch = useDispatch()

  const handleMessage = (event: MessageEvent<string>) => parseWebsocketMessage<T>(event).forEach(onMessage)

  const handleError = (event: Event) => {
    console.error("websocket error", event)
    onError?.()
  }

  const handleOnOpen = () => {
    dispatch(updateIsChatAccessibleAction(true))
    onOpen?.()
  }

  const handleOnClose = () => {
    dispatch(updateIsChatAccessibleAction(false))
    onClose?.()
  }

  const handleReconnectSop = (numAttempts: number) => {
    console.error(`web socket stopped after ${numAttempts} reconnect attempts`)

    dispatch(
      updateNotification(
        Option.of<AppNotification>({
          messageKey: "ws__reconnect_error",
          severity: NotificationSeverity.Error
        })
      )
    )
  }

  const ws = useWebSocket(
    url,
    {
      reconnectAttempts: websocketConfig.reconnectAttempts,
      reconnectInterval: websocketConfig.reconnectIntervalInMs,
      onMessage: handleMessage,
      onError: handleError,
      onOpen: handleOnOpen,
      onClose: handleOnClose,
      onReconnectStop: handleReconnectSop,
      shouldReconnect: (closeEvent: CloseEvent) => {
        console.debug(closeEvent)
        return true
      }
    },
    shouldConnect
  )

  return {
    readyState: ws.readyState
  }
}
