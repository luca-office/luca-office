import {css} from "@emotion/react"
import * as React from "react"
import {CardFooter, CardFooterItem, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {primaryColor} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {SettingsHeaderIcons} from "../header-icons/settings-header-icons"
import {settingStyles as styles} from "../scenario-settings.style"
import {CardFooterIcon} from "./card-footer/card-footer-icon"

interface Props {
  readonly navigateToSampleCompaniesSelection: () => void
  readonly filesCount: number
  readonly isFinalized: boolean
  readonly isAssigned: boolean
}

export const SampleCompanyCard: React.FC<Props> = ({
  filesCount,
  isAssigned,
  isFinalized,
  navigateToSampleCompaniesSelection
}) => {
  const {t} = useLucaTranslation()
  return (
    <OverviewCard
      customStyles={sampleCompanyCardStyles.card(isAssigned, isFinalized && !isAssigned)}
      onClick={navigateToSampleCompaniesSelection}
      headerText={t("scenario_details__settings_label_sample_company")}
      headerInfo={<SettingsHeaderIcons showTextEditor={true} showMail={true} />}
      text={t("scenario_details__settings_sample_company_description")}
      footer={
        <CardFooter customStyles={styles.cardFooter}>
          <CardFooterItem
            customStyles={styles.cardFooterItem}
            icon={IconName.File}
            text={`${t("scenario_details__settings_card_footer_label_files", {filesCount})}`}
          />
          <CardFooterIcon isFinalized={isFinalized} />
        </CardFooter>
      }
    />
  )
}

const sampleCompanyCardStyles = {
  card: (isAssigned: boolean, isDisabled: boolean) =>
    css({
      border: `1px solid ${isAssigned ? primaryColor : "transparent"}`,
      pointerEvents: isDisabled ? "none" : "all"
    })
}
