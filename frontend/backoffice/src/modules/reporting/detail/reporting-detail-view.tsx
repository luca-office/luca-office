import {css} from "@emotion/react"
import React, {useState} from "react"
import {Button, Heading, Icon, Label, Overlay, OverviewCard, ReportingProgressInfo, Text} from "shared/components"
import {getScenarioOrQuestionnaireDurationInSeconds} from "shared/components/desktop/config"
import {DetailEventsTable} from "shared/components/detail-events-table/detail-events-table"
import {HeadingLevel, IconName} from "shared/enums"
import {ScenarioInfo} from "shared/graphql/hooks"
import {
  CompletedParticipantCount,
  ProjectModuleResults,
  Questionnaire,
  RuntimeSurveyResults,
  Scenario,
  ScenarioQuestionnaire,
  SurveyEvent
} from "shared/models"
import {
  backgroundColorLight,
  borderRadius,
  boxHeightSmall,
  Flex,
  FontWeight,
  insetShadow,
  primaryColor,
  spacingHuge,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option, roundNumber} from "shared/utils"
import {AllParticipantsActivityOverviewContainer} from "../activity-overview/all-participants-activity-overview-container"
import {ReportingParticipantsTable} from "../common/participants-table/reporting-participants-table"
import {QuestionnaireResults} from "../questionnaire-results/questionnaire-results"
import {ReportingQuestionnaireAllParticipantsOverlayContainer} from "../reporting-questionnaire-overlay-all-participants/reporting-questionnaire-all-participants-overlay-container"
import {ReportingScenarioAllParticipantsOverlayContainer} from "../reporting-scenario-overlay-all-participants/reporting-scenario-all-participants-overlay-container"

interface ReportingDetailViewProps {
  readonly activeProjectModuleResult: ProjectModuleResults
  readonly correspondingScenarioOrQuestionnaire: Scenario | Questionnaire
  readonly runtimeSurveyResults: Array<RuntimeSurveyResults>
  readonly scenarioQuestionnaires: Array<ScenarioQuestionnaire>
  readonly scenarioInfo: Option<ScenarioInfo>
  readonly setIsScoringOverlayVisible: (isVisible: boolean) => void
  readonly isScoringOverlayVisible: boolean
  readonly completedParticipantsCount: CompletedParticipantCount
  readonly navigateToParticipantOverview: (surveyInvitationId: UUID) => void
  readonly surveyId: UUID
  readonly participantTokenForPlayerResults?: string
  readonly surveyEvents: SurveyEvent[]
  readonly disableFinalScoreButton: boolean
}

export const ReportingDetailView: React.FC<ReportingDetailViewProps> = ({
  activeProjectModuleResult,
  correspondingScenarioOrQuestionnaire,
  runtimeSurveyResults,
  scenarioQuestionnaires,
  scenarioInfo,
  setIsScoringOverlayVisible,
  isScoringOverlayVisible,
  completedParticipantsCount,
  navigateToParticipantOverview,
  surveyId,
  participantTokenForPlayerResults,
  surveyEvents,
  disableFinalScoreButton
}) => {
  const {t} = useLucaTranslation()
  const [isEventResultsOverlayVisible, setIsEventResultsOverlayVisible] = useState(false)
  const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState<UUID>()
  const [showActivityAndTools, setShowActivityAndTools] = React.useState(false)

  const isPlayerResultsView = participantTokenForPlayerResults !== undefined
  const isQuestionnaire = correspondingScenarioOrQuestionnaire.__typename === "Questionnaire"
  const isEventsTableVisible = !isQuestionnaire && scenarioQuestionnaires.length > 0 && scenarioInfo.isDefined()

  const {averageScore, maximumScore, participantResults} = activeProjectModuleResult

  const title =
    correspondingScenarioOrQuestionnaire.__typename === "Questionnaire"
      ? correspondingScenarioOrQuestionnaire.title
      : correspondingScenarioOrQuestionnaire.name

  const onShowEventResults = (questionnaireId: UUID) => {
    setSelectedQuestionnaireId(questionnaireId)
    setIsEventResultsOverlayVisible(true)
  }

  return (
    <div>
      <div css={Flex.row}>
        <Icon
          width={boxHeightSmall}
          height={boxHeightSmall}
          name={isQuestionnaire ? IconName.Questionnaire : IconName.Monitor}
        />
        <Heading customStyles={styles.heading} level={HeadingLevel.h1}>
          {title}
        </Heading>
      </div>
      <Text customStyles={styles.description}>{correspondingScenarioOrQuestionnaire.description}</Text>
      <ReportingProgressInfo
        maximumScore={maximumScore}
        averageScore={averageScore}
        completedParticipantsCount={completedParticipantsCount}
      />
      <Label customStyles={styles.resultsLabel} label={t("reporting_overview_detail_view_results")} />
      <div css={styles.results}>
        {!isQuestionnaire && (
          <OverviewCard
            onClick={() => setShowActivityAndTools(true)}
            headerIcon={IconName.Diagram}
            noAnimationOnHover={true}
            footer={
              <Heading
                customStyles={styles.resultFooterButton}
                fontWeight={FontWeight.Bold}
                level={HeadingLevel.h3}
                color="primary">
                {t("show_button")}
              </Heading>
            }
            text={t("reporting_overview_detail_view_activity_and_toolusage_description")}
            headerText={t("reporting_overview_detail_view_activity_and_toolusage")}
          />
        )}
        <OverviewCard
          headerIcon={IconName.ProgressCheck}
          noAnimationOnHover={true}
          footer={
            <div css={styles.finalScoreWrapper}>
              <div>
                <Label label={t("reporting_overview_reached_points")} />
                <Text size={TextSize.Medium}>{`${roundNumber(averageScore ?? 0)} ${t("common_of")} ${maximumScore} ${t(
                  "rating__scoring_unit"
                )}`}</Text>
              </div>
              <Button
                disabled={disableFinalScoreButton}
                customStyles={styles.textButton}
                onClick={() => setIsScoringOverlayVisible(true)}>
                {t("reporting_result__view_button_label")}
              </Button>
            </div>
          }
          text={t("reporting_overview_detail_view_final_score_description")}
          headerText={t("reporting_overview_detail_view_final_score")}
        />
      </div>

      {isEventsTableVisible && (
        <>
          <Label
            customStyles={styles.resultsLabel}
            label={`${t("events__filter_title")} (${scenarioQuestionnaires.length})`}
          />
          <DetailEventsTable
            runtimeSurveyResults={runtimeSurveyResults}
            scenarioQuestionnaires={scenarioQuestionnaires}
            totalParticipants={participantResults.length}
            onShowResults={onShowEventResults}
          />
        </>
      )}
      <Label
        customStyles={styles.resultsLabel}
        label={t("reporting_overview_detail_view_participants_list", {
          count: participantResults.length
        })}
      />

      {!isPlayerResultsView && (
        <ReportingParticipantsTable
          maximumScore={maximumScore}
          averageScore={averageScore}
          participantResults={participantResults}
          navigateToParticipantOverview={navigateToParticipantOverview}
        />
      )}

      {isScoringOverlayVisible &&
        (isQuestionnaire ? (
          <ReportingQuestionnaireAllParticipantsOverlayContainer
            surveyId={surveyId}
            questionnaireId={correspondingScenarioOrQuestionnaire.id}
            onClose={() => setIsScoringOverlayVisible(false)}
          />
        ) : (
          <ReportingScenarioAllParticipantsOverlayContainer
            surveyId={surveyId}
            onCloseOverlay={() => setIsScoringOverlayVisible(false)}
            scenarioId={correspondingScenarioOrQuestionnaire.id}
          />
        ))}

      {isEventResultsOverlayVisible &&
        scenarioInfo
          .map(info => (
            <Overlay>
              <QuestionnaireResults
                onClose={() => setIsEventResultsOverlayVisible(false)}
                questionnaires={scenarioQuestionnaires}
                results={runtimeSurveyResults}
                selectedQuestionnaireId={Option.of(selectedQuestionnaireId)}
                scenarioInfo={info}
                surveyId={surveyId}
              />
            </Overlay>
          ))
          .orNull()}
      {showActivityAndTools &&
        correspondingScenarioOrQuestionnaire.__typename === "Scenario" &&
        scenarioInfo
          .map(info => (
            <Overlay>
              <AllParticipantsActivityOverviewContainer
                scenarioId={correspondingScenarioOrQuestionnaire.id}
                surveyEvents={surveyEvents}
                endTime={getScenarioOrQuestionnaireDurationInSeconds(
                  correspondingScenarioOrQuestionnaire.maxDurationInSeconds
                )}
                onClose={() => setShowActivityAndTools(false)}
                participantCount={info.participantCount}
              />
            </Overlay>
          ))
          .orNull()}
    </div>
  )
}

const styles = {
  heading: css({
    marginLeft: spacingSmall
  }),
  description: css({
    marginTop: spacingLarge,
    marginBottom: spacingLarge
  }),
  results: css({
    padding: spacingMedium,
    boxShadow: insetShadow,
    borderRadius: borderRadius,
    backgroundColor: backgroundColorLight,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: spacingMedium
  }),
  resultsLabel: css({
    marginTop: spacingMedium
  }),
  resultFooterButton: css({
    padding: spacingMedium,
    paddingBottom: spacingHuge,
    textAlign: "right"
  }),
  finalScoreWrapper: css(Flex.row, {
    padding: spacingMedium,
    paddingTop: 0,
    justifyContent: "space-between"
  }),
  textButton: css({
    fontWeight: FontWeight.Bold,
    color: primaryColor,
    width: "initial",
    height: "initial",

    "&, &:disabled": {
      background: "initial"
    }
  })
}
