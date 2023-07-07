package graphql.backoffice.mutations

import database.generated.public.Survey
import graphql.Private
import graphql.backoffice.BackofficeContext
import mails.RaterInvitationEmail
import models.{SurveyCreation, SurveyUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SurveyMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createSurvey(creation: SurveyCreation): Future[Survey] =
    surveyService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateSurvey(id: UUID, update: SurveyUpdate): Future[Survey] =
    surveyService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteSurvey(id: UUID): Future[UUID] =
    runWithUserAccount(userAccount => surveyService.delete(id, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def inviteSurveyRaters(surveyId: UUID, emails: Seq[String]): Future[Unit] = {
    val response = surveyService.inviteRaters(surveyId, emails)

    response.foreach { emails =>
      emails.emailsWithoutAccount.foreach(requestResetPasswordEmail)

      (emails.emailsWithoutAccount ++ emails.emailsWithAccount).foreach(email =>
        mailing.send(RaterInvitationEmail(applicationConfiguration, email, surveyId)))
    }

    response.map(_ => ())
  }
}
