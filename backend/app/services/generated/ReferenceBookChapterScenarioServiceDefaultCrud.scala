package services.generated

import java.util.UUID

import database.DatabaseContext
import database.generated.public.{ReferenceBookChapter, ReferenceBookChapterScenario, Scenario}
import models.ReferenceBookChapterScenarioId

import scala.concurrent.{ExecutionContext, Future}

trait DefaultScenariosForReferenceBookChapter {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def scenariosForReferenceBookChapter(referenceBookChapterId: UUID): Future[Seq[Scenario]] =
    run(scenariosForReferenceBookChapterQuotation(referenceBookChapterId))

  def scenariosForReferenceBookChapterQuotation(referenceBookChapterId: UUID) =
    quote(for {
      referenceBookChapterScenario <-
        query[ReferenceBookChapterScenario].filter(_.referenceBookChapterId == lift(referenceBookChapterId))
      scenario <- query[Scenario].filter(_.id == referenceBookChapterScenario.scenarioId)
    } yield scenario)
}

trait DefaultReferenceBookChaptersForScenario {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def referenceBookChaptersForScenario(scenarioId: UUID): Future[Seq[ReferenceBookChapter]] =
    run(referenceBookChaptersForScenarioQuotation(scenarioId))

  def referenceBookChaptersForScenarioQuotation(scenarioId: UUID) =
    quote(
      query[ReferenceBookChapterScenario]
        .filter(_.scenarioId == lift(scenarioId))
        .join(query[ReferenceBookChapter])
        .on(_.referenceBookChapterId == _.id)
        .sortBy { case (referenceBookChapterScenario, _) => referenceBookChapterScenario.position }
        .map { case (_, referenceBookChapter) => referenceBookChapter }
    )
}

trait DefaultDeleteReferenceBookChapterScenario {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def delete(id: ReferenceBookChapterScenarioId): Future[ReferenceBookChapterScenario] =
    run(deleteQuotation(id))

  def deleteQuotation(id: ReferenceBookChapterScenarioId) =
    quote(
      query[ReferenceBookChapterScenario]
        .filter(row =>
          row.referenceBookChapterId == lift(id.referenceBookChapterId) && row.scenarioId == lift(id.scenarioId))
        .delete
        .returning(referenceBookChapterScenario => referenceBookChapterScenario))
}
