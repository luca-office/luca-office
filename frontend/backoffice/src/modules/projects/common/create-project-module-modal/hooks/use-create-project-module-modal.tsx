import * as React from "react"
import {useDispatch} from "react-redux"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface UseCreateProjectModuleModalHook {
  readonly selectedProjectModuleType: Option<ProjectModuleType>
  readonly setProjectModuleType: (projectModuleType: ProjectModuleType) => void
  readonly onConfirm: () => void
}

export const useCreateProjectModuleModal = (projectId: UUID): UseCreateProjectModuleModalHook => {
  const dispatch = useDispatch()

  const [selectedProjectModuleType, setSelectedProjectModuleType] = React.useState<Option<ProjectModuleType>>(
    Option.none()
  )

  const setProjectModuleType = (projectModuleType: ProjectModuleType) => {
    setSelectedProjectModuleType(Option.of(projectModuleType))
  }

  const navigateToScenarioSelection = () => dispatch(navigateToRouteAction(Route.ScenarioSelection, {id: projectId}))
  const navigateToQuestionnaireSelection = () =>
    dispatch(navigateToRouteAction(Route.QuestionnaireSelection, {id: projectId}))

  const onConfirm = () =>
    selectedProjectModuleType.forEach(projectModuleType => {
      switch (projectModuleType) {
        case ProjectModuleType.Scenario:
          navigateToScenarioSelection()
          break
        case ProjectModuleType.Questionnaire:
          navigateToQuestionnaireSelection()
          break
      }
    })

  return {
    selectedProjectModuleType,
    setProjectModuleType,
    onConfirm
  }
}
