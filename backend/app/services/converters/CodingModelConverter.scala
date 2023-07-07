package services.converters

import database.generated.public.CodingModel
import models.CodingModelCreation
import utils.DateUtils

import java.util.UUID

object CodingModelConverter {

  def toCodingModel(creation: CodingModelCreation): CodingModel =
    CodingModel(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      description = creation.description,
      scenarioId = creation.scenarioId
    )

  def toCodingModelCreation(codingModel: CodingModel): CodingModelCreation =
    CodingModelCreation(
      title = codingModel.title,
      description = codingModel.description,
      scenarioId = codingModel.scenarioId
    )
}
