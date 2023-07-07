import {css} from "@emotion/react"
import * as React from "react"
import {CardFooter, CardFooterItem, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {useLucaTranslation} from "shared/translations"
import {settingStyles as styles} from "../scenario-settings.style"
import {CardFooterIcon} from "./card-footer/card-footer-icon"

interface Props {
  readonly isFinalized: boolean
  readonly dimensionsCount: number
  readonly scenarioHasCodingModel: boolean
  readonly navigateToCodingModels: () => void
}

export const CodingModelsCard: React.FC<Props> = ({
  isFinalized,
  navigateToCodingModels,
  dimensionsCount,
  scenarioHasCodingModel
}) => {
  const {t} = useLucaTranslation()

  return (
    <OverviewCard
      customStyles={[
        styles.card(scenarioHasCodingModel, isFinalized),
        customStyles.overviewCard(isFinalized && !scenarioHasCodingModel)
      ]}
      onClick={navigateToCodingModels}
      headerText={t("scenario_details__settings_label_instructions")}
      text={t("scenario_details__settings_instructions_description")}
      footer={
        <CardFooter customStyles={styles.cardFooter}>
          <CardFooterItem
            customStyles={styles.cardFooterItem}
            icon={IconName.Calendar}
            text={`${dimensionsCount} ${t("scenario_details__settings_card_footer_label_dimensions")}`}
          />

          <CardFooterIcon isFinalized={isFinalized} />
        </CardFooter>
      }
    />
  )
}

const customStyles = {
  overviewCard: (isDisabled: boolean) =>
    css({
      pointerEvents: isDisabled ? "none" : "all"
    })
}
