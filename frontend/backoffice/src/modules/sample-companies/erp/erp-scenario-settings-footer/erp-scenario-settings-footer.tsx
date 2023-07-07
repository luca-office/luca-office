import {css} from "@emotion/react"
import * as React from "react"
import {Button, Text} from "shared/components"
import {ReadonlyActionField} from "shared/components/readonly-action-field/readonly-action-field"
import {CustomSelect} from "shared/components/select/custom-select"
import {SettingsFooterCard} from "shared/components/settings-footer-card/settings-footer-card"
import {Heading} from "shared/components/typography/typography"
import {ButtonVariant, ErpType, HeadingLevel, IconName} from "shared/enums"
import {Relevance} from "shared/graphql/generated/globalTypes"
import {ScenarioErpEntitySelector} from "shared/models"
import {
  borderRadiusLarge,
  cardBottomColor,
  Flex,
  fontColorLight,
  FontWeight,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getRelevanceCriteria} from "shared/utils"
import {CreateErpRowOpeningInterventionModalContainer} from "../../../scenario-interventions"
import {useErpScenarioSettingsFooter} from "./hooks/use-erp-scenario-settings-footer"

export interface ErpScenarioSettingsFooterProps {
  readonly scenarioId: UUID
  readonly sampleCompanyId: UUID
  readonly type: ErpType
  readonly scenarioErpSelector: ScenarioErpEntitySelector
  readonly erpRowId: number
  readonly scenarioMaxDurationInSeconds: number
  readonly interventionsCount: number
  readonly disableInterventionCreation: boolean
}

export const ErpScenarioSettingsFooter: React.FC<ErpScenarioSettingsFooterProps> = ({
  scenarioId,
  sampleCompanyId,
  type,
  erpRowId,
  scenarioErpSelector,
  scenarioMaxDurationInSeconds,
  interventionsCount,
  disableInterventionCreation
}) => {
  const {t} = useLucaTranslation()

  const {
    dataLoading,
    actionLoading,
    scenarioErpEntity,
    isCreateInterventionModalVisible,
    toggleIsCreateInterventionModalVisible,
    onRelevanceUpdate
  } = useErpScenarioSettingsFooter({
    scenarioId,
    sampleCompanyId,
    type,
    selector: scenarioErpSelector
  })

  return (
    <div css={styles.footer}>
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("scenario_setting__header_label")}:
      </Heading>
      <div css={styles.footerContent}>
        <SettingsFooterCard label={t("scenario_setting__relevance_label")}>
          <CustomSelect
            customStyles={styles.relevanceDropdown}
            optionList={getRelevanceCriteria(t)}
            value={scenarioErpEntity.map(({relevance}) => `${relevance}`).getOrElse("")}
            onChange={value => onRelevanceUpdate(value as Relevance)}
            disabled={dataLoading || actionLoading}
          />
        </SettingsFooterCard>

        <SettingsFooterCard label={t("scenario_setting__intervention_label")}>
          <ReadonlyActionField
            customStyles={styles.intervention}
            renderValue={() => (
              <div css={styles.interventionCount}>
                {interventionsCount > 0 ? (
                  <Text size={TextSize.Medium}>
                    {t(
                      interventionsCount === 1
                        ? "scenario_setting__intervention_count_single"
                        : "scenario_setting__intervention_count_multiple",
                      {interventionsCount}
                    )}
                  </Text>
                ) : (
                  <Text size={TextSize.Medium} customStyles={styles.interventionPlaceholder}>
                    {t("scenario_setting__intervention_placeholder")}
                  </Text>
                )}
                <Button
                  variant={ButtonVariant.IconOnly}
                  onClick={toggleIsCreateInterventionModalVisible}
                  icon={IconName.Add}
                  disabled={disableInterventionCreation}
                />
              </div>
            )}
          />
        </SettingsFooterCard>

        {isCreateInterventionModalVisible && (
          <CreateErpRowOpeningInterventionModalContainer
            erpRowId={erpRowId}
            erpTableType={type}
            sampleCompanyId={sampleCompanyId}
            scenarioMaxDurationInSeconds={scenarioMaxDurationInSeconds}
            scenarioId={scenarioId}
            onDismiss={toggleIsCreateInterventionModalVisible}
          />
        )}
      </div>
    </div>
  )
}

const styles = {
  footer: css({
    display: "grid",
    gridRowGap: spacingTiny,
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    backgroundColor: cardBottomColor,
    borderBottomLeftRadius: borderRadiusLarge,
    borderBottomRightRadius: borderRadiusLarge,
    padding: spacing(spacingSmall, spacingLarge, spacingMedium, spacingLarge)
  }),
  footerContent: css({
    display: "grid",
    gridColumnGap: spacingMedium,
    gridTemplateColumns: "1fr 1fr"
  }),
  relevanceDropdown: css({
    width: "100%"
  }),
  intervention: css({
    height: "initial",
    minHeight: "auto",
    cursor: "initial"
  }),
  interventionCount: css(Flex.row, {
    justifyContent: "space-between"
  }),
  interventionPlaceholder: css({
    color: fontColorLight
  })
}
