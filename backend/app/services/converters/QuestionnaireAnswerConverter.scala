package services.converters

import database.generated.public.QuestionnaireAnswer
import models.QuestionnaireAnswerCreation
import utils.DateUtils

import java.util.UUID

object QuestionnaireAnswerConverter {

  def toQuestionnaireAnswer(creation: QuestionnaireAnswerCreation, position: BigDecimal): QuestionnaireAnswer =
    QuestionnaireAnswer(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      text = creation.text,
      questionId = creation.questionId,
      isCorrect = creation.isCorrect,
      position = position
    )

  def toQuestionnaireAnswerCreation(creation: QuestionnaireAnswer): QuestionnaireAnswerCreation =
    QuestionnaireAnswerCreation(
      text = creation.text,
      questionId = creation.questionId,
      isCorrect = creation.isCorrect
    )
}
