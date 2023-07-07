import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {Payload} from "redux-first-router"
import {RaterMode} from "../../../../../enums"
import {ButtonConfig, NavigationConfig, NoCriterionFulfilledConfig} from "../../../../../models"
import {Route} from "../../../../../routes"
import {LucaI18nLangKey} from "../../../../../translations"
import {Option} from "../../../../../utils/option"
import {Content} from "../../../../content"
import {RatingHeader, RatingQuestionnaireTableOfContents} from "../../../common"
import {ratingDetailStyles as styles} from "../../../rating-detail.style"
import {RatingQuestionnaireDetailView} from "../../rating-questionnaire-detail-view/rating-questionnaire-detail-view"
import {useRatingDetailQuestionnaire} from "./hooks/use-rating-detail-questionnaire"

export interface RatingDetailQuestionnaireProps<TRoute> {
  readonly customContentWrapperStyles?: CSSInterpolation
  readonly customContentContainerStyles?: CSSInterpolation
  readonly customRatingContentStyles?: CSSInterpolation
  readonly customTocStyles?: CSSInterpolation
  readonly customTocHeaderStyles?: CSSInterpolation
  readonly customTocFooterStyles?: CSSInterpolation
  readonly customDetailviewStyles?: CSSInterpolation
  readonly customDetailviewHeaderStyles?: CSSInterpolation
  readonly customDetailviewFooterStyles?: CSSInterpolation
  readonly customLoadingIndicatorStyles?: CSSInterpolation
  readonly projectId: UUID
  readonly surveyId: UUID
  readonly moduleId: UUID
  readonly surveyInvitationId?: UUID
  readonly questionId?: UUID
  readonly navigationButtonLabelKey?: LucaI18nLangKey
  readonly navigationOverviewConfig?: NavigationConfig<TRoute>
  readonly backButtonConfig?: ButtonConfig
  readonly mode?: RaterMode
  readonly showDataForAllParticipants?: boolean
  readonly raterId?: UUID
  readonly navigateTo: (route: TRoute | Route, payload?: Payload) => void
  readonly disabled?: boolean
  readonly showHeader?: boolean
  readonly hideParticipantNavigationButtons?: boolean
  readonly showAverageScore?: boolean
  readonly tocRightSideKey?: LucaI18nLangKey
  readonly showRaterCount?: boolean
  readonly noCriterionFulfilledConfig?: NoCriterionFulfilledConfig
  readonly isNoCriterionFulfilledButtonVisible?: boolean
  readonly isRatingDetailActionElementVisible?: boolean
  readonly automaticRatingTableTitleKey?: LucaI18nLangKey
  readonly showAutomaticRatingTableTitleTooltip?: boolean
  readonly showAutomaticRatingTableQuestionType?: boolean
  readonly isScoringPreviewForParticipant?: boolean
}

export const RatingDetailQuestionnaire = <TRoute,>({
  customContentWrapperStyles,
  customContentContainerStyles,
  customRatingContentStyles,
  customTocStyles,
  customTocHeaderStyles,
  customTocFooterStyles,
  customDetailviewStyles,
  customDetailviewHeaderStyles,
  customDetailviewFooterStyles,
  customLoadingIndicatorStyles,
  projectId,
  surveyId,
  moduleId,
  surveyInvitationId,
  questionId,
  navigationButtonLabelKey,
  navigationOverviewConfig,
  backButtonConfig,
  mode = RaterMode.FinalRater,
  showDataForAllParticipants = false,
  raterId,
  navigateTo,
  disabled = false,
  showHeader = true,
  hideParticipantNavigationButtons,
  showAverageScore,
  tocRightSideKey = "rating__rating__right_side_title_table_of_contents",
  showRaterCount = true,
  noCriterionFulfilledConfig,
  isNoCriterionFulfilledButtonVisible = true,
  isRatingDetailActionElementVisible = true,
  automaticRatingTableTitleKey = "rating__automatic_rating_label",
  showAutomaticRatingTableTitleTooltip = true,
  showAutomaticRatingTableQuestionType = false,
  isScoringPreviewForParticipant = false
}: RatingDetailQuestionnaireProps<TRoute>) => {
  const {
    dataLoading,
    projectName,
    projectModules,
    participants,
    participantIndex,
    participantName,
    navigateToOverview,
    navigateToModule,
    navigateToParticipantWithIndexOffset,
    navigateToQuestionWithIndexOffset,
    questionnaire: questionnaireOption,
    selectedEntityId,
    selectEntityId,
    ratingId,
    participantFinishedModule,
    fetchFreetextQuestionRatingsSubject,
    isReadonly,
    isNotRatable,
    isContentMissing
  } = useRatingDetailQuestionnaire({
    projectId,
    surveyId,
    moduleId,
    surveyInvitationId,
    questionId,
    navigationOverviewConfig,
    mode,
    disabled,
    raterId,
    navigateTo
  })

  const header = (
    <RatingHeader
      projectModules={projectModules}
      projectTitle={projectName.getOrElse("")}
      onSelectModule={navigateToModule}
      selectedModuleId={Option.of(moduleId)}
      navigationButtonConfig={
        backButtonConfig ?? {
          labelKey: navigationButtonLabelKey ?? "rating__rating__header_back_button",
          onClick: navigateToOverview
        }
      }
    />
  )

  return (
    <Content
      customStyles={customContentWrapperStyles}
      customContentContainerStyles={[styles.contentContainer, customContentContainerStyles]}
      customLoadingIndicatorStyles={customLoadingIndicatorStyles}
      loading={dataLoading}
      isContentMissing={isContentMissing}
      subHeader={showHeader ? header : undefined}>
      <div css={[styles.content, customRatingContentStyles]}>
        <RatingQuestionnaireTableOfContents
          customStyles={customTocStyles}
          customHeaderStyles={customTocHeaderStyles}
          customFooterStyles={customTocFooterStyles}
          surveyId={surveyId}
          surveyInvitationId={surveyInvitationId}
          fetchFreetextQuestionRatingsSubject={fetchFreetextQuestionRatingsSubject}
          questionnaire={questionnaireOption}
          selectEntityId={selectEntityId}
          selectedEntityId={selectedEntityId}
          isReadonly={isReadonly}
          isNotRatable={isNotRatable}
          mode={mode}
          showDataForAllParticipants={showDataForAllParticipants}
          rightSideKey={tocRightSideKey}
          isScoringPreviewForParticipant={isScoringPreviewForParticipant}
        />
        {questionnaireOption
          .map(questionnaire => (
            <RatingQuestionnaireDetailView
              customStyles={[styles.fullWidth, customDetailviewStyles]}
              customHeaderStyles={customDetailviewHeaderStyles}
              customFooterStyles={customDetailviewFooterStyles}
              surveyInvitationId={surveyInvitationId}
              questionnaire={questionnaire}
              selectedQuestionId={questionId}
              navigateToQuestion={id => selectEntityId(Option.of(id))}
              navigateToNextParticipant={() => navigateToParticipantWithIndexOffset(1)}
              navigateToPreviousParticipant={() => navigateToParticipantWithIndexOffset(-1)}
              participantIndex={participantIndex}
              participantName={participantName}
              participantsCount={participants.getOrElse([]).length}
              navigateToNextQuestion={() => navigateToQuestionWithIndexOffset(1)}
              navigateToPreviousQuestion={() => navigateToQuestionWithIndexOffset(-1)}
              ratingId={ratingId}
              mode={mode}
              surveyId={surveyId}
              participantFinishedModule={participantFinishedModule}
              fetchFreetextQuestionRatingsSubject={fetchFreetextQuestionRatingsSubject}
              isReadonly={isReadonly}
              isNotRatable={isNotRatable}
              hideParticipantNavigationButtons={hideParticipantNavigationButtons}
              showAverageScore={showAverageScore}
              showDataForAllParticipants={showDataForAllParticipants}
              showRaterCount={showRaterCount}
              noCriterionFulfilledConfig={noCriterionFulfilledConfig}
              isNoCriterionFulfilledButtonVisible={isNoCriterionFulfilledButtonVisible}
              isRatingDetailActionElementVisible={isRatingDetailActionElementVisible}
              automaticRatingTableTitleKey={automaticRatingTableTitleKey}
              showAutomaticRatingTableTitleTooltip={showAutomaticRatingTableTitleTooltip}
              showAutomaticRatingTableQuestionType={showAutomaticRatingTableQuestionType}
              isScoringPreviewForParticipant={isScoringPreviewForParticipant}
            />
          ))
          .orNull()}
      </div>
    </Content>
  )
}
