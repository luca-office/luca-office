import {css} from "@emotion/react"
import * as React from "react"
import {Checkbox, Label, Paper} from "shared/components"
import {boxHeightMedium, CustomStyle, Flex, spacingMedium, spacingTiny} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {UserGlobalClaim} from "../../../../enums"
import {userRightsToCheckBoxLabelKey} from "../../utils/user-management"
import {UserGlobalClaimsState} from "../user-management-detail-container"

interface Props extends CustomStyle {
  readonly globalClaims: UserGlobalClaimsState[]
  readonly toggleUserClaim: (right: UserGlobalClaim) => void
}

export const FilterUserClaimsCard: React.FC<Props> = ({globalClaims, toggleUserClaim, customStyles}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={[styles.wrapper, customStyles]}>
      <Label label={t("user_management__filter_header")} />
      <Paper customStyles={styles.paper}>
        {globalClaims.map(globalClaimState => (
          <Checkbox
            checked={globalClaimState.isSelected}
            key={globalClaimState.claim}
            onChange={() => toggleUserClaim(globalClaimState.claim)}
            label={t(userRightsToCheckBoxLabelKey(globalClaimState.claim))}
          />
        ))}
      </Paper>
    </div>
  )
}

const styles = {
  wrapper: css({
    marginRight: spacingMedium,
    marginBottom: spacingTiny
  }),
  paper: css(Flex.row, {
    height: boxHeightMedium,
    justifyContent: "space-between"
  })
}
