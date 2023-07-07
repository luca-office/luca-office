package services

import database.generated.public.File
import models.ScenarioUpdate
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils

import java.util.UUID
import scala.concurrent.Await
import scala.concurrent.duration.Duration

class ScenarioServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "ScenarioService.find" should {
    "should return the correct scenario for scenarioId if the userAccountId is same as authorId" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioService = inject[ScenarioService]

      val userAccount = createUserAccount
      val scenario = createScenario(userAccount.id)

      val action = scenarioService.find(scenario.id, userAccount.id)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(scenario)
    }

    /*
    "should return no scenario for scenarioId if the userAccountId is not the same as authorId" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioService = inject[ScenarioService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val scenario = createScenario(userAccount.id)
      val otherScenario = createScenario(userAccount.id)

      val invite = scenarioService.inviteContributors(otherScenario.id, Seq(otherUserAccount.email))
      val _ = Await.result(invite, Duration.Inf)

      val action = scenarioService.find(scenario.id, otherUserAccount.id)
      val result = Await.result(action, Duration.Inf)
      result mustBe None
    }
*/
    "should return correct scenario for scenarioId if the userAccountId is not the same as authorId but userAccount is contributor" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioService = inject[ScenarioService]

      val userAccounts = createUserAccounts(2)
      val userAccount = userAccounts.head
      val otherUserAccount = userAccounts(1)
      val scenario = createScenario(userAccount.id)

      val invite = scenarioService.inviteContributors(scenario.id, Seq(otherUserAccount.email))
      val _ = Await.result(invite, Duration.Inf)

      val action = scenarioService.find(scenario.id, otherUserAccount.id)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(scenario)
    }

    "should return correct scenario for scenarioId if the userAccountId is not the same as authorId but scenario is published" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioService = inject[ScenarioService]

      val userAccounts = createUserAccounts(2)
      val userAccount = userAccounts.head
      val otherUserAccount = userAccounts(1)
      val scenario = createScenario(userAccount.id)
      val email = createEmail(scenario.id)
      val scenarioUpdate = ScenarioUpdate(
        date = scenario.date,
        name = scenario.name,
        description = scenario.description,
        maxDurationInSeconds = Some(60),
        introductionEmailId = Some(email.id),
        shouldDisplayTime = scenario.shouldDisplayTime,
        tags = scenario.tags,
        completionEmailAddress = Some("test@test.de"),
        shouldHideReferenceBookChapters = scenario.shouldHideReferenceBookChapters,
        sampleCompanyId = scenario.sampleCompanyId
      )
      Await.result(scenarioService.update(scenario.id, scenarioUpdate, userAccount.id), Duration.Inf)

      val publish = scenarioService.publish(scenario.id, userAccount.id)
      val publishedScenario = Await.result(publish, Duration.Inf)

      val action = scenarioService.find(scenario.id, otherUserAccount.id)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(publishedScenario)
    }
  }

  "ScenarioService.duplicate" should {

    "fail if the scenario does not exist" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioService = inject[ScenarioService]

      val userAccount = createUserAccount
      val action = scenarioService.duplicate(userAccount.id)(UUID.randomUUID())

      intercept[ApiError](Await.result(action, Duration.Inf))
    }

    "duplicate an empty scenario" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioService = inject[ScenarioService]

      val userAccount = createUserAccount
      val scenario = createScenario(userAccount.id)
      val action = scenarioService.duplicate(userAccount.id)(scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe scenario.copy(
        id = result.id,
        createdAt = result.createdAt,
        modifiedAt = result.modifiedAt,
        finalizedAt = None,
        publishedAt = None,
        authorId = userAccount.id
      )
    }

    "duplicate a scenario with toplevelDirectories, files, emails, reference book chapters, and interventions" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioService = inject[ScenarioService]
      val directoryService = inject[DirectoryService]
      val fileService = inject[FileService]
      val emailService = inject[EmailService]
      val referenceBookChapterScenarioService = inject[ReferenceBookChapterScenarioService]
      val interventionService = inject[InterventionService]

      val userAccount = createUserAccount
      val scenario = createScenario(userAccount.id)
      val toplevelDirectories = createDirectories(parentDirectoryId = None, Some(scenario.id), 3)
      val Seq(toplevelDirectory1, _, _) = toplevelDirectories
      val subdirectories = createDirectories(parentDirectoryId = Some(toplevelDirectory1.id), Some(scenario.id), 3)
      val directories = toplevelDirectories ++ subdirectories
      val binaryFile = createBinaryFile
      val files = directories.zipWithIndex
        .collect { case (directory, index) if index % 2 == 0 => directory }
        .foldLeft[Seq[File]](Nil) { case (createdFiles, directory) =>
          createdFiles ++ createFiles(Some(directory.id), emailId = None, binaryFile.id, 3)
        }
      val emails = createEmails(3, scenario.id)
      val referenceBookChapters = createReferenceBookChapters(scenario.id, 3)
      val _ = createReferenceBookChapterScenarios(scenario.id, referenceBookChapters.map(_.id))
      val interventions = createInterventions(3, scenario.id, emails.head.id, files.head.id)

      val action = scenarioService.duplicate(userAccount.id)(scenario.id)
      val duplicatedScenario = Await.result(action, Duration.Inf)
      val duplicatedDirectories =
        Await.result(directoryService.allDirectoriesForScenario(duplicatedScenario.id), Duration.Inf)
      val duplicatedFiles = Await.result(fileService.allFilesForScenario(duplicatedScenario.id), Duration.Inf)
      val duplicatedEmails = Await.result(emailService.allEmails(duplicatedScenario.id), Duration.Inf)
      val duplicatedReferenceBookChapters = Await.result(
        referenceBookChapterScenarioService.referenceBookChaptersForScenario(duplicatedScenario.id),
        Duration.Inf)
      val duplicatedInterventions = Await.result(interventionService.all(duplicatedScenario.id), Duration.Inf)

      duplicatedScenario mustBe scenario.copy(
        id = duplicatedScenario.id,
        createdAt = duplicatedScenario.createdAt,
        modifiedAt = duplicatedScenario.modifiedAt,
        finalizedAt = None,
        publishedAt = None,
        authorId = userAccount.id
      )

      directories.length mustBe duplicatedDirectories.length
      directories
        .sortBy(_.name)
        .zip(duplicatedDirectories.sortBy(_.name))
        .foreach { case (directory, duplicatedDirectory) =>
          duplicatedDirectory mustBe directory.copy(
            id = duplicatedDirectory.id,
            createdAt = duplicatedDirectory.createdAt,
            modifiedAt = duplicatedDirectory.modifiedAt,
            parentDirectoryId = duplicatedDirectory.parentDirectoryId,
            scenarioId = Some(duplicatedScenario.id)
          )

          val filesInDirectory = files.filter(_.directoryId.contains(directory.id))
          val duplicatedFilesInDuplicatedDirectory =
            duplicatedFiles.filter(_.directoryId.contains(duplicatedDirectory.id))
          filesInDirectory.length mustBe duplicatedFilesInDuplicatedDirectory.length
          filesInDirectory
            .sortBy(_.name)
            .zip(duplicatedFilesInDuplicatedDirectory.sortBy(_.name))
            .foreach { case (file, duplicatedFile) =>
              duplicatedFile mustBe file.copy(
                id = duplicatedFile.id,
                createdAt = duplicatedFile.createdAt,
                modifiedAt = duplicatedFile.modifiedAt,
                directoryId = duplicatedFile.directoryId
              )
            }
        }

      emails.length mustBe duplicatedEmails.length
      emails
        .sortBy(_.subject)
        .zip(duplicatedEmails.sortBy(_.subject))
        .foreach { case (email, duplicatedEmail) =>
          duplicatedEmail mustBe email.copy(
            id = duplicatedEmail.id,
            createdAt = duplicatedEmail.createdAt,
            modifiedAt = duplicatedEmail.modifiedAt,
            scenarioId = duplicatedScenario.id
          )
        }

      referenceBookChapters mustBe duplicatedReferenceBookChapters

      interventions.length mustBe duplicatedInterventions.length
      interventions.sortBy(_.title).zip(duplicatedInterventions.sortBy(_.title)).foreach {
        case (intervention, duplicatedIntervention) =>
          duplicatedIntervention.title mustBe intervention.title
          duplicatedIntervention.interventionType mustBe intervention.interventionType
          duplicatedIntervention.scenarioId mustBe duplicatedScenario.id
      }
    }

    "duplicate a scenario with an introduction email" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioService = inject[ScenarioService]

      val userAccount = createUserAccount
      val scenario = createScenario(userAccount.id)
      val email = createEmail(scenario.id)
      val scenarioUpdate = ScenarioUpdate(
        date = scenario.date,
        name = scenario.name,
        description = scenario.description,
        maxDurationInSeconds = scenario.maxDurationInSeconds,
        introductionEmailId = Some(email.id),
        shouldDisplayTime = scenario.shouldDisplayTime,
        tags = scenario.tags,
        completionEmailAddress = scenario.completionEmailAddress,
        shouldHideReferenceBookChapters = scenario.shouldHideReferenceBookChapters,
        sampleCompanyId = scenario.sampleCompanyId
      )
      Await.result(scenarioService.update(scenario.id, scenarioUpdate, userAccount.id), Duration.Inf)

      val action = scenarioService.duplicate(userAccount.id)(scenario.id)
      val duplicatedScenario = Await.result(action, Duration.Inf)

      duplicatedScenario.archivedAt mustBe None
      duplicatedScenario.finalizedAt mustBe None
      duplicatedScenario.publishedAt mustBe None
      duplicatedScenario.date mustBe scenario.date
      duplicatedScenario.name mustBe scenario.name
      duplicatedScenario.description mustBe scenario.description
      duplicatedScenario.maxDurationInSeconds mustBe scenario.maxDurationInSeconds
      duplicatedScenario.authorId mustBe scenario.authorId
      duplicatedScenario.shouldDisplayTime mustBe scenario.shouldDisplayTime
      duplicatedScenario.tags mustBe scenario.tags
      duplicatedScenario.completionEmailAddress mustBe scenario.completionEmailAddress
      duplicatedScenario.shouldHideReferenceBookChapters mustBe scenario.shouldHideReferenceBookChapters
      duplicatedScenario.sampleCompanyId mustBe scenario.sampleCompanyId
      duplicatedScenario.introductionEmailId mustBe defined
    }
  }
}
