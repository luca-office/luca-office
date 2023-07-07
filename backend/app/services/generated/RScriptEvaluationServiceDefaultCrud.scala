package services.generated

import database.DatabaseContext
import database.generated.public.RScriptEvaluationResult
import models.RScriptEvaluationResultCreation
import services.converters.RScriptEvaluationResultConverter.toRScriptEvaluationResult

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllRScriptEvaluationResult {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allRScriptEvaluationResultsAction: IO[Seq[RScriptEvaluationResult], Effect.Read] =
    runIO(allRScriptEvaluationResultsQuotation)

  def allRScriptEvaluationResultsQuotation =
    quote(query[RScriptEvaluationResult])
}

trait DefaultFindRScriptEvaluationResult {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findRScriptEvaluationResultAction(id: UUID): IO[Option[RScriptEvaluationResult], Effect.Read] =
    runIO(findRScriptEvaluationResultQuotation(id)).map(_.headOption)

  def findRScriptEvaluationResultQuotation(id: UUID) =
    quote(query[RScriptEvaluationResult].filter(_.id == lift(id)))

  def findRScriptEvaluationResultByCriterionIdAction(
      criterionId: UUID): IO[Option[RScriptEvaluationResult], Effect.Read] =
    runIO(findRScriptEvaluationResultByCriterionIdQuotation(criterionId)).map(_.headOption)

  def findRScriptEvaluationResultByCriterionIdQuotation(criterionId: UUID) =
    quote(query[RScriptEvaluationResult].filter(_.criterionId == lift(criterionId)))
}

trait DefaultCreateRScriptEvaluationResult {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createRScriptEvaluationResultAction(
      creation: RScriptEvaluationResultCreation): IO[RScriptEvaluationResult, Effect.Write] =
    runIO(createRScriptEvaluationResultQuotation(creation))

  def createRScriptEvaluationResultQuotation(creation: RScriptEvaluationResultCreation) =
    quote(
      query[RScriptEvaluationResult]
        .insert(lift(toRScriptEvaluationResult(creation)))
        .returning(rScriptEvaluationResult => rScriptEvaluationResult))
}
