package services.converters

import database.generated.public.CodingItem
import enums.ScoringType.Analytical
import models._
import utils.DateUtils

import java.util.UUID

object CodingItemConverter {

  def toCodingItemBase(codingItem: CodingItem): CodingItemBase =
    if (codingItem.isAutomated)
      toAutomatedCodingItem(codingItem)
    else
      toManualCodingItem(codingItem)

  def toAutomatedCodingItem(codingItem: CodingItem): AutomatedCodingItem =
    AutomatedCodingItem(
      id = codingItem.id,
      createdAt = codingItem.createdAt,
      modifiedAt = codingItem.modifiedAt,
      title = codingItem.title,
      description = codingItem.description,
      dimensionId = codingItem.dimensionId,
      position = codingItem.position,
      scoringType = codingItem.scoringType,
      rule = codingItem.rule.get
    )

  def toManualCodingItem(codingItem: CodingItem): ManualCodingItem =
    ManualCodingItem(
      id = codingItem.id,
      createdAt = codingItem.createdAt,
      modifiedAt = codingItem.modifiedAt,
      title = codingItem.title,
      description = codingItem.description,
      dimensionId = codingItem.dimensionId,
      position = codingItem.position,
      scoringType = codingItem.scoringType
    )

  def toCodingItem(creation: CodingItemCreationBase, position: BigDecimal): CodingItem =
    creation match {
      case automatedCodingItemCreation: AutomatedCodingItemCreation =>
        toCodingItem(automatedCodingItemCreation, position)
      case manualCodingItemCreation: ManualCodingItemCreation =>
        toCodingItem(manualCodingItemCreation, position)
    }

  def toCodingItem(creation: ManualCodingItemCreation, position: BigDecimal): CodingItem =
    CodingItem(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      description = creation.description,
      scoringType = creation.scoringType,
      dimensionId = creation.dimensionId,
      position = position,
      isAutomated = false,
      rule = None
    )

  def toCodingItem(creation: AutomatedCodingItemCreation, position: BigDecimal): CodingItem =
    CodingItem(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      description = creation.description,
      scoringType = Analytical,
      dimensionId = creation.dimensionId,
      position = position,
      isAutomated = true,
      rule = Some(creation.rule)
    )

  def toCodingItemCreation(codingItem: CodingItem): CodingItemCreationBase =
    if (codingItem.isAutomated)
      toAutomatedCodingItemCreation(codingItem)
    else
      toManualCodingItemCreation(codingItem)

  def toManualCodingItemCreation(codingItem: CodingItem): ManualCodingItemCreation =
    ManualCodingItemCreation(
      title = codingItem.title,
      description = codingItem.description,
      scoringType = codingItem.scoringType,
      dimensionId = codingItem.dimensionId
    )

  def toAutomatedCodingItemCreation(codingItem: CodingItem): AutomatedCodingItemCreation =
    AutomatedCodingItemCreation(
      title = codingItem.title,
      description = codingItem.description,
      rule = codingItem.rule.get,
      dimensionId = codingItem.dimensionId
    )
}
