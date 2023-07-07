import {compact, isEqual} from "lodash-es"
import * as React from "react"
import {useDispatch, useSelector} from "react-redux"
import {
  Card,
  CardFooter,
  ChatWindow,
  Overlay,
  ParticipantScenarioDetail,
  QuestionnaireResultsOverlay,
  Text,
  useCodingCriteriaByItemsList,
  useRatings,
  useScenarioCodingItemsByRatingsList
} from "shared/components"
import {getScenarioOrQuestionnaireDurationInSeconds} from "shared/components/desktop/config"
import {ParticipantScenarioDetailEventsTable} from "shared/components/participant-scenario-detail/participant-scenario-detail-events-table"
import {
  getCodingItemsFromCodingDimensions,
  getScoreOfCodingCriteria,
  getSelectedCodingCriteria
} from "shared/components/rating/utils"
import {RaterMode, ScenarioState} from "shared/enums"
import {ProjectModuleProgressType} from "shared/graphql/generated/globalTypes"
import {
  useCodingDimensionsLazy,
  useProject,
  useProjectModules,
  useRuntimeSurveyResults,
  useScenario,
  useScenarioQuestionnaires,
  useSurveyEvents,
  useSurveyInvitations,
  useSurveyInvitationsProgress,
  useSurveyResultsOverview
} from "shared/graphql/hooks"
import {useScenarioInfo} from "shared/graphql/hooks/mutations"
import {CodingDimension, LocalChatMessage, Rating, Scenario} from "shared/models"
import {FontWeight, spacingMedium, spacingTiny, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {computeSurveyProgress, find, flatten, isDefined} from "shared/utils"
import {useCompletionMailWordsCount} from "../../../graphql/hooks"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {AppState} from "../../../redux/state/app-state"
import {Route} from "../../../routes"
import {surveyPollingRate} from "../../monitoring/config/config"
import {useSupervisorChat} from "../../monitoring/dashboard/hooks/use-supervisor-chat"
import {ParticipantActivityOverviewContainer} from "../../reporting/activity-overview/participant-activity-overview-container"
import {getCurrentScenarioTime} from "../../reporting/activity-overview/utils/get-current-scenario-time"
import {ParticipantDocumentOverviewContainer} from "../../reporting/documents-overview/participant-document-overview-container"
import {ScenarioSnapshotOverlay} from "../../scenarios"
import {ReportingScenarioOverlayContainer} from "./finalscore-overlay/participant-scenario-final-score-overlay-container"
import {participantScenarioDetailStyle} from "./style"

export interface ParticipantScenarioDetailContainerProps {
  readonly projectId: UUID
  readonly surveyId: UUID
  readonly invitationId: UUID
  readonly scenarioId: UUID
  readonly onNavigateBack: () => void
}

export const ParticipantScenarioDetailContainer: React.FC<ParticipantScenarioDetailContainerProps> = ({
  projectId,
  surveyId,
  invitationId,
  scenarioId,
  onNavigateBack
}) => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()

  const ratingsRef = React.useRef<Rating[]>([])
  const codingDimensionsRef = React.useRef<CodingDimension[]>([])
  const scenarioRef = React.useRef<Scenario | null>(null)

  const chatMessages = useSelector<AppState, Array<LocalChatMessage>>(state => state.chat.chatMessages)
  const participantChatMessageCount = chatMessages.filter(
    message =>
      (message.type === "participant" && message.invitationId === invitationId) ||
      (message.type === "supervisor" && message.recipientInvitationIds.includes(invitationId))
  ).length

  const {scenario, scenarioLoading} = useScenario(scenarioId)
  const {surveyResultsOverview, surveyResultsOverviewLoading} = useSurveyResultsOverview(surveyId)
  const pollingRate = surveyResultsOverview.exists(
    surveyResultsOverview =>
      surveyResultsOverview.projectModuleResults.find(module => module.scenarioId === scenarioId)?.isComplete ?? false
  )
    ? undefined
    : surveyPollingRate
  const {scenarioQuestionnaires, scenarioQuestionnairesLoading} = useScenarioQuestionnaires(scenarioId)
  const {surveyInvitations, surveyInvitationsLoading} = useSurveyInvitations(surveyId)
  const {surveyInvitationsProgress, surveyInvitationsProgressLoading} = useSurveyInvitationsProgress(surveyId)
  const {projectLoading, project} = useProject(projectId)
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)
  const {runtimeSurveyResults, runtimeSurveyResultsLoading} = useRuntimeSurveyResults(surveyId, scenarioId, pollingRate)
  const {completionMailWordsCount, completionMailWordsCountLoading} = useCompletionMailWordsCount(scenarioId, surveyId)
  const {ratingsLoading, ratings} = useRatings(surveyId, RaterMode.FinalRater)
  const {
    scenarioCodingItemRatings: allScenarioCodingItemRatingsByRatings,
    scenarioCodingItemRatingsLoading: allScenarioCodingItemRatingsByRatingsLoading,
    getScenarioCodingItemRatings: getAllScenarioCodingItemRatingsByRatings
  } = useScenarioCodingItemsByRatingsList()
  const {codingCriteria, codingCriteriaLoading, getCodingCriteria} = useCodingCriteriaByItemsList()
  const {codingDimensions, codingDimensionsLoading, getCodingDimensions} = useCodingDimensionsLazy()

  const disableFinalScoreButton = scenario.map(s => s.codingModel === null).getOrElse(false)

  if (!isEqual(ratingsRef.current, ratings)) {
    ratingsRef.current = ratings
  }

  if (!isEqual(codingDimensionsRef.current, codingDimensions)) {
    codingDimensionsRef.current = codingDimensions
  }

  if (!isEqual(scenarioRef.current, scenario.orNull())) {
    scenarioRef.current = scenario.orNull()
  }

  const rating = project.flatMap(({authorId}) => find(({userAccountId}) => userAccountId === authorId, ratings))
  const {surveyEvents, surveyEventsLoading} = useSurveyEvents({
    surveyInvitationId: invitationId,
    scenarioId: scenarioId,
    pollingRateInMillis: pollingRate
  })

  const codingItems = React.useMemo(
    () => getCodingItemsFromCodingDimensions(codingDimensionsRef.current),
    [codingDimensionsRef.current]
  )

  const scenarioCodingItemRatings = rating
    .map(({id: ratingId}) =>
      allScenarioCodingItemRatingsByRatings.filter(
        scenarioCodingItemRating =>
          scenarioCodingItemRating.ratingId === ratingId && scenarioCodingItemRating.surveyInvitationId === invitationId
      )
    )
    .getOrElse([])
  const criterionSelections = flatten(scenarioCodingItemRatings.map(entry => entry.criterionSelections))
  const selectedCodingCriteria = getSelectedCodingCriteria(codingCriteria, criterionSelections)
  const finalScore = selectedCodingCriteria.length > 0 ? getScoreOfCodingCriteria(selectedCodingCriteria) : undefined

  const surveyProgress = computeSurveyProgress(projectModules, surveyInvitationsProgress).find(
    progress => progress.id === invitationId
  )

  const {averageScore, maximumScore, isFinalized} = surveyResultsOverview
    .map(resultsOverview => {
      const moduleResult = resultsOverview.projectModuleResults.find(result => result.scenarioId === scenarioId)
      const participantResult = resultsOverview.participantResults.find(
        result => result.surveyInvitationId === invitationId
      )

      return {
        averageScore: moduleResult?.averageScore,
        maximumScore: moduleResult?.maximumScore,
        isFinalized: participantResult?.isComplete === true
      }
    })
    .getOrElse({averageScore: undefined, maximumScore: undefined, isFinalized: false})

  const {isLoading: scenarioInfoLoading, scenarioInfoOption} = useScenarioInfo({
    surveyId,
    scenarioId
  })

  const {
    isChatVisible,
    openChat,
    closeChat,
    setChatParticipantsIds,
    chatParticipants,
    messages,
    sendSupervisorMessage,
    isChatAccessible,
    isChatEnabledForSurvey
  } = useSupervisorChat(surveyId, projectId, compact([surveyProgress]))

  React.useEffect(() => {
    setChatParticipantsIds([invitationId])
  }, [invitationId])

  const [selectedEventQuestionnaireId, setSelectedEventQuestionnaireId] = React.useState<UUID>()
  const [showDocumentActivityAndToolUsage, setShowDocumentActivityAndToolUsage] = React.useState(false)
  const [isFinalScoreOverlayVisible, setIsFinalScoreOverlayVisible] = React.useState(false)
  const [showDocumentOverview, setShowDocumentOverview] = React.useState(false)

  const onShowActivityAndToolUsage = () => {
    setShowDocumentActivityAndToolUsage(true)
  }

  const onShowDocumentsOverview = () => {
    setShowDocumentOverview(true)
  }

  const onSetFinalScore = () => {
    dispatch(
      navigateToRouteAction(Route.SurveyMonitoringParticipantScenarioScoring, {
        id: projectId,
        surveyId,
        surveyInvitationId: invitationId,
        moduleId: projectModules.find(module => module.scenarioId === scenarioId)?.id,
        scenarioId
      })
    )
  }

  const onShowEventResults = (questionnaireId: UUID) => {
    setSelectedEventQuestionnaireId(questionnaireId)
  }

  const surveyInvitation = surveyInvitations.find(s => s.id === invitationId)

  const participantName =
    surveyInvitation !== undefined
      ? isDefined(surveyInvitation.participantData?.firstName) && isDefined(surveyInvitation.participantData?.lastName)
        ? `${surveyInvitation.participantData?.firstName} ${surveyInvitation.participantData?.lastName}`
        : surveyInvitation.token
      : ""

  const scenarioProgress = surveyInvitation?.projectModuleProgresses.find(
    progress => progress.scenarioId === scenarioId
  )

  const wordsInCompletionMailTotal =
    completionMailWordsCount.find(wordsCount => wordsCount.invitationId === invitationId)?.wordCount ?? 0

  const isLoading =
    scenarioLoading ||
    scenarioQuestionnairesLoading ||
    surveyInvitationsLoading ||
    surveyInvitationsProgressLoading ||
    projectModulesLoading ||
    scenarioInfoLoading ||
    runtimeSurveyResultsLoading ||
    completionMailWordsCountLoading ||
    surveyResultsOverviewLoading ||
    surveyEventsLoading ||
    ratingsLoading ||
    allScenarioCodingItemRatingsByRatingsLoading ||
    codingCriteriaLoading ||
    codingDimensionsLoading ||
    projectLoading

  React.useEffect(() => {
    getAllScenarioCodingItemRatingsByRatings(ratingsRef.current)
  }, [ratingsRef.current])

  React.useEffect(() => {
    if (codingItems.length > 0) {
      getCodingCriteria({items: codingItems})
      return
    }
  }, [codingItems])

  React.useEffect(() => {
    const codingModelId = scenarioRef.current?.codingModel?.id
    if (codingModelId !== undefined) {
      getCodingDimensions(codingModelId)
    }
  }, [scenarioRef.current])

  const renderScenarioSnapshotOverlay = (hideScenarioSnapshotOverlay: () => void) => (
    <ScenarioSnapshotOverlay
      surveyId={surveyId}
      scenarioId={scenarioId}
      surveyInvitationId={invitationId}
      onDismiss={hideScenarioSnapshotOverlay}
      pollSurveyEvents={true}
    />
  )

  const renderRuntimeSurveyResults = () => (
    <div>
      <Text size={TextSize.Medium} customStyles={styles.label}>
        {t("reporting_result__events_count_label", {count: scenarioQuestionnaires.getOrElse([]).length})}
      </Text>
      <Card hasShadow={true}>
        <ParticipantScenarioDetailEventsTable
          surveyId={surveyId}
          surveyInvitationId={invitationId}
          onShowResults={onShowEventResults}
          scenarioQuestionnaires={scenarioQuestionnaires.getOrElse([])}
        />
        <CardFooter customStyles={styles.tableFooter} />
      </Card>
    </div>
  )

  const showScoringOverlay = () => setIsFinalScoreOverlayVisible(true)

  return (
    <div css={participantScenarioDetailStyle.content}>
      <ParticipantScenarioDetail
        moduleDescription={scenario.map(s => s.description).getOrElse("")}
        moduleName={scenario.map(s => s.name).getOrElse("")}
        progressCountsConfig={{
          requiredDocumentsOpened: scenarioProgress?.openedRequiredDocumentsCount ?? 0,
          requiredDocumentsTotal: scenarioProgress?.requiredDocumentsCount ?? 0,
          wordsInCompletionMailTotal
        }}
        scenarioState={calculateScenarioState({
          progressType: scenarioProgress?.status,
          isFinalScoreSet: finalScore !== undefined,
          isFinalized,
          isRatingFinalized: rating.exists(({finalizedAt}) => isDefined(finalizedAt))
        })}
        finalScore={finalScore}
        finalScoreMax={maximumScore}
        finalScoreAverage={averageScore}
        onOpenChat={openChat}
        showScoringOverlay={showScoringOverlay}
        onShowActivityAndToolUsage={onShowActivityAndToolUsage}
        onShowDocumentsOverview={onShowDocumentsOverview}
        onSetFinalScore={onSetFinalScore}
        onNavigateBack={onNavigateBack}
        navigateBackLabel={t("reporting_result__participant_overview_back_label", {name: participantName})}
        chatMessageCount={participantChatMessageCount}
        isChatEnabled={isChatEnabledForSurvey}
        isLoading={isLoading}
        renderScenarioSnapshotOverlay={renderScenarioSnapshotOverlay}
        renderRuntimeSurveyResults={renderRuntimeSurveyResults}
        disableFinalScoreButton={disableFinalScoreButton}
      />
      {isChatVisible ? (
        <Overlay>
          <ChatWindow
            chatTitle={
              chatParticipants.length > 1
                ? t("chat__group_title", {count: chatParticipants.length})
                : chatParticipants[0].displayName
            }
            messages={messages}
            onClose={closeChat}
            onMessageSend={sendSupervisorMessage}
            isChatAccessible={isChatAccessible}
            instructionTitle={t("chat__instruction", {count: chatParticipants.length})}
            instructionText={chatParticipants.map(participant => participant.displayName).join(", ")}
          />
        </Overlay>
      ) : null}
      {showDocumentActivityAndToolUsage && (
        <Overlay>
          <ParticipantActivityOverviewContainer
            surveyEvents={surveyEvents}
            participantName={participantName}
            endTime={Math.max(
              scenario
                .map(scenario => getScenarioOrQuestionnaireDurationInSeconds(scenario.maxDurationInSeconds))
                .getOrElse(0),
              getCurrentScenarioTime(surveyEvents)
            )}
            onClose={() => setShowDocumentActivityAndToolUsage(false)}
            scenarioId={scenarioId}
          />
        </Overlay>
      )}
      {showDocumentOverview && (
        <Overlay>
          <ParticipantDocumentOverviewContainer
            scenarioId={scenarioId}
            surveyEvents={surveyEvents}
            onClose={() => setShowDocumentOverview(false)}
            participantName={participantName}
          />
        </Overlay>
      )}
      {isFinalScoreOverlayVisible && (
        <ReportingScenarioOverlayContainer
          surveyId={surveyId}
          onCloseOverlay={() => setIsFinalScoreOverlayVisible(false)}
          participantName={participantName}
          scenarioId={scenarioId}
          surveyInvitationId={invitationId}
        />
      )}
      {/* Implement correct view for single questionnaire results LUCA-1818 */}
      {selectedEventQuestionnaireId !== undefined
        ? scenarioQuestionnaires
            .map(questionnaires =>
              scenarioInfoOption
                .map(scenarioInfo => (
                  <QuestionnaireResultsOverlay
                    onClose={() => setSelectedEventQuestionnaireId(undefined)}
                    scenarioQuestionnaires={questionnaires}
                    results={runtimeSurveyResults}
                    selectedQuestionnaireId={selectedEventQuestionnaireId}
                    scenarioInfo={scenarioInfo}
                    surveyId={surveyId}
                    invitationId={invitationId}
                  />
                ))
                .orNull()
            )
            .orNull()
        : null}
    </div>
  )
}

const calculateScenarioState = ({
  progressType,
  isFinalScoreSet,
  isFinalized,
  isRatingFinalized
}: {
  progressType?: ProjectModuleProgressType
  isFinalScoreSet: boolean
  isFinalized: boolean
  isRatingFinalized: boolean
}): ScenarioState => {
  switch (progressType) {
    case ProjectModuleProgressType.InProgress:
      return ScenarioState.InProgress
    case ProjectModuleProgressType.Completed:
      return isFinalScoreSet
        ? isFinalized || isRatingFinalized
          ? ScenarioState.ScoringFinalized
          : ScenarioState.ScoringCompleted
        : ScenarioState.Completed
    default:
      return ScenarioState.InProgress
  }
}

const styles = {
  tableFooter: {
    padding: 0,
    height: spacingMedium
  },
  label: {
    fontWeight: FontWeight.Bold,
    marginBottom: spacingTiny
  }
}
