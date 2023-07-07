package services.actions

import database.DatabaseContext
import database.generated.public._
import models.ScenarioUpdate
import services.{EntityNotFound, ScenarioServiceActions}
import services.converters.EmailConverter.toEmailCreation
import services.converters.InterventionConverter.toInterventionCreation
import services.converters.ScenarioConverter.toScenarioCreation
import services.generated._

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DuplicateScenario
    extends ScenarioServiceActions
    with CreateScenario
    with DefaultUpdateScenario
    with AllDirectory
    with CreateBulkDirectory
    with AllFile
    with DuplicateDirectoriesAndFiles
    with DefaultAllEmail
    with CreateBulkEmail
    with CreateBulkReferenceBookChapterScenario
    with FindCodingModelForScenario
    with DefaultAllScenarioSampleCompanyFile
    with DuplicateCodingModel
    with CreateBulkScenarioQuestionnaire
    with CreateBulkScenarioSampleCompanyFile
    with DefaultAllIntervention
    with CreateBulkIntervention {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def duplicateScenarioAction(userAccountId: UUID)(id: UUID): IO[Scenario, Effect.Read with Effect.Write] =
    findScenarioAction(id, userAccountId).flatMap {
      case Some(scenario) =>
        for {
          duplicatedScenario <- createScenarioAction(userAccountId)(toScenarioCreation(scenario))

          duplicatedIntroductionEmailId = UUID.randomUUID()
          emails <- allEmailsAction(id)
          emailIdMapping = (emails.map(_.id -> UUID.randomUUID()) ++
            scenario.introductionEmailId.map(_ -> duplicatedIntroductionEmailId)).toMap
          _ <- duplicateEmailsAction(duplicatedScenario.id, emailIdMapping, emails)

          files <- allFilesForScenarioAction(id)
          sampleCompanyFileIds <- scenario.sampleCompanyId
            .map(sampleCompanyId => runIO(allFilesForSampleCompanyQuotation(sampleCompanyId).map(_.id)))
            .getOrElse(IO.successful(Nil))
          fileIdMapping = (files.map(_.id -> UUID.randomUUID()) ++ sampleCompanyFileIds.map(id => id -> id)).toMap
          _ <- duplicateDirectoriesAndFilesForScenarioAction(id, duplicatedScenario.id, fileIdMapping, emailIdMapping)

          _ <- duplicateReferenceBookChapterScenarioAction(id, duplicatedScenario.id)
          _ <- findCodingModelForScenarioAction(id).flatMap {
            case Some(codingModel) =>
              duplicateCodingModelAction(
                id = codingModel.id,
                targetScenarioId = duplicatedScenario.id,
                emailIdMapping = Some(emailIdMapping),
                fileIdMapping = Some(fileIdMapping),
                shouldDuplicateScenarioReferencingCriteria = true
              )
            case _ =>
              IO.successful(())
          }
          _ <- duplicateInterventionsAction(id, duplicatedScenario.id, emailIdMapping, fileIdMapping)
          _ <- duplicateScenarioQuestionnaireAction(id, duplicatedScenario.id)
          _ <- duplicateScenarioSampleCompanyFileAction(id, duplicatedScenario.id)
          _ <- updateScenarioAction(
            duplicatedScenario.id,
            ScenarioUpdate(
              date = duplicatedScenario.date,
              name = duplicatedScenario.name,
              description = duplicatedScenario.description,
              maxDurationInSeconds = duplicatedScenario.maxDurationInSeconds,
              shouldDisplayTime = duplicatedScenario.shouldDisplayTime,
              tags = duplicatedScenario.tags,
              completionEmailAddress = duplicatedScenario.completionEmailAddress,
              shouldHideReferenceBookChapters = duplicatedScenario.shouldHideReferenceBookChapters,
              sampleCompanyId = duplicatedScenario.sampleCompanyId,
              introductionEmailId = scenario.introductionEmailId.map(_ => duplicatedIntroductionEmailId)
            )
          )
        } yield duplicatedScenario
      case None =>
        IO.failed(EntityNotFound)
    }

  private def duplicateEmailsAction(duplicatedScenarioId: UUID, idMapping: UUID => UUID, emails: Seq[Email]) = {
    val creationPairs = emails
      .map(email => (toEmailCreation(email).copy(scenarioId = duplicatedScenarioId), idMapping(email.id)))
    createBulkEmailAction(creationPairs)
  }

  private def duplicateReferenceBookChapterScenarioAction(scenarioId: UUID, duplicatedScenarioId: UUID) =
    runIO(query[ReferenceBookChapterScenario].filter(_.scenarioId == lift(scenarioId)))
      .flatMap(referenceBookChapterScenarios =>
        createBulkReferenceBookChapterScenarioAction(
          referenceBookChapterScenarios
            .map(referenceBookChapterScenario => referenceBookChapterScenario.copy(scenarioId = duplicatedScenarioId))))

  private def duplicateScenarioQuestionnaireAction(scenarioId: UUID, duplicatedScenarioId: UUID) =
    runIO(query[ScenarioQuestionnaire].filter(_.scenarioId == lift(scenarioId)))
      .flatMap(scenarioQuestionnaires =>
        createBulkScenarioQuestionnaireAction(
          scenarioQuestionnaires
            .map(scenarioQuestionnaire => scenarioQuestionnaire.copy(scenarioId = duplicatedScenarioId))))

  private def duplicateScenarioSampleCompanyFileAction(scenarioId: UUID, duplicatedScenarioId: UUID) =
    allScenarioSampleCompanyFileAction(scenarioId)
      .flatMap(scenarioSampleCompanyFiles =>
        createBulkScenarioSampleCompanyFileAction(
          scenarioSampleCompanyFiles
            .map(scenarioSampleCompanyFile => scenarioSampleCompanyFile.copy(scenarioId = duplicatedScenarioId))))

  private def duplicateInterventionsAction(
      scenarioId: UUID,
      duplicatedScenarioId: UUID,
      emailIdMapping: UUID => UUID,
      fileIdMapping: UUID => UUID) =
    allInterventionsAction(scenarioId).flatMap(interventions =>
      createBulkInterventionAction(
        interventions.map(intervention =>
          toInterventionCreation(intervention)
            .copy(
              scenarioId = duplicatedScenarioId,
              interventionEmailId = emailIdMapping(intervention.interventionEmailId),
              fileId = intervention.fileId.map(fileIdMapping),
              emailId = intervention.emailId.map(emailIdMapping)
            ))))
}
