import {isEqual} from "lodash-es"
import * as React from "react"
import {Payload} from "redux-first-router"
import {RaterMode} from "../../../../../../enums"
import {
  ProjectModuleProgressType,
  ProjectModuleType,
  QuestionScoringType
} from "../../../../../../graphql/generated/globalTypes"
import {
  useCheckLogin,
  useProjectModules,
  useProjectNameForSurvey,
  useSurveyInvitations,
  useSurveyInvitationsProgress
} from "../../../../../../graphql/hooks"
import {
  NavigationConfig,
  ParticipantData,
  ProjectModule,
  Questionnaire,
  SurveyInvitationLight,
  SurveyInvitationProgress,
  UserAccount
} from "../../../../../../models"
import {Route} from "../../../../../../routes"
import {find, indexOf} from "../../../../../../utils/array"
import {Option} from "../../../../../../utils/option"
import {getParticipantNameOrToken} from "../../../../../../utils/participants"
import {sortByPosition} from "../../../../../../utils/sort"
import {Subject} from "../../../../../../utils/subject"
import {useRating} from "../../../../hooks"

export interface UseRatingDetailQuestionnaireHook {
  readonly projectName: Option<string>
  readonly projectModules: ProjectModule[]
  readonly participant: Option<SurveyInvitationProgress>
  readonly participants: Option<SurveyInvitationProgress[]>
  readonly participantIndex: number
  readonly participantName: string
  readonly dataLoading: boolean
  readonly navigateToOverview: () => void
  readonly navigateToModule: (module: ProjectModule) => void
  readonly navigateToParticipantWithIndexOffset: (offset: number) => void
  readonly navigateToQuestionWithIndexOffset: (offset: number) => void
  readonly questionnaire: Option<Questionnaire>
  readonly selectedEntityId: Option<UUID>
  readonly selectEntityId: (id: Option<UUID>) => void
  readonly ratingId: Option<UUID>
  readonly participantFinishedModule: boolean
  readonly fetchFreetextQuestionRatingsSubject: Subject<void>
  readonly isReadonly: boolean
  readonly isNotRatable: boolean
  readonly isContentMissing: boolean
}

interface UseRatingDetailQuestionnaireParams<TRoute> {
  readonly projectId: UUID
  readonly surveyId: UUID
  readonly moduleId: UUID
  readonly surveyInvitationId?: UUID
  readonly questionId?: UUID
  readonly navigationOverviewConfig?: NavigationConfig<TRoute>
  readonly mode: RaterMode
  readonly disabled: boolean
  readonly raterId?: UUID
  readonly navigateTo: (route: TRoute | Route, payload?: Payload) => void
}

export const useRatingDetailQuestionnaire = <TRoute>({
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
}: UseRatingDetailQuestionnaireParams<TRoute>): UseRatingDetailQuestionnaireHook => {
  const projectModuleRef = React.useRef<ProjectModule | null>(null)
  const surveyInvitationsRef = React.useRef<SurveyInvitationLight[]>([])
  const surveyInvitationsProgressRef = React.useRef<Option<SurveyInvitationProgress[]>>(Option.none())

  const {projectName, projectNameLoading} = useProjectNameForSurvey(surveyId)
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)
  const projectModule = find(projectModule => projectModule.id === moduleId, projectModules)
  const {surveyInvitationsProgress, surveyInvitationsProgressLoading} = useSurveyInvitationsProgress(surveyId)
  const {account: userAccount, checkLoginLoading: userAccountLoading} = useCheckLogin()

  const {isContentMissing, ratingsLoading, ratingId, isReadonly} = useRating({
    surveyId,
    mode,
    projectModulesLoading,
    projectModule,
    userAccount: userAccount.safeAsSubtype<UserAccount>(),
    raterId,
    disabled
  })

  const {surveyInvitations, surveyInvitationsLoading} = useSurveyInvitations(surveyId)

  if (!isEqual(projectModuleRef.current, projectModule.orNull())) {
    projectModuleRef.current = projectModule.orNull()
  }

  if (!isEqual(surveyInvitationsRef.current, surveyInvitations)) {
    surveyInvitationsRef.current = surveyInvitations
  }

  if (!isEqual(surveyInvitationsProgressRef.current, surveyInvitationsProgress)) {
    surveyInvitationsProgressRef.current = surveyInvitationsProgress
  }

  const questionnaireOption = projectModule.map(module => module.questionnaire as Questionnaire)
  const questions = questionnaireOption
    .map(questionnaire => questionnaire.questions.filter(question => question.scoringType !== QuestionScoringType.None))
    .getOrElse([])
  const sortedQuestions = React.useMemo(() => {
    const filteredQuestions = questions.filter(question => question.scoringType !== QuestionScoringType.None)
    return sortByPosition(filteredQuestions)
  }, [questions])

  const fetchFreetextQuestionRatingsSubject = new Subject<void>()

  const navigateToOverview = () =>
    navigationOverviewConfig
      ? navigateTo(navigationOverviewConfig.route, navigationOverviewConfig.payload)
      : navigateTo(Route.SurveyMonitoring, {
          projectId,
          surveyId,
          moduleId
        })

  const navigateToScenario = (module: ProjectModule) => {
    navigateTo(
      mode === RaterMode.FinalRater
        ? Route.RatingOverviewSurveyModuleParticipantScenario
        : Route.RatingOverviewSurveyModuleParticipantScenarioNormalRater,
      {
        id: projectId,
        surveyId,
        surveyInvitationId,
        moduleId: module.id,
        scenarioId: module.scenarioId
      }
    )
  }
  const navigateToElement = ({
    newModuleId,
    newSurveyInvitationId,
    newQuestionId
  }: {
    readonly newModuleId?: UUID
    readonly newSurveyInvitationId?: UUID
    readonly newQuestionId?: UUID
  }) => {
    navigateTo(
      mode === RaterMode.FinalRater
        ? Route.RatingOverviewSurveyModuleParticipantQuestionnaireQuestion
        : Route.RatingOverviewSurveyModuleParticipantQuestionnaireQuestionNormalRater,
      {
        id: projectId,
        surveyId,
        surveyInvitationId: newSurveyInvitationId ?? surveyInvitationId,
        moduleId: newModuleId ?? moduleId,
        questionId: newQuestionId ?? questionId
      }
    )
  }
  const navigateToQuestion = (questionId: UUID) => navigateToElement({newQuestionId: questionId})
  const navigateToParticipant = (invitationId: UUID) => navigateToElement({newSurveyInvitationId: invitationId})
  const navigateToModule = (module: ProjectModule) =>
    module.moduleType === ProjectModuleType.Questionnaire
      ? navigateToElement({newModuleId: module.id})
      : navigateToScenario(module)

  const getAtIndex = <T>(array: T[], index: number): T => {
    // enable rotating navigation
    index = (index >= 0 ? index : array.length - 1) % array.length
    return array[index]
  }

  const navigateToQuestionWithIndexOffset = (offset: number) => {
    const currQuestion = sortedQuestions.find(question => question.id === questionId)
    const currQuestionIndex = indexOf(currQuestion, sortedQuestions)

    navigateToQuestion(getAtIndex(sortedQuestions, currQuestionIndex + offset).id)
  }

  const participantsOption = surveyInvitationsProgress
  const participant = find(progress => progress.id === surveyInvitationId, surveyInvitationsProgress.getOrElse([]))
  const participantData = participant.map(participant => participant.participantData).orUndefined()
  const participantToken = participant.map(participant => participant.token).getOrElse("")
  const participantName = getParticipantNameOrToken(participantData as ParticipantData, participantToken)
  const participantIndex = participant.map(p => indexOf(p, participantsOption.getOrElse([]))).getOrElse(-1)

  const participantFinishedModule = React.useMemo(() => {
    const projectModuleProgresses = surveyInvitationsProgress
      .map(surveyInvitationProgress =>
        surveyInvitationProgress.find(surveyInvitationProgress => surveyInvitationProgress.id === surveyInvitationId)
      )
      .map(surveyInvitationProgress => surveyInvitationProgress?.projectModuleProgresses ?? [])
      .getOrElse([])

    const currentModuleProgress = find(
      moduleProgress => moduleProgress.questionnaireId === projectModuleRef.current?.questionnaire?.id,
      projectModuleProgresses
    )

    return currentModuleProgress.exists(moduleProgress => moduleProgress.status === ProjectModuleProgressType.Completed)
  }, [projectModuleRef.current, surveyInvitationId, surveyInvitationsProgressRef.current])

  const hasData = questionnaireOption.exists(
    ({questions}) => questions.filter(question => question.scoringType !== QuestionScoringType.None).length > 0
  )
  const isNotRatable = !participantFinishedModule || !hasData

  const navigateToParticipantWithIndexOffset = (offset: number) => {
    const participants = participantsOption.getOrElse([])
    navigateToParticipant(getAtIndex(participants, participantIndex + offset).id)
  }

  const selectedEntityId = Option.of(questionId)
  const selectEntityId = (nodeId: Option<UUID>) => nodeId.forEach(navigateToQuestion)

  return {
    projectName,
    projectModules,
    participant,
    participantIndex,
    participantName,
    participants: participantsOption,
    dataLoading:
      projectNameLoading ||
      projectModulesLoading ||
      ratingsLoading ||
      surveyInvitationsLoading ||
      surveyInvitationsProgressLoading ||
      userAccountLoading,
    navigateToOverview,
    questionnaire: questionnaireOption,
    selectedEntityId,
    selectEntityId,
    navigateToModule,
    navigateToParticipantWithIndexOffset,
    navigateToQuestionWithIndexOffset,
    ratingId,
    participantFinishedModule,
    fetchFreetextQuestionRatingsSubject,
    isReadonly,
    isNotRatable,
    isContentMissing
  }
}
