import * as React from "react"
import {RaterMode, RatingActionOption} from "../../../../../enums"
import {QuestionScoringType} from "../../../../../graphql/generated/globalTypes"
import {CodingCriterion, CodingItem, NoCriterionFulfilledConfig, ScenarioCodingItemRating} from "../../../../../models"
import {Option} from "../../../../../utils"
import {CriterionRatingTable} from "../../../common"
import {getScoringTypeIconName} from "../../../utils"
import {useScenarioManualRatingTable} from "./hooks/use-scenario-manual-rating-table"

export interface ScenarioManualRatingTableProps {
  readonly codingItem?: CodingItem
  readonly scenarioCodingItemRating: Option<ScenarioCodingItemRating>
  readonly scoringType: QuestionScoringType
  readonly codingCriteria: CodingCriterion[]
  readonly selectedRatingAction?: RatingActionOption
  readonly setSelectedRatingAction?: React.Dispatch<React.SetStateAction<RatingActionOption>>
  readonly performAction: (ratingAction: RatingActionOption) => void
  readonly mode: RaterMode
  readonly surveyId: UUID
  readonly participantFinishedModule: boolean
  readonly actionLoading?: boolean
  readonly isReadonly: boolean
  readonly ratingId: Option<UUID>
  readonly showDataForAllParticipants?: boolean
  readonly showRaterCount?: boolean
  readonly noCriterionFulfilledConfig?: NoCriterionFulfilledConfig
  readonly isNoCriterionFulfilledButtonVisible?: boolean
  readonly isRatingDetailActionElementVisible?: boolean
  readonly isScoringPreviewForParticipant?: boolean
  readonly selectedSurveyInvitationIdForFinalRating?: UUID
}

export const ScenarioManualRatingTable: React.FC<ScenarioManualRatingTableProps> = ({
  codingItem,
  scenarioCodingItemRating,
  scoringType,
  codingCriteria,
  selectedRatingAction,
  setSelectedRatingAction,
  performAction,
  mode,
  surveyId,
  participantFinishedModule,
  actionLoading: parentActionLoading = false,
  isReadonly,
  ratingId,
  showDataForAllParticipants = false,
  showRaterCount = true,
  noCriterionFulfilledConfig,
  isNoCriterionFulfilledButtonVisible,
  isRatingDetailActionElementVisible,
  isScoringPreviewForParticipant = false,
  selectedSurveyInvitationIdForFinalRating
}) => {
  const {
    actionLoading,
    noCriterionFulfilled,
    isSelected,
    updateCriterionSelection,
    setNoCriterionFulfilled,
    hasRatingChanged,
    applyRatingChanges
  } = useScenarioManualRatingTable({
    scenarioCodingItemRating,
    scoringType,
    codingCriteria,
    ratingId
  })

  const showAdditionalRaterInfos = !showDataForAllParticipants && !isScoringPreviewForParticipant

  const handleApplyRatingChanges = (ratingAction: RatingActionOption) =>
    applyRatingChanges().then(() => performAction(ratingAction))

  return (
    <CriterionRatingTable
      codingItem={codingItem}
      criteria={codingCriteria}
      scoringType={scoringType}
      isSelected={isSelected}
      updateCriterionSelection={updateCriterionSelection}
      noCriterionFulfilled={noCriterionFulfilled}
      setNoCriterionFulfilled={setNoCriterionFulfilled}
      actionLoading={actionLoading || parentActionLoading}
      hasRatingChanged={hasRatingChanged}
      applyRatingChanges={handleApplyRatingChanges}
      selectedRatingAction={selectedRatingAction}
      setSelectedRatingAction={setSelectedRatingAction}
      mode={mode}
      surveyId={surveyId}
      isScenario={true}
      readOnly={isReadonly || !participantFinishedModule}
      actionButtonTooltipKey={"rating__action_button_not_possible"}
      showNoCriterionFulfilledDescription={false}
      scoringTypeIcon={codingItem ? getScoringTypeIconName(codingItem.scoringType) : undefined}
      showSelectionInputsWhileReadonly={isReadonly}
      showRaterCount={showRaterCount}
      noCriterionFulfilledConfig={noCriterionFulfilledConfig}
      isNoCriterionFulfilledButtonVisible={isNoCriterionFulfilledButtonVisible}
      isRatingDetailActionElementVisible={isRatingDetailActionElementVisible}
      showDataForAllParticipants={showDataForAllParticipants}
      showSelectionInput={showAdditionalRaterInfos}
      showAdditionalRaterInfos={showAdditionalRaterInfos}
      useOnlyFinalScores={showDataForAllParticipants || isScoringPreviewForParticipant}
      showRaterPercentage={showDataForAllParticipants && !isScoringPreviewForParticipant}
      selectedSurveyInvitationIdForFinalRating={selectedSurveyInvitationIdForFinalRating}
    />
  )
}
