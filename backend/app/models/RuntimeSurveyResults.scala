package models

import java.util.UUID

case class RuntimeSurveyResult(
    questionnaireId: UUID,
    participantIds: Seq[UUID],
    completedParticipantIds: Seq[UUID],
    questionResults: Seq[RuntimeSurveyQuestionResult]
)

case class RuntimeSurveyQuestionResult(
    questionId: UUID,
    answerSelections: Seq[RuntimeSurveyAnswerSelection],
    participantResults: Seq[RuntimeSurveyParticipantResult]
)

case class RuntimeSurveyAnswerSelection(
    answerId: Option[UUID],
    isFreetextAnswer: Boolean,
    selectionsCount: Int,
    selectionsAsPercent: Double
)

case class RuntimeSurveyParticipantResult(
    invitationId: UUID,
    selectedAnswerIds: Seq[UUID],
    wasFreetextAnswerSelected: Boolean
)
