package services.converters

import database.generated.public.Questionnaire
import models.QuestionnaireCreation
import utils.DateUtils

import java.util.UUID

object QuestionnaireConverter {

  def toQuestionnaire(creation: QuestionnaireCreation, authorId: UUID): Questionnaire =
    Questionnaire(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      finalizedAt = None,
      publishedAt = None,
      archivedAt = None,
      title = creation.title,
      description = creation.description,
      questionnaireType = creation.questionnaireType,
      binaryFileId = creation.binaryFileId,
      maxDurationInSeconds = None,
      authorId = authorId
    )

  def toQuestionnaireCreation(questionnaire: Questionnaire): QuestionnaireCreation =
    QuestionnaireCreation(
      title = questionnaire.title,
      description = questionnaire.description,
      questionnaireType = questionnaire.questionnaireType,
      binaryFileId = questionnaire.binaryFileId
    )
}
