import * as React from "react"
import {QuestionType} from "shared/graphql/generated/globalTypes"
import {ChooseQuestionnaireQuestionTypeModal} from "../choose-questionnaire-question-type-modal/choose-questionnaire-question-type-modal"
import {useCreateQuestionnaireQuestionModal} from "./hooks/use-create-questionnaire-question-modal"

export interface CreateEventModalProps {
  readonly questionnaireId: UUID
  readonly onDismiss: () => void
  readonly navigateToQuestion: (questionId: UUID) => void
}

export const CreateQuestionnaireQuestionModal: React.FC<CreateEventModalProps> = ({
  questionnaireId,
  onDismiss,
  navigateToQuestion
}) => {
  const {createQuestion, selectedQuestionType, setSelectedQuestionType} = useCreateQuestionnaireQuestionModal(
    questionnaireId,
    navigateToQuestion
  )
  const handleConfirm = (questionType: QuestionType) => {
    createQuestion(questionType)
    onDismiss()
  }

  return (
    <ChooseQuestionnaireQuestionTypeModal
      onDismiss={onDismiss}
      onConfirm={handleConfirm}
      selectedQuestionType={selectedQuestionType}
      setSelectedQuestionType={setSelectedQuestionType}
    />
  )
}
