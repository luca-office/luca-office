import React from "react"
import {ScenarioEmails, ScenarioEmailsProps} from "./scenario-emails"

export type ScenarioEmailsContainerProps = Omit<ScenarioEmailsProps, "isPreviewVisible" | "setPreviewVisibility">

export const ScenarioEmailsContainer: React.FC<ScenarioEmailsContainerProps> = props => {
  const [isPreviewVisible, setIsPreviewVisible] = React.useState(false)

  return <ScenarioEmails isPreviewVisible={isPreviewVisible} setPreviewVisibility={setIsPreviewVisible} {...props} />
}
