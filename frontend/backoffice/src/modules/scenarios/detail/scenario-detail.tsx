import {noop} from "lodash-es"
import * as React from "react"
import {
  Card,
  CardFooter,
  CardHeader,
  DetailViewHeader,
  DetailViewHeaderButtonConfig,
  DetailViewHeaderDeleteOrArchiveButtonConfig,
  LoadingIndicator,
  WarningTooltipConfig
} from "shared/components"
import {IconName} from "shared/enums"
import {ScoringType} from "shared/graphql/generated/globalTypes"
import {useArchiveScenario, useDeleteScenario} from "shared/graphql/hooks"
import {cardDecorativeBorder, Flex} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {ScenarioDetailFooter} from "./footer/scenario-detail-footer"
import {useScenarioDetail} from "./hooks/use-scenario-detail"
import {InformationContainer} from "./information/information-container"
import {scenarioDetailStyles as styles} from "./scenario-detail.style"
import {ScenarioSettings} from "./settings/scenario-settings"

export interface ScenarioDetailViewProps {
  readonly scenarioId: UUID
}

export const ScenarioDetail: React.FC<ScenarioDetailViewProps> = ({scenarioId}) => {
  const {t} = useLucaTranslation()
  const {
    canBeDuplicated,
    canBeFinalized,
    codingModelConfig,
    duplicateScenario,
    duplicateScenarioLoading,
    finalizeScenario,
    isFinalized,
    isPublished,
    isFinalizeScenarioLoading,
    isPublishScenarioLoading,
    navigateToCodingModels,
    navigateToEmails,
    navigateToEvents,
    navigateToFilesAndDirectories,
    navigateToOverview,
    navigateToPreview,
    navigateToReferenceBookChapters,
    navigateToSampleCompaniesSelection,
    navigateToInterventions,
    publishScenario,
    scenario: scenarioOption,
    scenarioContributorsCount,
    scenarioLoading,
    settingsCounts,
    updateInProgress,
    updateScenario,
    userMayFinalizeWithoutPublishing,
    userMayArchive
  } = useScenarioDetail({
    scenarioId
  })

  const {
    hasDimensionWithoutItem,
    hasHolisticItemsWithLessThanTwoCriteria,
    hasItemsWithoutCriteria,
    hasNoDimension
  } = codingModelConfig

  const isReadOnly = isFinalized || isPublished
  const hasIntroductionMail = scenarioOption.exists(scenario => scenario.introductionEmailId !== null)
  const hasDuration = scenarioOption.exists(scenario => scenario.maxDurationInSeconds !== null)
  const showSecondOperationButton = userMayFinalizeWithoutPublishing && !isPublished

  const deleteOrArchiveButtonConfig: DetailViewHeaderDeleteOrArchiveButtonConfig = {
    deleteHook: !isReadOnly ? useDeleteScenario : undefined,
    archiveHook: isReadOnly ? useArchiveScenario : undefined,
    entityId: scenarioId,
    onSuccess: navigateToOverview,
    invisible: isReadOnly && !userMayArchive
  }

  const loader = (
    <div css={styles.placeholderGeneral}>
      <LoadingIndicator />
    </div>
  )

  const getOperationButtonConfig = (): DetailViewHeaderButtonConfig => {
    const tooltipWarningConfig = getTooltipWarningConfig(hasIntroductionMail, hasDuration)

    if (isReadOnly) {
      return {
        labelKey: "scenario_details__header_button_duplicate",
        onClick: duplicateScenario,
        disabled: !canBeDuplicated,
        icon: IconName.Duplicate
      }
    } else {
      return {
        labelKey: "scenario_details__header_button_publish",
        onClick: canBeFinalized ? publishScenario : noop,
        icon: IconName.Publish,
        disabled: !canBeFinalized,
        orlyConfirmKey: "scenario_details__header_orly_publish_button",
        orlyTextKey: "scenario_details__header_orly_publish_text",
        orlyTitleKey: "scenario_details__header_orly_publish_title",
        tooltipConfig: {
          labelKey: canBeFinalized ? "scenario_details__header_button_publish_tooltip" : undefined,
          warningConfig: !canBeFinalized ? tooltipWarningConfig : undefined
        }
      }
    }
  }

  const getSecondOperationButtonConfig = (): DetailViewHeaderButtonConfig => {
    const tooltipWarningConfig = getTooltipWarningConfig(hasIntroductionMail, hasDuration)
    if (isFinalized) {
      return {
        labelKey: "scenario_details__header_button_publish",
        onClick: publishScenario,
        icon: IconName.Publish,
        orlyConfirmKey: "scenario_details__header_orly_publish_button",
        orlyTextKey: "scenario_details__header_orly_publish_text",
        orlyTitleKey: "scenario_details__header_orly_publish_title",
        tooltipConfig: {labelKey: "scenario_details__header_button_publish_tooltip"}
      }
    } else {
      return {
        labelKey: "scenario_details__header_button_finalize",
        onClick: finalizeScenario,
        icon: IconName.LockOpen,
        orlyConfirmKey: "scenario_details__header_orly_finalize_button",
        orlyTextKey: "scenario_details__header_orly_finalize_text",
        orlyTitleKey: "scenario_details__header_orly_finalize_title",
        disabled: !canBeFinalized,
        tooltipConfig: {
          labelKey: "scenario_details__header_button_finalize_tooltip",
          warningConfig: !canBeFinalized ? tooltipWarningConfig : undefined
        }
      }
    }
  }

  const getTooltipWarningConfig = (scenarioHasIntroductionMail: boolean, scenarioHasDuration: boolean) => {
    const tooltipWarningConfig: WarningTooltipConfig[] = []
    const scenarioHasCodingModelAssigned = scenarioOption.exists(scenario => scenario.codingModel !== null)

    if (!scenarioHasIntroductionMail) {
      tooltipWarningConfig.push({label: t("scenario_details__header_tooltip_missing_mail")})
    }

    if (!scenarioHasDuration) {
      tooltipWarningConfig.push({label: t("scenario_details__header_tooltip_missing_time")})
    }

    if (scenarioHasCodingModelAssigned) {
      if (hasNoDimension) {
        tooltipWarningConfig.push({label: t("scenario_details__header_tooltip_missing_dimension")})
      }
      if (hasDimensionWithoutItem) {
        tooltipWarningConfig.push({label: t("scenario_details__header_tooltip_missing_item")})
      }
      if (hasItemsWithoutCriteria) {
        tooltipWarningConfig.push({label: t("scenario_details__header_tooltip_missing_criteria")})
      }
      if (hasHolisticItemsWithLessThanTwoCriteria) {
        tooltipWarningConfig.push({label: t("scenario_details__header_tooltip_missing_criteria_holistic")})
      }
    }

    return tooltipWarningConfig
  }

  return (
    <div css={[Flex.column, styles.wrapper]}>
      <DetailViewHeader
        customStyles={styles.detailViewHeader}
        labelKey={"scenario_details__header_label"}
        navigationButtonConfig={{
          labelKey: "scenario_details__header_navigate_back_label",
          onClick: navigateToOverview
        }}
        {...(!scenarioLoading && {
          operationButtonConfig: getOperationButtonConfig(),
          secondOperationButtonConfig: showSecondOperationButton ? getSecondOperationButtonConfig() : undefined,
          deleteOrArchiveButtonConfig: deleteOrArchiveButtonConfig
        })}
      />
      {scenarioLoading
        ? loader
        : scenarioOption
            .map(scenario => (
              <>
                <Card customStyles={styles.card}>
                  <CardHeader hasShadow={true} hasGreyBackground={true} customStyles={cardDecorativeBorder} />
                  <div css={[Flex.column, styles.content]}>
                    <InformationContainer
                      scenario={scenario}
                      scenarioContributorsCount={scenarioContributorsCount}
                      updateInProgress={updateInProgress}
                      isFinalizeScenarioLoading={isFinalizeScenarioLoading}
                      isPublishScenarioLoading={isPublishScenarioLoading}
                      duplicateScenarioLoading={duplicateScenarioLoading}
                      updateScenario={updateScenario}
                      readonly={isReadOnly}
                    />
                    <ScenarioSettings
                      scenario={scenario}
                      customStyles={styles.settings}
                      isReadOnly={isReadOnly}
                      navigateToEmails={navigateToEmails}
                      navigateToSampleCompaniesSelection={navigateToSampleCompaniesSelection}
                      navigateToFilesAndDirectories={navigateToFilesAndDirectories}
                      navigateToReferenceBookChapters={navigateToReferenceBookChapters}
                      navigateToCodingModels={navigateToCodingModels}
                      navigateToInterventions={navigateToInterventions}
                      navigateToEvents={navigateToEvents}
                      settingsCount={settingsCounts}
                    />
                  </div>
                  <CardFooter customStyles={styles.cardFooter} />
                </Card>
                <ScenarioDetailFooter
                  createdAt={scenario.createdAt}
                  author={scenario.author}
                  openPreview={navigateToPreview}
                />
              </>
            ))
            .getOrElse(
              <div css={[styles.placeholderGeneral, styles.placeholder]}>
                {t("scenario_details__placeholder_not_found")}.
              </div>
            )}
    </div>
  )
}
