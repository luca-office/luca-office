package services.converters

import database.generated.public.ScenarioCodingAutomatedCriterion
import enums.AutomatedCodingItemRule
import enums.AutomatedCodingItemRule.{DocumentView, FeatureUsage, InputValue, RScript, ToolUsage}
import enums.ErpTableType._
import models._
import utils.DateUtils

import java.util.UUID

object ScenarioCodingAutomatedCriterionConverter {

  def toScenarioCodingAutomatedCriterionBase(
      criterion: ScenarioCodingAutomatedCriterion): ScenarioCodingAutomatedCriterionBase =
    criterion.rule match {
      case AutomatedCodingItemRule.DocumentView => toDocumentViewScenarioCodingAutomatedCriterion(criterion)
      case AutomatedCodingItemRule.FeatureUsage => toFeatureUsageScenarioCodingAutomatedCriterion(criterion)
      case AutomatedCodingItemRule.InputValue => toInputValueScenarioCodingAutomatedCriterion(criterion)
      case AutomatedCodingItemRule.RScript => toRScriptScenarioCodingAutomatedCriterion(criterion)
      case AutomatedCodingItemRule.ToolUsage => toToolUsageScenarioCodingAutomatedCriterion(criterion)
    }

  def toDocumentViewScenarioCodingAutomatedCriterion(
      criterion: ScenarioCodingAutomatedCriterion): DocumentViewScenarioCodingAutomatedCriterion = {
    val (erpTableType, erpRowId) = findErpTableTypeAndErpRowId(criterion)
      .map { case (tableType, rowId) => (Some(tableType), Some(rowId)) }
      .getOrElse((None, None))

    DocumentViewScenarioCodingAutomatedCriterion(
      id = criterion.id,
      createdAt = criterion.createdAt,
      modifiedAt = criterion.modifiedAt,
      score = criterion.score,
      itemId = criterion.itemId,
      fileId = criterion.fileId,
      emailId = criterion.emailId,
      referenceBookArticleId = criterion.referenceBookArticleId,
      sampleCompanyId = criterion.sampleCompanyId,
      erpRowId = erpRowId,
      erpTableType = erpTableType
    )
  }

  def toFeatureUsageScenarioCodingAutomatedCriterion(
      criterion: ScenarioCodingAutomatedCriterion): FeatureUsageScenarioCodingAutomatedCriterion =
    FeatureUsageScenarioCodingAutomatedCriterion(
      id = criterion.id,
      createdAt = criterion.createdAt,
      modifiedAt = criterion.modifiedAt,
      score = criterion.score,
      itemId = criterion.itemId,
      officeTool = criterion.officeTool.get,
      featureType = criterion.featureType.get
    )

  def toInputValueScenarioCodingAutomatedCriterion(
      criterion: ScenarioCodingAutomatedCriterion): InputValueScenarioCodingAutomatedCriterion =
    InputValueScenarioCodingAutomatedCriterion(
      id = criterion.id,
      createdAt = criterion.createdAt,
      modifiedAt = criterion.modifiedAt,
      score = criterion.score,
      itemId = criterion.itemId,
      officeTool = criterion.officeTool.get,
      value = criterion.value.get,
      fileId = criterion.fileId,
      spreadsheetRowIndex = criterion.spreadsheetRowIndex,
      spreadsheetColumnIndex = criterion.spreadsheetColumnIndex
    )

  def toRScriptScenarioCodingAutomatedCriterion(
      criterion: ScenarioCodingAutomatedCriterion): RScriptScenarioCodingAutomatedCriterion =
    RScriptScenarioCodingAutomatedCriterion(
      id = criterion.id,
      createdAt = criterion.createdAt,
      modifiedAt = criterion.modifiedAt,
      score = criterion.score,
      itemId = criterion.itemId,
      rScriptId = criterion.rScriptId.get
    )

  def toToolUsageScenarioCodingAutomatedCriterion(
      criterion: ScenarioCodingAutomatedCriterion): ToolUsageScenarioCodingAutomatedCriterion =
    ToolUsageScenarioCodingAutomatedCriterion(
      id = criterion.id,
      createdAt = criterion.createdAt,
      modifiedAt = criterion.modifiedAt,
      score = criterion.score,
      itemId = criterion.itemId,
      officeTool = criterion.officeTool.get
    )

  def toScenarioCodingAutomatedCriterion(
      creation: ScenarioCodingAutomatedCriterionCreationBase): ScenarioCodingAutomatedCriterion =
    creation match {
      case documentViewCreation: DocumentViewScenarioCodingAutomatedCriterionCreation =>
        toScenarioCodingAutomatedCriterion(documentViewCreation)
      case featureUsageCreation: FeatureUsageScenarioCodingAutomatedCriterionCreation =>
        toScenarioCodingAutomatedCriterion(featureUsageCreation)
      case inputValueCreation: InputValueScenarioCodingAutomatedCriterionCreation =>
        toScenarioCodingAutomatedCriterion(inputValueCreation)
      case rScriptCreation: RScriptScenarioCodingAutomatedCriterionCreation =>
        toScenarioCodingAutomatedCriterion(rScriptCreation)
      case toolUsageCreation: ToolUsageScenarioCodingAutomatedCriterionCreation =>
        toScenarioCodingAutomatedCriterion(toolUsageCreation)
    }

  def toScenarioCodingAutomatedCriterion(
      creation: DocumentViewScenarioCodingAutomatedCriterionCreation): ScenarioCodingAutomatedCriterion =
    ScenarioCodingAutomatedCriterion(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      rule = DocumentView,
      score = creation.score,
      itemId = creation.itemId,
      officeTool = None,
      value = None,
      spreadsheetRowIndex = None,
      spreadsheetColumnIndex = None,
      emailId = creation.emailId,
      fileId = creation.fileId,
      referenceBookArticleId = creation.referenceBookArticleId,
      sampleCompanyId = creation.sampleCompanyId,
      erpComponentId = creation.erpRowId.filter(_ => creation.erpTableType.contains(Component)),
      erpComponentErpProductId = creation.erpRowId.filter(_ => creation.erpTableType.contains(ComponentProduct)),
      erpCustomerId = creation.erpRowId.filter(_ => creation.erpTableType.contains(Customer)),
      erpEmployeeId = creation.erpRowId.filter(_ => creation.erpTableType.contains(Employee)),
      erpInvoiceId = creation.erpRowId.filter(_ => creation.erpTableType.contains(Invoice)),
      erpOrderId = creation.erpRowId.filter(_ => creation.erpTableType.contains(Order)),
      erpOrderItemId = creation.erpRowId.filter(_ => creation.erpTableType.contains(OrderItem)),
      erpProductId = creation.erpRowId.filter(_ => creation.erpTableType.contains(Product)),
      erpSupplierId = creation.erpRowId.filter(_ => creation.erpTableType.contains(Supplier)),
      featureType = None,
      rScriptId = None
    )

  def toScenarioCodingAutomatedCriterion(
      creation: FeatureUsageScenarioCodingAutomatedCriterionCreation): ScenarioCodingAutomatedCriterion =
    ScenarioCodingAutomatedCriterion(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      rule = FeatureUsage,
      score = creation.score,
      itemId = creation.itemId,
      officeTool = Some(creation.officeTool),
      value = None,
      spreadsheetRowIndex = None,
      spreadsheetColumnIndex = None,
      emailId = None,
      fileId = None,
      referenceBookArticleId = None,
      sampleCompanyId = None,
      erpComponentId = None,
      erpComponentErpProductId = None,
      erpCustomerId = None,
      erpEmployeeId = None,
      erpInvoiceId = None,
      erpOrderId = None,
      erpOrderItemId = None,
      erpProductId = None,
      erpSupplierId = None,
      featureType = Some(creation.featureType),
      rScriptId = None
    )

  def toScenarioCodingAutomatedCriterion(
      creation: InputValueScenarioCodingAutomatedCriterionCreation): ScenarioCodingAutomatedCriterion =
    ScenarioCodingAutomatedCriterion(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      rule = InputValue,
      score = creation.score,
      itemId = creation.itemId,
      officeTool = Some(creation.officeTool),
      value = Some(creation.value),
      spreadsheetRowIndex = creation.spreadsheetRowIndex,
      spreadsheetColumnIndex = creation.spreadsheetColumnIndex,
      emailId = None,
      fileId = creation.fileId,
      referenceBookArticleId = None,
      sampleCompanyId = None,
      erpComponentId = None,
      erpComponentErpProductId = None,
      erpCustomerId = None,
      erpEmployeeId = None,
      erpInvoiceId = None,
      erpOrderId = None,
      erpOrderItemId = None,
      erpProductId = None,
      erpSupplierId = None,
      featureType = None,
      rScriptId = None
    )

  def toScenarioCodingAutomatedCriterion(
      creation: RScriptScenarioCodingAutomatedCriterionCreation): ScenarioCodingAutomatedCriterion =
    ScenarioCodingAutomatedCriterion(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      rule = RScript,
      score = creation.score,
      itemId = creation.itemId,
      officeTool = None,
      value = None,
      spreadsheetRowIndex = None,
      spreadsheetColumnIndex = None,
      emailId = None,
      fileId = None,
      referenceBookArticleId = None,
      sampleCompanyId = None,
      erpComponentId = None,
      erpComponentErpProductId = None,
      erpCustomerId = None,
      erpEmployeeId = None,
      erpInvoiceId = None,
      erpOrderId = None,
      erpOrderItemId = None,
      erpProductId = None,
      erpSupplierId = None,
      featureType = None,
      rScriptId = Some(creation.rScriptId)
    )

  def toScenarioCodingAutomatedCriterion(
      creation: ToolUsageScenarioCodingAutomatedCriterionCreation): ScenarioCodingAutomatedCriterion =
    ScenarioCodingAutomatedCriterion(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      rule = ToolUsage,
      score = creation.score,
      itemId = creation.itemId,
      officeTool = Some(creation.officeTool),
      value = None,
      spreadsheetRowIndex = None,
      spreadsheetColumnIndex = None,
      emailId = None,
      fileId = None,
      referenceBookArticleId = None,
      sampleCompanyId = None,
      erpComponentId = None,
      erpComponentErpProductId = None,
      erpCustomerId = None,
      erpEmployeeId = None,
      erpInvoiceId = None,
      erpOrderId = None,
      erpOrderItemId = None,
      erpProductId = None,
      erpSupplierId = None,
      featureType = None,
      rScriptId = None
    )

  private def findErpTableTypeAndErpRowId(criterion: ScenarioCodingAutomatedCriterion) =
    criterion match {
      case c if c.erpComponentId.isDefined => Some((Component, c.erpComponentId.get))
      case c if c.erpComponentErpProductId.isDefined => Some((ComponentProduct, c.erpComponentErpProductId.get))
      case c if c.erpCustomerId.isDefined => Some((Customer, c.erpCustomerId.get))
      case c if c.erpEmployeeId.isDefined => Some((Employee, c.erpEmployeeId.get))
      case c if c.erpInvoiceId.isDefined => Some((Invoice, c.erpInvoiceId.get))
      case c if c.erpOrderId.isDefined => Some((Order, c.erpOrderId.get))
      case c if c.erpOrderItemId.isDefined => Some((OrderItem, c.erpOrderItemId.get))
      case c if c.erpProductId.isDefined => Some((Product, c.erpProductId.get))
      case c if c.erpSupplierId.isDefined => Some((Supplier, c.erpSupplierId.get))
      case _ => None
    }

  def toScenarioCodingAutomatedCriterion(
      creation: ScenarioCodingAutomatedCriterionCreation): ScenarioCodingAutomatedCriterion =
    ScenarioCodingAutomatedCriterion(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      rule = creation.rule,
      score = creation.score,
      itemId = creation.itemId,
      officeTool = creation.officeTool,
      value = creation.value,
      spreadsheetRowIndex = creation.spreadsheetRowIndex,
      spreadsheetColumnIndex = creation.spreadsheetColumnIndex,
      emailId = creation.emailId,
      fileId = creation.fileId,
      referenceBookArticleId = creation.referenceBookArticleId,
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
      featureType = creation.featureType,
      rScriptId = creation.rScriptId
    )

  def toScenarioCodingAutomatedCriterionCreation(
      criterion: ScenarioCodingAutomatedCriterion): ScenarioCodingAutomatedCriterionCreation =
    ScenarioCodingAutomatedCriterionCreation(
      rule = criterion.rule,
      score = criterion.score,
      itemId = criterion.itemId,
      officeTool = criterion.officeTool,
      value = criterion.value,
      spreadsheetRowIndex = criterion.spreadsheetRowIndex,
      spreadsheetColumnIndex = criterion.spreadsheetColumnIndex,
      emailId = criterion.emailId,
      fileId = criterion.fileId,
      referenceBookArticleId = criterion.referenceBookArticleId,
      sampleCompanyId = criterion.sampleCompanyId,
      erpComponentId = criterion.erpComponentId,
      erpComponentErpProductId = criterion.erpComponentErpProductId,
      erpCustomerId = criterion.erpCustomerId,
      erpEmployeeId = criterion.erpEmployeeId,
      erpInvoiceId = criterion.erpInvoiceId,
      erpOrderId = criterion.erpOrderId,
      erpOrderItemId = criterion.erpOrderItemId,
      erpProductId = criterion.erpProductId,
      erpSupplierId = criterion.erpSupplierId,
      featureType = criterion.featureType,
      rScriptId = criterion.rScriptId
    )
}
