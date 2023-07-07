import * as React from "react"
import {RaterMode, RatingActionOption} from "../../../../../enums"
import {QuestionScoringType} from "../../../../../graphql/generated/globalTypes"
import {
  AutomatedCodingCriterion,
  CodingItem,
  NoCriterionFulfilledConfig,
  Scenario,
  ScenarioCodingItemRating
} from "../../../../../models"
import {Option} from "../../../../../utils"
import {CriterionRatingTable} from "../../../common"
import {getScoringTypeIconName} from "../../../utils"
import {useScenarioAutomaticRatingTable} from "./hooks/use-scenario-automatic-rating-table"

export interface ScenarioAutomaticRatingTableProps {
  readonly surveyInvitationId?: UUID
  readonly scenario: Scenario
  readonly codingItem?: CodingItem
  readonly scenarioCodingItemRating: Option<ScenarioCodingItemRating>
  readonly scoringType: QuestionScoringType
  readonly codingCriteria: AutomatedCodingCriterion[]
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

export const ScenarioAutomaticRatingTable: React.FC<ScenarioAutomaticRatingTableProps> = ({
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
  surveyInvitationId,
  scenario,
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
    updateCriterionSelection,
    applyRatingChanges,
    isSelected,
    hasRatingChanged,
    dataLoading,
    isComputerRaterSelection,
    setNoCriterionFulfilled,
    noCriterionFulfilled,
    wasNoCriterionFulfilledByComputerRater
  } = useScenarioAutomaticRatingTable({
    scenarioCodingItemRating,
    scoringType,
    codingItem,
    surveyInvitationId,
    scenario,
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
      noCriterionFulfilled={noCriterionFulfilled}
      actionLoading={actionLoading || parentActionLoading}
      hasRatingChanged={hasRatingChanged}
      isComputerRaterSelection={isComputerRaterSelection}
      selectedRatingAction={selectedRatingAction}
      setSelectedRatingAction={setSelectedRatingAction}
      updateCriterionSelection={updateCriterionSelection}
      applyRatingChanges={handleApplyRatingChanges}
      mode={mode}
      surveyId={surveyId}
      isScenario={true}
      readOnly={isReadonly || !participantFinishedModule}
      actionButtonTooltipKey={"rating__action_button_not_possible"}
      dataLoading={dataLoading}
      scoringTypeIcon={codingItem ? getScoringTypeIconName(codingItem.scoringType) : undefined}
      useRadioButtonForHolisticScoringType={false}
      showNoCriterionFulfilledDescription={false}
      setNoCriterionFulfilled={setNoCriterionFulfilled}
      showSelectionInputsWhileReadonly={isReadonly}
      showRaterCount={showRaterCount}
      noCriterionFulfilledConfig={noCriterionFulfilledConfig}
      isNoCriterionFulfilledButtonVisible={isNoCriterionFulfilledButtonVisible}
      isRatingDetailActionElementVisible={isRatingDetailActionElementVisible}
      showDataForAllParticipants={showDataForAllParticipants}
      wasNoCriterionFulfilledByComputerRater={wasNoCriterionFulfilledByComputerRater}
      showSelectionInput={showAdditionalRaterInfos}
      showAdditionalRaterInfos={showAdditionalRaterInfos}
      useOnlyFinalScores={showDataForAllParticipants || isScoringPreviewForParticipant}
      showRaterPercentage={showDataForAllParticipants && !isScoringPreviewForParticipant}
      selectedSurveyInvitationIdForFinalRating={selectedSurveyInvitationIdForFinalRating}
    />
  )
}
