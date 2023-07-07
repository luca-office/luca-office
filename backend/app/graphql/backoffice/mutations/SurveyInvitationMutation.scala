package graphql.backoffice.mutations

import database.generated.public.SurveyInvitation
import graphql.Private
import graphql.backoffice.BackofficeContext
import mails.CreateSurveyInvitationEmail
import models.{SurveyInvitationCreation, SurveyInvitationUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SurveyInvitationMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createSurveyInvitations(creations: Seq[SurveyInvitationCreation]): Future[Seq[SurveyInvitation]] = {
    val response = surveyInvitationService.createBulk(creations)

    response.foreach(surveyInvitations =>
      surveyInvitations.foreach(surveyInvitation =>
        surveyInvitation.email.foreach(email =>
          mailing.send(CreateSurveyInvitationEmail(applicationConfiguration, email, surveyInvitation.token)))))

    response
  }

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateSurveyInvitation(id: UUID, update: SurveyInvitationUpdate): Future[SurveyInvitation] =
    surveyInvitationService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteSurveyInvitation(id: UUID): Future[UUID] =
    surveyInvitationService.delete(id)
}
