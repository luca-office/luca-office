package services

import models.SampleCompanyUpdate
import org.scalatestplus.play.PlaySpec
import org.scalatestplus.play.guice.GuiceOneAppPerTest
import play.api.test.Injecting
import services.helpers.CreationUtils

import scala.concurrent.Await
import scala.concurrent.duration.Duration

class SampleCompanyServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {
  "SampleCompanyService.find" should {
    "return correct sample company for sampleCompanyId if userAccountId matches authorId" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val sampleCompanyService = inject[SampleCompanyService]

      val Seq(userAccount, _) = createUserAccounts(2)
      val Seq(sampleCompany, _) = createSampleCompanies(userAccount, 2)

      val action = sampleCompanyService.find(sampleCompany.id, userAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(sampleCompany)
    }

    "return no sample company for sampleCompanyId if userAccountId doesn't match authorId" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val sampleCompanyService = inject[SampleCompanyService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val Seq(sampleCompany, _) = createSampleCompanies(userAccount, 2)

      val action = sampleCompanyService.find(sampleCompany.id, otherUserAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe None
    }

    "return sample company for sampleCompanyId if sample company is published" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val sampleCompanyService = inject[SampleCompanyService]
      val directoryService = inject[DirectoryService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val sampleCompany = createSampleCompany(userAccount)

      val directory = Await.result(directoryService.allDirectoriesForSampleCompany(sampleCompany.id), Duration.Inf).head
      val binaryFile = createBinaryFile
      val file = createFile(Some(directory.id), None, binaryFile.id)
      val sampleCompanyUpdate = SampleCompanyUpdate(
        sampleCompany.name,
        sampleCompany.description,
        sampleCompany.tags,
        sampleCompany.emailSignature,
        Some(file.id),
        Some(file.id),
        sampleCompany.domain
      )
      Await.result(sampleCompanyService.update(sampleCompany.id, sampleCompanyUpdate), Duration.Inf)

      val publish = sampleCompanyService.publish(sampleCompany.id, userAccount)
      val publishedSampleCompany = Await.result(publish, Duration.Inf)

      val action = sampleCompanyService.find(sampleCompany.id, otherUserAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(publishedSampleCompany)
    }
  }

  "SampleCompanyService.all" should {
    "return all sample companies that are published or userAccount has created" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val sampleCompanyService = inject[SampleCompanyService]
      val directoryService = inject[DirectoryService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val Seq(sampleCompany, sampleCompany2) = createSampleCompanies(userAccount, 2)
      val Seq(otherSampleCompany, _) = createSampleCompanies(otherUserAccount, 2)

      val directory =
        Await.result(directoryService.allDirectoriesForSampleCompany(otherSampleCompany.id), Duration.Inf).head
      val binaryFile = createBinaryFile
      val file = createFile(Some(directory.id), None, binaryFile.id)
      val sampleCompanyUpdate = SampleCompanyUpdate(
        otherSampleCompany.name,
        otherSampleCompany.description,
        otherSampleCompany.tags,
        otherSampleCompany.emailSignature,
        Some(file.id),
        Some(file.id),
        otherSampleCompany.domain
      )
      Await.result(sampleCompanyService.update(otherSampleCompany.id, sampleCompanyUpdate), Duration.Inf)

      val publish = sampleCompanyService.publish(otherSampleCompany.id, otherUserAccount)
      val publishedSampleCompany = Await.result(publish, Duration.Inf)

      val action = sampleCompanyService.all(userAccount)
      val result = Await.result(action, Duration.Inf)
      result.sortBy(_.id) mustBe Seq(sampleCompany, sampleCompany2, publishedSampleCompany).sortBy(_.id)
    }
  }
}
