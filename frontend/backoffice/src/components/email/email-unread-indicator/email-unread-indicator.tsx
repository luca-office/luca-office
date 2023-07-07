import {css} from "@emotion/react"
import * as React from "react"
import {Flex, spacingSmall} from "shared/styles"

export interface EmailUnreadIndicatorProps {
  readonly text: string
}

export const EmailUnreadIndicator: React.FunctionComponent<EmailUnreadIndicatorProps> = ({text}) => {
  return (
    <div className="email-unread-indicator" css={Flex.row}>
      {text} <div css={styles.indicator} />
    </div>
  )
}

const styles = {
  indicator: css({
    background: "linear-gradient(-180deg, rgb(231, 112, 112) 0%, rgb(207, 79, 127) 100%)",
    height: spacingSmall,
    width: spacingSmall,
    marginLeft: spacingSmall,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,.5)"
  })
}
