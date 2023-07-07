import {pick} from "lodash-es"
import * as React from "react"
import {useDispatch} from "react-redux"
import {InterventionGroupType, InterventionHeaderGroupType} from "shared/enums"
import {
  QuestionnaireAnswerUpdate,
  QuestionnaireQuestionUpdate,
  QuestionType
} from "shared/graphql/generated/globalTypes"
import {
  useCreateFreetextQuestionCodingCriterion,
  useCreateQuestionnaireAnswer,
  useDeleteFreetextQuestionCodingCriterion,
  useDeleteQuestionnaireAnswer,
  useDeleteQuestionnaireQuestion,
  useInterventions,
  useQuestionnaireQuestion,
  useRepositionQuestionnaireAnswer,
  useScenario,
  useUpdateFreetextQuestionCodingCriterion,
  useUpdateQuestionnaireAnswer,
  useUpdateQuestionnaireQuestion
} from "shared/graphql/hooks"
import {
  FreetextQuestionCodingCriterion,
  QuestionnaireAnswer,
  QuestionnaireQuestion,
  RuntimeSurveyAnswerSelectionIntervention
} from "shared/models"
import {Option} from "shared/utils"
import {ResortableEntity, ResortedEntity} from "../../../../../models"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {getInterventionsForTypeName} from "../../../../scenario-interventions/utils"
import {QuestionAnswerTableEntity} from "../../../config"
import {convertAnswersToResortableEntity} from "../../../utils"

interface QuestionnaireQuestionInterventionsConfig {
  readonly isCreateInterventionModalVisible: boolean
  readonly scenarioMaxDurationInSeconds: number
  readonly runtimeSurveyAnswerSelectionInterventions: RuntimeSurveyAnswerSelectionIntervention[]
  readonly setSelectedAnswerForInterventionsSetting: React.Dispatch<
    React.SetStateAction<Option<QuestionAnswerTableEntity>>
  >
  readonly toggleIsCreateInterventionModalVisible: () => void
  readonly selectedAnswerForInterventionsSetting: Option<QuestionAnswerTableEntity>
  readonly navigateToInterventions: () => void
  readonly isScenarioReadOnly: boolean
}

export interface UseQuestionnaireQuestionDetailHook {
  readonly question: Option<QuestionnaireQuestion>
  readonly actionsLoading: boolean
  readonly dataLoading: boolean
  readonly deleteAnswer: (id: UUID) => void
  readonly deleteQuestion: (id: UUID) => Promise<void>
  readonly handleCreateAnswer: () => void
  readonly isChangeQuestionTypeModalVisible: boolean
  readonly interventionsConfig: QuestionnaireQuestionInterventionsConfig
  readonly openAnswersSortOverlay: () => void
  readonly repositionAnswers: (orderedEntities: ResortedEntity[]) => Promise<Option<QuestionnaireAnswer>[]>
  readonly resortModalVisible: boolean
  readonly setChangeQuestionTypeModalVisible: (modalVisible: boolean) => void
  readonly setResortModalVisible: (isVisible: boolean) => void
  readonly sortableAnswers: Option<ResortableEntity[]>
  readonly toggleFreeTextAnswer: (isAdditionalTextAnswerAllowed: boolean) => void
  readonly updateQuestionnaireQuestion: (update: QuestionnaireQuestionUpdate) => void
  readonly updateQuestionnaireAnswer: (
    answerId: UUID,
    update: QuestionAnswerTableEntity
  ) => Promise<Option<QuestionnaireAnswer>> | Promise<Option<FreetextQuestionCodingCriterion>>
  readonly createDefaultHolisticAnswer: () => void
}

export const useQuestionnaireQuestionDetail = (
  questionnaireId: UUID,
  questionId: UUID,
  navigateToQuestionnaire: () => void,
  scenarioIdForInterventions?: UUID // Use only for interventions
): UseQuestionnaireQuestionDetailHook => {
  const [isChangeQuestionTypeModalVisible, setChangeQuestionTypeModalVisible] = React.useState(false)
  const [resortModalVisible, setResortModalVisible] = React.useState(false)
  const [selectedAnswerForInterventionsSetting, setSelectedAnswerForInterventionsSetting] = React.useState<
    Option<QuestionAnswerTableEntity>
  >(Option.none())
  const [isCreateInterventionModalVisible, setIsCreateInterventionModalVisible] = React.useState(false)

  const dispatch = useDispatch()

  const {questionnaireQuestion: questionOption, questionnaireQuestionLoading} = useQuestionnaireQuestion(questionId)
  const {interventions, interventionsLoading} = useInterventions(
    scenarioIdForInterventions ?? "",
    scenarioIdForInterventions === undefined
  )
  const {scenario} = useScenario(scenarioIdForInterventions ?? "", scenarioIdForInterventions === undefined)
  const {updateQuestionnaireQuestion, updateQuestionnaireQuestionLoading} = useUpdateQuestionnaireQuestion(questionId)
  const {updateQuestionnaireAnswer, updateQuestionnaireAnswerLoading} = useUpdateQuestionnaireAnswer(questionId)
  const {
    updateFreetextQuestionCodingCriterion,
    updateFreetextQuestionCodingCriterionLoading
  } = useUpdateFreetextQuestionCodingCriterion(questionId)
  const {deleteEntity: deleteQuestion, deleteEntityLoading} = useDeleteQuestionnaireQuestion(questionnaireId)
  const {deleteEntity: deleteAnswer, deleteEntityLoading: deleteAnswerLoading} = useDeleteQuestionnaireAnswer(
    questionId
  )
  const {
    deleteEntity: deleteFreetextCriterion,
    deleteEntityLoading: deleteFreetextCriterionLoading
  } = useDeleteFreetextQuestionCodingCriterion(questionId)
  const {createQuestionnaireAnswer, createQuestionnaireAnswerLoading} = useCreateQuestionnaireAnswer()
  const {
    createFreetextQuestionCodingCriterion,
    createFreetextQuestionCodingCriterionLoading
  } = useCreateFreetextQuestionCodingCriterion()
  const {repositionQuestionnaireAnswer, repositionQuestionnaireAnswerLoading} = useRepositionQuestionnaireAnswer(
    questionId
  )

  const isFreetext = questionOption.map(question => question.questionType === QuestionType.FreeText).getOrElse(false)
  const handleToggleFreeTextAnswer = (isAdditionalTextAnswerAllowed: boolean) =>
    questionOption.forEach(question => {
      updateQuestionnaireQuestion({
        isAdditionalTextAnswerAllowed,
        ...pick(question, "binaryFileId", "text", "questionType", "scoringType", "score")
      })
    })
  const handleCreateAnswer = () => {
    if (isFreetext) {
      createFreetextQuestionCodingCriterion({description: "", questionId, score: 1})
    } else {
      createQuestionnaireAnswer({questionId, isCorrect: false, text: ""})
    }
  }
  const createDefaultHolisticAnswer = () =>
    isFreetext && createFreetextQuestionCodingCriterion({description: "", questionId, score: 0})
  const handeUpdateQuestionnaireAnswer = (answerId: UUID, update: QuestionAnswerTableEntity) => {
    if (isFreetext) {
      return updateFreetextQuestionCodingCriterion(answerId, {score: update.score || 0, description: update.text})
    } else {
      // make sure single choice selection clears other selected answers
      questionOption.forEach(question => {
        if (question.questionType === QuestionType.SingleChoice && (update as QuestionnaireAnswerUpdate).isCorrect) {
          question.answers
            .filter(answer => answer.id !== answerId && answer.isCorrect)
            .forEach(answer => updateQuestionnaireAnswer(answer.id, {text: answer.text, isCorrect: false}))
        }
      })

      return updateQuestionnaireAnswer(answerId, {
        text: update.text,
        isCorrect: !!update.isCorrect
      })
    }
  }
  const repositionAnswers = (orderedEntities: ResortedEntity[]) =>
    Promise.all(orderedEntities.map(({id, predecessorId}) => repositionQuestionnaireAnswer(id, predecessorId)))
  const sortableAnswers = convertAnswersToResortableEntity(questionOption.map(data => data.answers))

  const handleDeleteAnswer = (id: UUID) => {
    if (isFreetext) {
      return deleteFreetextCriterion(id)
    } else {
      return deleteAnswer(id)
    }
  }

  const handleDeleteQuestion = (id: UUID) =>
    new Promise<void>((resolve, reject) => {
      deleteQuestion(id)
        .then(() => {
          navigateToQuestionnaire()
          resolve()
        })
        .catch(reject)
    })

  const navigateToInterventions = () =>
    dispatch(
      navigateToRouteAction(Route.ScenarioInterventionsGroupEntityDetail, {
        scenarioId: scenarioIdForInterventions,
        groupType: InterventionGroupType.Event,
        headerGroupType: InterventionHeaderGroupType.Event,
        groupEntityId: questionnaireId
      })
    )

  return {
    actionsLoading:
      updateQuestionnaireQuestionLoading ||
      deleteEntityLoading ||
      deleteAnswerLoading ||
      deleteFreetextCriterionLoading ||
      createQuestionnaireAnswerLoading ||
      updateQuestionnaireAnswerLoading ||
      repositionQuestionnaireAnswerLoading ||
      updateFreetextQuestionCodingCriterionLoading ||
      interventionsLoading ||
      createFreetextQuestionCodingCriterionLoading,
    dataLoading: questionnaireQuestionLoading,
    deleteAnswer: handleDeleteAnswer,
    deleteQuestion: handleDeleteQuestion,
    handleCreateAnswer,
    isChangeQuestionTypeModalVisible,
    interventionsConfig: {
      isCreateInterventionModalVisible,
      isScenarioReadOnly: scenario.exists(scenario => scenario.publishedAt !== null || scenario.finalizedAt !== null),
      runtimeSurveyAnswerSelectionInterventions: getInterventionsForTypeName(
        interventions.getOrElse([]),
        "RuntimeSurveyAnswerSelectionIntervention"
      ) as RuntimeSurveyAnswerSelectionIntervention[],
      setSelectedAnswerForInterventionsSetting,
      toggleIsCreateInterventionModalVisible: () =>
        setIsCreateInterventionModalVisible(!isCreateInterventionModalVisible),
      scenarioMaxDurationInSeconds: scenario.map(scenario => scenario.maxDurationInSeconds || 0).getOrElse(0),
      selectedAnswerForInterventionsSetting,
      navigateToInterventions
    },
    openAnswersSortOverlay: () => setResortModalVisible(true),
    question: questionOption,
    repositionAnswers,
    resortModalVisible,
    setChangeQuestionTypeModalVisible,
    setResortModalVisible,
    sortableAnswers,
    toggleFreeTextAnswer: handleToggleFreeTextAnswer,
    updateQuestionnaireAnswer: handeUpdateQuestionnaireAnswer,
    updateQuestionnaireQuestion,
    createDefaultHolisticAnswer
  }
}
