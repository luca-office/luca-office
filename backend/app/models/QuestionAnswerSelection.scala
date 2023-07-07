package models

import java.util.UUID

case class QuestionAnswerSelection(selectedAnswerIds: Seq[UUID], wasFreetextAnswerSelected: Boolean)
