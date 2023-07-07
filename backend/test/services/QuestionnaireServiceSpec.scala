package services

import enums.QuestionnaireType
import models.QuestionnaireUpdate
import org.scalatestplus.play.PlaySpec
import org.scalatestplus.play.guice.GuiceOneAppPerTest
import play.api.test.Injecting
import services.helpers.CreationUtils

import scala.concurrent.Await
import scala.concurrent.duration.Duration

class QuestionnaireServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {
  "QuestionnaireService.find" should {
    "return the correct questionnaire for questionnaireId if the userAccountId is same as authorId" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireService = inject[QuestionnaireService]

      val Seq(userAccount, _) = createUserAccounts(2)
      val Seq(questionnaire, _) = createQuestionnaires(userAccount.id, 2)

      val action = questionnaireService.find(questionnaire.id, userAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(questionnaire)
    }

    "return no questionnaire for questionnaireId if userAccountId and authorId don't match" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireService = inject[QuestionnaireService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val questionnaire = createQuestionnaire(userAccount.id)

      val action = questionnaireService.find(questionnaire.id, otherUserAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe None
    }

    "return correct questionnaire for questionnaireId if questionnaire is published" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireService = inject[QuestionnaireService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val questionnaire = createQuestionnaire(userAccount.id)
      val questionnaireUpdate = QuestionnaireUpdate(
        title = questionnaire.title,
        description = questionnaire.description,
        questionnaireType = questionnaire.questionnaireType,
        binaryFileId = questionnaire.binaryFileId,
        maxDurationInSeconds = Some(60)
      )
      Await.result(questionnaireService.update(questionnaire.id, questionnaireUpdate), Duration.Inf)

      val publish = questionnaireService.publish(questionnaire.id, userAccount)
      val publishedQuestionnaire = Await.result(publish, Duration.Inf)

      val action = questionnaireService.find(questionnaire.id, otherUserAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(publishedQuestionnaire)
    }
  }

  "QuestionnaireService.all" should {
    "return all questionnaires that are published or userAccount has created" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireService = inject[QuestionnaireService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val questionnaire = createQuestionnaire(userAccount.id)
      val Seq(otherQuestionnaire, _) = createQuestionnaires(otherUserAccount.id, 2)

      val questionnaireUpdate = QuestionnaireUpdate(
        title = otherQuestionnaire.title,
        description = otherQuestionnaire.description,
        questionnaireType = otherQuestionnaire.questionnaireType,
        binaryFileId = otherQuestionnaire.binaryFileId,
        maxDurationInSeconds = Some(60)
      )
      Await.result(questionnaireService.update(otherQuestionnaire.id, questionnaireUpdate), Duration.Inf)

      val publish = questionnaireService.publish(otherQuestionnaire.id, otherUserAccount)
      val publishedQuestionnaire = Await.result(publish, Duration.Inf)

      val action = questionnaireService.all(userAccount)(QuestionnaireType.Global)
      val result = Await.result(action, Duration.Inf)
      result.sortBy(_.id) mustBe Seq(questionnaire, publishedQuestionnaire).sortBy(_.id)
    }
  }
}
