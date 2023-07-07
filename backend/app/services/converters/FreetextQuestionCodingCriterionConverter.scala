package services.converters

import database.generated.public.FreetextQuestionCodingCriterion
import models.FreetextQuestionCodingCriterionCreation
import utils.DateUtils

import java.util.UUID

object FreetextQuestionCodingCriterionConverter {

  def toFreetextQuestionCodingCriterion(
      creation: FreetextQuestionCodingCriterionCreation): FreetextQuestionCodingCriterion =
    FreetextQuestionCodingCriterion(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      description = creation.description,
      score = creation.score,
      questionId = creation.questionId
    )

  def toFreetextQuestionCodingCriterionCreation(
      criterion: FreetextQuestionCodingCriterion): FreetextQuestionCodingCriterionCreation =
    FreetextQuestionCodingCriterionCreation(
      description = criterion.description,
      score = criterion.score,
      questionId = criterion.questionId
    )
}
