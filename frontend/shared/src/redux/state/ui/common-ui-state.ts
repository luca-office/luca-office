import {AppNotification, OfficeModule} from "../../../models"
import {Option} from "../../../utils/option"

export interface CommonUiState {
  readonly activeModule: Option<OfficeModule>
  readonly activeModuleStartTime: Option<Date>
  readonly notification: Option<AppNotification>
  readonly selectedReferenceElementId: Option<UUID>
}

export const initialCommonUiState: CommonUiState = {
  activeModule: Option.none(),
  activeModuleStartTime: Option.none(),
  notification: Option.none<AppNotification>(),
  selectedReferenceElementId: Option.none()
}
