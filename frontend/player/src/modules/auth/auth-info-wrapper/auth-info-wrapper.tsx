import {CSSInterpolation} from "@emotion/serialize"
import React from "react"
import {Column, Columns, InfoColumnContainer} from "shared/components"
import {spacingLarge} from "shared/styles"
import {applicationVersion} from "../../../constants"
import {AuthWelcome} from "../auth-welcome/auth-welcome"

interface Props {
  readonly rightColumn: JSX.Element
}

export const AuthInfoWrapper: React.FC<Props> = ({rightColumn}) => (
  <div css={styles.contentWrapper}>
    <Columns customStyles={styles.content}>
      <InfoColumnContainer footerText={applicationVersion} />
      <Column customStyles={styles.loginColumn} flexGrow={4}>
        <AuthWelcome />
        {rightColumn}
      </Column>
    </Columns>
  </div>
)

const styles: Record<string, CSSInterpolation> = {
  contentWrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    backgroundColor: "white",
    height: "100vh"
  },
  loginColumn: {
    height: "fill-available",
    margin: `10% ${spacingLarge}px 0px ${spacingLarge}px`,
    overflow: "auto"
  }
}
