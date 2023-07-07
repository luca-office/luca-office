import * as React from "react"

export interface UseSurveyDetailDataDownloadHook {
  readonly isConfirmModalVisible: boolean
  readonly showConfirmModal: () => void
  readonly hideConfirmModal: () => void
}

export const useSurveyDetailDataDownload = (): UseSurveyDetailDataDownloadHook => {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = React.useState(false)

  const showConfirmModal = () => setIsConfirmModalVisible(true)
  const hideConfirmModal = () => setIsConfirmModalVisible(false)

  return {isConfirmModalVisible, showConfirmModal, hideConfirmModal}
}
