package models

import enums.QuestionnaireType

import java.util.UUID

case class QuestionnaireCreation(
    title: String,
    description: String,
    questionnaireType: QuestionnaireType,
    binaryFileId: Option[UUID]
)

case class QuestionnaireUpdate(
    title: String,
    description: String,
    questionnaireType: QuestionnaireType,
    binaryFileId: Option[UUID],
    maxDurationInSeconds: Option[Int]
)
