import {QuestionnaireQuestionFragment} from "shared/graphql/generated/QuestionnaireQuestionFragment"

/**
 * @deprecated
 * use shared model instead!
 */
export type QuestionnaireQuestion = Omit<QuestionnaireQuestionFragment, "__typename">
