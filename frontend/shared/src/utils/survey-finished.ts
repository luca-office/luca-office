import {Survey, SurveyLight} from "../models"

export const isSurveyFinished = (survey: Survey | SurveyLight) =>
  survey.isCompleted || (survey.manualPeriod !== null && survey.manualPeriod.end !== null)
