package graphql.backoffice.mutations

import graphql.Private
import graphql.backoffice.BackofficeContext
import models.SendSupervisorChatMessageMessage
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ChatMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def sendSupervisorChatMessage(surveyId: UUID, recipientInvitationIds: Seq[UUID], message: String): Future[Unit] = {
    recipientInvitationIds.foreach(recipientInvitationId =>
      websocketManager ! SendSupervisorChatMessageMessage(surveyId, recipientInvitationId, message))
    runWithUserAccount(userAccount =>
      surveyEventService
        .createSendSupervisorChatMessageEvent(surveyId, userAccount.id, recipientInvitationIds, message)).map(_ => ())
  }
}
