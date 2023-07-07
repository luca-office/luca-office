package graphql.backoffice.queries

import database.generated.public.QuestionnaireQuestion
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait QuestionnaireQuestionQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def questionnaireQuestions(questionnaireId: UUID): Future[Seq[QuestionnaireQuestion]] =
    questionnaireQuestionService.all(questionnaireId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def questionnaireQuestion(id: UUID): Future[Option[QuestionnaireQuestion]] =
    questionnaireQuestionService.find(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def selectedAnswersForParticipant(questionId: UUID, surveyInvitationId: UUID): Future[Seq[UUID]] =
    questionnaireQuestionService.selectedAnswersForParticipant(questionId, surveyInvitationId).map(_.selectedAnswerIds)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def freeTextAnswerForParticipant(questionId: UUID, surveyInvitationId: UUID): Future[Option[String]] =
    questionnaireQuestionService.freeTextAnswerForParticipant(questionId, surveyInvitationId)
}
