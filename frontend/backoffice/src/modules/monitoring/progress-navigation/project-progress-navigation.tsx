import * as React from "react"
import {HeaderCarouselBaseElement, HeaderCarouselContainer} from "shared/components"
import {ProjectModule} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {getProjectModuleTitle, Option, sortByPosition} from "shared/utils"
import {MonitoringDashboardProps} from ".."
import {useProjectProgressNavigation} from "./hooks/use-project-progress-navigation"

export interface ProjectProgressNavigationProps extends MonitoringDashboardProps {
  readonly activeModule: Option<ProjectModule>
  readonly moduleIndex: number
  readonly projectModules: ProjectModule[]
}

interface ProjectProgressHeaderCarouselElement extends HeaderCarouselBaseElement {
  readonly moduleId: UUID | null
  readonly isScenario?: boolean
}

export const ProjectProgressNavigation: React.FunctionComponent<ProjectProgressNavigationProps> = props => {
  const {navigateToModule, navigateToDashboard} = useProjectProgressNavigation(props)
  const {t} = useLucaTranslation()

  const {projectModules, activeModule} = props

  const sortedProjectModules = sortByPosition(projectModules)

  const carouselElements: ProjectProgressHeaderCarouselElement[] = [
    {label: t("dashboard__project_project_navigation"), moduleId: null},
    ...sortedProjectModules.map((module, index) => ({
      label: `${index + 1}. ${getProjectModuleTitle(module)} (${t(
        module.scenarioId !== null ? "scenario_title" : "questionnaire__title"
      )})`,
      moduleId: module.id
    }))
  ]

  const handleCarouselHeaderChange = (nextActiveElement: ProjectProgressHeaderCarouselElement) => {
    if (nextActiveElement.moduleId !== null) {
      navigateToModule(nextActiveElement.moduleId)
    } else {
      navigateToDashboard()
    }
  }

  const defaultSelectedHeaderElement = activeModule
    .map(module => carouselElements.find(element => element.moduleId === module.id) ?? carouselElements[0])
    .orUndefined()

  return (
    <HeaderCarouselContainer
      defaultSelectedElement={defaultSelectedHeaderElement}
      onChange={handleCarouselHeaderChange}
      elements={carouselElements}
    />
  )
}
