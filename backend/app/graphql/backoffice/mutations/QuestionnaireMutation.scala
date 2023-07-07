package graphql.backoffice.mutations

import database.generated.public.Questionnaire
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{QuestionnaireCreation, QuestionnaireUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait QuestionnaireMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createQuestionnaire(creation: QuestionnaireCreation): Future[Questionnaire] =
    runWithUserAccount(userAccount => questionnaireService.create(creation, userAccount.id))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateQuestionnaire(id: UUID, update: QuestionnaireUpdate): Future[Questionnaire] =
    questionnaireService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteQuestionnaire(id: UUID): Future[UUID] =
    questionnaireService.delete(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def finalizeQuestionnaire(id: UUID): Future[Questionnaire] =
    runWithUserAccount(userAccount => questionnaireService.finalize(id, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def publishQuestionnaire(id: UUID): Future[Questionnaire] =
    runWithUserAccount(userAccount => questionnaireService.publish(id, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def archiveQuestionnaire(id: UUID): Future[Questionnaire] =
    runWithUserAccount(userAccount => questionnaireService.archive(id, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def duplicateQuestionnaire(id: UUID): Future[Questionnaire] =
    runWithUserAccount(userAccount => questionnaireService.duplicate(id, userAccount))
}
