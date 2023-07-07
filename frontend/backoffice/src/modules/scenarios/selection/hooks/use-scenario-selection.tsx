import * as React from "react"
import {useDispatch} from "react-redux"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {useCreateProjectModule, useProject, useProjectModules, useScenarios} from "shared/graphql/hooks"
import {Scenario, ScenarioLight} from "shared/models"
import {useCheckUserClaims} from "../../../../hooks/use-check-user-claims"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {checkIsProjectFinalized} from "../../../projects/utils"
import {useTestSurveyDeletion} from "./use-test-survey-deletion"

export interface UseScenarioOverviewHook {
  readonly alreadyAssignedScenarios: Scenario[]
  readonly isProjectFinalized: boolean // finalized == existing survey
  readonly openProjectDetail: () => void
  readonly openSelectionDetail: (scenarioId: UUID) => void
  readonly saveScenarioAssignment: (selectedScenarios: ScenarioLight[]) => void
  readonly scenarios: ScenarioLight[]
  readonly userMayFinalizeWithoutPublishing: boolean
}

export const useScenarioSelection = (projectId: UUID): UseScenarioOverviewHook => {
  const dispatch = useDispatch()

  const {scenarios: allScenarios} = useScenarios()
  const {createProjectModule} = useCreateProjectModule()
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)
  const {project, projectLoading} = useProject(projectId)
  const {userClaims, userClaimsCheckLoading} = useCheckUserClaims()
  const {deleteTestSurveys} = useTestSurveyDeletion(projectId)

  const projectScenarios = React.useMemo(
    () =>
      projectModules.reduce(
        (accumulator, module) => (!module.scenario ? accumulator : [...accumulator, module.scenario]),
        [] as Scenario[]
      ),
    [projectModulesLoading]
  )
  const isProjectFinalized = !projectLoading && checkIsProjectFinalized(project)
  const userMayFinalizeWithoutPublishing = !userClaimsCheckLoading && userClaims.mayFinalizeWithoutPublishing

  const openProjectDetail = () => dispatch(navigateToRouteAction(Route.ProjectDetail, {id: projectId}))
  const openSelectionDetail = (scenarioId: UUID) =>
    dispatch(navigateToRouteAction(Route.ScenarioSelectionDetail, {id: projectId, scenarioId}))
  const saveScenarioAssignment = (selectedScenarios: ScenarioLight[]) => {
    const selectedScenarioIds = selectedScenarios.map(scenario => scenario.id)
    const createdScenarioIds = selectedScenarioIds.filter(id => !projectScenarios.some(scenario => scenario.id === id))

    deleteTestSurveys().then(() => {
      createdScenarioIds.forEach(scenarioId =>
        createProjectModule({
          projectId,
          scenarioId,
          moduleType: ProjectModuleType.Scenario
        })
      )
      openProjectDetail()
    })
  }

  return {
    openSelectionDetail,
    alreadyAssignedScenarios: projectScenarios,
    isProjectFinalized,
    scenarios: allScenarios
      .map(scenarios =>
        scenarios.filter(
          scenario =>
            (isProjectFinalized ? !!scenario.publishedAt : true) &&
            (!userMayFinalizeWithoutPublishing ? !scenario.finalizedAt : true)
        )
      )
      .getOrElse([]),
    openProjectDetail,
    saveScenarioAssignment,
    userMayFinalizeWithoutPublishing
  }
}
