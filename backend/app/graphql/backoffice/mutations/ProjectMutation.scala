package graphql.backoffice.mutations

import database.generated.public.Project
import graphql.Private
import graphql.backoffice.BackofficeContext
import mails.ProjectInvitationEmail
import models.{ProjectCreation, ProjectUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ProjectMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createProject(creation: ProjectCreation): Future[Project] =
    runWithUserAccount(userAccount => projectService.create(userAccount.id)(creation))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateProject(id: UUID, update: ProjectUpdate): Future[Project] =
    projectService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteProject(id: UUID): Future[UUID] =
    projectService.delete(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def inviteProjectContributors(projectId: UUID, emails: Seq[String]): Future[Unit] = {
    val response = projectService.inviteContributors(projectId, emails)

    response.foreach { emails =>
      emails.emailsWithoutAccount.foreach(requestResetPasswordEmail)

      (emails.emailsWithoutAccount ++ emails.emailsWithAccount).foreach(email =>
        mailing.send(ProjectInvitationEmail(applicationConfiguration, email, projectId)))
    }

    response.map(_ => ())
  }
}
