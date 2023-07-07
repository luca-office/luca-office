import * as React from "react"
import {ButtonConfig} from "../../../models"

export interface UseDetailViewHeaderHook {
  readonly operationConfirmationVisible: boolean
  readonly onOperationButtonClick: (() => void) | undefined
  readonly onOperationConfirm: () => void
  readonly onOperationCancel: () => void
}

export const useDetailViewHeader = (operationButtonConfig?: ButtonConfig): UseDetailViewHeaderHook => {
  const [operationConfirmationVisible, toggleOperationConfirmation] = React.useState(false)

  const showOrly = !!operationButtonConfig?.orlyTextKey
  const onOperationButtonClick = showOrly ? () => toggleOperationConfirmation(true) : operationButtonConfig?.onClick
  const onOperationConfirm = () => {
    toggleOperationConfirmation(false)
    operationButtonConfig?.onClick()
  }

  return {
    operationConfirmationVisible,
    onOperationButtonClick,
    onOperationConfirm,
    onOperationCancel: () => toggleOperationConfirmation(false)
  }
}
