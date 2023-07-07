import {css} from "@emotion/react"
import * as React from "react"
import {CardFooter, CustomSelect, SettingsFooterCard} from "shared/components"
import {Relevance} from "shared/graphql/generated/globalTypes"
import {File} from "shared/models"
import {boxHeightMedium, Flex, fontColorLight, FontWeight, spacingMedium, spacingTiny} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {InterventionSettingsCard} from "../../../../../components/intervention-setting-card/intervention-setting-card"
import {CreateFileOpeningInterventionModalContainer} from "../../../../scenario-interventions"
import {useFileDetailFooter} from "./hooks/use-file-detail-footer"

export interface FileDetailFooterProps {
  readonly scenarioId: UUID
  readonly file: File
  readonly disabled?: boolean
  readonly isScenarioPublished: boolean
}

export const FileDetailFooter: React.FC<FileDetailFooterProps> = ({
  disabled,
  scenarioId,
  isScenarioPublished,
  file
}) => {
  const {t} = useLucaTranslation()

  const {
    interventionCount,
    isCreateInterventionModalVisible,
    navigateToIntervention,
    onCreateInterventionClick,
    relevanceOptions,
    scenarioDurationInSeconds,
    scenarioSampleCompanyFile,
    toggleIsCreateInterventionModalVisible,
    updateRelevance
  } = useFileDetailFooter(scenarioId, file.id)

  return (
    <CardFooter customStyles={styles.fileDetailFooter}>
      <div css={styles.label}>{`${t("sample_companies__detail_settings_scenario_label")}:`}</div>
      <div css={styles.cards}>
        <SettingsFooterCard
          customStyles={styles.settingsFooterCard}
          label={t("scenario_sample_companies__settings_relevance_label")}
          text={t("scenario_sample_companies__settings_relevance_description")}>
          <CustomSelect
            optionList={relevanceOptions}
            customStyles={styles.relevanceSelection}
            value={scenarioSampleCompanyFile.map(({relevance}) => relevance).getOrElse(Relevance.Irrelevant)}
            disabled={disabled || isScenarioPublished}
            onChange={value => updateRelevance(value as Relevance)}
          />
        </SettingsFooterCard>
        <InterventionSettingsCard
          disabled={isScenarioPublished}
          interventionsCount={interventionCount}
          navigateToIntervention={navigateToIntervention}
          onCreateClick={onCreateInterventionClick}
        />
      </div>
      {isCreateInterventionModalVisible && (
        <CreateFileOpeningInterventionModalContainer
          scenarioMaxDurationInSeconds={scenarioDurationInSeconds}
          scenarioId={scenarioId}
          file={file}
          onDismiss={toggleIsCreateInterventionModalVisible}
        />
      )}
    </CardFooter>
  )
}

const styles = {
  fileDetailFooter: css(Flex.column, {
    minHeight: boxHeightMedium,
    height: "initial"
  }),
  label: css({
    fontWeight: FontWeight.Bold,
    letterSpacing: 0.15
  }),
  cards: css({
    marginTop: spacingTiny,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: spacingMedium
  }),
  relevanceSelection: css({
    width: "100%"
  }),
  intervention: css({
    height: "initial",
    minHeight: "auto"
  }),
  interventionPlaceholder: css({
    color: fontColorLight
  }),
  settingsFooterCard: css({
    flexGrow: 1,
    justifyContent: "space-between"
  })
}
