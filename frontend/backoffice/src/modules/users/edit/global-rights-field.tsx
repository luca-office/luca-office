import {css} from "@emotion/react"
import React from "react"
import {Heading} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {Flex, FontWeight, spacing, spacingSmall, spacingTiny} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {UserAccount} from "../../../models"
import {UserTableClaimsField} from "../../user-management/detail/user-table/user-table-claims-field/user-table-claims-field"

export interface GlobalRightsFieldProps {
  readonly user: UserAccount
}

export const GlobalRightsField: React.FC<GlobalRightsFieldProps> = ({user}) => {
  const {t} = useLucaTranslation()
  return (
    <React.Fragment>
      <div css={Flex.row}>
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("user_management__table_header_rights")}
        </Heading>
      </div>
      <div css={styles.contentWrapper}>
        <UserTableClaimsField
          mayAdministrateRScripts={user.mayAdministrateRScripts}
          mayAdministrateUserAccounts={user.mayAdministrateUserAccounts}
          mayArchive={user.mayArchive}
          mayFinalizeWithoutPublishing={user.mayFinalizeWithoutPublishing}
        />
      </div>
    </React.Fragment>
  )
}

const Size = {
  contentWrapper: 32,
  boxShadowOffsetY: 1,
  boxShadowBlurRadius: 2
}

const styles = {
  contentWrapper: css({
    minHeight: Size.contentWrapper,
    padding: spacing(spacingTiny, spacingSmall),
    boxSizing: "border-box",
    boxShadow: `0px ${Size.boxShadowOffsetY}px ${Size.boxShadowBlurRadius}px 0px rgba(0, 0, 0, 0.24)`,
    borderRadius: 4,
    backgroundColor: "#ffffff"
  })
}
