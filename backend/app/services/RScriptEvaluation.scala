package services

import database.DatabaseContext
import database.generated.public._
import enums.RScriptEvaluationStatus.{NoResult, Success, Timeout}
import io.circe.generic.auto._
import io.circe.parser._
import models.{RScriptEvaluationApiResponse, RScriptEvaluationResultCreation}
import play.api.Logging
import play.api.libs.ws.WSClient
import services.generated.{DefaultAllProjectModule, DefaultFindSurveyInvitation}
import utils.ApplicationConfiguration

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class RScriptEvaluation @Inject() (
    wsClient: WSClient,
    applicationConfiguration: ApplicationConfiguration,
    databaseContext: DatabaseContext,
    rScriptEvaluationResultService: RScriptEvaluationResultService)(implicit val executionContext: ExecutionContext)
    extends ProjectModuleServiceActions
    with DefaultFindSurveyInvitation
    with DefaultAllProjectModule
    with CodingItemServiceActions
    with ScenarioServiceActions
    with QuillUtils
    with Logging {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def evaluate(surveyId: UUID, surveyInvitationId: UUID, scenarioId: UUID): Future[Unit] = {
    val queryQuotation = quote(for {
      model <- query[CodingModel].filter(_.scenarioId == lift(scenarioId))
      dimension <- query[CodingDimension].filter(_.codingModelId == model.id)
      item <- query[CodingItem].filter(_.dimensionId == dimension.id)
      scenarioCodingAutomatedCriterion <- query[ScenarioCodingAutomatedCriterion].filter(_.itemId == item.id)
      rScript <- query[RScript].filter(rScriptRow => scenarioCodingAutomatedCriterion.rScriptId.contains(rScriptRow.id))
    } yield (scenarioCodingAutomatedCriterion, rScript))

    performIO(runIO(queryQuotation))
      .map(_.toSeq)
      .flatMap { queryResult =>
        Future.sequence(
          queryResult.map { case (scenarioCodingAutomatedCriterion, rScript) =>
            requestRemoteEvaluation(
              rScript,
              invitationId = surveyInvitationId,
              scenarioId = scenarioId,
              surveyId = surveyId,
              criterionId = scenarioCodingAutomatedCriterion.id
            )
          }
        )
      }
      .map(_ => ())
      .recover { case error =>
        logger.info("Error on evaluating r-script: ", error)
      }
  }

  def requestRemoteEvaluation(
      rScript: RScript,
      invitationId: UUID,
      scenarioId: UUID,
      surveyId: UUID,
      criterionId: UUID): Future[Unit] =
    wsClient
      .url(
        s"${applicationConfiguration.misc.evaluationApiUrl}?functionId=${rScript.title}&invitationId=${invitationId}&scenarioId=${scenarioId}&surveyId=${surveyId}")
      .get()
      .map(response => decode[RScriptEvaluationApiResponse](response.bodyAsBytes.utf8String))
      .map {
        case Right(result) =>
          rScriptEvaluationResultService.create(RScriptEvaluationResultCreation(
            status = Success,
            invitationId = invitationId,
            criterionId = criterionId,
            probability = result.criterion_probability.getOrElse(0),
            criterionFulfilled = result.criterion_prediction match {
              case Some("fulfilled") => Some(true)
              case Some("not_fulfilled") => Some(false)
              case Some("undefined") => None
              case _ => None
            },
            threshold = result.criterion_threshold,
            functionName = result.function_name,
            criterionNo = result.criterion_no,
            resultData = result.data
          ))
        case Left(error) =>
          logger.error("Error parsing the response of the rscript evaluation request.", error)
          rScriptEvaluationResultService.create(RScriptEvaluationResultCreation(
            status = NoResult,
            invitationId = invitationId,
            criterionId = criterionId,
            probability = 0,
            criterionFulfilled = None,
            threshold = None,
            functionName = None,
            criterionNo = None,
            resultData = None
          ))
      }
      .map(_ => ())
      .recover {
        case error: scala.concurrent.TimeoutException =>
          logger.info("The request to rscript evaluation timed out.", error)
          rScriptEvaluationResultService.create(
            RScriptEvaluationResultCreation(
              status = Timeout,
              invitationId = invitationId,
              criterionId = criterionId,
              probability = 0,
              criterionFulfilled = None,
              threshold = None,
              functionName = None,
              criterionNo = None,
              resultData = None
            ))
        case error =>
          logger.error("Error while requesting rscript evaluation.", error)
          rScriptEvaluationResultService.create(
            RScriptEvaluationResultCreation(
              status = NoResult,
              invitationId = invitationId,
              criterionId = criterionId,
              probability = 0,
              criterionFulfilled = None,
              threshold = None,
              functionName = None,
              criterionNo = None,
              resultData = None
            ))
      }
}
