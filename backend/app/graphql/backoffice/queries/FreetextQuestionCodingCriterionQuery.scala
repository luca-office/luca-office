package graphql.backoffice.queries

import database.generated.public.FreetextQuestionCodingCriterion
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait FreetextQuestionCodingCriterionQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def freetextQuestionCodingCriteria(questionId: UUID): Future[Seq[FreetextQuestionCodingCriterion]] =
    freetextQuestionCodingCriterionService.all(questionId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def freetextQuestionCodingCriteriaForQuestionnaire(
      questionnaireId: UUID): Future[Seq[FreetextQuestionCodingCriterion]] =
    freetextQuestionCodingCriterionService.allForQuestionnaire(questionnaireId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def freetextQuestionCodingCriterion(id: UUID): Future[Option[FreetextQuestionCodingCriterion]] =
    freetextQuestionCodingCriterionService.find(id)
}
