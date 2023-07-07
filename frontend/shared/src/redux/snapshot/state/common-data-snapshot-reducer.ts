import {Salutation, SurveyEventType} from "../../../graphql/generated/globalTypes"
import {SurveyEvent} from "../../../models"
import {SharedAppState} from "../../../redux/state"
import {CommonDataState} from "../../../redux/state/data"
import {Option} from "../../../utils"

export const commonDataSnapshotReducer = (state: SharedAppState, surveyEvent: SurveyEvent): CommonDataState => {
  const common = state.data.common

  switch (surveyEvent.eventType) {
    case SurveyEventType.StoreParticipantData: {
      const data = surveyEvent.data as {firstName: string; lastName: string; salutation: Salutation}
      return {
        ...common,
        participantData: Option.of({
          __typename: "ParticipantData",
          firstName: data.firstName,
          lastName: data.lastName,
          salutation: data.salutation
        })
      }
    }
    default:
      return common
  }
}
