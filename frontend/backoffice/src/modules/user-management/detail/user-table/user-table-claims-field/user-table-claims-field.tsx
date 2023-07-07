import {css} from "@emotion/react"
import * as React from "react"
import {Icon, Text} from "shared/components"
import {IconName} from "shared/enums"
import {Flex, fontColor, fontColorLight, spacingSmall, spacingTiny, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"

interface Props {
  readonly mayAdministrateUserAccounts: boolean
  readonly mayArchive: boolean
  readonly mayFinalizeWithoutPublishing: boolean
  readonly mayAdministrateRScripts: boolean
}

export const UserTableClaimsField: React.FC<Props> = ({
  mayAdministrateUserAccounts,
  mayArchive,
  mayFinalizeWithoutPublishing,
  mayAdministrateRScripts
}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={styles.wrapper}>
      <div css={Flex.row}>
        <Icon color={mayAdministrateUserAccounts ? fontColor : fontColorLight} name={IconName.User} />
        <Text size={TextSize.Medium} customStyles={styles.text(mayAdministrateUserAccounts)}>
          {t("user_management__filter_label_management")}
        </Text>
      </div>
      <div css={Flex.row}>
        <Icon color={mayArchive ? fontColor : fontColorLight} name={IconName.Archive} />
        <Text size={TextSize.Medium} customStyles={styles.text(mayArchive)}>
          {t("user_management__filter_label_archive")}
        </Text>
      </div>
      <div css={Flex.row}>
        <Icon color={mayFinalizeWithoutPublishing ? fontColor : fontColorLight} name={IconName.LockClosed} />
        <Text size={TextSize.Medium} customStyles={styles.text(mayFinalizeWithoutPublishing)}>
          {t("user_management__filter_label_finalize")}
        </Text>
      </div>
      <div css={Flex.row}>
        <Icon color={mayAdministrateRScripts ? fontColor : fontColorLight} name={IconName.LockClosed} />
        <Text size={TextSize.Medium} customStyles={styles.text(mayAdministrateRScripts)}>
          {t("user_management__filter_label_r_scripts_short")}
        </Text>
      </div>
    </div>
  )
}

const styles = {
  wrapper: css(Flex.row, {
    justifyContent: "space-between"
  }),
  text: (active: boolean) =>
    css({
      color: active ? fontColor : fontColorLight,
      marginLeft: spacingTiny,
      marginRight: spacingSmall,
      userSelect: "none"
    })
}
