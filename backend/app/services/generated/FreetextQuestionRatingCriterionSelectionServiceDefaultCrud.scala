package services.generated

import database.DatabaseContext
import database.generated.public.FreetextQuestionRatingCriterionSelection
import models.FreetextQuestionRatingCriterionSelectionCreation
import services.converters.FreetextQuestionRatingCriterionSelectionConverter.toFreetextQuestionRatingCriterionSelection

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllFreetextQuestionRatingCriterionSelection {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def allFreetextQuestionRatingCriterionSelectionsAction(freetextQuestionRatingId: UUID) =
    runIO(allFreetextQuestionRatingCriterionSelectionsQuotation(freetextQuestionRatingId))

  def allFreetextQuestionRatingCriterionSelectionsQuotation(freetextQuestionRatingId: UUID) =
    quote(
      query[FreetextQuestionRatingCriterionSelection].filter(
        _.freetextQuestionRatingId == lift(freetextQuestionRatingId)))
}

trait DefaultCreateFreetextQuestionRatingCriterionSelection {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def createFreetextQuestionRatingCriterionSelectionAction(creation: FreetextQuestionRatingCriterionSelectionCreation) =
    runIO(createFreetextQuestionRatingCriterionSelectionQuotation(creation))

  def createFreetextQuestionRatingCriterionSelectionQuotation(
      creation: FreetextQuestionRatingCriterionSelectionCreation) =
    quote(
      query[FreetextQuestionRatingCriterionSelection]
        .insert(lift(toFreetextQuestionRatingCriterionSelection(creation)))
        .returning(freetextQuestionRatingCriterionSelection => freetextQuestionRatingCriterionSelection))
}

trait DefaultDeleteFreetextQuestionRatingCriterionSelection {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def deleteFreetextQuestionRatingCriterionSelectionAction(freetextQuestionRatingId: UUID, criterionId: UUID) =
    runIO(deleteFreetextQuestionRatingCriterionSelectionQuotation(freetextQuestionRatingId, criterionId))

  def deleteFreetextQuestionRatingCriterionSelectionQuotation(freetextQuestionRatingId: UUID, criterionId: UUID) =
    quote(
      query[FreetextQuestionRatingCriterionSelection]
        .filter(row =>
          row.freetextQuestionRatingId == lift(freetextQuestionRatingId)
            && row.criterionId == lift(criterionId))
        .delete
        .returning(freetextQuestionRatingCriterionSelection => freetextQuestionRatingCriterionSelection))
}
