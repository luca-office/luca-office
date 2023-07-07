import {ProjectModule} from "shared/models"

export interface RatingByParticipant {
  readonly participantId: UUID
  readonly isFullyRated: boolean
  readonly isNotRatable: boolean
}

export interface RatingProjectModule extends ProjectModule {
  readonly participantCount: number
  readonly ratedParticipantCount: number
  readonly ratingsByParticipants: RatingByParticipant[]
}
