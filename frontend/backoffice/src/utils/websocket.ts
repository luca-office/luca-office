export const getWebsocketUrl = (surveyId: UUID) => {
  const isLocalHost = window.location.hostname === "localhost"
  if (isLocalHost) {
    return `ws://localhost:9000/backoffice/survey/${surveyId}`
  } else {
    return `${window.location.protocol === "https:" ? "wss" : "ws"}://${
      window.location.host
    }/backend/backoffice/survey/${surveyId}`
  }
}
