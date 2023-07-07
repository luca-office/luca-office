import * as React from "react"
import {useDispatch} from "react-redux"
import {ChatMessagesQuery} from "shared/graphql/generated/ChatMessagesQuery"
import {populateWithRemoteMessages} from "shared/redux/actions/data/chat-action"
import {isDefined} from "shared/utils"
import {useChatMessagesLazy} from "../../../graphql/hooks"

export const useUpdateChat = (surveyId: UUID | null) => {
  const dispatch = useDispatch()

  const onMessagesFetched = (chatMessagesQuery: ChatMessagesQuery) => {
    if (surveyId) {
      dispatch(populateWithRemoteMessages(chatMessagesQuery.chatMessages, surveyId))
    }
  }

  const {getChatMessages} = useChatMessagesLazy({onCompleted: onMessagesFetched})

  React.useEffect(() => {
    if (isDefined(surveyId)) {
      getChatMessages(surveyId)
    }
  }, [surveyId])
}
