package models

import java.util.UUID

case class QuestionnaireAnswerCreation(
    text: String,
    isCorrect: Boolean,
    questionId: UUID
)

case class QuestionnaireAnswerUpdate(
    text: String,
    isCorrect: Boolean
)
