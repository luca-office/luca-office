import {Action} from "redux"
import {BinaryViewerState} from "../../state/ui"

export type BinaryViewerAction = OpenBinaryAction | CloseBinaryAction | SelectBinaryAction

export enum BinaryViewerActionType {
  OpenBinary = "OpenBinary",
  SelectBinary = "SelectBinary",
  CloseBinary = "CloseBinary"
}

interface GeneralBinaryActionPayload {
  readonly binaryId: UUID
  readonly viewerType: keyof BinaryViewerState
}

interface BinaryActionPayload extends GeneralBinaryActionPayload {
  readonly url: string
  readonly title?: string
}

export interface OpenBinaryAction extends Action {
  readonly type: BinaryViewerActionType.OpenBinary
  readonly payload: BinaryActionPayload
}

export interface CloseBinaryAction extends Action {
  readonly type: BinaryViewerActionType.CloseBinary
  readonly payload: GeneralBinaryActionPayload
}

export const openBinary = (
  binaryId: UUID,
  url: string,
  viewerType: keyof BinaryViewerState,
  title?: string
): OpenBinaryAction => ({
  type: BinaryViewerActionType.OpenBinary,
  payload: {binaryId, url, title, viewerType}
})

export const closeBinary = (binaryId: UUID, viewerType: keyof BinaryViewerState): CloseBinaryAction => ({
  type: BinaryViewerActionType.CloseBinary,
  payload: {binaryId, viewerType}
})

export interface SelectBinaryAction extends Action {
  readonly type: BinaryViewerActionType.SelectBinary
  readonly payload: GeneralBinaryActionPayload
}

export const selectBinary = (binaryId: UUID, viewerType: keyof BinaryViewerState): SelectBinaryAction => ({
  type: BinaryViewerActionType.SelectBinary,
  payload: {binaryId, viewerType}
})
