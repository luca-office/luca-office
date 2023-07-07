import {SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {Option} from "shared/utils"

export const isManualSynchronousSurvey = (surveyExecutionTypeOption: Option<SurveyExecutionType>) =>
  surveyExecutionTypeOption.exists(executionType => executionType === SurveyExecutionType.ManualSynchronous)

export const isManualAsynchronousSurvey = (surveyExecutionTypeOption: Option<SurveyExecutionType>) =>
  surveyExecutionTypeOption.exists(executionType => executionType === SurveyExecutionType.ManualAsynchronous)

export const isManualSurvey = (surveyExecutionTypeOption: Option<SurveyExecutionType>) =>
  surveyExecutionTypeOption.exists(executionType => executionType !== SurveyExecutionType.AutomaticAsynchronous)
