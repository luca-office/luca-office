package graphql.backoffice.queries

import graphql.Private
import graphql.backoffice.BackofficeContext
import models.ChatMessage
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ChatMessageQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def chatMessages(surveyId: UUID): Future[Seq[ChatMessage]] =
    chatMessageService.all(surveyId)
}
