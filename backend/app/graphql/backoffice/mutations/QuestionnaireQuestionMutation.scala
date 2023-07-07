package graphql.backoffice.mutations

import database.generated.public.QuestionnaireQuestion
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{QuestionnaireQuestionCreation, QuestionnaireQuestionUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait QuestionnaireQuestionMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createQuestionnaireQuestion(creation: QuestionnaireQuestionCreation): Future[QuestionnaireQuestion] =
    questionnaireQuestionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateQuestionnaireQuestion(id: UUID, update: QuestionnaireQuestionUpdate): Future[QuestionnaireQuestion] =
    questionnaireQuestionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteQuestionnaireQuestion(id: UUID): Future[UUID] =
    questionnaireQuestionService.delete(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def repositionQuestionnaireQuestion(id: UUID, predecessorId: Option[UUID]): Future[QuestionnaireQuestion] =
    questionnaireQuestionService.reposition(id, predecessorId)
}
