import * as React from "react"
import {QuestionType} from "shared/graphql/generated/globalTypes"
import {QuestionnaireQuestion} from "shared/models"
import {ChooseQuestionnaireQuestionTypeModal} from "../choose-questionnaire-question-type-modal/choose-questionnaire-question-type-modal"
import {useUpdateQuestionnaireQuestionTypeModal} from "./hooks/use-update-questionnaire-question-type-modal"

export interface UpdateQuestionnaireQuestionTypeModalProps {
  readonly question: QuestionnaireQuestion
  readonly onDismiss: () => void
}

export const UpdateQuestionnaireQuestionTypeModal: React.FC<UpdateQuestionnaireQuestionTypeModalProps> = ({
  onDismiss,
  question
}) => {
  const {
    updateQuestion,
    actionLoading,
    selectedQuestionType,
    setSelectedQuestionType,
    errorMessage
  } = useUpdateQuestionnaireQuestionTypeModal(question)
  const handleConfirm = (questionType: QuestionType) => updateQuestion(questionType).then(() => onDismiss())

  return (
    <ChooseQuestionnaireQuestionTypeModal
      onDismiss={onDismiss}
      disabled={actionLoading}
      onConfirm={handleConfirm}
      selectedQuestionType={selectedQuestionType}
      setSelectedQuestionType={setSelectedQuestionType}
      errorMessage={errorMessage.orUndefined()}
    />
  )
}
