package models

import enums.{QuestionScoringType, QuestionType}

import java.util.UUID

case class QuestionnaireQuestionCreation(
    text: String,
    questionType: QuestionType,
    isAdditionalFreeTextAnswerEnabled: Boolean,
    binaryFileId: Option[UUID],
    scoringType: QuestionScoringType,
    score: Int,
    questionnaireId: UUID
)

case class QuestionnaireQuestionUpdate(
    text: String,
    questionType: QuestionType,
    isAdditionalTextAnswerAllowed: Boolean,
    binaryFileId: Option[UUID],
    scoringType: QuestionScoringType,
    score: Int
)
