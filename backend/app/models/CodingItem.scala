package models

import enums.{AutomatedCodingItemRule, ScoringType}

import java.time.Instant
import java.util.UUID

sealed trait CodingItemBase {
  def id: UUID
  def createdAt: Instant
  def modifiedAt: Instant
  def title: String
  def description: String
  def scoringType: ScoringType
  def position: BigDecimal
  def dimensionId: UUID
}

case class AutomatedCodingItem(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    title: String,
    description: String,
    position: BigDecimal,
    dimensionId: UUID,
    scoringType: ScoringType,
    rule: AutomatedCodingItemRule
) extends CodingItemBase

case class ManualCodingItem(
    id: UUID,
    createdAt: Instant,
    modifiedAt: Instant,
    title: String,
    description: String,
    scoringType: ScoringType,
    position: BigDecimal,
    dimensionId: UUID
) extends CodingItemBase

sealed trait CodingItemCreationBase {
  def title: String
  def description: String
  def dimensionId: UUID
}

case class ManualCodingItemCreation(
    title: String,
    description: String,
    scoringType: ScoringType,
    dimensionId: UUID
) extends CodingItemCreationBase

case class AutomatedCodingItemCreation(
    title: String,
    description: String,
    rule: AutomatedCodingItemRule,
    dimensionId: UUID
) extends CodingItemCreationBase

sealed trait CodingItemUpdateBase {
  def title: String
  def description: String
}

case class ManualCodingItemUpdate(
    title: String,
    description: String,
    scoringType: ScoringType
) extends CodingItemUpdateBase

case class AutomatedCodingItemUpdate(
    title: String,
    description: String
) extends CodingItemUpdateBase
