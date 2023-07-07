import * as React from "react"
import {CardFooter, CardFooterItem, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {useLucaTranslation} from "shared/translations"
import {SettingsHeaderIcons} from "../header-icons/settings-header-icons"
import {settingStyles as styles} from "../scenario-settings.style"
import {CardFooterIcon} from "./card-footer/card-footer-icon"

export interface ReferenceBooksCardProps {
  readonly bookCount: number
  readonly isFinalized: boolean
  readonly navigateToReferenceBookChapters: () => void
}

export const ReferenceBooksCard: React.FC<ReferenceBooksCardProps> = ({
  bookCount,
  isFinalized,
  navigateToReferenceBookChapters
}) => {
  const {t} = useLucaTranslation()
  return (
    <OverviewCard
      customStyles={styles.card(!!bookCount, isFinalized)}
      onClick={navigateToReferenceBookChapters}
      headerText={t("scenario_details__settings_label_reference_books")}
      headerInfo={<SettingsHeaderIcons showTextEditor={true} />}
      text={t("scenario_details__settings_reference_books_description")}
      footer={
        <CardFooter customStyles={styles.cardFooter}>
          <CardFooterItem
            customStyles={styles.cardFooterItem}
            icon={IconName.Book}
            text={`${bookCount} ${t("scenario_details__settings_card_footer_label_reference_books")}`}
          />
          <CardFooterIcon isFinalized={isFinalized} />
        </CardFooter>
      }
    />
  )
}
