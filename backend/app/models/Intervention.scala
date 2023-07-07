package models

import enums.{ErpTableType, InterventionType}

import java.time.Instant
import java.util.UUID

case class InterventionCreation(
    title: String,
    interventionType: InterventionType,
    timeOffsetInSeconds: Int,
    scenarioId: UUID,
    interventionEmailId: UUID,
    fileId: Option[UUID],
    emailId: Option[UUID],
    answerId: Option[UUID],
    isNegated: Option[Boolean],
    value: Option[String],
    sampleCompanyId: Option[UUID],
    erpComponentId: Option[Int],
    erpComponentErpProductId: Option[Int],
    erpCustomerId: Option[Int],
    erpEmployeeId: Option[Int],
    erpInvoiceId: Option[Int],
    erpOrderId: Option[Int],
    erpOrderItemId: Option[Int],
    erpProductId: Option[Int],
    erpSupplierId: Option[Int],
    spreadsheetId: Option[UUID],
    spreadsheetRowIndex: Option[Int],
    spreadsheetColumnIndex: Option[Int],
    textDocumentId: Option[UUID]
)

sealed trait InterventionBase {
  def id: UUID
  def createdAt: Instant
  def modifiedAt: Instant
  def title: String
  def interventionType: InterventionType
  def scenarioId: UUID
  def interventionEmailId: UUID
}

case class EmailOpeningIntervention(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    title: String,
    interventionType: InterventionType,
    timeOffsetInSeconds: Int,
    scenarioId: UUID,
    interventionEmailId: UUID,
    emailId: UUID
) extends InterventionBase

case class ErpRowOpeningIntervention(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    title: String,
    interventionType: InterventionType,
    timeOffsetInSeconds: Int,
    scenarioId: UUID,
    interventionEmailId: UUID,
    erpTableType: ErpTableType,
    erpRowId: Int,
    sampleCompanyId: UUID
) extends InterventionBase

case class FileOpeningIntervention(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    title: String,
    interventionType: InterventionType,
    timeOffsetInSeconds: Int,
    scenarioId: UUID,
    interventionEmailId: UUID,
    fileId: UUID
) extends InterventionBase

case class NotesContentIntervention(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    title: String,
    interventionType: InterventionType,
    timeOffsetInSeconds: Int,
    scenarioId: UUID,
    interventionEmailId: UUID,
    value: String
) extends InterventionBase

case class RuntimeSurveyAnswerSelectionIntervention(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    title: String,
    interventionType: InterventionType,
    scenarioId: UUID,
    interventionEmailId: UUID,
    answerId: UUID,
    isNegated: Boolean
) extends InterventionBase

case class SpreadsheetCellContentIntervention(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    title: String,
    interventionType: InterventionType,
    timeOffsetInSeconds: Int,
    scenarioId: UUID,
    interventionEmailId: UUID,
    value: String,
    isNegated: Boolean,
    fileId: UUID,
    spreadsheetId: UUID,
    spreadsheetRowIndex: Int,
    spreadsheetColumnIndex: Int
) extends InterventionBase

case class TextDocumentContentIntervention(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    title: String,
    interventionType: InterventionType,
    timeOffsetInSeconds: Int,
    scenarioId: UUID,
    interventionEmailId: UUID,
    value: String,
    fileId: UUID,
    textDocumentId: UUID
) extends InterventionBase

sealed trait InterventionBaseCreation {
  def title: String
  def scenarioId: UUID
  def interventionEmailId: UUID
}

case class EmailOpeningInterventionCreation(
    title: String,
    timeOffsetInSeconds: Int,
    scenarioId: UUID,
    interventionEmailId: UUID,
    emailId: UUID
) extends InterventionBaseCreation

case class ErpRowOpeningInterventionCreation(
    title: String,
    timeOffsetInSeconds: Int,
    scenarioId: UUID,
    interventionEmailId: UUID,
    erpTableType: ErpTableType,
    erpRowId: Int,
    sampleCompanyId: UUID
) extends InterventionBaseCreation

case class FileOpeningInterventionCreation(
    title: String,
    timeOffsetInSeconds: Int,
    scenarioId: UUID,
    interventionEmailId: UUID,
    fileId: UUID
) extends InterventionBaseCreation

case class NotesContentInterventionCreation(
    title: String,
    timeOffsetInSeconds: Int,
    scenarioId: UUID,
    interventionEmailId: UUID,
    value: String
) extends InterventionBaseCreation

case class RuntimeSurveyAnswerSelectionInterventionCreation(
    title: String,
    scenarioId: UUID,
    interventionEmailId: UUID,
    answerId: UUID,
    isNegated: Boolean
) extends InterventionBaseCreation

case class SpreadsheetCellContentInterventionCreation(
    title: String,
    timeOffsetInSeconds: Int,
    scenarioId: UUID,
    interventionEmailId: UUID,
    value: String,
    isNegated: Boolean,
    fileId: UUID,
    spreadsheetId: UUID,
    spreadsheetRowIndex: Int,
    spreadsheetColumnIndex: Int
) extends InterventionBaseCreation

case class TextDocumentContentInterventionCreation(
    title: String,
    timeOffsetInSeconds: Int,
    scenarioId: UUID,
    interventionEmailId: UUID,
    value: String,
    fileId: UUID,
    textDocumentId: UUID
) extends InterventionBaseCreation

sealed trait InterventionBaseUpdate {
  def title: String
  def interventionEmailId: UUID
}

case class EmailOpeningInterventionUpdate(
    title: String,
    timeOffsetInSeconds: Int,
    interventionEmailId: UUID,
    emailId: UUID
) extends InterventionBaseUpdate

case class ErpRowOpeningInterventionUpdate(
    title: String,
    timeOffsetInSeconds: Int,
    interventionEmailId: UUID
) extends InterventionBaseUpdate

case class FileOpeningInterventionUpdate(
    title: String,
    timeOffsetInSeconds: Int,
    interventionEmailId: UUID,
    fileId: UUID
) extends InterventionBaseUpdate

case class NotesContentInterventionUpdate(
    title: String,
    timeOffsetInSeconds: Int,
    interventionEmailId: UUID,
    value: String
) extends InterventionBaseUpdate

case class RuntimeSurveyAnswerSelectionInterventionUpdate(
    title: String,
    interventionEmailId: UUID,
    answerId: UUID,
    isNegated: Boolean
) extends InterventionBaseUpdate

case class SpreadsheetCellContentInterventionUpdate(
    title: String,
    timeOffsetInSeconds: Int,
    interventionEmailId: UUID,
    value: String,
    isNegated: Boolean,
    fileId: UUID,
    spreadsheetId: UUID,
    spreadsheetRowIndex: Int,
    spreadsheetColumnIndex: Int
) extends InterventionBaseUpdate

case class TextDocumentContentInterventionUpdate(
    title: String,
    timeOffsetInSeconds: Int,
    interventionEmailId: UUID,
    value: String,
    fileId: UUID,
    textDocumentId: UUID
) extends InterventionBaseUpdate
