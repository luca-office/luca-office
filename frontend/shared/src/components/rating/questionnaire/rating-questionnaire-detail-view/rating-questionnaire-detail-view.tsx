import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {IconName, RaterMode, RatingActionOption} from "../../../../enums"
import {QuestionScoringType} from "../../../../graphql/generated/globalTypes"
import {NoCriterionFulfilledConfig, Questionnaire} from "../../../../models"
import {CustomStyle} from "../../../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../../../translations"
import {Option, sortByPosition, Subject} from "../../../../utils"
import {getQuestionTypeIconName} from "../../../questionnaire"
import {RatingDetailFooterProps, RatingDetailHeaderProps, RatingDetailView, RatingOverviewTable} from "../../common"
import {getMaxScore, getMaxScoreOfQuestion, isManualQuestionRated} from "../../utils"
import {QuestionsAutomaticRatingTable, QuestionsManualRatingTable} from "../detail"
import {useRatingQuestionnaireDetailView} from "./hooks/use-rating-questionnaire-detail-view"

export interface RatingQuestionnaireDetailViewProps
  extends CustomStyle,
    RatingDetailHeaderProps,
    Required<Pick<RatingDetailFooterProps, "navigateToNextQuestion" | "navigateToPreviousQuestion">> {
  readonly customHeaderStyles?: CSSInterpolation
  readonly customFooterStyles?: CSSInterpolation
  readonly surveyInvitationId?: UUID
  readonly questionnaire: Questionnaire
  readonly selectedQuestionId?: UUID
  readonly navigateToQuestion: (questionId: UUID) => void
  readonly ratingId: Option<UUID>
  readonly mode: RaterMode
  readonly surveyId: UUID
  readonly participantFinishedModule: boolean
  readonly fetchFreetextQuestionRatingsSubject: Subject<void>
  readonly isReadonly: boolean
  readonly isNotRatable: boolean
  readonly hideParticipantNavigationButtons?: boolean
  readonly showAverageScore?: boolean
  readonly showDataForAllParticipants?: boolean
  readonly showRaterCount?: boolean
  readonly noCriterionFulfilledConfig?: NoCriterionFulfilledConfig
  readonly isNoCriterionFulfilledButtonVisible?: boolean
  readonly isRatingDetailActionElementVisible?: boolean
  readonly automaticRatingTableTitleKey?: LucaI18nLangKey
  readonly showAutomaticRatingTableTitleTooltip?: boolean
  readonly showAutomaticRatingTableQuestionType?: boolean
  readonly isScoringPreviewForParticipant?: boolean
}

export const RatingQuestionnaireDetailView: React.FC<RatingQuestionnaireDetailViewProps> = ({
  customStyles,
  customHeaderStyles,
  customFooterStyles,
  surveyInvitationId,
  questionnaire,
  selectedQuestionId,
  navigateToQuestion,
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
  fetchFreetextQuestionRatingsSubject,
  isReadonly,
  isNotRatable,
  hideParticipantNavigationButtons,
  showAverageScore,
  showDataForAllParticipants = false,
  showRaterCount = true,
  noCriterionFulfilledConfig,
  isNoCriterionFulfilledButtonVisible = true,
  isRatingDetailActionElementVisible = true,
  automaticRatingTableTitleKey = "rating__automatic_rating_label",
  showAutomaticRatingTableTitleTooltip = true,
  showAutomaticRatingTableQuestionType = false,
  isScoringPreviewForParticipant = false
}) => {
  const {t} = useLucaTranslation()

  const {
    questions,
    selectedQuestion,
    label,
    description,
    isOverviewPage,
    requiresScoring,
    score,
    maxScore,
    backgroundIcon,
    selectedRatingAction,
    setSelectedRatingAction,
    refetchFreetextQuestionRatings,
    getScoreByQuestion,
    getAverageScoreByQuestion,
    isRatingInProgress,
    criterionSelections,
    freetextQuestionRatingsForParticipant,
    dataLoading,
    averageScore
  } = useRatingQuestionnaireDetailView({
    surveyId,
    questionnaire,
    surveyInvitationId,
    selectedQuestionId,
    mode,
    showDataForAllParticipants
  })

  const performAction = (ratingAction: RatingActionOption) => {
    refetchFreetextQuestionRatings()
    fetchFreetextQuestionRatingsSubject.next()

    switch (ratingAction) {
      case RatingActionOption.NextAttendee:
        navigateToNextParticipant()
        break
      case RatingActionOption.NextQuestion:
        navigateToNextQuestion()
    }
  }

  const questionType = selectedQuestion.map(question => question.questionType).orUndefined()

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
      requiresScoring={requiresScoring}
      participantFinishedModule={participantFinishedModule}
      isRatingInProgress={isRatingInProgress}
      isNotRatable={isNotRatable}
      loading={dataLoading}
      hideParticipantNavigationButtons={hideParticipantNavigationButtons}
      showAverageScore={showAverageScore}
      averageScore={averageScore}
      showDataForAllParticipants={showDataForAllParticipants}
      questionType={questionType}>
      {isOverviewPage ? (
        <RatingOverviewTable
          entities={questions.map(question => ({
            ...question,
            title: question.text,
            scoringType: question.scoringType,
            score: getScoreByQuestion(question.id),
            maxScore: getMaxScoreOfQuestion(question),
            rated:
              !requiresScoring ||
              isManualQuestionRated({
                question,
                criterionSelections,
                freetextQuestionRatings: freetextQuestionRatingsForParticipant
              }),
            iconName: getQuestionTypeIconName(question.questionType),
            averageScore: showDataForAllParticipants ? getAverageScoreByQuestion(question.id) : question.score
          }))}
          onClick={navigateToQuestion}
          scoringName={
            showDataForAllParticipants || isScoringPreviewForParticipant
              ? t("reporting_scoring__scenario_details_overview_title")
              : t("rating_scenario__scoring_label")
          }
          entityName={t("questions")}
          enumerate={true}
          title={t("question")}
          iconName={IconName.QuestionnaireCascade}
          isReadonly={isReadonly || !participantFinishedModule}
          isNotRatable={isNotRatable}
          showStatusIcons={!showDataForAllParticipants && !isScoringPreviewForParticipant}
          showAverageScore={showDataForAllParticipants || isScoringPreviewForParticipant}
        />
      ) : (
        selectedQuestion
          .map(question =>
            requiresScoring ? (
              <QuestionsManualRatingTable
                surveyInvitationId={surveyInvitationId}
                question={question}
                ratingId={ratingId}
                selectedRatingAction={selectedRatingAction}
                setSelectedRatingAction={setSelectedRatingAction}
                performAction={performAction}
                mode={mode}
                surveyId={surveyId}
                participantFinishedModule={participantFinishedModule}
                isReadonly={isReadonly}
                showDataForAllParticipants={showDataForAllParticipants}
                showRaterCount={showRaterCount}
                noCriterionFulfilledConfig={noCriterionFulfilledConfig}
                isNoCriterionFulfilledButtonVisible={isNoCriterionFulfilledButtonVisible}
                isRatingDetailActionElementVisible={isRatingDetailActionElementVisible}
                isScoringPreviewForParticipant={isScoringPreviewForParticipant}
              />
            ) : (
              <QuestionsAutomaticRatingTable
                surveyId={surveyId}
                surveyInvitationId={surveyInvitationId}
                question={question}
                answers={sortByPosition(question.answers)}
                showDataForAllParticipants={showDataForAllParticipants}
                titleKey={automaticRatingTableTitleKey}
                showTitleTooltip={showAutomaticRatingTableTitleTooltip}
                showQuestionType={showAutomaticRatingTableQuestionType}
                participantsCount={participantsCount}
              />
            )
          )
          .orNull()
      )}
    </RatingDetailView>
  )
}
