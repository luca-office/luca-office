import {Salutation} from "../graphql/generated/globalTypes"
import {ParticipantData} from "../models"
import {LucaTFunction} from "../translations"

export const getParticipantNameOrToken = (participantData: ParticipantData | null, participantToken: string) =>
  participantData?.firstName
    ? `${participantData?.firstName} ${participantData?.lastName ? participantData?.lastName : ""}`
    : participantToken

export const getDummyParticipantData = (t: LucaTFunction): ParticipantData => ({
  firstName: t("first_name"),
  lastName: t("last_name"),
  salutation: Salutation.NonBinary,
  __typename: "ParticipantData"
})
