package graphql.backoffice.mutations

import database.generated.public.QuestionnaireAnswer
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{QuestionnaireAnswerCreation, QuestionnaireAnswerUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait QuestionnaireAnswerMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createQuestionnaireAnswer(creation: QuestionnaireAnswerCreation): Future[QuestionnaireAnswer] =
    questionnaireAnswerService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateQuestionnaireAnswer(id: UUID, update: QuestionnaireAnswerUpdate): Future[QuestionnaireAnswer] =
    questionnaireAnswerService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteQuestionnaireAnswer(id: UUID): Future[UUID] =
    questionnaireAnswerService.delete(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def repositionQuestionnaireAnswer(id: UUID, predecessorId: Option[UUID]): Future[QuestionnaireAnswer] =
    questionnaireAnswerService.reposition(id, predecessorId)
}
