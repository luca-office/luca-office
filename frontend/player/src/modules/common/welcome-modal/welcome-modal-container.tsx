import React from "react"
import {useSelector} from "react-redux"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {useProject} from "shared/graphql/hooks"
import {OfficeModule} from "shared/models/office-module"
import {Option} from "shared/utils"
import {AppState} from "../../../redux/state/app-state"
import {useSurveyProgress} from "../hooks/use-survey-progress"
import {WelcomeModal} from "./welcome-modal"

export interface WelcomeModalContainerProps {
  readonly firstProjectModule: OfficeModule
}

export const WelcomeModalContainer: React.FC<WelcomeModalContainerProps> = ({firstProjectModule}) => {
  const activeModule = useSelector<AppState, Option<OfficeModule>>(s => s.ui.common.activeModule)
  const projectIdOption = activeModule.map(module => module.projectId)
  const {project: projectOption} = useProject(projectIdOption.getOrElse(""))

  const title = projectOption.map(project => project.name).getOrElse("")
  const welcomeText = projectOption.map(project => project.welcomeText).orUndefined()

  const {startSpecificModuleById} = useSurveyProgress()

  const onStartClicked = () => {
    if (firstProjectModule.moduleType === ProjectModuleType.Scenario && firstProjectModule.scenarioId !== null) {
      startSpecificModuleById(ProjectModuleType.Scenario, firstProjectModule.scenarioId)
    } else if (firstProjectModule.questionnaireId !== null) {
      startSpecificModuleById(ProjectModuleType.Questionnaire, firstProjectModule.questionnaireId)
    }
  }

  return <WelcomeModal onStartClicked={onStartClicked} title={title} welcomeText={welcomeText} />
}
