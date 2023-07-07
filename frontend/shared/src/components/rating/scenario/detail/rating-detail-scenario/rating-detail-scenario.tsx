import {CSSInterpolation} from "@emotion/serialize"
import {partial} from "lodash-es"
import * as React from "react"
import {Payload} from "redux-first-router"
import {RaterMode} from "../../../../../enums"
import {ButtonConfig, NavigationConfig, NoCriterionFulfilledConfig, Scenario} from "../../../../../models"
import {Route} from "../../../../../routes"
import {LucaI18nLangKey, useLucaTranslation} from "../../../../../translations"
import {Option} from "../../../../../utils"
import {Content} from "../../../../content"
import {SlideMenu, SlideMenuVisibility} from "../../../../slide-menu/slide-menu"
import {RatingCodingTableOfContents, RatingHeader, RatingPlaceholder} from "../../../common"
import {ratingDetailStyles as styles} from "../../../rating-detail.style"
import {RatingScenarioDetailView} from "../../rating-scenario-detail-view/rating-scenario-detail-view"
import {ScenarioRatingContext} from "./context"
import {useRatingDetailScenario} from "./hooks/use-rating-detail-scenario"

export interface RatingDetailScenarioProps<TRoute> {
  readonly customContentWrapperStyles?: CSSInterpolation
  readonly customContentContainerStyles?: CSSInterpolation
  readonly customContentStyles?: CSSInterpolation
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
  readonly dimensionId?: UUID
  readonly navigationButtonLabelKey?: LucaI18nLangKey
  readonly navigationOverviewConfig?: NavigationConfig<TRoute>
  readonly backButtonConfig?: ButtonConfig
  readonly mode?: RaterMode
  readonly isOverview?: boolean
  readonly showSnapshot?: boolean
  readonly showHeader?: boolean
  readonly showDataForAllParticipants?: boolean
  readonly disabled?: boolean
  readonly raterId?: UUID
  readonly hideParticipantNavigationButtons?: boolean
  readonly navigateTo: (route: TRoute | Route, payload?: Payload) => void
  readonly showAverageScore?: boolean
  readonly renderScenarioSnapshot?: (scenario: Scenario, participantFinishedModule: boolean) => React.ReactNode
  readonly tocRightSideKey?: LucaI18nLangKey
  readonly showRaterCount?: boolean
  readonly noCriterionFulfilledConfig?: NoCriterionFulfilledConfig
  readonly isNoCriterionFulfilledButtonVisible?: boolean
  readonly isRatingDetailActionElementVisible?: boolean
  readonly isScoringPreviewForParticipant?: boolean
}

export const RatingDetailScenario = <TRoute,>({
  customContentWrapperStyles,
  customContentContainerStyles,
  customContentStyles,
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
  dimensionId,
  navigationButtonLabelKey,
  navigationOverviewConfig,
  backButtonConfig,
  mode = RaterMode.FinalRater,
  isOverview = false,
  showSnapshot = true,
  showHeader = true,
  showDataForAllParticipants = false,
  disabled = false,
  raterId,
  hideParticipantNavigationButtons,
  navigateTo,
  showAverageScore,
  renderScenarioSnapshot,
  tocRightSideKey = "rating__rating__right_side_title_table_of_contents",
  showRaterCount = true,
  noCriterionFulfilledConfig,
  isNoCriterionFulfilledButtonVisible,
  isRatingDetailActionElementVisible,
  isScoringPreviewForParticipant = false
}: RatingDetailScenarioProps<TRoute>) => {
  const {t} = useLucaTranslation()

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
    navigateToDimensionWithIndexOffset,
    selectedEntityId,
    selectEntityId,
    codingDimensions,
    ratingId,
    scenario: scenarioOption,
    participantFinishedModule,
    refreshRatingSubject,
    isReadonly,
    isNotRatable,
    refreshData,
    isContentMissing
  } = useRatingDetailScenario({
    projectId,
    surveyId,
    moduleId,
    surveyInvitationId,
    dimensionId,
    navigationOverviewConfig,
    mode,
    disabled,
    raterId,
    navigateTo
  })

  const header = (
    <RatingHeader
      customStyles={styles.header}
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

  const renderToC = (scenario: Scenario, visible: boolean) =>
    visible ? (
      <RatingCodingTableOfContents
        customStyles={customTocStyles}
        customHeaderStyles={customTocHeaderStyles}
        customFooterStyles={customTocFooterStyles}
        surveyId={surveyId}
        isOverviewSelected={isOverview}
        codingDimensions={codingDimensions}
        surveyInvitationId={surveyInvitationId}
        selectEntityId={selectEntityId}
        selectedEntityId={selectedEntityId}
        isReadonly={isReadonly}
        ratingId={ratingId}
        isNotRatable={isNotRatable}
        showDataForAllParticipants={showDataForAllParticipants}
        rightSideKey={tocRightSideKey}
        isScoringPreviewForParticipant={isScoringPreviewForParticipant}
      />
    ) : null

  const renderDetailView = (scenario: Scenario, visible: boolean) =>
    visible ? (
      <RatingScenarioDetailView
        customStyles={[styles.fullWidth, customDetailviewStyles]}
        customHeaderStyles={customDetailviewHeaderStyles}
        customFooterStyles={customDetailviewFooterStyles}
        surveyInvitationId={surveyInvitationId}
        scenario={scenario}
        selectedCodingEntityId={dimensionId}
        navigateToEntity={entityId => selectEntityId(Option.of(entityId))}
        navigateToNextParticipant={() => navigateToParticipantWithIndexOffset(1)}
        navigateToPreviousParticipant={() => navigateToParticipantWithIndexOffset(-1)}
        participantIndex={participantIndex}
        participantName={participantName}
        participantsCount={participants.getOrElse([]).length}
        navigateToNextQuestion={() => navigateToDimensionWithIndexOffset(1)}
        navigateToPreviousQuestion={() => navigateToDimensionWithIndexOffset(-1)}
        ratingId={ratingId}
        mode={mode}
        surveyId={surveyId}
        participantFinishedModule={participantFinishedModule}
        isReadonly={isReadonly}
        isNotRatable={isNotRatable}
        refreshData={refreshData}
        hideParticipantNavigationButtons={hideParticipantNavigationButtons}
        showAverageScore={showAverageScore}
        showDataForAllParticipants={showDataForAllParticipants}
        showRaterCount={showRaterCount}
        noCriterionFulfilledConfig={noCriterionFulfilledConfig}
        isNoCriterionFulfilledButtonVisible={isNoCriterionFulfilledButtonVisible}
        isRatingDetailActionElementVisible={isRatingDetailActionElementVisible}
        isScoringPreviewForParticipant={isScoringPreviewForParticipant}
      />
    ) : null

  return (
    <ScenarioRatingContext.Provider value={{refreshRatingSubject}}>
      <Content
        customStyles={customContentWrapperStyles}
        customContentContainerStyles={[styles.contentContainer, styles.noPadding, customContentContainerStyles]}
        customLoadingIndicatorStyles={customLoadingIndicatorStyles}
        loading={dataLoading}
        isContentMissing={isContentMissing}
        subHeader={showHeader ? header : undefined}>
        <div css={[styles.content, customContentStyles]}>
          {scenarioOption
            .map(scenario =>
              showSnapshot && renderScenarioSnapshot !== undefined ? (
                <div css={styles.desktopContainer}>
                  <SlideMenu
                    customStyles={styles.slideMenu}
                    inactive={isReadonly || !participantFinishedModule}
                    defaultVisibility={
                      participantFinishedModule ? SlideMenuVisibility.Full : SlideMenuVisibility.Collapsed
                    }
                    renderDetailView={partial(renderDetailView, scenario)}
                    renderToC={partial(renderToC, scenario)}
                  />
                  {renderScenarioSnapshot(scenario, participantFinishedModule)}
                </div>
              ) : (
                <div css={[styles.ratingContent, customRatingContentStyles]}>
                  {renderToC(scenario, true)}
                  {renderDetailView(scenario, true)}
                </div>
              )
            )
            .getOrElse(
              <RatingPlaceholder
                title={t("rating_scenario__placeholder_headline")}
                description={t("rating_scenario__placeholder_text")}
              />
            )}
        </div>
      </Content>
    </ScenarioRatingContext.Provider>
  )
}
