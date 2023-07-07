import {SurveyParticipationStatus} from "../graphql/generated/globalTypes"

export const isSurveyParticipationCompleted = (surveyParticipationStatus: SurveyParticipationStatus): boolean =>
  surveyParticipationStatus !== SurveyParticipationStatus.ParticipationNotStarted &&
  surveyParticipationStatus !== SurveyParticipationStatus.ParticipationInProgress
