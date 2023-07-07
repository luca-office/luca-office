import {RemoteChatMessage} from "../../../../models"
import {populateWithRemoteMessages} from "../../../actions/data/chat-action"
import {ChatState, initialChatState} from "../../../state/data/chat-state"
import {chatReducer} from "../chat-reducer"

test("should return the initial state", () => {
  expect(chatReducer(undefined, populateWithRemoteMessages([], ""))).toEqual(initialChatState)
})

// #region Data

const remoteChatMessages = [
  {
    __typename: "SupervisorChatMessage",
    message: "Hallo alle!",
    timestamp: "2021-09-03T15:29:00.735Z",
    userAccountId: "faf3e80c-9660-4cc1-959b-926505bc94ea",
    recipientInvitationId: "9c6c20a8-3d83-4262-8959-55e23c8bcfc2"
  },
  {
    __typename: "SupervisorChatMessage",
    message: "Hallo alle!",
    timestamp: "2021-09-03T15:29:00.735Z",
    userAccountId: "faf3e80c-9660-4cc1-959b-926505bc94ea",
    recipientInvitationId: "29400701-d0d3-45d7-80d1-092acee5e63b"
  },
  {
    __typename: "SupervisorChatMessage",
    message: "Hallo alle!",
    timestamp: "2021-09-03T15:29:00.735Z",
    userAccountId: "faf3e80c-9660-4cc1-959b-926505bc94ea",
    recipientInvitationId: "a6837c40-c0c5-4999-bf10-1017c029c48c"
  },
  {
    __typename: "ParticipantChatMessage",
    message: "Hi",
    timestamp: "2021-09-03T15:29:08.838Z",
    invitationId: "9c6c20a8-3d83-4262-8959-55e23c8bcfc2"
  },
  {
    __typename: "ParticipantChatMessage",
    message: "Hello",
    timestamp: "2021-09-03T15:29:19.478Z",
    invitationId: "29400701-d0d3-45d7-80d1-092acee5e63b"
  },
  {
    __typename: "ParticipantChatMessage",
    message: "Servus",
    timestamp: "2021-09-03T15:29:26.45Z",
    invitationId: "a6837c40-c0c5-4999-bf10-1017c029c48c"
  },
  {
    __typename: "SupervisorChatMessage",
    message: "Erster Teilnehmer ist dumm!!!",
    timestamp: "2021-09-03T15:29:54.729Z",
    userAccountId: "faf3e80c-9660-4cc1-959b-926505bc94ea",
    recipientInvitationId: "29400701-d0d3-45d7-80d1-092acee5e63b"
  },
  {
    __typename: "SupervisorChatMessage",
    message: "Erster Teilnehmer ist dumm!!!",
    timestamp: "2021-09-03T15:29:54.729Z",
    userAccountId: "faf3e80c-9660-4cc1-959b-926505bc94ea",
    recipientInvitationId: "a6837c40-c0c5-4999-bf10-1017c029c48c"
  },
  {
    __typename: "ParticipantChatMessage",
    message: "Stimmt :)",
    timestamp: "2021-09-03T15:30:11.493Z",
    invitationId: "a6837c40-c0c5-4999-bf10-1017c029c48c"
  },
  {
    __typename: "ParticipantChatMessage",
    message: "Sag ich! 😡",
    timestamp: "2021-09-03T15:30:43.842Z",
    invitationId: "29400701-d0d3-45d7-80d1-092acee5e63b"
  },
  {
    __typename: "ParticipantChatMessage",
    message: "Hallo?",
    timestamp: "2021-09-03T15:31:03.853Z",
    invitationId: "9c6c20a8-3d83-4262-8959-55e23c8bcfc2"
  }
]

const expectedChatState: ChatState = {
  chatMessages: [
    {
      userAccountId: "faf3e80c-9660-4cc1-959b-926505bc94ea",
      recipientInvitationIds: [
        "9c6c20a8-3d83-4262-8959-55e23c8bcfc2",
        "29400701-d0d3-45d7-80d1-092acee5e63b",
        "a6837c40-c0c5-4999-bf10-1017c029c48c"
      ],
      message: "Hallo alle!",
      surveyId: "741d6b46-4f0f-47d1-8166-63f135957135",
      timestamp: expect.any(Date),
      type: "supervisor"
    },
    {
      message: "Hi",
      invitationId: "9c6c20a8-3d83-4262-8959-55e23c8bcfc2",
      surveyId: "741d6b46-4f0f-47d1-8166-63f135957135",
      timestamp: expect.any(Date),
      type: "participant"
    },
    {
      message: "Hello",
      invitationId: "29400701-d0d3-45d7-80d1-092acee5e63b",
      surveyId: "741d6b46-4f0f-47d1-8166-63f135957135",
      timestamp: expect.any(Date),
      type: "participant"
    },
    {
      message: "Servus",
      invitationId: "a6837c40-c0c5-4999-bf10-1017c029c48c",
      surveyId: "741d6b46-4f0f-47d1-8166-63f135957135",
      timestamp: expect.any(Date),
      type: "participant"
    },
    {
      userAccountId: "faf3e80c-9660-4cc1-959b-926505bc94ea",
      recipientInvitationIds: ["29400701-d0d3-45d7-80d1-092acee5e63b", "a6837c40-c0c5-4999-bf10-1017c029c48c"],
      message: "Erster Teilnehmer ist dumm!!!",
      surveyId: "741d6b46-4f0f-47d1-8166-63f135957135",
      timestamp: expect.any(Date),
      type: "supervisor"
    },
    {
      message: "Stimmt :)",
      invitationId: "a6837c40-c0c5-4999-bf10-1017c029c48c",
      surveyId: "741d6b46-4f0f-47d1-8166-63f135957135",
      timestamp: expect.any(Date),
      type: "participant"
    },
    {
      message: "Sag ich! 😡",
      invitationId: "29400701-d0d3-45d7-80d1-092acee5e63b",
      surveyId: "741d6b46-4f0f-47d1-8166-63f135957135",
      timestamp: expect.any(Date),
      type: "participant"
    },
    {
      message: "Hallo?",
      invitationId: "9c6c20a8-3d83-4262-8959-55e23c8bcfc2",
      surveyId: "741d6b46-4f0f-47d1-8166-63f135957135",
      timestamp: expect.any(Date),
      type: "participant"
    }
  ],
  isWebsocketOpen: false,
  unreadMessageCountByParticipantId: {},
  unreadSupervisorMessagesCount: 0,
  availableParticipantIds: [],
  currentChatParticipantIds: []
}

// #endregion

test("should update the initial state with remote messages", () => {
  expect(
    chatReducer(
      undefined,
      populateWithRemoteMessages(remoteChatMessages as RemoteChatMessage[], "741d6b46-4f0f-47d1-8166-63f135957135")
    )
  ).toEqual(expectedChatState)
})
