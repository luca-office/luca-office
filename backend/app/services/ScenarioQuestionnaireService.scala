package services

import database.DatabaseContext
import database.generated.public._
import models.{ScenarioQuestionnaireCreation, ScenarioQuestionnaireUpdate}
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioQuestionnaireService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultCreateScenarioQuestionnaire
    with DefaultUpdateScenarioQuestionnaire
    with DefaultDeleteScenarioQuestionnaire {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(scenarioId: UUID): Future[Seq[ScenarioQuestionnaire]] =
    run(quote(query[ScenarioQuestionnaire].filter(_.scenarioId == lift(scenarioId))))

  def create(creation: ScenarioQuestionnaireCreation): Future[ScenarioQuestionnaire] =
    run(createQuotation(creation))

  def update(
      scenarioId: UUID,
      questionnaireId: UUID,
      update: ScenarioQuestionnaireUpdate): Future[ScenarioQuestionnaire] =
    run(updateQuotation(scenarioId, questionnaireId, update))

  def delete(scenarioId: UUID, questionnaireId: UUID): Future[ScenarioQuestionnaire] = {
    val areRelatedInterventionsPresentAction = runIO((for {
      question <- query[QuestionnaireQuestion].filter(_.questionnaireId == lift(questionnaireId))
      answer <- query[QuestionnaireAnswer].filter(_.questionId == question.id)
      intervention <- query[Intervention].filter(intervention =>
        intervention.scenarioId == lift(scenarioId) && intervention.answerId.contains(answer.id))
    } yield intervention).nonEmpty)

    val action = areRelatedInterventionsPresentAction.flatMap(areRelatedInterventionsPresent =>
      if (areRelatedInterventionsPresent) IO.failed(EntityIsInUse)
      else runIO(deleteQuotation(scenarioId, questionnaireId)))

    performIO(action)
  }
}

trait ScenarioQuestionnaireServiceActions {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def runtimeSurveyQuestionnairesForScenarioAction(scenarioId: UUID): IO[Seq[Questionnaire], Effect.Read] =
    runIO(runtimeSurveyQuestionnairesForScenarioQuotation(scenarioId))

  def runtimeSurveyQuestionnairesForScenarioQuotation(scenarioId: UUID) =
    quote(
      for {
        scenarioQuestionnaire <- query[ScenarioQuestionnaire].filter(_.scenarioId == lift(scenarioId))
        questionnaire <- query[Questionnaire].filter(_.id == scenarioQuestionnaire.questionnaireId)
      } yield questionnaire
    )
}
