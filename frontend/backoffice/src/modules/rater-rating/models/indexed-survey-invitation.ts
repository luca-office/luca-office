import {SurveyInvitationLight} from "shared/models"

export interface IndexedSurveyInvitation extends SurveyInvitationLight {
  readonly index: number
}
