import * as React from "react"
import {RaterMode, RatingActionOption} from "../../../../../enums"
import {NoCriterionFulfilledConfig, QuestionnaireQuestion} from "../../../../../models"
import {Option} from "../../../../../utils"
import {getQuestionTypeIconName} from "../../../../questionnaire"
import {CriterionRatingTable} from "../../../common"
import {useQuestionsManualRatingTable} from "./hooks/use-questions-manual-rating-table"

export interface QuestionsManualRatingTableProps {
  readonly surveyInvitationId?: UUID
  readonly question: QuestionnaireQuestion
  readonly ratingId: Option<UUID>
  readonly selectedRatingAction?: RatingActionOption
  readonly setSelectedRatingAction?: React.Dispatch<React.SetStateAction<RatingActionOption>>
  readonly performAction: (ratingAction: RatingActionOption) => void
  readonly mode: RaterMode
  readonly surveyId: UUID
  readonly participantFinishedModule: boolean
  readonly actionLoading?: boolean
  readonly isReadonly: boolean
  readonly showDataForAllParticipants?: boolean
  readonly showRaterCount?: boolean
  readonly noCriterionFulfilledConfig?: NoCriterionFulfilledConfig
  readonly isNoCriterionFulfilledButtonVisible?: boolean
  readonly isRatingDetailActionElementVisible?: boolean
  readonly isScoringPreviewForParticipant?: boolean
}

export const QuestionsManualRatingTable: React.FC<QuestionsManualRatingTableProps> = ({
  surveyInvitationId,
  question,
  ratingId,
  selectedRatingAction,
  setSelectedRatingAction,
  performAction,
  mode,
  surveyId,
  participantFinishedModule,
  actionLoading: parentActionLoading = false,
  isReadonly,
  showDataForAllParticipants = false,
  showRaterCount = true,
  noCriterionFulfilledConfig,
  isNoCriterionFulfilledButtonVisible = true,
  isRatingDetailActionElementVisible = true,
  isScoringPreviewForParticipant = false
}) => {
  const {
    dataLoading,
    actionLoading,
    freeTextAnswer,
    noCriterionFulfilled,
    isSelected,
    updateCriterionSelection,
    setNoCriterionFulfilled,
    hasRatingChanged,
    isNothingSelected,
    applyRatingChanges,
    refreshData
  } = useQuestionsManualRatingTable({
    surveyInvitationId,
    question,
    ratingId,
    surveyId,
    mode,
    showDataForAllParticipants
  })

  const showAdditionalRaterInfos = !showDataForAllParticipants && !isScoringPreviewForParticipant

  const handleApplyRatingChanges = (ratingAction: RatingActionOption) =>
    applyRatingChanges().then(() => {
      refreshData()
      performAction(ratingAction)
    })

  return (
    <CriterionRatingTable
      criteria={question.freetextQuestionCodingCriteria}
      scoringType={question.scoringType}
      scoringTypeIcon={getQuestionTypeIconName(question.questionType)}
      isSelected={isSelected}
      updateCriterionSelection={updateCriterionSelection}
      noCriterionFulfilled={noCriterionFulfilled}
      setNoCriterionFulfilled={setNoCriterionFulfilled}
      dataLoading={dataLoading}
      freeTextAnswer={freeTextAnswer}
      actionLoading={actionLoading || parentActionLoading}
      hasRatingChanged={hasRatingChanged && !isNothingSelected}
      applyRatingChanges={handleApplyRatingChanges}
      selectedRatingAction={selectedRatingAction}
      setSelectedRatingAction={setSelectedRatingAction}
      mode={mode}
      surveyId={surveyId}
      readOnly={isReadonly || !participantFinishedModule}
      actionButtonTooltipKey={"rating__action_button_not_possible"}
      showSelectionInputsWhileReadonly={isReadonly}
      showSelectionInput={showAdditionalRaterInfos}
      showAdditionalRaterInfos={showAdditionalRaterInfos}
      useOnlyFinalScores={showDataForAllParticipants || isScoringPreviewForParticipant}
      showRaterPercentage={showDataForAllParticipants && !isScoringPreviewForParticipant}
      showRaterCount={showRaterCount}
      selectedSurveyInvitationIdForFinalRating={surveyInvitationId}
      noCriterionFulfilledConfig={{...noCriterionFulfilledConfig, selectedQuestionIdForFinalRating: question.id}}
      isNoCriterionFulfilledButtonVisible={isNoCriterionFulfilledButtonVisible}
      isRatingDetailActionElementVisible={isRatingDetailActionElementVisible}
      showDataForAllParticipants={showDataForAllParticipants}
    />
  )
}
