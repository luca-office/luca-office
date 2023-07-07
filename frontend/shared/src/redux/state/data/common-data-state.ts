import {LatestStartedProjectModule, OfficeModule, ParticipantData} from "../../../models"
import {Option} from "../../../utils/option"

export interface CommonDataState {
  readonly officeModules: Array<OfficeModule>
  readonly participantData: Option<ParticipantData>
  readonly latestStartedProjectModule: Option<Omit<LatestStartedProjectModule, "__typename">>
}

export const initialCommonDataState: CommonDataState = {
  officeModules: [],
  participantData: Option.none(),
  latestStartedProjectModule: Option.none()
}
