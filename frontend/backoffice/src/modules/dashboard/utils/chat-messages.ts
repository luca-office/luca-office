import {groupBy} from "lodash-es"
import {LocalChatMessage, LocalParticipantMessage, LocalSupervisorMessage} from "shared/models"

export const chatMessagesCountGroupedByInvitationId = (chatMessages: LocalChatMessage[]): Map<UUID, number> => {
  const participantMessages = chatMessages.filter(msg => msg.type === "participant") as LocalParticipantMessage[]
  const supervisorMessages = chatMessages.filter(msg => msg.type === "supervisor") as LocalSupervisorMessage[]

  const mappedSupervisorMessages = supervisorMessages.flatMap(msg =>
    msg.recipientInvitationIds.map(rId => ({invitationId: rId, ...msg}))
  )

  const allMessages = [...participantMessages, ...mappedSupervisorMessages]

  const map = new Map<UUID, number>()

  const groupedByInvitationId = groupBy(allMessages, message => message.invitationId)

  Object.keys(groupedByInvitationId).forEach(invitationId => {
    map.set(invitationId, groupedByInvitationId[invitationId].length)
  })

  return map
}
