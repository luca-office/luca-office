package actors

import akka.actor.{Actor, ActorRef, Cancellable, Props}
import models.{ActorMessage, ConnectSupervisorMessage, DisconnectSupervisorMessage}
import play.api.Logging
import utils.ActorUtils
import utils.ActorUtils.serialize

import java.util.UUID

object SupervisorActor {
  def props(actorRef: ActorRef, manager: ActorRef, surveyId: UUID, userAccountId: UUID): Props =
    Props(new SupervisorActor(actorRef, manager, surveyId, userAccountId))
}

class SupervisorActor(out: ActorRef, manager: ActorRef, surveyId: UUID, userAccountId: UUID)
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
    manager ! ConnectSupervisorMessage(surveyId, userAccountId)
  }

  override def postStop(): Unit = {
    handle.foreach(_.cancel())
    manager ! DisconnectSupervisorMessage(surveyId, userAccountId)
  }

  def receive: Receive = {
    case message: ActorMessage =>
      out ! serialize(message)
    case message =>
      logger.warn(s"Unknown message: $message")
  }
}
