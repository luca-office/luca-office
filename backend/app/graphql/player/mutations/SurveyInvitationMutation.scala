package graphql.player.mutations

import database.generated.public.SurveyInvitation
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SurveyInvitationMutation {
  context: PlayerContext =>

  @GraphQLField
  def startOpenSurveyParticipation(surveyId: UUID): Future[SurveyInvitation] =
    surveyInvitationService.createForOpenParticipation(surveyId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def userAccountSurveyParticipation(
      surveyInvitationId: UUID,
      email: String,
      password: String): Future[SurveyInvitation] =
    surveyInvitationService.userAccountParticipation(surveyInvitationId, email, password)
}
