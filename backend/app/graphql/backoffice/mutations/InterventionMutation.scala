package graphql.backoffice.mutations

import graphql.Private
import graphql.backoffice.BackofficeContext
import models._
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait InterventionMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createEmailOpeningIntervention(creation: EmailOpeningInterventionCreation): Future[InterventionBase] =
    interventionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateEmailOpeningIntervention(id: UUID, update: EmailOpeningInterventionUpdate): Future[InterventionBase] =
    interventionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createErpRowOpeningIntervention(creation: ErpRowOpeningInterventionCreation): Future[InterventionBase] =
    interventionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateErpRowOpeningIntervention(id: UUID, update: ErpRowOpeningInterventionUpdate): Future[InterventionBase] =
    interventionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createFileOpeningIntervention(creation: FileOpeningInterventionCreation): Future[InterventionBase] =
    interventionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateFileOpeningIntervention(id: UUID, update: FileOpeningInterventionUpdate): Future[InterventionBase] =
    interventionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createNotesContentIntervention(creation: NotesContentInterventionCreation): Future[InterventionBase] =
    interventionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateNotesContentIntervention(id: UUID, update: NotesContentInterventionUpdate): Future[InterventionBase] =
    interventionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createRuntimeSurveyAnswerSelectionIntervention(
      creation: RuntimeSurveyAnswerSelectionInterventionCreation): Future[InterventionBase] =
    interventionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateRuntimeSurveyAnswerSelectionIntervention(
      id: UUID,
      update: RuntimeSurveyAnswerSelectionInterventionUpdate): Future[InterventionBase] =
    interventionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createSpreadsheetCellContentIntervention(
      creation: SpreadsheetCellContentInterventionCreation): Future[InterventionBase] =
    interventionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateSpreadsheetCellContentIntervention(
      id: UUID,
      update: SpreadsheetCellContentInterventionUpdate): Future[InterventionBase] =
    interventionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createTextDocumentContentIntervention(
      creation: TextDocumentContentInterventionCreation): Future[InterventionBase] =
    interventionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateTextDocumentContentIntervention(
      id: UUID,
      update: TextDocumentContentInterventionUpdate): Future[InterventionBase] =
    interventionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteIntervention(id: UUID): Future[UUID] =
    interventionService.delete(id)
}
