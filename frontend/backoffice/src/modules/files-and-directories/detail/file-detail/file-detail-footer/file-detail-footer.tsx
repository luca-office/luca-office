import {css} from "@emotion/react"
import * as React from "react"
import {CustomSelect, Heading, SettingsFooterCard, Tooltip} from "shared/components"
import {FileType, HeadingLevel} from "shared/enums"
import {FileUpdate, Relevance} from "shared/graphql/generated/globalTypes"
import {File} from "shared/models"
import {
  cardBottomColor,
  Flex,
  flex0,
  flex1,
  fontColor,
  fontColorLight,
  FontWeight,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny
} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {getRelevanceCriteria} from "shared/utils"
import {InterventionSettingsCard} from "../../../../../components/intervention-setting-card/intervention-setting-card"

interface Props {
  readonly file: File
  readonly updateFile: (update: Partial<FileUpdate>) => void
  readonly disabled: boolean
  readonly interventionCount: number
  readonly tooltipTitleKey?: LucaI18nLangKey
  readonly onCreateInterventionClick: () => void
  readonly navigateToIntervention: () => void
}

export const FileDetailFooter: React.FC<Props> = ({
  file,
  updateFile,
  onCreateInterventionClick,
  navigateToIntervention,
  interventionCount,
  disabled,
  tooltipTitleKey = "files_and_directories__disabled_tooltip"
}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={[Flex.column, styles.content]}>
      <Heading fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
        {t("files_and_directories__file_detail_settings")}
      </Heading>
      <div css={[styles.cards, styles.cardsGrid]}>
        <SettingsFooterCard label={t("email__relevance_label")} text={t("email__relevance_text")}>
          <Tooltip title={t(tooltipTitleKey)} inactive={!disabled}>
            <CustomSelect
              disabled={disabled}
              optionList={getRelevanceCriteria(t)}
              customStyles={styles.dropdownWrapper}
              value={file.relevance}
              onChange={value => updateFile({relevance: value as Relevance})}
            />
          </Tooltip>
        </SettingsFooterCard>
        <InterventionSettingsCard
          disabled={disabled}
          customTextKey={
            file.fileType === FileType.Spreadsheet ? "files_and_directories__intervention_spreadsheet_info" : undefined
          }
          toolTipTitleKey={tooltipTitleKey}
          interventionsCount={interventionCount}
          navigateToIntervention={navigateToIntervention}
          onCreateClick={onCreateInterventionClick}
        />
      </div>
    </div>
  )
}

const styles = {
  content: css({
    padding: spacing(spacingSmall, spacingLarge, spacingMedium, spacingLarge),
    color: fontColor,
    backgroundColor: cardBottomColor,
    flex: flex0
  }),
  interventionWrapper: css(Flex.row, {
    flex: flex1,
    justifyContent: "space-between"
  }),
  cards: css({
    marginTop: spacingTiny
  }),
  cardsGrid: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: spacingMedium
  }),
  dropdownWrapper: css({
    width: "100%"
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  intervention: css({
    height: "initial",
    minHeight: "auto",
    flex: flex1,
    marginRight: spacingSmall
  }),
  interventionPlaceholder: css({
    color: fontColorLight
  })
}
