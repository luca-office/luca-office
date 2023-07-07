import * as React from "react"
import {useDispatch, useSelector} from "react-redux"
import {
  ScenarioQuestionnairesProps,
  UpdateQuestionnaireProps,
  useDeleteQuestionnaireQuestion,
  useDuplicateQuestionnaire,
  useFinalizeQuestionnaire,
  usePublishQuestionnaire,
  useQuestionnaire,
  useRepositionQuestionnaireQuestion,
  useScenario,
  useScenarioQuestionnaires,
  useUpdateQuestionnaire
} from "shared/graphql/hooks"
import {Questionnaire, QuestionnaireQuestion} from "shared/models"
import {Option} from "shared/utils"
import {QuestionnaireDetailMode} from "../../../../enums"
import {useCheckUserClaims} from "../../../../hooks/use-check-user-claims"
import {ResortableEntity, ResortedEntity} from "../../../../models"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {AppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"
import {convertQuestionsToResortableEntity} from "../../utils"
import {QuestionnaireDetailsProps} from "../questionnaire-detail"

export interface UseQuestionnaireDetailHook
  extends Pick<UpdateQuestionnaireProps, "updateQuestionnaire">,
    Pick<ScenarioQuestionnairesProps, "scenarioQuestionnaires"> {
  readonly actionsLoading: boolean
  readonly dataLoading: boolean
  readonly deleteQuestion: (id: UUID) => void
  readonly handleBackNavigation: () => void
  readonly handleEventsNavigation: () => void
  readonly handleOperation: () => void
  readonly handlePublish: () => void
  readonly handleFinalize: () => void
  readonly isEventSelection: boolean
  readonly isPreviewVisible: boolean
  readonly isProjectQuestionnaire: boolean
  readonly isQuestionnaireFinalizedOrPublished: boolean
  readonly isRuntimeSurvey: boolean
  readonly isScenarioReadOnly: boolean
  readonly navigateToQuestion: (questionnaireId: UUID, questionId: UUID) => void
  readonly navigateToQuestionnaire: () => void
  readonly questionCreationVisible: boolean
  readonly questionnaire: Option<Questionnaire>
  readonly repositionQuestions: (orderedEntities: ResortedEntity[]) => Promise<Option<QuestionnaireQuestion>[]>
  readonly resortModalVisible: boolean
  readonly selectedEntityId: Option<UUID>
  readonly selectEntityId: (id: Option<UUID>) => void
  readonly setIsPreviewVisible: (isVisible: boolean) => void
  readonly setQuestionCreationVisible: (isVisible: boolean) => void
  readonly setResortModalVisible: (isVisible: boolean) => void
  readonly sortableQuestions: Option<ResortableEntity[]>
  readonly userMayArchive: boolean
  readonly userMayFinalizeWithoutPublishing: boolean
}

type UseQuestionnaireDetailParams = Pick<QuestionnaireDetailsProps, "displayMode"> &
  Pick<QuestionnaireDetailsProps, "questionnaireId"> &
  Pick<QuestionnaireDetailsProps, "questionId"> &
  Pick<QuestionnaireDetailsProps, "scenarioId"> &
  Pick<QuestionnaireDetailsProps, "navigationQuestionConfig"> &
  Pick<QuestionnaireDetailsProps, "navigationDetailsConfig"> &
  Pick<QuestionnaireDetailsProps, "navigationOverviewConfig">

export const useQuestionnaireDetail = (params: UseQuestionnaireDetailParams): UseQuestionnaireDetailHook => {
  const {
    displayMode,
    navigationDetailsConfig,
    navigationOverviewConfig,
    navigationQuestionConfig,
    questionId,
    questionnaireId,
    scenarioId
  } = params
  const dispatch = useDispatch()
  const isRuntimeSurvey = displayMode === QuestionnaireDetailMode.RuntimeSurvey

  // actions and questionnaire queries will only be executed in context with a valid id
  // thus, non null asserting to prevent falsy typechecking (per line)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {questionnaire: questionnaireOption, questionnaireLoading} = useQuestionnaire(questionnaireId!)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {updateQuestionnaire, updateQuestionnaireLoading} = useUpdateQuestionnaire(questionnaireId!, isRuntimeSurvey)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {finalizeQuestionnaire, finalizeQuestionnaireLoading} = useFinalizeQuestionnaire(
    questionnaireId,
    isRuntimeSurvey
  )

  const {publishQuestionnaire} = usePublishQuestionnaire()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {duplicateQuestionnaire, duplicateQuestionnaireLoading} = useDuplicateQuestionnaire(questionnaireId!)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {deleteEntity: deleteQuestion, deleteEntityLoading} = useDeleteQuestionnaireQuestion(questionnaireId)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {scenario: scenarioOption, scenarioLoading} = useScenario(scenarioId!)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {scenarioQuestionnaires, scenarioQuestionnairesLoading} = useScenarioQuestionnaires(scenarioId!)
  const {repositionQuestionnaireQuestion, repositionQuestionnaireQuestionLoading} = useRepositionQuestionnaireQuestion(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    questionnaireId!
  )

  const {userClaimsCheckLoading, userClaims} = useCheckUserClaims(
    questionnaireOption.map(questionnaire => questionnaire.authorId)
  )
  const [questionCreationVisible, setQuestionCreationVisible] = React.useState(false)
  const [resortModalVisible, setResortModalVisible] = React.useState(false)
  const [isPreviewVisible, setIsPreviewVisible] = React.useState(false)

  const sortableQuestions = convertQuestionsToResortableEntity(
    questionnaireOption.map(questionnaireData => questionnaireData.questions)
  )

  const isQuestionnaireFinalizedOrPublished = questionnaireOption.exists(
    questionnaire => questionnaire.finalizedAt !== null || questionnaire.publishedAt !== null
  )
  const isScenarioReadOnly = scenarioOption.exists(
    scenario => scenario.finalizedAt !== null || scenario.publishedAt !== null
  )
  const selectedQuestionnaireId = useSelector<AppState, string | undefined>(store =>
    isRuntimeSurvey ? store.location?.payload.eventId : store.location?.payload.questionnaireId
  )

  const handlePublish = () => {
    questionnaireOption.forEach(questionnaire => publishQuestionnaire(questionnaire.id))
  }

  const handleOperation = () => {
    if (displayMode === QuestionnaireDetailMode.ScenarioRuntimeSurvey) {
      setIsPreviewVisible(true)
    } else {
      questionnaireOption.map(questionnaireData => {
        if (questionnaireData.finalizedAt || questionnaireData.publishedAt) {
          duplicateQuestionnaire(isRuntimeSurvey).then(questionnaireOption =>
            questionnaireOption.map(questionnaire =>
              dispatch(
                navigateToRouteAction(isRuntimeSurvey ? Route.EventDetail : Route.QuestionnaireDetail, {
                  [isRuntimeSurvey ? "eventId" : "questionnaireId"]: questionnaire.id
                })
              )
            )
          )
        } else {
          handlePublish()
        }
      })
    }
  }

  const handleBackNavigation = () => {
    return navigationOverviewConfig
      ? dispatch(navigateToRouteAction(navigationOverviewConfig.route, navigationOverviewConfig.payload))
      : dispatch(navigateToRouteAction(isRuntimeSurvey ? Route.Events : Route.Questionnaires))
  }
  // selection pages are irrelevant as this function is only used for delete question navigation!
  const navigateToQuestionnaire = () =>
    isRuntimeSurvey
      ? dispatch(navigateToRouteAction(Route.EventDetail, {eventId: questionnaireId}))
      : dispatch(navigateToRouteAction(Route.QuestionnaireDetail, {questionnaireId}))

  const handleEventsNavigation = () =>
    dispatch(navigateToRouteAction(Route.ScenarioQuestionnaireSelection, {scenarioId}))

  const navigateToDetailView = (id: UUID, scenarioId?: UUID) => {
    if (navigationDetailsConfig) {
      dispatch(
        navigateToRouteAction(navigationDetailsConfig.route, {...navigationDetailsConfig.payload, questionnaireId: id})
      )
      return
    }

    dispatch(
      navigateToRouteAction(isRuntimeSurvey ? Route.EventDetail : Route.QuestionnaireDetail, {
        ...(isRuntimeSurvey ? {eventId: id} : {questionnaireId: id}),
        scenarioId
      })
    )
  }

  const navigateToQuestion = (id: UUID, questionId?: UUID, scenarioId?: UUID) => {
    if (navigationQuestionConfig) {
      dispatch(navigateToRouteAction(navigationQuestionConfig.route, {...navigationQuestionConfig.payload, questionId}))
      return
    }

    dispatch(
      navigateToRouteAction(isRuntimeSurvey ? Route.EventDetailQuestion : Route.QuestionnaireDetailQuestion, {
        eventId: id,
        questionnaireId: id,
        questionId,
        scenarioId: scenarioId
      })
    )
  }

  const selectedEntityId = Option.of(questionId).orElse(Option.of(selectedQuestionnaireId))

  const selectEntityId = (nodeId: Option<UUID>) => {
    if (nodeId.isEmpty()) {
      return
    }

    nodeId.forEach(id => {
      // if a questionnaire is present, route to it
      if (
        scenarioQuestionnaires.exists(questionnaires =>
          questionnaires.some(questionnaireData => questionnaireData.questionnaireId === id)
        ) ||
        questionnaireOption.exists(questionnaire => questionnaire.id === id)
      ) {
        navigateToDetailView(id, scenarioId)
      } else {
        //otherwise route to question
        navigateToQuestion(questionnaireId, id, scenarioId)
      }
    })
  }

  const repositionQuestions = (orderedEntities: ResortedEntity[]) =>
    Promise.all(orderedEntities.map(({id, predecessorId}) => repositionQuestionnaireQuestion(id, predecessorId)))

  return {
    actionsLoading:
      updateQuestionnaireLoading ||
      deleteEntityLoading ||
      finalizeQuestionnaireLoading ||
      repositionQuestionnaireQuestionLoading ||
      duplicateQuestionnaireLoading,
    dataLoading: questionnaireLoading || scenarioLoading || scenarioQuestionnairesLoading,
    questionnaire: questionnaireOption,
    scenarioQuestionnaires,
    navigateToQuestion,
    updateQuestionnaire,
    deleteQuestion,
    handleBackNavigation,
    handleEventsNavigation,
    handlePublish,
    handleFinalize: finalizeQuestionnaire,
    handleOperation,
    isEventSelection: displayMode === QuestionnaireDetailMode.ScenarioRuntimeSurvey,
    isProjectQuestionnaire: displayMode === QuestionnaireDetailMode.ProjectQuestionnaire,
    isQuestionnaireFinalizedOrPublished,
    isScenarioReadOnly,
    isRuntimeSurvey,
    navigateToQuestionnaire,
    questionCreationVisible,
    setQuestionCreationVisible,
    selectedEntityId,
    selectEntityId,
    repositionQuestions,
    resortModalVisible,
    setResortModalVisible,
    sortableQuestions,
    isPreviewVisible,
    setIsPreviewVisible,
    userMayArchive: !userClaimsCheckLoading && userClaims.mayArchive,
    userMayFinalizeWithoutPublishing: !userClaimsCheckLoading && userClaims.mayFinalizeWithoutPublishing
  }
}
