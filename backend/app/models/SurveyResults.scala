package models

import java.util.UUID

case class SurveyResultsOverview(
    surveyId: UUID,
    participantResults: Seq[ParticipantResult],
    projectModuleResults: Seq[ProjectModuleResult],
    averageScore: Option[BigDecimal],
    maximumScore: Int,
    areResultsComplete: Boolean
)

case class ProjectModuleResults(
    projectModuleId: UUID,
    participantResults: Seq[ParticipantProjectModuleResult],
    averageScore: Option[BigDecimal],
    maximumScore: Int
)

case class ParticipantResults(
    surveyInvitationId: UUID,
    projectModuleScores: Seq[ProjectModuleScore]
)

case class ParticipantResult(
    surveyInvitationId: UUID,
    participantName: Option[String],
    score: Int,
    isComplete: Boolean
)

case class ParticipantProjectModuleResult(
    surveyInvitationId: UUID,
    participantName: Option[String],
    score: Option[Int]
)

case class ProjectModuleResult(
    scenarioId: Option[UUID],
    questionnaireId: Option[UUID],
    averageScore: BigDecimal,
    maximumScore: Int,
    isComplete: Boolean
)

sealed trait ProjectModuleScore {
  def score: Int
  def maximumScore: Int
  def isComplete: Boolean
}

case class ParticipantScore(
    surveyInvitationId: UUID,
    participantName: Option[String],
    isComplete: Boolean,
    projectModuleScores: Seq[ProjectModuleScore]
)

case class ScenarioScore(scenarioId: UUID, score: Int, maximumScore: Int, isComplete: Boolean)
    extends ProjectModuleScore
case class QuestionnaireScore(questionnaireId: UUID, score: Int, maximumScore: Int, isComplete: Boolean)
    extends ProjectModuleScore

case class ScoreTuple(score: Option[Int], maximumSore: Int)

case class ParticipantScenarioSurveyResult(
    surveyInvitationId: UUID,
    scenarioId: UUID,
    codingItemResults: Seq[ParticipantCodingItemSurveyResult]
)

case class ParticipantCodingItemSurveyResult(
    itemId: UUID,
    score: Int,
    maximumScore: Int,
    averageScore: BigDecimal,
    selectedCriteriaIds: Seq[UUID],
    noCriterionFulfilled: Boolean
)

case class ParticipantQuestionnaireSurveyResult(
    surveyInvitationId: UUID,
    questionnaireId: UUID,
    questionResults: Seq[ParticipantQuestionSurveyResult]
)

case class ParticipantQuestionSurveyResult(
    questionId: UUID,
    score: Int,
    maximumScore: Int,
    averageScore: BigDecimal,
    selectedAnswerIds: Seq[UUID],
    selectedCriteriaIds: Seq[UUID],
    noCriterionFulfilled: Boolean,
    freetextAnswer: String
)
