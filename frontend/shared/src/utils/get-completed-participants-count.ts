import {SurveyResultsOverviewFragment} from "../graphql/generated/SurveyResultsOverviewFragment"
import {CompletedParticipantCount} from "../models"

export const getCompletedParticipantsCount = (
  surveyResultsOverview: SurveyResultsOverviewFragment
): CompletedParticipantCount => ({
  numCompletedParticipants: surveyResultsOverview.participantResults.filter(result => result.isComplete).length,
  totalParticipants: surveyResultsOverview.participantResults.length
})
