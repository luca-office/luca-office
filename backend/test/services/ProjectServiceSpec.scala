package services

import org.scalatestplus.play.PlaySpec
import org.scalatestplus.play.guice.GuiceOneAppPerTest
import play.api.test.Injecting
import services.helpers.CreationUtils

import scala.concurrent.Await
import scala.concurrent.duration.Duration

class ProjectServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {
  "ProjectService.find" should {
    "return the correct project for projectId if the userAccountId is same as authorId" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val projectService = inject[ProjectService]

      val Seq(userAccount, _) = createUserAccounts(2)
      val Seq(project, _) = createProjects(userAccount.id, 2)

      val action = projectService.find(project.id, userAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(project)
    }

    "return no project for projectId if userAccountId and authorId don't match" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val projectService = inject[ProjectService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val project = createProject(userAccount.id)

      val action = projectService.find(project.id, otherUserAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe None
    }

    "return correct project for projectId if userAccount is contributor" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val projectService = inject[ProjectService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val project = createProject(userAccount.id)

      val invite = projectService.inviteContributors(project.id, Seq(otherUserAccount.email))
      val _ = Await.result(invite, Duration.Inf)

      val action = projectService.find(project.id, otherUserAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(project)
    }
  }

  "ProjectService.all" should {
    "return all projects userAccount has created or contributes to" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val projectService = inject[ProjectService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val project = createProject(userAccount.id)
      val Seq(otherProject1, _) = createProjects(otherUserAccount.id, 2)

      val invite = projectService.inviteContributors(otherProject1.id, Seq(userAccount.email))
      val _ = Await.result(invite, Duration.Inf)

      val action = projectService.all(userAccount)
      val result = Await.result(action, Duration.Inf)

      result.sortBy(_.id) mustBe Seq(otherProject1, project).sortBy(_.id)
    }
  }

  "ProjectService.findForSurvey" should {
    "return correct project for survey if user has permission via surveyUserAccounts" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val projectService = inject[ProjectService]
      val surveyService = inject[SurveyService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      val invite = surveyService.inviteRaters(survey.id, Seq(otherUserAccount.email))
      val _ = Await.result(invite, Duration.Inf)

      val action = projectService.findForSurvey(otherUserAccount, survey.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe Some(project)
    }

    "return correct project for survey if user has permission via projectUserAccounts" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val projectService = inject[ProjectService]
      val surveyService = inject[SurveyService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      val invite = projectService.inviteContributors(project.id, Seq(otherUserAccount.email))
      val _ = Await.result(invite, Duration.Inf)

      val action = projectService.findForSurvey(otherUserAccount, survey.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe Some(project)
    }

    "return correct project for survey if user is author of project" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val projectService = inject[ProjectService]

      val Seq(userAccount, _) = createUserAccounts(2)
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      val action = projectService.findForSurvey(userAccount, survey.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe Some(project)
    }

    "returns no project for survey if user has no permission to see project" in {

      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val projectService = inject[ProjectService]
      val surveyService = inject[SurveyService]

      val Seq(userAccount, secondUserAccount, thirdUserAccount) = createUserAccounts(3)
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      val projectInvite = projectService.inviteContributors(project.id, Seq(thirdUserAccount.email))
      val _ = Await.result(projectInvite, Duration.Inf)

      val surveyInvite = surveyService.inviteRaters(survey.id, Seq(thirdUserAccount.email))
      val _ = Await.result(surveyInvite, Duration.Inf)

      val action = projectService.findForSurvey(secondUserAccount, survey.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe None
    }

  }
}
