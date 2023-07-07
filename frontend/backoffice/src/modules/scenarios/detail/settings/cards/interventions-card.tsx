import * as React from "react"
import {CardFooter, CardFooterItem, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {useLucaTranslation} from "shared/translations"
import {SettingsHeaderIcons} from "../header-icons/settings-header-icons"
import {settingStyles as styles} from "../scenario-settings.style"
import {CardFooterIcon} from "./card-footer/card-footer-icon"

interface Props {
  readonly interventionsCount: number
  readonly isReadOnly: boolean
  readonly navigateToInterventions: () => void
}

export const InterventionsCard: React.FC<Props> = ({isReadOnly, navigateToInterventions, interventionsCount}) => {
  const {t} = useLucaTranslation()
  return (
    <OverviewCard
      customStyles={styles.card(interventionsCount > 0, isReadOnly)}
      onClick={navigateToInterventions}
      headerText={t("scenario_details__settings_label_interventions")}
      headerInfo={<SettingsHeaderIcons showTextEditor={true} showMail={true} />}
      text={t("scenario_details__settings_interventions_description")}
      footer={
        <CardFooter customStyles={styles.cardFooter}>
          <CardFooterItem
            customStyles={styles.cardFooterItem}
            icon={IconName.Alert}
            text={`${interventionsCount} ${t("scenario_details__settings_card_footer_label_interventions")}`}
          />
          <CardFooterIcon isFinalized={isReadOnly} />
        </CardFooter>
      }
    />
  )
}
