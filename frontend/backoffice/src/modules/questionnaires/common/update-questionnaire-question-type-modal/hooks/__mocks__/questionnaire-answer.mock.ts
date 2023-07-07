import {QuestionnaireAnswer} from "shared/models"

export const questionnaireAnswerMock = (
  questionId: UUID = "18316dac-2355-4e45-a7f3-f339461a488f"
): QuestionnaireAnswer => ({
  __typename: "QuestionnaireAnswer",
  createdAt: new Date(2020, 10, 5).toISOString(),
  modifiedAt: new Date(2020, 10, 15).toISOString(),
  id: "1fce8289-71fa-4568-bccc-329dc4cc67eb",
  text: "answer",
  questionId,
  isCorrect: false,
  position: 1
})
