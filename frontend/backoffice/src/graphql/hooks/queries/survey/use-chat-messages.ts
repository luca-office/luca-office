import {ApolloError, useLazyQuery, useQuery} from "@apollo/client"
import {ChatMessagesQuery, ChatMessagesQueryVariables} from "shared/graphql/generated/ChatMessagesQuery"
import {chatMessagesQuery} from "shared/graphql/queries"
import {RemoteChatMessage} from "shared/models"

export interface UseChatMessagesHook {
  readonly chatMessages: RemoteChatMessage[]
  readonly chatMessagesLoading: boolean
}

export interface UseChatMessagesHookLazy {
  readonly chatMessages: RemoteChatMessage[]
  readonly chatMessagesLoading: boolean
  readonly getChatMessages: (surveyId: UUID) => void
}

export interface UseChatMessagesLazyParams {
  readonly onCompleted?: (data: ChatMessagesQuery) => void
  readonly onError?: (error: ApolloError) => void
}

export const useChatMessages = (surveyId: UUID): UseChatMessagesHook => {
  const {data, loading} = useQuery<ChatMessagesQuery, ChatMessagesQueryVariables>(chatMessagesQuery, {
    variables: {surveyId}
  })

  return {
    chatMessages: data?.chatMessages ?? [],
    chatMessagesLoading: loading
  }
}

export const useChatMessagesLazy = (params?: UseChatMessagesLazyParams): UseChatMessagesHookLazy => {
  const [getChatMessages, {data, loading}] = useLazyQuery<ChatMessagesQuery, ChatMessagesQueryVariables>(
    chatMessagesQuery,
    {fetchPolicy: "network-only", onCompleted: params?.onCompleted, onError: params?.onError}
  )

  return {
    chatMessages: data?.chatMessages ?? [],
    chatMessagesLoading: loading,
    getChatMessages: (surveyId: UUID) => getChatMessages({variables: {surveyId}})
  }
}
