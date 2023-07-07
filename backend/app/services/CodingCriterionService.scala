package services

import database.DatabaseContext
import javax.inject.Inject
import services.generated._

import scala.concurrent.ExecutionContext

class CodingCriterionService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllCodingCriterion
    with DefaultFindCodingCriterion
    with DefaultCreateCodingCriterion
    with DefaultUpdateCodingCriterion
    with DefaultDeleteCodingCriterion {
  val context = databaseContext
}
