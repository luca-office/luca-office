import {projectModulesMockWithQuestionnaire, surveyInvitationsMock} from "shared/graphql/__mocks__"
import {RatingProjectModule} from "../models"

export const ratingProjectModulesMock: RatingProjectModule[] = projectModulesMockWithQuestionnaire.map(
  (projectModule, index) => ({
    ...projectModule,
    ratingsByParticipants: surveyInvitationsMock.map(({id}, index) => ({
      participantId: id,
      isFullyRated: index % 2 === 0,
      isNotRatable: false
    })),
    participantCount: index + 1,
    ratedParticipantCount: index
  })
)
