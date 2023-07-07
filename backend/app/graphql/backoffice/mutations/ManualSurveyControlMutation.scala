package graphql.backoffice.mutations

import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{EndSurveyMessage, StartQuestionnaireMessage, StartScenarioMessage, StartSurveyMessage}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ManualSurveyControlMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def startSurvey(surveyId: UUID): Future[Unit] = {
    websocketManager ! StartSurveyMessage(surveyId)
    runWithUserAccount(userAccount => surveyEventService.createStartSurveyCommandEvent(surveyId, userAccount.id))
      .map(_ => ())
  }

  @GraphQLField
  @GraphQLFieldTags(Private)
  def endSurvey(surveyId: UUID): Future[Unit] = {
    websocketManager ! EndSurveyMessage(surveyId)
    runWithUserAccount(userAccount => surveyEventService.createEndSurveyCommandEvent(surveyId, userAccount.id))
      .map(_ => ())
  }

  @GraphQLField
  @GraphQLFieldTags(Private)
  def startScenario(surveyId: UUID, scenarioId: UUID): Future[Unit] = {
    websocketManager ! StartScenarioMessage(surveyId, scenarioId)
    runWithUserAccount(userAccount =>
      surveyEventService.createStartScenarioCommandEvent(surveyId, scenarioId, userAccount.id)).map(_ => ())
  }

  @GraphQLField
  @GraphQLFieldTags(Private)
  def startQuestionnaire(surveyId: UUID, questionnaireId: UUID): Future[Unit] = {
    websocketManager ! StartQuestionnaireMessage(surveyId, questionnaireId)
    runWithUserAccount(userAccount =>
      surveyEventService.createStartQuestionnaireCommandEvent(surveyId, questionnaireId, userAccount.id)).map(_ => ())
  }
}
