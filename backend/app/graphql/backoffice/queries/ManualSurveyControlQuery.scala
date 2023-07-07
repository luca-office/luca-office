package graphql.backoffice.queries

import graphql.Private
import graphql.backoffice.BackofficeContext
import models.ProjectModuleStart
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ManualSurveyControlQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def latestStartedProjectModule(surveyId: UUID): Future[Option[ProjectModuleStart]] =
    projectModuleService.latestStartedProjectModule(surveyId)
}
