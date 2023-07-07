import {useMutation} from "@apollo/client"
import {sendSupervisorChatMessageVariables} from "../../../generated/sendSupervisorChatMessage"
import {sendSupervisorChatMessageMutation} from "../../../mutations"

export interface SendSupervisorChatMessageProps {
  readonly sendSupervisorChatMessage: (surveyId: UUID, recipientInvitationIds: UUID[], message: string) => Promise<void>
  readonly sendSupervisorChatMessageLoading: boolean
}

export const useSupervisorSendChat = (): SendSupervisorChatMessageProps => {
  const [sendSupervisorChatMessage, {loading}] = useMutation<sendSupervisorChatMessageVariables>(
    sendSupervisorChatMessageMutation,
    {
      fetchPolicy: "no-cache"
    }
  )

  return {
    sendSupervisorChatMessage: (surveyId: UUID, recipientInvitationIds: UUID[], message: string) =>
      new Promise<void>((resolve, reject) => {
        sendSupervisorChatMessage({
          variables: {surveyId, recipientInvitationIds, message}
        })
          .then(() => resolve())
          .catch(reject)
      }),
    sendSupervisorChatMessageLoading: loading
  }
}
