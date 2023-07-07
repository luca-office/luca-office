import {SurveyEventCreation} from "../../src/graphql/generated/globalTypes"
import {SurveyEventCreationWithoutIndex} from "../../src/models/survey-event-creation-without-index"

export const withSurveyEventTestIndex = (
  surveyEventsWithoutIndex: SurveyEventCreationWithoutIndex[]
): SurveyEventCreation[] =>
  surveyEventsWithoutIndex.map((surveyEventWithoutIndex, arrIndex) => ({
    ...surveyEventWithoutIndex,
    index: arrIndex + 1
  }))
