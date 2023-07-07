import "shared/utils/console-warnings"
import {css} from "@emotion/react"
import * as React from "react"
import {LoadingIndicator} from "shared/components"
import {UserAccountForLogin} from "shared/models"
import {Option} from "shared/utils"
import {Auth} from "../../auth"
import {AccountNeedsBackofficeTermsAndConditionsConfirmation} from "../../auth/account-needs-backoffice-terms-and-conditions-confirmation"
import {AppContentContainer, AppHeaderContainer} from ".."

interface AppProps {
  readonly isLoading: boolean
  readonly userAccount: Option<UserAccountForLogin>
}

export const App: React.FC<AppProps> = ({isLoading, userAccount}) => {
  const loadingIndicator = (
    <div css={styles}>
      <LoadingIndicator />
    </div>
  )

  const content = userAccount
    .map(userAccount => {
      if (userAccount.needsToConfirmBackofficeTermsAndConditions) {
        return <AccountNeedsBackofficeTermsAndConditionsConfirmation />
      }
      return (
        <React.Fragment>
          <AppHeaderContainer />
          <AppContentContainer />
          <div id="portal-root" />
        </React.Fragment>
      )
    })
    .getOrElse(<Auth />)

  return isLoading ? loadingIndicator : content
}

const styles = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh"
})
