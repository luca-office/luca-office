package services

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils

import scala.concurrent.Await
import scala.concurrent.duration.Duration

class DirectoryServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "DirectoryService.delete" should {

    "delete a directory containing subdirectories containing files" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val directoryService = inject[DirectoryService]

      val userAccount = createUserAccount
      val Seq(scenario1, _, _, _, _) = createScenarios(5, userAccount.id)
      val directoryToplevel = createDirectory(parentDirectoryId = None, Some(scenario1.id))
      val directoryFirstLevel =
        createDirectory(parentDirectoryId = Some(directoryToplevel.id), Some(scenario1.id))
      val directorySecondLevel =
        createDirectory(parentDirectoryId = Some(directoryFirstLevel.id), Some(scenario1.id))
      val binaryFile = createBinaryFile
      val _ = createFile(directoryId = Some(directoryToplevel.id), emailId = None, binaryFile.id)
      val _ = createFile(directoryId = Some(directoryToplevel.id), emailId = None, binaryFile.id)
      val _ = createFile(directoryId = Some(directoryFirstLevel.id), emailId = None, binaryFile.id)
      val _ = createFile(directoryId = Some(directoryFirstLevel.id), emailId = None, binaryFile.id)
      val _ = createFile(directoryId = Some(directoryFirstLevel.id), emailId = None, binaryFile.id)
      val _ = createFile(directoryId = Some(directorySecondLevel.id), emailId = None, binaryFile.id)
      val _ = createFile(directoryId = Some(directorySecondLevel.id), emailId = None, binaryFile.id)
      val _ = createFile(directoryId = Some(directorySecondLevel.id), emailId = None, binaryFile.id)
      val _ = createFile(directoryId = Some(directorySecondLevel.id), emailId = None, binaryFile.id)

      val action = directoryService.delete(directoryToplevel.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe directoryToplevel.id
    }
  }
}
