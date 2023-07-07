import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {RaterMode, RatingActionOption} from "../../../../enums"
import {NoCriterionFulfilledConfig, Scenario} from "../../../../models"
import {CustomStyle} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {Option} from "../../../../utils"
import {RatingDetailFooterProps, RatingDetailHeaderProps, RatingDetailView, RatingOverviewTable} from "../../common"
import {ScenarioAutomaticRatingTable, ScenarioManualRatingTable} from "../detail"
import {useRatingScenarioDetailView} from "./hooks/use-rating-scenario-detail-view"

export interface RatingScenarioDetailViewProps
  extends CustomStyle,
    RatingDetailHeaderProps,
    Required<Pick<RatingDetailFooterProps, "navigateToNextQuestion" | "navigateToPreviousQuestion">> {
  readonly customHeaderStyles?: CSSInterpolation
  readonly customFooterStyles?: CSSInterpolation
  readonly surveyInvitationId?: UUID
  readonly scenario: Scenario
  readonly selectedCodingEntityId?: UUID
  readonly navigateToEntity: (entityId: UUID) => void
  readonly ratingId: Option<UUID>
  readonly mode: RaterMode
  readonly surveyId: UUID
  readonly participantFinishedModule: boolean
  readonly isReadonly: boolean
  readonly isNotRatable: boolean
  readonly refreshData: () => void
  readonly hideParticipantNavigationButtons?: boolean
  readonly showAverageScore?: boolean
  readonly showDataForAllParticipants?: boolean
  readonly showRaterCount?: boolean
  readonly noCriterionFulfilledConfig?: NoCriterionFulfilledConfig
  readonly isNoCriterionFulfilledButtonVisible?: boolean
  readonly isRatingDetailActionElementVisible?: boolean
  readonly isScoringPreviewForParticipant?: boolean
}

export const RatingScenarioDetailView: React.FC<RatingScenarioDetailViewProps> = ({
  customStyles,
  customHeaderStyles,
  customFooterStyles,
  surveyInvitationId,
  scenario,
  selectedCodingEntityId,
  navigateToEntity,
  navigateToNextParticipant,
  navigateToPreviousParticipant,
  participantIndex,
  participantName,
  participantsCount,
  navigateToNextQuestion,
  navigateToPreviousQuestion,
  ratingId,
  mode,
  surveyId,
  participantFinishedModule,
  isReadonly,
  isNotRatable,
  refreshData: parentRefreshData,
  hideParticipantNavigationButtons,
  showAverageScore,
  showDataForAllParticipants = false,
  showRaterCount = true,
  noCriterionFulfilledConfig,
  isNoCriterionFulfilledButtonVisible,
  isRatingDetailActionElementVisible,
  isScoringPreviewForParticipant = false
}) => {
  const {t} = useLucaTranslation()

  const {
    dataLoading,
    selectedCodingDimension,
    selectedCodingItem,
    label,
    description,
    isOverviewPage,
    isAutomatedCodingItem,
    score,
    maxScore,
    backgroundIcon,
    overviewEntityName,
    overviewEntities,
    scenarioCodingItemRating,
    codingCriteria,
    automatedCodingCriteria,
    scoringType,
    selectedRatingAction,
    setSelectedRatingAction,
    refreshData,
    createScenarioCodingItemRatingLoading,
    isRatingInProgress,
    averageScore
  } = useRatingScenarioDetailView({
    scenario,
    selectedCodingEntityId,
    ratingId,
    surveyInvitationId,
    surveyId,
    showDataForAllParticipants
  })

  const performAction = (ratingAction: RatingActionOption) => {
    refreshData()
    parentRefreshData()

    switch (ratingAction) {
      case RatingActionOption.NextAttendee:
        navigateToNextParticipant()
        break
      case RatingActionOption.NextItem:
        navigateToNextQuestion()
    }
  }

  return (
    <RatingDetailView
      customStyles={customStyles}
      customHeaderStyles={customHeaderStyles}
      customFooterStyles={customFooterStyles}
      label={label}
      description={description}
      backgroundIcon={backgroundIcon.orUndefined()}
      navigateToNextParticipant={navigateToNextParticipant}
      navigateToPreviousParticipant={navigateToPreviousParticipant}
      participantIndex={participantIndex}
      participantName={
        showDataForAllParticipants
          ? t("reporting_scoring__scenario_details_header", {count: participantsCount})
          : participantName
      }
      participantsCount={participantsCount}
      score={score}
      maxScore={maxScore}
      navigateToNextQuestion={navigateToNextQuestion}
      navigateToPreviousQuestion={navigateToPreviousQuestion}
      isOverviewPage={isOverviewPage}
      requiresScoring={!isAutomatedCodingItem}
      participantFinishedModule={participantFinishedModule}
      isRatingInProgress={isRatingInProgress}
      isNotRatable={isNotRatable}
      loading={dataLoading}
      hideParticipantNavigationButtons={hideParticipantNavigationButtons}
      showAverageScore={showAverageScore}
      averageScore={averageScore}
      showDataForAllParticipants={showDataForAllParticipants}>
      {isOverviewPage ? (
        <RatingOverviewTable
          entities={overviewEntities}
          onClick={navigateToEntity}
          scoringName={
            showDataForAllParticipants || isScoringPreviewForParticipant
              ? t("reporting_scoring__scenario_details_overview_title")
              : t("rating_scenario__scoring_label")
          }
          entityName={overviewEntityName}
          enumerate={selectedCodingDimension.isDefined()}
          title={t("title")}
          isReadonly={isReadonly || !participantFinishedModule}
          isNotRatable={isNotRatable}
          showStatusIcons={!showDataForAllParticipants && !isScoringPreviewForParticipant}
          showAverageScore={showDataForAllParticipants || isScoringPreviewForParticipant}
        />
      ) : (
        selectedCodingItem
          .map(codingItem =>
            isAutomatedCodingItem ? (
              <ScenarioAutomaticRatingTable
                surveyInvitationId={surveyInvitationId}
                scenario={scenario}
                codingItem={codingItem}
                scenarioCodingItemRating={scenarioCodingItemRating}
                scoringType={scoringType}
                codingCriteria={automatedCodingCriteria}
                selectedRatingAction={selectedRatingAction}
                setSelectedRatingAction={setSelectedRatingAction}
                performAction={performAction}
                mode={mode}
                surveyId={surveyId}
                participantFinishedModule={participantFinishedModule}
                actionLoading={createScenarioCodingItemRatingLoading}
                isReadonly={isReadonly}
                ratingId={ratingId}
                showDataForAllParticipants={showDataForAllParticipants}
                showRaterCount={showRaterCount}
                noCriterionFulfilledConfig={noCriterionFulfilledConfig}
                isNoCriterionFulfilledButtonVisible={isNoCriterionFulfilledButtonVisible}
                isRatingDetailActionElementVisible={isRatingDetailActionElementVisible}
                isScoringPreviewForParticipant={isScoringPreviewForParticipant}
                selectedSurveyInvitationIdForFinalRating={surveyInvitationId}
              />
            ) : (
              <ScenarioManualRatingTable
                codingItem={codingItem}
                scenarioCodingItemRating={scenarioCodingItemRating}
                scoringType={scoringType}
                codingCriteria={codingCriteria}
                selectedRatingAction={selectedRatingAction}
                setSelectedRatingAction={setSelectedRatingAction}
                performAction={performAction}
                mode={mode}
                surveyId={surveyId}
                participantFinishedModule={participantFinishedModule}
                actionLoading={createScenarioCodingItemRatingLoading}
                isReadonly={isReadonly}
                ratingId={ratingId}
                showDataForAllParticipants={showDataForAllParticipants}
                showRaterCount={showRaterCount}
                noCriterionFulfilledConfig={noCriterionFulfilledConfig}
                isNoCriterionFulfilledButtonVisible={isNoCriterionFulfilledButtonVisible}
                isRatingDetailActionElementVisible={isRatingDetailActionElementVisible}
                isScoringPreviewForParticipant={isScoringPreviewForParticipant}
                selectedSurveyInvitationIdForFinalRating={surveyInvitationId}
              />
            )
          )
          .orNull()
      )}
    </RatingDetailView>
  )
}
