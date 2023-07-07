import {surveyInvitationsMock} from "shared/graphql/__mocks__"
import {ParticipantTableEntity} from "../scoring-dashboard-table"

export const participantTableEntityMocks: ParticipantTableEntity[] = surveyInvitationsMock.map(
  (surveyInvitation, index) => ({
    id: surveyInvitation.id,
    name: surveyInvitation.participantData
      ? `${surveyInvitation.participantData.firstName} ${surveyInvitation.participantData.lastName}`
      : surveyInvitation.token,
    index: index + 1,
    isFinalScore: index === 0,
    isRatingCompleted: index === 1,
    isRatingOfMainRater: index === 2,
    ratingCounts: {ratableProjectModulesCount: 12, finalRatedProjectModulesCount: 6},
    isRatingOfAllModulesPossible: true,
    isRatingOfSomeModulePossible: true
  })
)
