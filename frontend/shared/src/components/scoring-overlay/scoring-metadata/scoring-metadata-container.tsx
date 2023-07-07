import * as React from "react"
import {IconName} from "../../../enums"
import {ProjectModuleType} from "../../../graphql/generated/globalTypes"
import {useProject} from "../../../graphql/hooks"
import {useSurveyLight} from "../../../graphql/hooks/queries/survey/use-survey-light"
import {ProjectModule} from "../../../models"
import {Option} from "../../../utils"
import {ScoringMetadata} from "./scoring-metadata"

export interface UseScoringMetadataParams {
  readonly surveyId: UUID
  readonly projectId: UUID
  readonly projectModule: Option<ProjectModule>
}

export const ScoringMetadataContainer: React.FC<UseScoringMetadataParams> = ({surveyId, projectId, projectModule}) => {
  const {surveyLoading, survey} = useSurveyLight(surveyId)
  const {projectLoading, project} = useProject(projectId)

  const dataLoading = surveyLoading || projectLoading
  const projectName = project.map(({name}) => name).getOrElse("")
  const surveyName = survey.map(({title}) => title).getOrElse("")
  const projectModuleName = projectModule
    .map(
      ({moduleType, scenario, questionnaire}) =>
        (moduleType === ProjectModuleType.Scenario ? scenario?.name : questionnaire?.title) ?? ""
    )
    .getOrElse("")
  const projectModuleIcon = projectModule
    .map<IconName>(({moduleType}) =>
      moduleType === ProjectModuleType.Scenario ? IconName.Monitor : IconName.ClipboardFilled
    )
    .getOrElse(IconName.Alert2)

  return (
    <ScoringMetadata
      dataLoading={dataLoading}
      projectName={projectName}
      surveyName={surveyName}
      projectModuleName={projectModuleName}
      projectModuleIcon={projectModuleIcon}
    />
  )
}
