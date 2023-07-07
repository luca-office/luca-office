import {noop} from "lodash-es"
import {ChatComposer} from "shared/office-tools/chat/chat-container"

export const chatComposer = (): ChatComposer => {
  return {
    messages: [],
    sendMessage: noop,
    title: "",
    isChatAccessible: false,
    minimizedWindows: [],
    openWindows: [],
    isManualAsynchronousSurvey: false
  }
}
