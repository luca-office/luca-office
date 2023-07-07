package tasks

import akka.actor.Actor
import services._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.ExecutionContext

class ExecuteRScriptEvaluationActor @Inject() (
    rScriptEvaluation: RScriptEvaluation
)(implicit val executionContext: ExecutionContext)
    extends Actor {

  override def receive: Receive = { case message: ExecuteRScriptEvaluationActor.MessageEvaluateRScript =>
    runRScriptEvaluationForSurveyInvitationId(message)
  }

  def runRScriptEvaluationForSurveyInvitationId(msg: ExecuteRScriptEvaluationActor.MessageEvaluateRScript): Unit =
    rScriptEvaluation.evaluate(
      surveyId = msg.surveyId,
      surveyInvitationId = msg.surveyInvitationId,
      scenarioId = msg.scenarioId
    )
}

object ExecuteRScriptEvaluationActor {
  case class MessageEvaluateRScript(surveyId: UUID, surveyInvitationId: UUID, scenarioId: UUID)
}
