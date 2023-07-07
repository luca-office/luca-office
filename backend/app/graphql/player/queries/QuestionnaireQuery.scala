package graphql.player.queries

import database.generated.public.Questionnaire
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait QuestionnaireQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def questionnaire(id: UUID): Future[Option[Questionnaire]] =
    questionnaireService.findWithoutUserAccount(id)
}
