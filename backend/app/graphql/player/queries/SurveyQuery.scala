package graphql.player.queries

import database.generated.public.Survey
import graphql.player.PlayerContext
import models.SurveyParticipationInfo
import sangria.macros.derive.GraphQLField
import java.util.UUID
import scala.concurrent.Future

trait SurveyQuery {
  context: PlayerContext =>

  @GraphQLField
  def survey(id: UUID): Future[Option[Survey]] =
    surveyService.findWithoutUserAccount(id)

  @GraphQLField
  def surveyParticipationInfo(token: String): Future[Option[SurveyParticipationInfo]] =
    surveyService.findParticipationInfo(token)
}
