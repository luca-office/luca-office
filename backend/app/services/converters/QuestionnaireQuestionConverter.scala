package services.converters

import database.generated.public.QuestionnaireQuestion
import models.QuestionnaireQuestionCreation
import utils.DateUtils

import java.util.UUID

object QuestionnaireQuestionConverter {

  def toQuestionnaireQuestion(creation: QuestionnaireQuestionCreation, position: BigDecimal): QuestionnaireQuestion =
    QuestionnaireQuestion(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      text = creation.text,
      questionType = creation.questionType,
      isAdditionalFreeTextAnswerEnabled = creation.isAdditionalFreeTextAnswerEnabled,
      binaryFileId = creation.binaryFileId,
      questionnaireId = creation.questionnaireId,
      scoringType = creation.scoringType,
      score = creation.score,
      position = position
    )

  def toQuestionnaireQuestionCreation(creation: QuestionnaireQuestion): QuestionnaireQuestionCreation =
    QuestionnaireQuestionCreation(
      text = creation.text,
      questionType = creation.questionType,
      isAdditionalFreeTextAnswerEnabled = creation.isAdditionalFreeTextAnswerEnabled,
      binaryFileId = creation.binaryFileId,
      scoringType = creation.scoringType,
      score = creation.score,
      questionnaireId = creation.questionnaireId
    )
}
