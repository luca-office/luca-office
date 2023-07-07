package services.converters

import database.generated.public.CodingDimension
import models.CodingDimensionCreation
import utils.DateUtils

import java.util.UUID

object CodingDimensionConverter {

  def toCodingDimension(creation: CodingDimensionCreation, position: BigDecimal): CodingDimension =
    CodingDimension(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      description = creation.description,
      parentDimensionId = creation.parentDimensionId,
      codingModelId = creation.codingModelId,
      position = position
    )

  def toCodingDimensionCreation(codingDimension: CodingDimension): CodingDimensionCreation =
    CodingDimensionCreation(
      title = codingDimension.title,
      description = codingDimension.description,
      parentDimensionId = codingDimension.parentDimensionId,
      codingModelId = codingDimension.codingModelId
    )
}
