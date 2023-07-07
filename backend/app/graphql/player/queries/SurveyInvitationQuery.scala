package graphql.player.queries

import database.generated.public.SurveyInvitation
import graphql.Private
import graphql.player.PlayerContext
import models.SurveyInvitationAndEvents
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SurveyInvitationQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def surveyInvitations(surveyId: UUID): Future[Seq[SurveyInvitation]] =
    surveyInvitationService.all(surveyId)

  @GraphQLField
  def surveyInvitation(token: String): Future[Option[SurveyInvitation]] =
    surveyInvitationService.find(token)

  @GraphQLField
  def surveyInvitationAndEventsForResumption(token: String): Future[Option[SurveyInvitationAndEvents]] =
    surveyInvitationService
      .findForResumption(token)
      .flatMap {
        case Some(surveyInvitation) =>
          surveyEventService
            .allForLatestInProgressProjectModule(surveyInvitation.id)
            .map(projectModuleSurveyEvents =>
              Some(SurveyInvitationAndEvents(surveyInvitation, projectModuleSurveyEvents)))
        case _ =>
          Future.successful(None)
      }
}
