package graphql.backoffice.queries

import database.generated.public.Questionnaire
import enums.QuestionnaireType.{Global, RuntimeSurvey}
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait QuestionnaireQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def questionnaires(isRuntimeSurvey: Boolean): Future[Seq[Questionnaire]] =
    runWithUserAccount(questionnaireService.all(_)(if (isRuntimeSurvey) RuntimeSurvey else Global))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def questionnaire(id: UUID): Future[Option[Questionnaire]] =
    runWithUserAccount(userAccount => questionnaireService.find(id, userAccount))
}
