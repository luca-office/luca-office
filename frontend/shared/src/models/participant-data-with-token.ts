import {ParticipantData} from "./participant-data"

export interface ParticipantDataWithToken extends Omit<ParticipantData, "__typename" | "firstName" | "lastName"> {
  readonly __typename?: TypeOf<ParticipantData, "__typename">
  readonly firstName?: string
  readonly lastName?: string
  readonly token?: string
}
