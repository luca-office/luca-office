import * as React from "react"
import {useDispatch} from "react-redux"
import {ParticipantQuestionnaireDetail} from "shared/components"
import {ProgressIndicatorStatus, RatingStatus} from "shared/enums"
import {ProjectModuleProgressType} from "shared/graphql/generated/globalTypes"
import {
  useProjectModules,
  useQuestionnaire,
  useSurveyInvitationsProgress,
  useSurveyResultsOverview
} from "shared/graphql/hooks"
import {useAnsweredQuestionsForQuestionnaire, useSurveyResultsForParticipant} from "shared/graphql/hooks/queries"
import {ProjectModuleScore, QuestionnaireScore} from "shared/models"
import {computeSurveyProgress, find, getCompletedParticipantsCount, isDefined, Option} from "shared/utils"
import {navigateToRouteAction} from "../../../redux/actions/routing-action"
import {Route} from "../../../routes"

export interface ParticipantQuestionnaireDetailContainerProps {
  readonly projectId: UUID
  readonly surveyId: UUID
  readonly surveyInvitationId: UUID
  readonly questionnaireId: UUID
  readonly token: string
  readonly onNavigateBack: () => void
}

export const ParticipantQuestionnaireDetailContainer: React.FC<ParticipantQuestionnaireDetailContainerProps> = ({
  projectId,
  surveyId,
  surveyInvitationId,
  questionnaireId,
  onNavigateBack,
  token
}) => {
  const dispatch = useDispatch()

  const {surveyInvitationsProgress, surveyInvitationsProgressLoading} = useSurveyInvitationsProgress(surveyId)
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)
  const {
    answeredQuestionsForQuestionnaire,
    answeredQuestionsForQuestionnaireLoading
  } = useAnsweredQuestionsForQuestionnaire(questionnaireId, surveyInvitationId)
  const {questionnaire, questionnaireLoading} = useQuestionnaire(questionnaireId)
  const {surveyResultsOverview, surveyResultsOverviewLoading} = useSurveyResultsOverview(surveyId)

  const {surveyResultsForParticipant, surveyResultsForParticipantLoading} = useSurveyResultsForParticipant(
    surveyId,
    surveyInvitationId
  )

  const questionnaireScore: ProjectModuleScore[] = surveyResultsForParticipant
    .map(surveyResult =>
      surveyResult.projectModuleScores
        .filter(moduleScore => (moduleScore as QuestionnaireScore).questionnaireId === questionnaireId)
        .map(questionnaireScore => ({
          score: questionnaireScore.score ?? 0,
          maxScore: questionnaireScore.maximumScore,
          questionnaireId: (questionnaireScore as QuestionnaireScore).questionnaireId ?? null,
          scenarioId: null
        }))
    )
    .getOrElse([])

  const answeredQuestions = questionnaire
    .map(questionnaire =>
      questionnaire.questions.map(question =>
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

  const participantName = surveyProgress.map(progress => progress.displayName).getOrElse("")

  const moduleIndex = projectModules.findIndex(module => module.questionnaireId === questionnaireId) + 1
  const moduleIndexOption = Option.of(moduleIndex > 0 ? moduleIndex : null)

  const questionnaireAverageScore = surveyResultsOverview.flatMap(surveyResultsOverview =>
    find(project => project.questionnaireId === questionnaireId, surveyResultsOverview.projectModuleResults).map(
      result => result.averageScore
    )
  )

  const showScoringOverlay = () =>
    dispatch(
      navigateToRouteAction({
        routeType: Route.ReportQuestionnaireScoringOverlay,
        parameters: {surveyInvitationId, questionnaireId, surveyId, token, participantName}
      })
    )

  const isLoading =
    questionnaireLoading ||
    answeredQuestionsForQuestionnaireLoading ||
    projectModulesLoading ||
    questionnaireLoading ||
    surveyInvitationsProgressLoading ||
    surveyResultsForParticipantLoading ||
    surveyResultsOverviewLoading

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

  return (
    <ParticipantQuestionnaireDetail
      surveyInvitationId={surveyInvitationId}
      surveyProgress={surveyProgress}
      ratingStatus={ratingStatus}
      questionnaireProgress={answeredQuestions}
      questionnaireDescription={questionnaire.map(questionnaire => questionnaire.description).getOrElse("")}
      questionnaireTitle={questionnaire.map(questionnaire => questionnaire.title).getOrElse("")}
      questionnaireScore={questionnaireScore}
      index={moduleIndexOption}
      averageScore={questionnaireAverageScore}
      moduleStatus={moduleStatus}
      navigateBack={onNavigateBack}
      showScoringOverlay={showScoringOverlay}
      completedParticipantsCount={completedParticipantsCount}
      isLoading={isLoading}
      isOfficeReporting={true}
    />
  )
}
