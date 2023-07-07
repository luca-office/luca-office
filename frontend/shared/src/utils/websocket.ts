import {Option} from "../utils"

export const getPlayerWebsocketUrl = (surveyId: UUID, invitationId: UUID) => {
  const isLocalHost = window.location.hostname === "localhost"
  if (isLocalHost) {
    return `ws://localhost:9000/office/survey/${surveyId}/invitation/${invitationId}`
  } else {
    return `${window.location.protocol === "https:" ? "wss" : "ws"}://${
      window.location.host
    }/backend/office/survey/${surveyId}/invitation/${invitationId}`
  }
}

export const parseWebsocketMessage = <T>(event: MessageEvent<string>): Option<T> =>
  Option.of(event.data)
    .filter(data => data !== "")
    .flatMap(data => {
      try {
        return Option.of(JSON.parse(data))
      } catch {
        return Option.none()
      }
    })
