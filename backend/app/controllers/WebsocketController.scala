package controllers

import actors.{ParticipantActor, SupervisorActor}
import akka.actor.{ActorRef, ActorSystem}
import akka.stream.Materializer
import play.api.libs.streams.ActorFlow
import play.api.mvc._
import utils.UserAction

import java.util.UUID
import javax.inject._
import scala.concurrent.Future
import scala.util.Success

@Singleton
class WebsocketController @Inject() (
    val controllerComponents: ControllerComponents,
    @Named("websocket-manager") websocketManager: ActorRef)(implicit system: ActorSystem, materializer: Materializer)
    extends BaseController {

  def office(surveyId: UUID, invitationId: UUID): WebSocket = WebSocket.accept[String, String](_ =>
    ActorFlow.actorRef(out => ParticipantActor.props(out, websocketManager, surveyId, invitationId)))

  def backoffice(surveyId: UUID): WebSocket = WebSocket.acceptOrResult[String, String](request =>
    Future.successful(UserAction.retrieveUserAccountId(request.session) match {
      case Success(userAccountId) =>
        Right(ActorFlow.actorRef(out => SupervisorActor.props(out, websocketManager, surveyId, userAccountId)))
      case _ =>
        Left(Forbidden)
    }))
}
