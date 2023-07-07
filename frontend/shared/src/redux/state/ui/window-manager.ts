import {OfficeWindowType} from "../../../enums"

export interface WindowManagerState {
  readonly availableWindows: OfficeWindowType[]
  readonly openWindows: OfficeWindowType[]
  readonly minimizedWindows: OfficeWindowType[]
  readonly isChatVisible: boolean
}

export const initialWindowManagerState: WindowManagerState = {
  availableWindows: [],
  openWindows: [],
  minimizedWindows: [],
  isChatVisible: false
}
