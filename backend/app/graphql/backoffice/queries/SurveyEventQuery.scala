package graphql.backoffice.queries

import database.generated.public.SurveyEvent
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SurveyEventQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def surveyEventsForSurvey(surveyId: UUID, scenarioId: UUID): Future[Seq[SurveyEvent]] =
    surveyEventService.allForScenario(surveyId, scenarioId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def surveyEvents(surveyInvitationId: UUID, scenarioId: UUID): Future[Seq[SurveyEvent]] =
    surveyEventService.allForParticipantForScenario(surveyInvitationId, scenarioId)
}
