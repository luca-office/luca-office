import * as React from "react"
import {CardFooter, CardFooterItem, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {useLucaTranslation} from "shared/translations"
import {settingStyles as styles} from "../scenario-settings.style"
import {CardFooterIcon} from "./card-footer/card-footer-icon"

export interface EventsCardProps {
  readonly eventsCount: number
  readonly isFinalized: boolean
  readonly navigateToEvents: () => void
}

export const EventsCard: React.FC<EventsCardProps> = ({isFinalized, eventsCount, navigateToEvents}) => {
  const {t} = useLucaTranslation()
  return (
    <OverviewCard
      onClick={navigateToEvents}
      customStyles={styles.card(!!eventsCount, isFinalized)}
      headerText={t("scenario_details__settings_label_events")}
      text={t("scenario_details__settings_events_description")}
      footer={
        <CardFooter customStyles={styles.cardFooter}>
          <CardFooterItem
            customStyles={styles.cardFooterItem}
            icon={IconName.ClipboardQuestionnaire}
            text={`${eventsCount} ${t("scenario_details__settings_card_footer_label_events")}`}
          />
          <CardFooterIcon isFinalized={isFinalized} />
        </CardFooter>
      }
    />
  )
}
