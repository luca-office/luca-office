package services

import database.DatabaseContext
import database.generated.public.{FreetextQuestionCodingCriterion, QuestionnaireQuestion}
import models.{FreetextQuestionCodingCriterionCreation, FreetextQuestionCodingCriterionUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class FreetextQuestionCodingCriterionService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllFreetextQuestionCodingCriterion
    with DefaultFindFreetextQuestionCodingCriterion
    with DefaultCreateFreetextQuestionCodingCriterion
    with DefaultUpdateFreetextQuestionCodingCriterion
    with DefaultDeleteFreetextQuestionCodingCriterion {
  val context = databaseContext

  import context._
  import database.Encoders._

  def all(questionId: UUID): Future[Seq[FreetextQuestionCodingCriterion]] =
    performIO(allFreetextQuestionCodingCriteriaAction(questionId))

  def allForQuestionnaire(questionnaireId: UUID): Future[Seq[FreetextQuestionCodingCriterion]] =
    run(for {
      questionId <- query[QuestionnaireQuestion].filter(_.questionnaireId == lift(questionnaireId)).map(_.id)
      criterion <- query[FreetextQuestionCodingCriterion].filter(_.questionId == questionId)
    } yield criterion)

  def find(id: UUID): Future[Option[FreetextQuestionCodingCriterion]] =
    performIO(findFreetextQuestionCodingCriterionAction(id))

  def create(creation: FreetextQuestionCodingCriterionCreation): Future[FreetextQuestionCodingCriterion] =
    performIO(createFreetextQuestionCodingCriterionAction(creation))
      .recover(defaultErrorHandler)

  def update(id: UUID, update: FreetextQuestionCodingCriterionUpdate): Future[FreetextQuestionCodingCriterion] =
    performIO(updateFreetextQuestionCodingCriterionAction(id, update))
      .recover(defaultErrorHandler)

  def delete(id: UUID): Future[UUID] =
    performIO(deleteFreetextQuestionCodingCriterionAction(id))
}
