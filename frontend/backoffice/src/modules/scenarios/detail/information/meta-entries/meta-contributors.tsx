import {css} from "@emotion/react"
import * as React from "react"
import {Icon, ReadonlyActionField, Text} from "shared/components"
import {IconName} from "shared/enums"
import {Flex, spacingSmall, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

export interface MetaContributorsProps {
  readonly scenarioContributorsCount: number
  readonly onClick: () => void
  readonly disabled?: boolean
}

export const MetaContributors: React.FC<MetaContributorsProps> = ({scenarioContributorsCount, onClick, disabled}) => {
  const {t} = useLucaTranslation()
  return (
    <>
      <ReadonlyActionField
        label={t("scenario_details__general_contributors")}
        buttonLabel={t("scenario_details__button_invite")}
        disabled={disabled}
        onClick={onClick}
        renderValue={() => (
          <div css={Flex.row}>
            <Icon name={IconName.User} />
            <Text customStyles={styles.smallPaddingLeft} size={TextSize.Medium}>
              {`${scenarioContributorsCount} ${t("scenario_details__general_contributors")}`}
            </Text>
          </div>
        )}
      />
    </>
  )
}

const styles = {
  statusLabel: css({
    marginLeft: spacingSmall
  }),
  smallPaddingLeft: css({
    paddingLeft: spacingSmall
  })
}
