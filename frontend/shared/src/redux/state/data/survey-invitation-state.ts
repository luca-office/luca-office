import {SurveyExecutionType} from "../../../graphql/generated/globalTypes"
import {Option} from "../../../utils/option"
import {SharedAppState} from "../app-state"

export interface SurveyInvitationState {
  readonly token: Option<string>
  readonly invitationId: Option<UUID>
  readonly surveyId: Option<UUID>
  readonly executionType: Option<SurveyExecutionType>
  readonly manualSurveyStartedAt: Option<Date>
}

export const initialSurveyInvitationState: SurveyInvitationState = {
  token: Option.none(),
  invitationId: Option.none(),
  surveyId: Option.none(),
  executionType: Option.none(),
  manualSurveyStartedAt: Option.none()
}

export const selectSurveyInvitation = (state: SharedAppState): SurveyInvitationState => state.data.surveyInvitation
