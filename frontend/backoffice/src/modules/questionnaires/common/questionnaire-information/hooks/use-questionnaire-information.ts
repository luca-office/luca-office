import {useState} from "react"
import {useDispatch} from "react-redux"
import {ColumnProps} from "shared/components"
import {QuestionnaireUpdate} from "shared/graphql/generated/globalTypes"
import {NavigationConfig, Questionnaire, QuestionnaireQuestion} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {isDefined} from "shared/utils"
import {OverlayEditCompositeFieldConfig, OverlayEditFieldType} from "../../../../../components"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {getQuestionsColumns} from "../../../config"

export interface UseQuestionnaireInformationHook {
  readonly descriptionField: OverlayEditCompositeFieldConfig
  readonly isEditable: boolean
  readonly isEditDurationModalVisible: boolean
  readonly navigateToQuestionDetails: (questionId: UUID) => void
  readonly questionnaireUpdate: QuestionnaireUpdate
  readonly questionsColumns: ColumnProps<QuestionnaireQuestion>[]
  readonly toggleIsEditDurationModalVisible: () => void
}

export type UseQuestionnaireInformationParams = {
  readonly deleteQuestion: (id: UUID) => void
  readonly hideActions: boolean
  readonly navigationQuestionConfig: NavigationConfig<Route>
  readonly openQuestionCreation: () => void
  readonly openQuestionsSortOverlay: () => void
  readonly questionnaire: Questionnaire
  readonly readonly: boolean
  readonly showQuestionScoring: boolean
}

export const useQuestionnaireInformation = ({
  deleteQuestion,
  hideActions,
  navigationQuestionConfig,
  openQuestionCreation,
  openQuestionsSortOverlay,
  questionnaire,
  readonly,
  showQuestionScoring
}: UseQuestionnaireInformationParams): UseQuestionnaireInformationHook => {
  const {t} = useLucaTranslation()

  const dispatch = useDispatch()

  const [isEditDurationModalVisible, setIsEditDurationModalVisible] = useState(false)

  const isEditable = !readonly && !isDefined(questionnaire.finalizedAt) && !isDefined(questionnaire.publishedAt)

  const descriptionField: OverlayEditCompositeFieldConfig = {
    updateId: "description",
    value: questionnaire.description,
    labelKey: "description",
    type: OverlayEditFieldType.TEXTAREA
  }

  const questionnaireUpdate: QuestionnaireUpdate = {
    binaryFileId: questionnaire.binaryFileId,
    description: questionnaire.description,
    questionnaireType: questionnaire.questionnaireType,
    title: questionnaire.title
  }

  const questionsColumns = getQuestionsColumns({
    openSortOverlay: openQuestionsSortOverlay,
    openCreation: openQuestionCreation,
    deleteQuestion,
    showQuestionScoring,
    isEditable,
    hideActionButtons: hideActions,
    t
  })

  const navigateToQuestionDetails = (questionId: UUID) => {
    dispatch(navigateToRouteAction(navigationQuestionConfig.route, {...navigationQuestionConfig.payload, questionId}))
  }

  return {
    isEditable,
    descriptionField,
    questionnaireUpdate,
    questionsColumns,
    navigateToQuestionDetails,
    isEditDurationModalVisible,
    toggleIsEditDurationModalVisible: () => setIsEditDurationModalVisible(!isEditDurationModalVisible)
  }
}
