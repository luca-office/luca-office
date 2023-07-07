package services.actions

import database.DatabaseContext
import database.generated.public.UserAccount
import services.{EntityNotFound, QuestionnaireServiceActions}
import services.converters.FreetextQuestionCodingCriterionConverter.toFreetextQuestionCodingCriterionCreation
import services.converters.QuestionnaireAnswerConverter.toQuestionnaireAnswerCreation
import services.converters.QuestionnaireConverter.toQuestionnaireCreation
import services.converters.QuestionnaireQuestionConverter.toQuestionnaireQuestionCreation
import services.generated.{DefaultAllFreetextQuestionCodingCriterion, DefaultAllQuestionnaireAnswer, DefaultAllQuestionnaireQuestion, DefaultCreateQuestionnaire}

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DuplicateQuestionnaire
    extends QuestionnaireServiceActions
    with DefaultCreateQuestionnaire
    with DefaultAllQuestionnaireQuestion
    with CreateBulkQuestionnaireQuestion
    with DefaultAllQuestionnaireAnswer
    with DefaultAllFreetextQuestionCodingCriterion
    with CreateBulkQuestionnaireAnswer
    with CreateBulkFreetextQuestionCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def duplicateQuestionnaireAction(id: UUID, userAccount: UserAccount) =
    findQuestionnaireAction(id, userAccount).flatMap {
      case Some(questionnaire) =>
        for {
          duplicatedQuestionnaire <- createQuestionnaireAction(toQuestionnaireCreation(questionnaire), userAccount.id)
          _ <- duplicateQuestionnaireQuestionsAction(id, duplicatedQuestionnaire.id)
        } yield duplicatedQuestionnaire
      case None =>
        IO.failed(EntityNotFound)
    }

  private def duplicateQuestionnaireQuestionsAction(questionnaireId: UUID, duplicatedQuestionnaireId: UUID) =
    allQuestionnaireQuestionsAction(questionnaireId).flatMap { questions =>
      val creationPairs = questions.map(question =>
        (
          toQuestionnaireQuestionCreation(question).copy(questionnaireId = duplicatedQuestionnaireId),
          question.position
        ))

      createBulkQuestionnaireQuestionAction(creationPairs).flatMap { duplicatedQuestions =>
        val questionPairs = questions.sortBy(_.position).zip(duplicatedQuestions.sortBy(_.position))
        val duplicateChildrenActions = questionPairs.map { case (question, duplicatedQuestion) =>
          duplicateQuestionnaireAnswersAction(question.id, duplicatedQuestion.id)
            .flatMap(_ => duplicateFreetextQuestionCodingCriteriaAction(question.id, duplicatedQuestion.id))
        }
        IO.sequence(duplicateChildrenActions)
      }
    }

  private def duplicateQuestionnaireAnswersAction(questionId: UUID, duplicatedQuestionId: UUID) =
    allQuestionnaireAnswersAction(questionId).flatMap { answers =>
      val creationPairs = answers.map(question =>
        (toQuestionnaireAnswerCreation(question).copy(questionId = duplicatedQuestionId), question.position))
      createBulkQuestionnaireAnswerAction(creationPairs)
    }

  private def duplicateFreetextQuestionCodingCriteriaAction(questionId: UUID, duplicatedQuestionId: UUID) =
    allFreetextQuestionCodingCriteriaAction(questionId).flatMap(criteria =>
      createBulkFreetextQuestionCodingCriterionAction(criteria.map(question =>
        toFreetextQuestionCodingCriterionCreation(question).copy(questionId = duplicatedQuestionId))))
}
