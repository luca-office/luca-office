import * as React from "react"
import {CardFooter, CardFooterItem, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {useLucaTranslation} from "shared/translations"
import {SettingsHeaderIcons} from "../header-icons/settings-header-icons"
import {settingStyles as styles} from "../scenario-settings.style"
import {CardFooterIcon} from "./card-footer/card-footer-icon"

interface Props {
  readonly directoriesCount: number
  readonly filesCount: number
  readonly isFinalized: boolean
  readonly navigateToFilesAndDirectories: () => void
}

export const FilesAndFolderCard: React.FC<Props> = ({
  directoriesCount,
  filesCount,
  isFinalized,
  navigateToFilesAndDirectories
}) => {
  const {t} = useLucaTranslation()

  return (
    <OverviewCard
      customStyles={styles.card(!!directoriesCount || !!filesCount, isFinalized)}
      onClick={navigateToFilesAndDirectories}
      headerText={t("scenario_details__settings_label_files_and_directories")}
      headerInfo={<SettingsHeaderIcons />}
      text={t("scenario_details__settings_files_and_directories_description")}
      footer={
        <CardFooter customStyles={styles.cardFooter}>
          <CardFooterItem
            customStyles={styles.cardFooterItem}
            icon={IconName.Folder}
            text={`${directoriesCount} ${t("scenario_details__settings_card_footer_label_directories")}`}
          />
          <CardFooterItem
            customStyles={styles.cardFooterItem}
            icon={IconName.File}
            text={`${t("scenario_details__settings_card_footer_label_files", {filesCount: filesCount})}`}
          />
          <CardFooterIcon isFinalized={isFinalized} />
        </CardFooter>
      }
    />
  )
}
