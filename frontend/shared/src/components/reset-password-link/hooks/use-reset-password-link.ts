import * as React from "react"

export interface UseResetPasswordLinkHook {
  readonly isResetOverlayVisible: boolean
  readonly showResetOverlay: () => void
  readonly hideResetOverlay: () => void
}

export const useResetPasswordLink = (): UseResetPasswordLinkHook => {
  const [isResetOverlayVisible, setIsResetOverlayVisible] = React.useState(false)

  const showResetOverlay = () => setIsResetOverlayVisible(true)
  const hideResetOverlay = () => setIsResetOverlayVisible(false)

  return {isResetOverlayVisible, showResetOverlay, hideResetOverlay}
}
