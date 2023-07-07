import {FreetextQuestionCodingCriterionFragment} from "../graphql/generated/FreetextQuestionCodingCriterionFragment"
import {
  QuestionnaireFragment,
  QuestionnaireFragment_questions_answers
} from "../graphql/generated/QuestionnaireFragment"
import {QuestionnaireLightFragment} from "../graphql/generated/QuestionnaireLightFragment"
import {QuestionnaireQuestionFragment} from "../graphql/generated/QuestionnaireQuestionFragment"

export type QuestionnaireAnswer = QuestionnaireFragment_questions_answers

export type FreetextQuestionCodingCriterion = FreetextQuestionCodingCriterionFragment

export type Questionnaire = QuestionnaireFragment

export type QuestionnaireLight = QuestionnaireLightFragment

export interface QuestionnaireProject {
  questionnaireId: string
  projectId: string
}

export type QuestionnaireQuestion = QuestionnaireQuestionFragment
