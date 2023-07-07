import actors.WebsocketManagerActor
import akka.actor.{ActorRef, ActorSystem, Props}
import com.google.inject.{AbstractModule, Provides}
import play.api.libs.concurrent.AkkaGuiceSupport
import services.RScriptEvaluation
import tasks.ExecuteRScriptEvaluationActor

import javax.inject.{Named, Singleton}

class ActorsModule extends AbstractModule with AkkaGuiceSupport {
  implicit val ec: scala.concurrent.ExecutionContext = scala.concurrent.ExecutionContext.global

  @Provides
  @Singleton
  @Named("execute-rscript-evaluation-actor")
  def executeRScriptEvaluations(
      actorSystem: ActorSystem,
      rScriptEvaluation: RScriptEvaluation
  ): ActorRef =
  actorSystem.actorOf(
      Props(new ExecuteRScriptEvaluationActor(rScriptEvaluation))
    )

  override def configure(): Unit =
    bindActor[WebsocketManagerActor]("websocket-manager")
}
