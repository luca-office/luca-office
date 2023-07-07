import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {SurveyLight} from "shared/models"
import {Option} from "shared/utils"

export interface UseRaterRatingDetailViewContentHook {
  readonly dataLoading: boolean
  readonly survey: Option<SurveyLight>
}

export const useRaterRatingDetailViewContent = (surveyId: UUID): UseRaterRatingDetailViewContentHook => {
  const {survey, surveyLoading} = useSurveyLight(surveyId)

  return {dataLoading: surveyLoading, survey}
}
