import * as React from "react"

export interface UseAccordionCardHook {
  readonly contentVisible: boolean
  readonly showContent: () => void
  readonly hideContent: () => void
}

export const useAccordionCard = (): UseAccordionCardHook => {
  const [contentVisible, setContentVisible] = React.useState<boolean>(false)

  const showContent = () => setContentVisible(true)
  const hideContent = () => setContentVisible(false)

  return {contentVisible, showContent, hideContent}
}
