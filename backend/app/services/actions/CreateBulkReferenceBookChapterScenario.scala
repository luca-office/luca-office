package services.actions

import database.DatabaseContext
import database.generated.public.ReferenceBookChapterScenario

import scala.concurrent.ExecutionContext

trait CreateBulkReferenceBookChapterScenario {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def createBulkReferenceBookChapterScenarioAction(referenceBookChapterScenarios: Seq[ReferenceBookChapterScenario]) =
    runIO(createBulkReferenceBookChapterScenarioQuotation(referenceBookChapterScenarios))

  def createBulkReferenceBookChapterScenarioQuotation(
      referenceBookChapterScenarios: Seq[ReferenceBookChapterScenario]) =
    quote(
      liftQuery(referenceBookChapterScenarios)
        .foreach(referenceBookChapterScenario =>
          query[ReferenceBookChapterScenario]
            .insert(referenceBookChapterScenario)
            .returning(referenceBookChapterScenario => referenceBookChapterScenario)))
}
