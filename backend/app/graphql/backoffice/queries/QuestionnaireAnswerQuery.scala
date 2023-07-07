package graphql.backoffice.queries

import database.generated.public.QuestionnaireAnswer
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait QuestionnaireAnswerQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def questionnaireAnswers(questionId: UUID): Future[Seq[QuestionnaireAnswer]] =
    questionnaireAnswerService.all(questionId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def questionnaireAnswer(id: UUID): Future[Option[QuestionnaireAnswer]] =
    questionnaireAnswerService.find(id)
}
