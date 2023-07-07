import {useQuery} from "@apollo/client"
import {Option} from "../../../../utils"
import {ProjectForSurveyQuery, ProjectForSurveyQueryVariables} from "../../../generated/ProjectForSurveyQuery"
import {projectNameForSurveyQuery} from "../../../queries/project"

export interface ProjectNameForSurveyProps {
  readonly projectName: Option<string>
  readonly projectNameLoading: boolean
}

export const useProjectNameForSurvey = (surveyId: UUID): ProjectNameForSurveyProps => {
  const {data, loading} = useQuery<ProjectForSurveyQuery, ProjectForSurveyQueryVariables>(projectNameForSurveyQuery, {
    variables: {surveyId: surveyId}
  })

  return {
    projectName: Option.of(data?.projectForSurvey?.name),
    projectNameLoading: loading
  }
}
