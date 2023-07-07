package services.converters

import database.generated.public.CodingCriterion
import models.CodingCriterionCreation
import utils.DateUtils

import java.util.UUID

object CodingCriterionConverter {

  def toCodingCriterion(creation: CodingCriterionCreation): CodingCriterion =
    CodingCriterion(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      description = creation.description,
      score = creation.score,
      itemId = creation.itemId
    )

  def toCodingCriterionCreation(codingCriterion: CodingCriterion): CodingCriterionCreation =
    CodingCriterionCreation(
      description = codingCriterion.description,
      score = codingCriterion.score,
      itemId = codingCriterion.itemId
    )
}
