import {surveyIdMock} from "shared/graphql/__mocks__/common"
import {SurveyResultsOverview} from "shared/models"

export const surveyResultsOverviewMock: SurveyResultsOverview = {
  __typename: "SurveyResultsOverview",
  areResultsComplete: false,
  averageScore: 253,
  maximumScore: 292,
  participantResults: [
    {
      __typename: "ParticipantResult",
      participantName: "Max Muster",
      score: 210,
      surveyInvitationId: "c155e363-148b-4f3d-8ab3-c86a486fbdd1",
      isComplete: false
    },
    {
      __typename: "ParticipantResult",
      participantName: "Tim Müller",
      score: 190,
      surveyInvitationId: "c155e363-148b-4f3d-8ab3-c86a486fbdd1",
      isComplete: false
    },
    {
      __typename: "ParticipantResult",
      participantName: "Frau Musterfrau",
      score: 292,
      surveyInvitationId: "c155e363-148b-4f3d-8ab3-c86a486fbdd1",
      isComplete: false
    }
  ],
  projectModuleResults: [
    {
      __typename: "ProjectModuleResult",
      averageScore: 235,
      isComplete: false,
      maximumScore: 292,
      questionnaireId: null,
      scenarioId: "8252a8e6-b42c-4501-acf7-056ab97961b7"
    }
  ],
  surveyId: surveyIdMock
}
