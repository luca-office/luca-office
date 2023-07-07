package actors

import akka.actor.{Actor, ActorLogging, ActorRef}
import models._

import java.util.UUID

class WebsocketManagerActor extends Actor with ActorLogging {

  sealed trait Person {
    def out: ActorRef
  }

  case class Participant(out: ActorRef, invitationId: UUID) extends Person
  case class Supervisor(out: ActorRef, userAccountId: UUID) extends Person

  private var participantsPerSurvey: Map[UUID, Seq[Participant]] = Map.empty
  private var supervisorsPerSurvey: Map[UUID, Seq[Supervisor]] = Map.empty

  def receive: Receive = {
    case actorMessage: ActorMessage =>
      actorMessage match {
        case ConnectParticipantMessage(surveyId, invitationId) =>
          val participants = participantsPerSurvey.getOrElse(surveyId, Nil)
          val updatedParticipants = participants :+ Participant(sender, invitationId)
          participantsPerSurvey = participantsPerSurvey.updated(surveyId, updatedParticipants)
          sendMessageToPersons(
            supervisorsPerSurvey,
            AvailableParticipantsMessage(surveyId, updatedParticipants.map(_.invitationId)))

        case DisconnectParticipantMessage(surveyId, invitationId) =>
          val participants = participantsPerSurvey.getOrElse(surveyId, Nil)
          val updatedParticipants = participants.filter(_.invitationId != invitationId)
          participantsPerSurvey = participantsPerSurvey.updated(surveyId, updatedParticipants)
          sendMessageToPersons(
            supervisorsPerSurvey,
            AvailableParticipantsMessage(surveyId, updatedParticipants.map(_.invitationId)))

        case ConnectSupervisorMessage(surveyId, userAccountId) =>
          val supervisors = supervisorsPerSurvey.getOrElse(surveyId, Nil)
          val updatedSupervisors = supervisors :+ Supervisor(sender, userAccountId)
          supervisorsPerSurvey = supervisorsPerSurvey.updated(surveyId, updatedSupervisors)
          val invitationIds = participantsPerSurvey.getOrElse(surveyId, Nil).map(_.invitationId)
          sender ! AvailableParticipantsMessage(surveyId, invitationIds)

        case DisconnectSupervisorMessage(surveyId, userAccountId) =>
          val supervisors = supervisorsPerSurvey.getOrElse(surveyId, Nil)
          val updatedSupervisors = supervisors.filter(_.userAccountId != userAccountId)
          supervisorsPerSurvey = supervisorsPerSurvey.updated(surveyId, updatedSupervisors)

        case message: StartSurveyMessage =>
          sendMessageToPersons(participantsPerSurvey, message)
          sendMessageToPersons(supervisorsPerSurvey, message)

        case message: EndSurveyMessage =>
          sendMessageToPersons(participantsPerSurvey, message)
          sendMessageToPersons(supervisorsPerSurvey, message)

        case message: StartQuestionnaireMessage =>
          sendMessageToPersons(participantsPerSurvey, message)
          sendMessageToPersons(supervisorsPerSurvey, message)

        case message: StartScenarioMessage =>
          sendMessageToPersons(participantsPerSurvey, message)
          sendMessageToPersons(supervisorsPerSurvey, message)

        case message: SendSupervisorChatMessageMessage =>
          participantsPerSurvey
            .getOrElse(message.surveyId, Nil)
            .filter(_.invitationId == message.recipientInvitationId)
            .foreach(_.out ! message)
          sendMessageToPersons(supervisorsPerSurvey, message)

        case message: SendParticipantChatMessageMessage =>
          sendMessageToPersons(supervisorsPerSurvey, message)

        case _: AvailableParticipantsMessage =>
          ()
      }

    case message =>
      log.warning(s"Unknown message: $message")
  }

  private def sendMessageToPersons(personsPerSurvey: Map[UUID, Seq[Person]], message: ActorMessage): Unit =
    personsPerSurvey.getOrElse(message.surveyId, Nil).foreach(_.out ! message)
}
