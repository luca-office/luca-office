package graphql.player.queries

import graphql.Private
import graphql.player.PlayerContext
import models.ProjectModuleStart
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ManualSurveyControlQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def latestStartedProjectModule(surveyId: UUID): Future[Option[ProjectModuleStart]] =
    projectModuleService.latestStartedProjectModule(surveyId)
}
