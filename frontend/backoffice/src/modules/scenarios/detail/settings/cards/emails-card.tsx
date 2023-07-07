import * as React from "react"
import {CardFooter, CardFooterItem, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {useLucaTranslation} from "shared/translations"
import {SettingsHeaderIcons} from "../header-icons/settings-header-icons"
import {settingStyles as styles} from "../scenario-settings.style"
import {CardFooterIcon} from "./card-footer/card-footer-icon"

export interface EmailsCardProps {
  readonly emailsCount: number
  readonly isFinalized: boolean
  readonly navigateToEmails: () => void
}

export const EmailsCard: React.FC<EmailsCardProps> = ({emailsCount, isFinalized, navigateToEmails}) => {
  const {t} = useLucaTranslation()

  return (
    <OverviewCard
      customStyles={styles.card(!!emailsCount, isFinalized)}
      onClick={navigateToEmails}
      headerText={t("scenario_details__settings_label_emails")}
      headerInfo={<SettingsHeaderIcons showTextEditor={true} showMail={true} />}
      text={t("scenario_details__settings_emails_description")}
      footer={
        <CardFooter customStyles={styles.cardFooter}>
          <CardFooterItem
            customStyles={styles.cardFooterItem}
            icon={IconName.Email}
            text={`${emailsCount} ${t("scenario_details__settings_card_footer_label_mails")}`}
          />
          <CardFooterIcon isFinalized={isFinalized} />
        </CardFooter>
      }
    />
  )
}
