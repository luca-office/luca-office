package services

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils

import java.util.UUID
import scala.concurrent.Await
import scala.concurrent.duration.Duration

class ProjectModuleServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "ProjectModuleService.reposition" should {

    "fail if the item does not exist" in {
      val projectModuleService = inject[ProjectModuleService]

      val action = projectModuleService.reposition(UUID.randomUUID(), None)

      intercept[ApiError](Await.result(action, Duration.Inf))
    }

    "fail if the predecessor does not exist" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val projectModuleService = inject[ProjectModuleService]

      val userAccount = createUserAccount
      val Seq(project1, _, _) = createProjects(userAccount.id, 3)
      val Seq(scenario1, _, _) = createScenarios(3, userAccount.id)
      val projectModule = createProjectModule(project1.id, Some(scenario1.id), None)

      val action = projectModuleService.reposition(projectModule.id, Some(UUID.randomUUID()))

      intercept[ApiError](Await.result(action, Duration.Inf))
    }

    "move first item to the first position" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val projectModuleService = inject[ProjectModuleService]

      val userAccount = createUserAccount
      val Seq(project1, project2, _) = createProjects(userAccount.id, 3)
      val Seq(scenario1, scenario2, scenario3) = createScenarios(3, userAccount.id)
      val projectModule1 = createProjectModule(project1.id, Some(scenario1.id), None)
      val _ = createProjectModule(project1.id, Some(scenario2.id), None)
      val _ = createProjectModule(project1.id, Some(scenario3.id), None)
      val _ = createProjectModule(project2.id, Some(scenario1.id), None)
      val _ = createProjectModule(project2.id, Some(scenario2.id), None)

      val action = projectModuleService.reposition(projectModule1.id, None)
      val result = Await.result(action, Duration.Inf)

      result.position mustBe BigDecimal(0.5)
    }

    "move an item to the first position" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val projectModuleService = inject[ProjectModuleService]

      val userAccount = createUserAccount
      val Seq(project1, project2, _) = createProjects(userAccount.id, 3)
      val Seq(scenario1, scenario2, scenario3) = createScenarios(3, userAccount.id)
      val _ = createProjectModule(project1.id, Some(scenario1.id), None)
      val projectModule2 = createProjectModule(project1.id, Some(scenario2.id), None)
      val _ = createProjectModule(project1.id, Some(scenario3.id), None)
      val _ = createProjectModule(project2.id, Some(scenario2.id), None)
      val _ = createProjectModule(project2.id, Some(scenario3.id), None)

      val action = projectModuleService.reposition(projectModule2.id, None)
      val result = Await.result(action, Duration.Inf)

      result.position mustBe BigDecimal(0.5)
    }

    "move an item to the last position" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val projectModuleService = inject[ProjectModuleService]

      val userAccount = createUserAccount
      val Seq(project1, project2, _) = createProjects(userAccount.id, 3)
      val Seq(scenario1, scenario2, scenario3, scenario4, scenario5) = createScenarios(5, userAccount.id)
      val _ = createProjectModule(project1.id, Some(scenario1.id), None)
      val projectModule2 = createProjectModule(project1.id, Some(scenario2.id), None)
      val _ = createProjectModule(project1.id, Some(scenario3.id), None)
      val _ = createProjectModule(project1.id, Some(scenario4.id), None)
      val projectModule5 = createProjectModule(project1.id, Some(scenario5.id), None)
      val _ = createProjectModule(project2.id, Some(scenario3.id), None)
      val _ = createProjectModule(project2.id, Some(scenario4.id), None)
      val _ = createProjectModule(project2.id, Some(scenario5.id), None)

      val action = projectModuleService.reposition(projectModule2.id, Some(projectModule5.id))
      val result = Await.result(action, Duration.Inf)

      result.position mustBe BigDecimal(6)
    }

    "move an item between two others" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val projectModuleService = inject[ProjectModuleService]

      val userAccount = createUserAccount
      val Seq(project1, project2, _) = createProjects(userAccount.id, 3)
      val Seq(scenario1, scenario2, scenario3, scenario4, scenario5) = createScenarios(5, userAccount.id)
      val projectModule1 = createProjectModule(project1.id, Some(scenario1.id), None)
      val _ = createProjectModule(project1.id, Some(scenario2.id), None)
      val _ = createProjectModule(project1.id, Some(scenario3.id), None)
      val projectModule4 = createProjectModule(project1.id, Some(scenario4.id), None)
      val _ = createProjectModule(project1.id, Some(scenario5.id), None)
      val _ = createProjectModule(project2.id, Some(scenario2.id), None)
      val _ = createProjectModule(project2.id, Some(scenario3.id), None)
      val _ = createProjectModule(project2.id, Some(scenario4.id), None)
      val _ = createProjectModule(project2.id, Some(scenario5.id), None)

      val action = projectModuleService.reposition(projectModule4.id, Some(projectModule1.id))
      val result = Await.result(action, Duration.Inf)

      result.position mustBe BigDecimal(1.5)
    }
  }
}
