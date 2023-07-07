import {SurveyEventCreation} from "../graphql/generated/globalTypes"

export type SurveyEventCreationWithoutIndex = Omit<SurveyEventCreation, "index">
