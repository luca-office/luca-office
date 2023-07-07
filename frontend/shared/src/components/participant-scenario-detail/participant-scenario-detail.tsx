import {round} from "lodash"
import * as React from "react"
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Heading,
  Icon,
  LoadingIndicator,
  ProgressBar,
  SelectableCard,
  Text,
  Tooltip
} from "../../components"
import {ButtonVariant, HeadingLevel, IconName, ScenarioState} from "../../enums"
import {Flex, FontWeight, spacingHuge, spacingMedium, TextSize} from "../../styles"
import {LucaTFunction, useLucaTranslation} from "../../translations"
import {roundNumber} from "../../utils"
import {useParticipantScenarioDetail} from "./hooks/use-participant-scenario-detail"
import {LabeledCard} from "./labeled-tag"
import {styles} from "./participant-scenario-detail.styles"

export interface ParticipantProgressConfig {
  readonly requiredDocumentsTotal: number
  readonly requiredDocumentsOpened: number
  readonly wordsInCompletionMailTotal: number
}

export interface ParticipantScenarioDetailProps {
  readonly onOpenChat?: () => void
  readonly moduleName: string
  readonly moduleDescription: string
  readonly scenarioState: ScenarioState
  readonly progressCountsConfig?: ParticipantProgressConfig
  readonly onShowDocumentsOverview?: () => void
  readonly onShowActivityAndToolUsage?: () => void
  readonly finalScore?: number
  readonly finalScoreAverage?: number
  readonly finalScoreMax?: number
  readonly onSetFinalScore?: () => void
  readonly showScoringOverlay: () => void
  readonly onNavigateBack: () => void
  readonly navigateBackLabel: string
  readonly chatMessageCount?: number
  readonly isLoading: boolean
  readonly isOfficeReporting?: boolean
  readonly isChatEnabled: boolean
  readonly renderScenarioSnapshotOverlay?: (hideScenarioSnapshotOverlay: () => void) => React.ReactNode
  readonly renderRuntimeSurveyResults?: () => React.ReactNode
  readonly disableFinalScoreButton: boolean
}

export const ParticipantScenarioDetail: React.FC<ParticipantScenarioDetailProps> = ({
  moduleDescription,
  moduleName,
  onOpenChat,
  onShowActivityAndToolUsage,
  onShowDocumentsOverview,
  progressCountsConfig,
  scenarioState,
  finalScore,
  finalScoreAverage,
  finalScoreMax,
  onSetFinalScore,
  showScoringOverlay,
  onNavigateBack,
  navigateBackLabel,
  chatMessageCount,
  isLoading,
  isOfficeReporting,
  isChatEnabled,
  renderScenarioSnapshotOverlay,
  renderRuntimeSurveyResults,
  disableFinalScoreButton
}) => {
  const {t} = useLucaTranslation()

  const {isScenarioSnapshotOverlayVisible, showScenarioSnapshotOverlay, hideScenarioSnapshotOverlay} =
    useParticipantScenarioDetail()

  return (
    <React.Fragment>
      <Card hasShadow={true}>
        <CardHeader hasShadow={true} hasGreyBackground={true} customStyles={styles.header}>
          <div onClick={onNavigateBack} css={styles.navigateBackButton}>
            <Icon customStyles={styles.backIcon} name={IconName.ArrowLeft} />
            <Heading level={HeadingLevel.h3}>{navigateBackLabel}</Heading>
          </div>
          <div css={styles.buttonWrapper(isChatEnabled)}>
            {isChatEnabled && !isOfficeReporting && (
              <Button customStyles={styles.button} icon={IconName.SpeechBubbles} onClick={onOpenChat}>
                {t("reporting_result__chat_messages_count", {count: chatMessageCount})}
              </Button>
            )}
            {!isOfficeReporting && (
              <Button customStyles={styles.button} icon={IconName.Monitor} onClick={showScenarioSnapshotOverlay}>
                {t("reporting_result__open_last_scenario_state")}
              </Button>
            )}
          </div>
        </CardHeader>
        {isLoading ? (
          <div css={styles.loadingIndicatorContainer}>
            <LoadingIndicator />
          </div>
        ) : (
          <CardContent customStyles={styles.content}>
            <div css={styles.description}>
              <div css={styles.module}>
                <div css={styles.moduleTitle}>
                  <Icon name={IconName.Monitor} width={spacingHuge} height={spacingHuge} />
                  <Heading level={HeadingLevel.h1}>{moduleName}</Heading>
                </div>
                {!isOfficeReporting && (
                  <Heading level={HeadingLevel.h1}>{getLabelForSurveyState(scenarioState, t)}</Heading>
                )}
              </div>
              <Text size={TextSize.Medium}>{moduleDescription}</Text>
            </div>
            <div css={styles.cardsContainer}>
              {(scenarioState === ScenarioState.ScoringCompleted || scenarioState === ScenarioState.Completed) && (
                <div>
                  <Text size={TextSize.Medium} customStyles={styles.label}>
                    {t(isOfficeReporting ? "rating_scenario__scoring_label" : "reporting_result__finalscore_label")}
                  </Text>
                  <Card customStyles={styles.finalScoreCard}>
                    <ProgressBar
                      progressInPercent={(100 / (finalScoreMax ?? 0)) * (finalScore ?? 0)}
                      verticalLinePositionInPercent={(100 / (finalScoreMax ?? 0)) * (finalScoreAverage ?? 0)}
                      customHeight={spacingMedium}
                    />
                    <div css={[Flex.row, {justifyContent: "space-between"}]}>
                      <div css={[{display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacingMedium}]}>
                        <LabeledCard label={t("reporting_result__max_finalscore_label")}>
                          <Text size={TextSize.Medium}>{finalScoreMax}</Text>
                        </LabeledCard>
                        <LabeledCard label={t("reporting_result__average_finalscore_label")}>
                          <Text size={TextSize.Medium}>{round(finalScoreAverage ?? 0, 2)}</Text>
                        </LabeledCard>
                      </div>
                      <LabeledCard
                        label={t(
                          isOfficeReporting
                            ? "reporting__overview_participant_score"
                            : "reporting_result__participant_finalscore_label"
                        )}>
                        <Text size={TextSize.Medium} customStyles={{fontWeight: FontWeight.Bold, textAlign: "right"}}>
                          {finalScore ?? 0}
                        </Text>
                      </LabeledCard>
                    </div>
                  </Card>
                </div>
              )}
              {progressCountsConfig !== undefined && (
                <div>
                  <Text size={TextSize.Medium} customStyles={styles.label}>
                    {t("reporting_result__scenario_progress_label")}
                  </Text>
                  <Card customStyles={styles.cardsGrid}>
                    <LabeledCard
                      label={t("reporting_result__opened_relevant_documents_label", {
                        count: progressCountsConfig.requiredDocumentsTotal
                      })}
                      customStyles={styles.documentsProgress}>
                      <Text
                        size={
                          TextSize.Medium
                        }>{`${progressCountsConfig.requiredDocumentsOpened}/${progressCountsConfig.requiredDocumentsTotal}`}</Text>
                      <ProgressBar
                        customStyles={[
                          styles.progressBar,
                          progressCountsConfig.requiredDocumentsOpened === progressCountsConfig.requiredDocumentsTotal
                            ? styles.progressBarComplete
                            : undefined
                        ]}
                        progressInPercent={roundNumber(
                          progressCountsConfig.requiredDocumentsOpened *
                            (100 / progressCountsConfig.requiredDocumentsTotal)
                        )}
                      />
                    </LabeledCard>

                    <LabeledCard label={t("reporting_result__words_in_completion_mail_label")}>
                      <Text size={TextSize.Medium}>
                        {t("reporting_result__words_in_completion_mail_total", {
                          count: progressCountsConfig.wordsInCompletionMailTotal
                        })}
                      </Text>
                    </LabeledCard>
                  </Card>
                </div>
              )}
              <div>
                <Text size={TextSize.Medium} customStyles={styles.label}>
                  {t("reporting_result__result_label")}
                </Text>
                <Card customStyles={styles.cardsGrid}>
                  {!isOfficeReporting && (
                    <>
                      <SelectableCard
                        title={t("reporting_result__documents_overview_label")}
                        text={t("reporting_result__documents_overview_description")}
                        iconName={IconName.File}
                        customContent={
                          <div css={styles.cardButtonContainer}>
                            <Button customStyles={styles.textButton} onClick={onShowDocumentsOverview}>
                              {t("reporting_result__view_button_label")}
                            </Button>
                          </div>
                        }
                      />
                      <SelectableCard
                        title={t("reporting_result__activity_and_tool_usage_label")}
                        text={t("reporting_result__activity_and_tool_usage_description")}
                        iconName={IconName.Diagram}
                        customContent={
                          <div css={styles.cardButtonContainer}>
                            <Button customStyles={styles.textButton} onClick={onShowActivityAndToolUsage}>
                              {t("reporting_result__view_button_label")}
                            </Button>
                          </div>
                        }
                      />
                    </>
                  )}

                  <SelectableCard
                    title={t("reporting_result__finalscore_label")}
                    text={t("reporting_result__finalscore_description")}
                    iconName={IconName.PaperComplete}
                    customContent={
                      <div css={styles.finalScoreCardButtonContainer}>
                        <div>
                          <Text size={TextSize.Medium} customStyles={styles.finalScoreLabel}>
                            {t("reporting_result__finalscore_count_label")}
                          </Text>
                          <Text size={TextSize.Medium}>
                            {scenarioState === ScenarioState.ScoringCompleted ||
                            scenarioState === ScenarioState.Completed ||
                            scenarioState === ScenarioState.ScoringFinalized
                              ? t("reporting_result__finalscore_count", {
                                  finalScore: finalScore ?? 0,
                                  finalScoreMax: finalScoreMax ?? 0
                                })
                              : t("reporting_result__finalscore_not_set")}
                          </Text>
                        </div>
                        {scenarioState === ScenarioState.Completed ||
                        scenarioState === ScenarioState.ScoringFinalized ? (
                          <Button
                            disabled={disableFinalScoreButton}
                            customStyles={[styles.textButton, styles.finalScoreButton]}
                            onClick={showScoringOverlay}>
                            {t("reporting_result__view_button_label")}
                          </Button>
                        ) : (
                          <Tooltip title={t("reporting_result__finalscore_edit_tooltip")}>
                            <Button
                              customStyles={styles.finalScoreButton}
                              disabled={scenarioState === ScenarioState.InProgress}
                              variant={ButtonVariant.IconOnly}
                              icon={IconName.PaperComplete}
                              onClick={onSetFinalScore}
                            />
                          </Tooltip>
                        )}
                      </div>
                    }
                  />
                </Card>
              </div>
              {renderRuntimeSurveyResults?.()}
            </div>
          </CardContent>
        )}
        <CardFooter customStyles={styles.footer} />
      </Card>

      {renderScenarioSnapshotOverlay !== undefined &&
        isScenarioSnapshotOverlayVisible &&
        renderScenarioSnapshotOverlay(hideScenarioSnapshotOverlay)}
    </React.Fragment>
  )
}

const getLabelForSurveyState = (state: ScenarioState, t: LucaTFunction) => {
  switch (state) {
    case ScenarioState.InProgress:
      return t("reporting_result__scenario_state_in_progress_label")
    case ScenarioState.Completed:
      return t("reporting_result__scenario_state_completed_label")
    case ScenarioState.ScoringCompleted:
      return t("reporting_result__scenario_state_scoring_completed_label")
    case ScenarioState.ScoringFinalized:
    default:
      return ""
  }
}
