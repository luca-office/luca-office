import {useQuery} from "@apollo/client"
import {Survey} from "../../../../models"
import {GetSurveysQuery} from "../../../generated/GetSurveysQuery"
import {surveysQuery} from "../../../queries"

export interface SurveysProps {
  readonly surveys: Survey[]
  readonly surveysLoading: boolean
}

export const useSurveys = (projectId: UUID): SurveysProps => {
  const {data, loading} = useQuery<GetSurveysQuery>(surveysQuery, {variables: {projectId}})

  return {
    surveys: data?.surveys ?? [],
    surveysLoading: loading
  }
}
