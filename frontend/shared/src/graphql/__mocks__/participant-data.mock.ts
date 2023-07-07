import {ParticipantData} from "../../models"
import {Salutation} from "../generated/globalTypes"

export const participantDataMock: ParticipantData[] = [
  {
    __typename: "ParticipantData",
    firstName: "Hasheem",
    lastName: "Pollastrino",
    salutation: Salutation.Mr
  },
  {
    __typename: "ParticipantData",
    firstName: "Cortney",
    lastName: "Cutill",
    salutation: Salutation.Mrs
  },
  {
    __typename: "ParticipantData",
    firstName: "Wald",
    lastName: "Hawtin",
    salutation: Salutation.Mr
  },
  {
    __typename: "ParticipantData",
    firstName: "Quinlan",
    lastName: "Le Fleming",
    salutation: Salutation.NonBinary
  }
]
