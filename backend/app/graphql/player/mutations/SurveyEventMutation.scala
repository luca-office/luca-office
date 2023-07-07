package graphql.player.mutations

import enums.SurveyEventType
import graphql.Private
import graphql.player.PlayerContext
import io.circe.parser.parse
import models._
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}
import services.SurveyEventService

import scala.concurrent.Future

trait SurveyEventMutation {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createSurveyEvents(creations: Seq[SurveyEventCreation]): Future[String] = {
    sendNotificationsForParticipantChatMessages(creations)

    surveyEventService.createBulk(creations)
  }

  private def sendNotificationsForParticipantChatMessages(creations: Seq[SurveyEventCreation]): Unit =
    creations
      .foreach {
        case SurveyEventCreation(
              surveyId,
              invitationId,
              _,
              SurveyEventType.SendParticipantChatMessage,
              _,
              Some(dataString)) =>
          for {
            data <- parse(dataString)
            surveyEventData <- SurveyEventService.decodeData(data, SurveyEventType.SendParticipantChatMessage)
            SendParticipantChatMessage(_, message, _, _) = surveyEventData
          } yield websocketManager ! SendParticipantChatMessageMessage(surveyId, invitationId, message)
        case _ => ()
      }
}
