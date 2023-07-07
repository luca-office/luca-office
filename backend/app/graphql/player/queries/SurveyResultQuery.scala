package graphql.player.queries

import graphql.Private
import graphql.player.PlayerContext
import models._
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SurveyResultQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def surveyResultsOverview(surveyId: UUID): Future[SurveyResultsOverview] =
    surveyResultsService.overview(surveyId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def surveyResultsForParticipant(surveyId: UUID, surveyInvitationId: UUID): Future[ParticipantResults] =
    surveyResultsService.participantResults(surveyId, surveyInvitationId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioSurveyResultsForParticipant(
      surveyId: UUID,
      surveyInvitationId: UUID,
      scenarioId: UUID): Future[ParticipantScenarioSurveyResult] =
    scenarioSurveyResultsService.participantScenarioResult(surveyId, surveyInvitationId, scenarioId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioSurveyResultsForParticipants(
      surveyId: UUID,
      scenarioId: UUID): Future[Seq[ParticipantScenarioSurveyResult]] =
    scenarioSurveyResultsService.participantsScenarioResult(surveyId, scenarioId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def questionnaireSurveyResultsForParticipant(
      surveyId: UUID,
      surveyInvitationId: UUID,
      questionnaireId: UUID): Future[ParticipantQuestionnaireSurveyResult] =
    questionnaireSurveyResultsService.participantQuestionnaireResult(surveyId, surveyInvitationId, questionnaireId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def questionnaireSurveyResultsForParticipants(
      surveyId: UUID,
      questionnaireId: UUID): Future[Seq[ParticipantQuestionnaireSurveyResult]] =
    questionnaireSurveyResultsService.participantsQuestionnaireResult(surveyId, questionnaireId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def answeredQuestionsForQuestionnaire(questionnaireId: UUID, surveyInvitationId: UUID): Future[Seq[UUID]] =
    questionnaireSurveyResultsService.answeredQuestionsForQuestionnaire(questionnaireId, surveyInvitationId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def runtimeSurveyResults(surveyId: UUID, scenarioId: UUID): Future[Seq[RuntimeSurveyResult]] =
    runtimeSurveyResultsService.overview(surveyId, scenarioId)
}
