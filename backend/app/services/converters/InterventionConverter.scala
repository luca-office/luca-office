package services.converters

import database.generated.public.Intervention
import enums.ErpTableType._
import enums.InterventionType
import enums.InterventionType.{
  EmailOpening,
  ErpRowOpening,
  FileOpening,
  NotesContent,
  RuntimeSurveyAnswerSelection,
  SpreadsheetCellContent,
  TextDocumentContent
}
import models._
import utils.DateUtils

import java.util.UUID

object InterventionConverter {

  def toIntervention(creation: InterventionBaseCreation): Intervention =
    creation match {
      case emailOpeningInterventionCreation: EmailOpeningInterventionCreation =>
        toIntervention(emailOpeningInterventionCreation)
      case erpRowOpeningInterventionCreation: ErpRowOpeningInterventionCreation =>
        toIntervention(erpRowOpeningInterventionCreation)
      case fileOpeningInterventionCreation: FileOpeningInterventionCreation =>
        toIntervention(fileOpeningInterventionCreation)
      case notesContentInterventionCreation: NotesContentInterventionCreation =>
        toIntervention(notesContentInterventionCreation)
      case runtimeSurveyAnswerSelectionInterventionCreation: RuntimeSurveyAnswerSelectionInterventionCreation =>
        toIntervention(runtimeSurveyAnswerSelectionInterventionCreation)
      case spreadsheetCellContentInterventionCreation: SpreadsheetCellContentInterventionCreation =>
        toIntervention(spreadsheetCellContentInterventionCreation)
      case textDocumentContentInterventionCreation: TextDocumentContentInterventionCreation =>
        toIntervention(textDocumentContentInterventionCreation)
    }

  def toIntervention(creation: EmailOpeningInterventionCreation): Intervention =
    Intervention(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      interventionType = EmailOpening,
      timeOffsetInSeconds = creation.timeOffsetInSeconds,
      scenarioId = creation.scenarioId,
      interventionEmailId = creation.interventionEmailId,
      fileId = None,
      emailId = Some(creation.emailId),
      answerId = None,
      isNegated = None,
      value = None,
      erpComponentId = None,
      erpComponentErpProductId = None,
      erpCustomerId = None,
      erpEmployeeId = None,
      erpInvoiceId = None,
      erpOrderId = None,
      erpOrderItemId = None,
      erpProductId = None,
      erpSupplierId = None,
      sampleCompanyId = None,
      spreadsheetId = None,
      spreadsheetRowIndex = None,
      spreadsheetColumnIndex = None,
      textDocumentId = None
    )

  def toIntervention(creation: ErpRowOpeningInterventionCreation): Intervention =
    Intervention(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      interventionType = ErpRowOpening,
      timeOffsetInSeconds = creation.timeOffsetInSeconds,
      scenarioId = creation.scenarioId,
      interventionEmailId = creation.interventionEmailId,
      fileId = None,
      emailId = None,
      answerId = None,
      isNegated = None,
      value = None,
      erpComponentId = if (creation.erpTableType == Component) Some(creation.erpRowId) else None,
      erpComponentErpProductId = if (creation.erpTableType == ComponentProduct) Some(creation.erpRowId) else None,
      erpCustomerId = if (creation.erpTableType == Customer) Some(creation.erpRowId) else None,
      erpEmployeeId = if (creation.erpTableType == Employee) Some(creation.erpRowId) else None,
      erpInvoiceId = if (creation.erpTableType == Invoice) Some(creation.erpRowId) else None,
      erpOrderId = if (creation.erpTableType == Order) Some(creation.erpRowId) else None,
      erpOrderItemId = if (creation.erpTableType == OrderItem) Some(creation.erpRowId) else None,
      erpProductId = if (creation.erpTableType == Product) Some(creation.erpRowId) else None,
      erpSupplierId = if (creation.erpTableType == Supplier) Some(creation.erpRowId) else None,
      sampleCompanyId = Some(creation.sampleCompanyId),
      spreadsheetId = None,
      spreadsheetRowIndex = None,
      spreadsheetColumnIndex = None,
      textDocumentId = None
    )

  def toIntervention(creation: FileOpeningInterventionCreation): Intervention =
    Intervention(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      interventionType = FileOpening,
      timeOffsetInSeconds = creation.timeOffsetInSeconds,
      scenarioId = creation.scenarioId,
      interventionEmailId = creation.interventionEmailId,
      fileId = Some(creation.fileId),
      emailId = None,
      answerId = None,
      isNegated = None,
      value = None,
      erpComponentId = None,
      erpComponentErpProductId = None,
      erpCustomerId = None,
      erpEmployeeId = None,
      erpInvoiceId = None,
      erpOrderId = None,
      erpOrderItemId = None,
      erpProductId = None,
      erpSupplierId = None,
      sampleCompanyId = None,
      spreadsheetId = None,
      spreadsheetRowIndex = None,
      spreadsheetColumnIndex = None,
      textDocumentId = None
    )

  def toIntervention(creation: NotesContentInterventionCreation): Intervention =
    Intervention(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      interventionType = NotesContent,
      timeOffsetInSeconds = creation.timeOffsetInSeconds,
      scenarioId = creation.scenarioId,
      interventionEmailId = creation.interventionEmailId,
      fileId = None,
      emailId = None,
      answerId = None,
      isNegated = None,
      value = Some(creation.value),
      erpComponentId = None,
      erpComponentErpProductId = None,
      erpCustomerId = None,
      erpEmployeeId = None,
      erpInvoiceId = None,
      erpOrderId = None,
      erpOrderItemId = None,
      erpProductId = None,
      erpSupplierId = None,
      sampleCompanyId = None,
      spreadsheetId = None,
      spreadsheetRowIndex = None,
      spreadsheetColumnIndex = None,
      textDocumentId = None
    )

  def toIntervention(creation: RuntimeSurveyAnswerSelectionInterventionCreation): Intervention =
    Intervention(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      interventionType = RuntimeSurveyAnswerSelection,
      timeOffsetInSeconds = 1,
      scenarioId = creation.scenarioId,
      interventionEmailId = creation.interventionEmailId,
      fileId = None,
      emailId = None,
      answerId = Some(creation.answerId),
      isNegated = Some(creation.isNegated),
      value = None,
      erpComponentId = None,
      erpComponentErpProductId = None,
      erpCustomerId = None,
      erpEmployeeId = None,
      erpInvoiceId = None,
      erpOrderId = None,
      erpOrderItemId = None,
      erpProductId = None,
      erpSupplierId = None,
      sampleCompanyId = None,
      spreadsheetId = None,
      spreadsheetRowIndex = None,
      spreadsheetColumnIndex = None,
      textDocumentId = None
    )

  def toIntervention(creation: SpreadsheetCellContentInterventionCreation): Intervention =
    Intervention(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      interventionType = SpreadsheetCellContent,
      timeOffsetInSeconds = creation.timeOffsetInSeconds,
      scenarioId = creation.scenarioId,
      interventionEmailId = creation.interventionEmailId,
      fileId = Some(creation.fileId),
      emailId = None,
      answerId = None,
      isNegated = Some(creation.isNegated),
      value = Some(creation.value),
      erpComponentId = None,
      erpComponentErpProductId = None,
      erpCustomerId = None,
      erpEmployeeId = None,
      erpInvoiceId = None,
      erpOrderId = None,
      erpOrderItemId = None,
      erpProductId = None,
      erpSupplierId = None,
      sampleCompanyId = None,
      spreadsheetId = Some(creation.spreadsheetId),
      spreadsheetRowIndex = Some(creation.spreadsheetRowIndex),
      spreadsheetColumnIndex = Some(creation.spreadsheetColumnIndex),
      textDocumentId = None
    )

  def toIntervention(creation: TextDocumentContentInterventionCreation): Intervention =
    Intervention(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      interventionType = TextDocumentContent,
      timeOffsetInSeconds = creation.timeOffsetInSeconds,
      scenarioId = creation.scenarioId,
      interventionEmailId = creation.interventionEmailId,
      fileId = Some(creation.fileId),
      emailId = None,
      answerId = None,
      isNegated = None,
      value = Some(creation.value),
      erpComponentId = None,
      erpComponentErpProductId = None,
      erpCustomerId = None,
      erpEmployeeId = None,
      erpInvoiceId = None,
      erpOrderId = None,
      erpOrderItemId = None,
      erpProductId = None,
      erpSupplierId = None,
      sampleCompanyId = None,
      spreadsheetId = None,
      spreadsheetRowIndex = None,
      spreadsheetColumnIndex = None,
      textDocumentId = Some(creation.textDocumentId)
    )

  def toInterventionBase(intervention: Intervention): InterventionBase =
    intervention.interventionType match {
      case InterventionType.EmailOpening => toEmailOpeningIntervention(intervention)
      case InterventionType.ErpRowOpening => toErpRowOpeningIntervention(intervention)
      case InterventionType.FileOpening => toFileOpeningIntervention(intervention)
      case InterventionType.NotesContent => toNotesContentIntervention(intervention)
      case InterventionType.RuntimeSurveyAnswerSelection => toRuntimeSurveyAnswerSelectionIntervention(intervention)
      case InterventionType.SpreadsheetCellContent => toSpreadsheetCellContentIntervention(intervention)
      case InterventionType.TextDocumentContent => toTextDocumentContentIntervention(intervention)
    }

  def toEmailOpeningIntervention(intervention: Intervention): EmailOpeningIntervention =
    EmailOpeningIntervention(
      id = intervention.id,
      createdAt = intervention.createdAt,
      modifiedAt = intervention.modifiedAt,
      title = intervention.title,
      interventionType = intervention.interventionType,
      timeOffsetInSeconds = intervention.timeOffsetInSeconds,
      scenarioId = intervention.scenarioId,
      interventionEmailId = intervention.interventionEmailId,
      emailId = intervention.emailId.get
    )

  def toErpRowOpeningIntervention(intervention: Intervention): ErpRowOpeningIntervention = {
    val (erpTableType, erpRowId) = findErpTableTypeAndErpRowId(intervention)
    ErpRowOpeningIntervention(
      id = intervention.id,
      createdAt = intervention.createdAt,
      modifiedAt = intervention.modifiedAt,
      title = intervention.title,
      interventionType = intervention.interventionType,
      timeOffsetInSeconds = intervention.timeOffsetInSeconds,
      scenarioId = intervention.scenarioId,
      interventionEmailId = intervention.interventionEmailId,
      erpTableType = erpTableType,
      erpRowId = erpRowId,
      sampleCompanyId = intervention.sampleCompanyId.get
    )
  }

  private def findErpTableTypeAndErpRowId(intervention: Intervention) =
    intervention match {
      case i if i.erpComponentId.isDefined => (Component, i.erpComponentId.get)
      case i if i.erpComponentErpProductId.isDefined => (ComponentProduct, i.erpComponentErpProductId.get)
      case i if i.erpCustomerId.isDefined => (Customer, i.erpCustomerId.get)
      case i if i.erpEmployeeId.isDefined => (Employee, i.erpEmployeeId.get)
      case i if i.erpInvoiceId.isDefined => (Invoice, i.erpInvoiceId.get)
      case i if i.erpOrderId.isDefined => (Order, i.erpOrderId.get)
      case i if i.erpOrderItemId.isDefined => (OrderItem, i.erpOrderItemId.get)
      case i if i.erpProductId.isDefined => (Product, i.erpProductId.get)
      case i if i.erpSupplierId.isDefined => (Supplier, i.erpSupplierId.get)
    }

  def toFileOpeningIntervention(intervention: Intervention): FileOpeningIntervention =
    FileOpeningIntervention(
      id = intervention.id,
      createdAt = intervention.createdAt,
      modifiedAt = intervention.modifiedAt,
      title = intervention.title,
      interventionType = intervention.interventionType,
      timeOffsetInSeconds = intervention.timeOffsetInSeconds,
      scenarioId = intervention.scenarioId,
      interventionEmailId = intervention.interventionEmailId,
      fileId = intervention.fileId.get
    )

  def toNotesContentIntervention(intervention: Intervention): NotesContentIntervention =
    NotesContentIntervention(
      id = intervention.id,
      createdAt = intervention.createdAt,
      modifiedAt = intervention.modifiedAt,
      title = intervention.title,
      interventionType = intervention.interventionType,
      timeOffsetInSeconds = intervention.timeOffsetInSeconds,
      scenarioId = intervention.scenarioId,
      interventionEmailId = intervention.interventionEmailId,
      value = intervention.value.get
    )

  def toRuntimeSurveyAnswerSelectionIntervention(intervention: Intervention): RuntimeSurveyAnswerSelectionIntervention =
    RuntimeSurveyAnswerSelectionIntervention(
      id = intervention.id,
      createdAt = intervention.createdAt,
      modifiedAt = intervention.modifiedAt,
      title = intervention.title,
      interventionType = intervention.interventionType,
      scenarioId = intervention.scenarioId,
      interventionEmailId = intervention.interventionEmailId,
      answerId = intervention.answerId.get,
      isNegated = intervention.isNegated.get
    )

  def toSpreadsheetCellContentIntervention(intervention: Intervention): SpreadsheetCellContentIntervention =
    SpreadsheetCellContentIntervention(
      id = intervention.id,
      createdAt = intervention.createdAt,
      modifiedAt = intervention.modifiedAt,
      title = intervention.title,
      interventionType = intervention.interventionType,
      timeOffsetInSeconds = intervention.timeOffsetInSeconds,
      scenarioId = intervention.scenarioId,
      interventionEmailId = intervention.interventionEmailId,
      value = intervention.value.get,
      isNegated = intervention.isNegated.get,
      fileId = intervention.fileId.get,
      spreadsheetId = intervention.spreadsheetId.get,
      spreadsheetRowIndex = intervention.spreadsheetRowIndex.get,
      spreadsheetColumnIndex = intervention.spreadsheetColumnIndex.get
    )

  def toTextDocumentContentIntervention(intervention: Intervention): TextDocumentContentIntervention =
    TextDocumentContentIntervention(
      id = intervention.id,
      createdAt = intervention.createdAt,
      modifiedAt = intervention.modifiedAt,
      title = intervention.title,
      interventionType = intervention.interventionType,
      timeOffsetInSeconds = intervention.timeOffsetInSeconds,
      scenarioId = intervention.scenarioId,
      interventionEmailId = intervention.interventionEmailId,
      value = intervention.value.get,
      fileId = intervention.fileId.get,
      textDocumentId = intervention.textDocumentId.get
    )

  def toInterventionCreation(intervention: Intervention): InterventionCreation =
    InterventionCreation(
      title = intervention.title,
      interventionType = intervention.interventionType,
      timeOffsetInSeconds = intervention.timeOffsetInSeconds,
      scenarioId = intervention.scenarioId,
      interventionEmailId = intervention.interventionEmailId,
      fileId = intervention.fileId,
      emailId = intervention.emailId,
      answerId = intervention.answerId,
      isNegated = intervention.isNegated,
      value = intervention.value,
      sampleCompanyId = intervention.sampleCompanyId,
      erpComponentId = intervention.erpComponentId,
      erpComponentErpProductId = intervention.erpComponentErpProductId,
      erpCustomerId = intervention.erpCustomerId,
      erpEmployeeId = intervention.erpEmployeeId,
      erpInvoiceId = intervention.erpInvoiceId,
      erpOrderId = intervention.erpOrderId,
      erpOrderItemId = intervention.erpOrderItemId,
      erpProductId = intervention.erpProductId,
      erpSupplierId = intervention.erpSupplierId,
      spreadsheetId = intervention.spreadsheetId,
      spreadsheetRowIndex = intervention.spreadsheetRowIndex,
      spreadsheetColumnIndex = intervention.spreadsheetColumnIndex,
      textDocumentId = intervention.textDocumentId
    )

  def toIntervention(creation: InterventionCreation): Intervention =
    Intervention(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      interventionType = creation.interventionType,
      timeOffsetInSeconds = creation.timeOffsetInSeconds,
      scenarioId = creation.scenarioId,
      interventionEmailId = creation.interventionEmailId,
      fileId = creation.fileId,
      emailId = creation.emailId,
      answerId = creation.answerId,
      isNegated = creation.isNegated,
      value = creation.value,
      sampleCompanyId = creation.sampleCompanyId,
      erpComponentId = creation.erpComponentId,
      erpComponentErpProductId = creation.erpComponentErpProductId,
      erpCustomerId = creation.erpCustomerId,
      erpEmployeeId = creation.erpEmployeeId,
      erpInvoiceId = creation.erpInvoiceId,
      erpOrderId = creation.erpOrderId,
      erpOrderItemId = creation.erpOrderItemId,
      erpProductId = creation.erpProductId,
      erpSupplierId = creation.erpSupplierId,
      spreadsheetId = creation.spreadsheetId,
      spreadsheetRowIndex = creation.spreadsheetRowIndex,
      spreadsheetColumnIndex = creation.spreadsheetColumnIndex,
      textDocumentId = creation.textDocumentId
    )
}
