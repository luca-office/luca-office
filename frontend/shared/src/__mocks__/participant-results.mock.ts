import {random} from "lodash-es"
import {ParticipantQuestionAnswer, QuestionnaireParticipantResults} from "../components"
import {QuestionType} from "../graphql/generated/globalTypes"
import {questionnaireMock} from "../graphql/__mocks__"
import {QuestionnaireQuestion} from "../models"

const questions = questionnaireMock.questions

const questionToResultMock = (question: QuestionnaireQuestion): ParticipantQuestionAnswer => {
  switch (question.questionType) {
    case QuestionType.SingleChoice:
      return {
        questionType: QuestionType.SingleChoice,
        questionId: question.id,
        selectedAnswerId: question.answers[random(0, question.answers.length - 1)].id,
        isFreetextAnswerSelected: false,
        freeTextAnswer: question.isAdditionalFreeTextAnswerEnabled ? "free text answer" : undefined
      }
    case QuestionType.MultipleChoice: {
      const ids = Array.from(
        new Set(
          new Array(random(1, question.answers.length))
            .fill(0)
            .map(_ => question.answers[random(0, question.answers.length - 1)].id)
        )
      )

      return {
        questionType: QuestionType.MultipleChoice,
        questionId: question.id,
        selectedAnswerIds: ids,
        isFreetextAnswerSelected: false,
        freeTextAnswer: question.isAdditionalFreeTextAnswerEnabled ? "free text answer" : undefined
      }
    }
    case QuestionType.FreeText:
      return {
        questionType: QuestionType.FreeText,
        questionId: question.id,
        freeTextAnswer: "free text answer"
      }
  }
}

export const participantResultsMock: QuestionnaireParticipantResults = {
  questionnaireId: questionnaireMock.id,
  answers: questions.reduce((answers, question) => {
    answers[question.id] = questionToResultMock(question)
    return answers
  }, {} as Record<UUID, ParticipantQuestionAnswer>)
}
