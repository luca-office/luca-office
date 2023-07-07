import {QuestionType} from "../../../../graphql/generated/globalTypes"
import {QuestionsState} from "../use-questions-state"

export const initialQuestionsState: QuestionsState = {
  q1: {
    type: QuestionType.FreeText,
    answer: ""
  },
  q2: {
    type: QuestionType.SingleChoice,
    answers: [],
    hasAdditionalFreeTextAnswer: false
  },
  q3: {
    type: QuestionType.MultipleChoice,
    answers: [],
    hasAdditionalFreeTextAnswer: false
  },
  q4: {
    type: QuestionType.MultipleChoice,
    answers: [],
    hasAdditionalFreeTextAnswer: true,
    freeText: ""
  }
}

export const partiallyFinishedQuestionsState: QuestionsState = {
  q1: {
    type: QuestionType.FreeText,
    answer: "answered"
  },
  q2: {
    type: QuestionType.SingleChoice,
    answers: ["a1"],
    hasAdditionalFreeTextAnswer: false
  },
  q3: {
    type: QuestionType.MultipleChoice,
    answers: [],
    hasAdditionalFreeTextAnswer: false
  },
  q4: {
    type: QuestionType.MultipleChoice,
    answers: [],
    hasAdditionalFreeTextAnswer: true,
    freeText: ""
  }
}

export const finishedQuestionsState: QuestionsState = {
  q1: {
    type: QuestionType.FreeText,
    answer: "answered"
  },
  q2: {
    type: QuestionType.SingleChoice,
    answers: ["a1"],
    hasAdditionalFreeTextAnswer: false
  },
  q3: {
    type: QuestionType.MultipleChoice,
    answers: ["a1", "a2"],
    hasAdditionalFreeTextAnswer: false
  },
  q4: {
    type: QuestionType.MultipleChoice,
    answers: ["a1", "a3"],
    hasAdditionalFreeTextAnswer: true,
    freeText: "answered"
  }
}
