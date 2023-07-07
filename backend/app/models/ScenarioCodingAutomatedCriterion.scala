package models

import enums.{ErpTableType, FeatureType, OfficeTool}

import java.time.Instant
import java.util.UUID

case class ScenarioCodingAutomatedCriterionCreation(
    score: Int,
    officeTool: Option[OfficeTool],
    value: Option[String],
    spreadsheetRowIndex: Option[Int],
    spreadsheetColumnIndex: Option[Int],
    itemId: UUID,
    emailId: Option[UUID],
    fileId: Option[UUID],
    referenceBookArticleId: Option[UUID],
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
    rule: enums.AutomatedCodingItemRule,
    featureType: Option[FeatureType],
    rScriptId: Option[UUID]
)

sealed trait ScenarioCodingAutomatedCriterionBase {
  def id: UUID
  def createdAt: Instant
  def modifiedAt: Instant
  def score: Int
  def itemId: UUID
}

case class ToolUsageScenarioCodingAutomatedCriterion(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    score: Int,
    itemId: UUID,
    officeTool: OfficeTool
) extends ScenarioCodingAutomatedCriterionBase

case class InputValueScenarioCodingAutomatedCriterion(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    score: Int,
    itemId: UUID,
    officeTool: OfficeTool,
    value: String,
    fileId: Option[UUID],
    spreadsheetRowIndex: Option[Int],
    spreadsheetColumnIndex: Option[Int]
) extends ScenarioCodingAutomatedCriterionBase

case class DocumentViewScenarioCodingAutomatedCriterion(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    score: Int,
    itemId: UUID,
    fileId: Option[UUID],
    emailId: Option[UUID],
    sampleCompanyId: Option[UUID],
    erpRowId: Option[Int],
    erpTableType: Option[ErpTableType],
    referenceBookArticleId: Option[UUID]
) extends ScenarioCodingAutomatedCriterionBase

case class FeatureUsageScenarioCodingAutomatedCriterion(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    score: Int,
    itemId: UUID,
    officeTool: OfficeTool,
    featureType: FeatureType
) extends ScenarioCodingAutomatedCriterionBase

case class RScriptScenarioCodingAutomatedCriterion(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    score: Int,
    itemId: UUID,
    rScriptId: UUID
) extends ScenarioCodingAutomatedCriterionBase

sealed trait ScenarioCodingAutomatedCriterionCreationBase {
  def score: Int
  def itemId: UUID
}

case class ToolUsageScenarioCodingAutomatedCriterionCreation(
    score: Int,
    itemId: UUID,
    officeTool: OfficeTool
) extends ScenarioCodingAutomatedCriterionCreationBase

case class InputValueScenarioCodingAutomatedCriterionCreation(
    score: Int,
    itemId: UUID,
    officeTool: OfficeTool,
    value: String,
    fileId: Option[UUID],
    spreadsheetRowIndex: Option[Int],
    spreadsheetColumnIndex: Option[Int]
) extends ScenarioCodingAutomatedCriterionCreationBase

case class DocumentViewScenarioCodingAutomatedCriterionCreation(
    score: Int,
    itemId: UUID,
    fileId: Option[UUID],
    emailId: Option[UUID],
    sampleCompanyId: Option[UUID],
    erpRowId: Option[Int],
    erpTableType: Option[ErpTableType],
    referenceBookArticleId: Option[UUID]
) extends ScenarioCodingAutomatedCriterionCreationBase

case class FeatureUsageScenarioCodingAutomatedCriterionCreation(
    score: Int,
    itemId: UUID,
    officeTool: OfficeTool,
    featureType: FeatureType
) extends ScenarioCodingAutomatedCriterionCreationBase

case class RScriptScenarioCodingAutomatedCriterionCreation(
    score: Int,
    itemId: UUID,
    rScriptId: UUID
) extends ScenarioCodingAutomatedCriterionCreationBase

sealed trait ScenarioCodingAutomatedCriterionUpdateBase {
  def score: Int
}

case class ToolUsageScenarioCodingAutomatedCriterionUpdate(
    score: Int,
    officeTool: OfficeTool
) extends ScenarioCodingAutomatedCriterionUpdateBase

case class InputValueScenarioCodingAutomatedCriterionUpdate(
    score: Int,
    officeTool: OfficeTool,
    value: String,
    fileId: Option[UUID],
    spreadsheetRowIndex: Option[Int],
    spreadsheetColumnIndex: Option[Int]
) extends ScenarioCodingAutomatedCriterionUpdateBase

case class DocumentViewScenarioCodingAutomatedCriterionUpdate(
    score: Int,
    fileId: Option[UUID],
    emailId: Option[UUID],
    sampleCompanyId: Option[UUID],
    erpRowId: Option[Int],
    erpTableType: Option[ErpTableType],
    referenceBookArticleId: Option[UUID]
) extends ScenarioCodingAutomatedCriterionUpdateBase

case class FeatureUsageScenarioCodingAutomatedCriterionUpdate(
    score: Int,
    officeTool: OfficeTool,
    featureType: FeatureType
) extends ScenarioCodingAutomatedCriterionUpdateBase

case class RScriptScenarioCodingAutomatedCriterionUpdate(
    score: Int,
    rScriptId: UUID
) extends ScenarioCodingAutomatedCriterionUpdateBase
