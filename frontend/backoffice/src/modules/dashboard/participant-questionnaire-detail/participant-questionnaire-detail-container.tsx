import * as React from "react"
import {ParticipantQuestionnaireDetail, useRatings} from "shared/components"
import {ProgressIndicatorStatus, RaterMode, RatingStatus} from "shared/enums"
import {ProjectModuleProgressType} from "shared/graphql/generated/globalTypes"
import {
  useProject,
  useProjectModules,
  useQuestionnaire,
  useSurveyInvitationsProgress,
  useSurveyResultsOverview
} from "shared/graphql/hooks"
import {useAnsweredQuestionsForQuestionnaire} from "shared/graphql/hooks/queries/reporting/use-answered-questions-for-questionnaire"
import {useSurveyResultsForParticipant} from "shared/graphql/hooks/queries/reporting/use-survey-results-for-participant"
import {ProjectModuleScore, QuestionnaireScore} from "shared/models"
import {
  computeSurveyProgress,
  find,
  getCompletedParticipantsCount,
  isDefined,
  Option,
  sortByPosition
} from "shared/utils"
import {surveyPollingRate} from "../../monitoring/config/config"
import {useSupervisorChat} from "../../monitoring/dashboard/hooks/use-supervisor-chat"
import {ParticipantQuestionnaireFinalScoreOverlayContainer} from "./finalscore-overlay/participant-questionnaire-final-score-overlay-container"

export interface ParticipantQuestionnaireDetailContainerProps {
  readonly projectId: UUID
  readonly surveyId: UUID
  readonly surveyInvitationId: UUID
  readonly questionnaireId: UUID
  readonly onNavigateBack: () => void
}

export const ParticipantQuestionnaireDetailContainer: React.FC<ParticipantQuestionnaireDetailContainerProps> = ({
  projectId,
  surveyId,
  surveyInvitationId,
  questionnaireId,
  onNavigateBack
}) => {
  const {surveyInvitationsProgress, surveyInvitationsProgressLoading} = useSurveyInvitationsProgress(surveyId)
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)

  const pollingRate = surveyInvitationsProgress.exists(surveyInvitations =>
    surveyInvitations.every(surveyInvitation =>
      surveyInvitation.projectModuleProgresses.every(
        projectModuleProgress => projectModuleProgress.status === ProjectModuleProgressType.Completed
      )
    )
  )
    ? undefined
    : surveyPollingRate

  const {
    answeredQuestionsForQuestionnaire,
    answeredQuestionsForQuestionnaireLoading
  } = useAnsweredQuestionsForQuestionnaire(questionnaireId, surveyInvitationId, pollingRate)
  const {questionnaire, questionnaireLoading} = useQuestionnaire(questionnaireId)
  const {surveyResultsOverview, surveyResultsOverviewLoading} = useSurveyResultsOverview(surveyId)
  const {ratingsLoading, ratings} = useRatings(surveyId, RaterMode.FinalRater)
  const {projectLoading, project} = useProject(projectId)

  const [isScoringOverlayVisible, setIsScoringOverlayVisible] = React.useState(false)

  const {surveyResultsForParticipant, surveyResultsForParticipantLoading} = useSurveyResultsForParticipant(
    surveyId,
    surveyInvitationId
  )

  const rating = project.flatMap(({authorId}) => find(({userAccountId}) => userAccountId === authorId, ratings))

  const questionnaireScore: ProjectModuleScore[] = surveyResultsForParticipant
    .map(surveyResult =>
      surveyResult.projectModuleScores
        .filter(moduleScore => (moduleScore as QuestionnaireScore).questionnaireId === questionnaireId)
        .map(questionnaireScore => {
          return {
            score:
              questionnaireScore.score !== null
                ? questionnaireScore.score
                : rating.map(({finalizedAt}) => (isDefined(finalizedAt) ? 0 : null)).orNull(),
            maxScore: questionnaireScore.maximumScore,
            questionnaireId: (questionnaireScore as QuestionnaireScore).questionnaireId ?? null,
            scenarioId: null
          }
        })
    )
    .getOrElse([])

  const answeredQuestions = questionnaire
    .map(questionnaire =>
      sortByPosition(questionnaire.questions).map(question =>
        answeredQuestionsForQuestionnaire
          .map(answeredQuestionsForQuestionnaire =>
            answeredQuestionsForQuestionnaire.find(answeredQuestion => answeredQuestion === question.id) !== undefined
              ? ProgressIndicatorStatus.Completed
              : ProgressIndicatorStatus.Open
          )
          .getOrElse(ProgressIndicatorStatus.Open)
      )
    )
    .getOrElse([])

  const surveyProgress = Option.of(
    computeSurveyProgress(projectModules, surveyInvitationsProgress).find(
      progress => progress.id === surveyInvitationId
    )
  )

  const {
    isChatVisible,
    openChat,
    closeChat,
    setChatParticipantsIds,
    chatParticipants,
    messages,
    sendSupervisorMessage,
    isChatAccessible,
    navigateBackToDashboard,
    newParticipantMessages,
    isChatEnabledForSurvey
  } = useSupervisorChat(surveyId, projectId, surveyProgress.map(progress => [progress]).getOrElse([]))

  const moduleIndex = projectModules.findIndex(module => module.questionnaireId === questionnaireId) + 1
  const moduleIndexOption = Option.of(moduleIndex > 0 ? moduleIndex : null)

  const questionnaireAverageScore = surveyResultsOverview.flatMap(surveyResultsOverview =>
    find(project => project.questionnaireId === questionnaireId, surveyResultsOverview.projectModuleResults).map(
      result => result.averageScore
    )
  )

  const handleShowScoringOverlay = () => setIsScoringOverlayVisible(true)

  const isLoading =
    questionnaireLoading ||
    answeredQuestionsForQuestionnaireLoading ||
    projectModulesLoading ||
    questionnaireLoading ||
    surveyInvitationsProgressLoading ||
    surveyResultsForParticipantLoading ||
    surveyResultsOverviewLoading ||
    ratingsLoading ||
    projectLoading

  const ratingStatus = isDefined(questionnaireScore[0]?.score) ? RatingStatus.Completed : RatingStatus.RatingInProgress

  const moduleStatus = surveyInvitationsProgress
    .map(
      surveyInvitations =>
        surveyInvitations
          .find(invitation => invitation.id === surveyInvitationId)
          ?.projectModuleProgresses.find(projectModule => projectModule.questionnaireId === questionnaireId)?.status ??
        ProjectModuleProgressType.InProgress
    )
    .getOrElse(ProjectModuleProgressType.InProgress)

  const completedParticipantsCount = surveyResultsOverview
    .map(getCompletedParticipantsCount)
    .getOrElse({numCompletedParticipants: 0, totalParticipants: 0})

  const participantName = surveyProgress.map(progress => progress.displayName).getOrElse("")

  return (
    <>
      <ParticipantQuestionnaireDetail
        surveyInvitationId={surveyInvitationId}
        surveyProgress={surveyProgress}
        ratingStatus={ratingStatus}
        questionnaireProgress={answeredQuestions}
        questionnaireDescription={questionnaire.map(questionnaire => questionnaire.description).getOrElse("")}
        questionnaireTitle={questionnaire.map(questionnaire => questionnaire.title).getOrElse("")}
        questionnaireScore={questionnaireScore}
        chat={{
          isChatAccessible,
          isChatVisible,
          openChat,
          closeChat,
          setChatParticipantsIds,
          chatParticipants,
          messages,
          sendSupervisorMessage,
          navigateBackToDashboard,
          newParticipantMessages,
          isChatEnabledForSurvey
        }}
        index={moduleIndexOption}
        averageScore={questionnaireAverageScore}
        moduleStatus={moduleStatus}
        navigateBack={onNavigateBack}
        showScoringOverlay={handleShowScoringOverlay}
        completedParticipantsCount={completedParticipantsCount}
        isLoading={isLoading}
      />
      {isScoringOverlayVisible &&
        questionnaire
          .map(questionnaire => (
            <ParticipantQuestionnaireFinalScoreOverlayContainer
              surveyId={surveyId}
              onCloseOverlay={() => setIsScoringOverlayVisible(false)}
              participantName={participantName}
              questionnaireId={questionnaire.id}
              surveyInvitationId={surveyInvitationId}
            />
          ))
          .orNull()}
    </>
  )
}
