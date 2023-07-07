package actors

import akka.actor.{Actor, ActorRef, Cancellable, Props}
import models.{ActorMessage, ConnectParticipantMessage, DisconnectParticipantMessage}
import play.api.Logging
import utils.ActorUtils
import utils.ActorUtils.serialize

import java.util.UUID

object ParticipantActor {
  def props(actorRef: ActorRef, manager: ActorRef, surveyId: UUID, invitationId: UUID): Props =
    Props(new ParticipantActor(actorRef, manager, surveyId, invitationId))
}

class ParticipantActor(out: ActorRef, manager: ActorRef, surveyId: UUID, invitationId: UUID)
    extends Actor
    with Logging {

  private var handle: Option[Cancellable] = None

  override def preStart(): Unit = {
    handle = Some(
      context.system.scheduler.scheduleWithFixedDelay(
        initialDelay = ActorUtils.pingDelay,
        delay = ActorUtils.pingDelay,
        receiver = out,
        message = "")(context.dispatcher))
    manager ! ConnectParticipantMessage(surveyId, invitationId)
  }

  override def postStop(): Unit = {
    handle.foreach(_.cancel())
    manager ! DisconnectParticipantMessage(surveyId, invitationId)
  }

  def receive: Receive = {
    case message: ActorMessage =>
      out ! serialize(message)
    case message =>
      logger.warn(s"Unknown message: $message")
  }
}
