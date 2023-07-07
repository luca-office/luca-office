package services.generated

import database.DatabaseContext
import database.generated.public.Intervention
import models._
import services.converters.InterventionConverter.toIntervention
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllIntervention {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allInterventionsAction(scenarioId: UUID): IO[Seq[Intervention], Effect.Read] =
    runIO(allInterventionsQuotation(scenarioId))

  def allInterventionsQuotation(scenarioId: UUID) =
    quote(query[Intervention].filter(_.scenarioId == lift(scenarioId)))
}

trait DefaultFindIntervention {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findInterventionAction(id: UUID): IO[Option[Intervention], Effect.Read] =
    runIO(findInterventionQuotation(id)).map(_.headOption)

  def findInterventionQuotation(id: UUID) =
    quote(query[Intervention].filter(_.id == lift(id)))
}

trait DefaultCreateIntervention {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createInterventionAction(creation: InterventionBaseCreation): IO[Intervention, Effect.Write] =
    runIO(createInterventionQuotation(creation))

  def createInterventionQuotation(creation: InterventionBaseCreation) =
    quote(
      query[Intervention]
        .insert(lift(toIntervention(creation)))
        .returning(intervention => intervention))
}

trait DefaultUpdateIntervention {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateInterventionAction(id: UUID, update: InterventionBaseUpdate): IO[Intervention, Effect.Write] =
    update match {
      case emailOpeningInterventionUpdate: EmailOpeningInterventionUpdate =>
        runIO(updateEmailOpeningInterventionQuotation(id, emailOpeningInterventionUpdate))
      case erpRowOpeningInterventionUpdate: ErpRowOpeningInterventionUpdate =>
        runIO(updateErpRowOpeningInterventionQuotation(id, erpRowOpeningInterventionUpdate))
      case fileOpeningInterventionUpdate: FileOpeningInterventionUpdate =>
        runIO(updateFileOpeningInterventionQuotation(id, fileOpeningInterventionUpdate))
      case notesContentInterventionUpdate: NotesContentInterventionUpdate =>
        runIO(updateNotesContentInterventionQuotation(id, notesContentInterventionUpdate))
      case runtimeSurveyAnswerSelectionInterventionUpdate: RuntimeSurveyAnswerSelectionInterventionUpdate =>
        runIO(
          updateRuntimeSurveyAnswerSelectionInterventionQuotation(id, runtimeSurveyAnswerSelectionInterventionUpdate))
      case spreadsheetCellContentInterventionUpdate: SpreadsheetCellContentInterventionUpdate =>
        runIO(updateSpreadsheetCellContentInterventionQuotation(id, spreadsheetCellContentInterventionUpdate))
      case textDocumentContentInterventionUpdate: TextDocumentContentInterventionUpdate =>
        runIO(updateTextDocumentContentInterventionQuotation(id, textDocumentContentInterventionUpdate))
    }

  def updateEmailOpeningInterventionQuotation(id: UUID, update: EmailOpeningInterventionUpdate) =
    quote(
      query[Intervention]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.timeOffsetInSeconds -> lift(update.timeOffsetInSeconds),
          _.interventionEmailId -> lift(update.interventionEmailId),
          _.emailId -> lift(Some(update.emailId): Option[UUID])
        )
        .returning(intervention => intervention))

  def updateErpRowOpeningInterventionQuotation(id: UUID, update: ErpRowOpeningInterventionUpdate) =
    quote(
      query[Intervention]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.timeOffsetInSeconds -> lift(update.timeOffsetInSeconds),
          _.interventionEmailId -> lift(update.interventionEmailId)
        )
        .returning(intervention => intervention))

  def updateFileOpeningInterventionQuotation(id: UUID, update: FileOpeningInterventionUpdate) =
    quote(
      query[Intervention]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.timeOffsetInSeconds -> lift(update.timeOffsetInSeconds),
          _.interventionEmailId -> lift(update.interventionEmailId),
          _.fileId -> lift(Some(update.fileId): Option[UUID])
        )
        .returning(intervention => intervention))

  def updateNotesContentInterventionQuotation(id: UUID, update: NotesContentInterventionUpdate) =
    quote(
      query[Intervention]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.timeOffsetInSeconds -> lift(update.timeOffsetInSeconds),
          _.interventionEmailId -> lift(update.interventionEmailId),
          _.value -> lift(Some(update.value): Option[String])
        )
        .returning(intervention => intervention))

  def updateRuntimeSurveyAnswerSelectionInterventionQuotation(
      id: UUID,
      update: RuntimeSurveyAnswerSelectionInterventionUpdate) =
    quote(
      query[Intervention]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.interventionEmailId -> lift(update.interventionEmailId),
          _.answerId -> lift(Some(update.answerId): Option[UUID]),
          _.isNegated -> lift(Some(update.isNegated): Option[Boolean])
        )
        .returning(intervention => intervention))

  def updateSpreadsheetCellContentInterventionQuotation(id: UUID, update: SpreadsheetCellContentInterventionUpdate) =
    quote(
      query[Intervention]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.timeOffsetInSeconds -> lift(update.timeOffsetInSeconds),
          _.interventionEmailId -> lift(update.interventionEmailId),
          _.fileId -> lift(Some(update.fileId): Option[UUID]),
          _.spreadsheetId -> lift(Some(update.spreadsheetId): Option[UUID]),
          _.value -> lift(Some(update.value): Option[String]),
          _.isNegated -> lift(Some(update.isNegated): Option[Boolean]),
          _.spreadsheetRowIndex -> lift(Some(update.spreadsheetRowIndex): Option[Int]),
          _.spreadsheetColumnIndex -> lift(Some(update.spreadsheetColumnIndex): Option[Int])
        )
        .returning(intervention => intervention))

  def updateTextDocumentContentInterventionQuotation(id: UUID, update: TextDocumentContentInterventionUpdate) =
    quote(
      query[Intervention]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.timeOffsetInSeconds -> lift(update.timeOffsetInSeconds),
          _.interventionEmailId -> lift(update.interventionEmailId),
          _.value -> lift(Some(update.value): Option[String]),
          _.fileId -> lift(Some(update.fileId): Option[UUID]),
          _.textDocumentId -> lift(Some(update.textDocumentId): Option[UUID])
        )
        .returning(intervention => intervention))
}

trait DefaultDeleteIntervention {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteInterventionAction(id: UUID): IO[UUID, Effect.Write] =
    runIO(deleteInterventionQuotation(id))

  def deleteInterventionQuotation(id: UUID) =
    quote(
      query[Intervention]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
