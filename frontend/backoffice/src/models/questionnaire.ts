import {QuestionnaireFragment} from "shared/graphql/generated/QuestionnaireFragment"
import {QuestionnaireQuestion} from "shared/models"

/**
 * @deprecated
 * use shared model instead!
 */
export type Questionnaire = Omit<Omit<QuestionnaireFragment, "__typename">, "questions"> & {
  questions: QuestionnaireQuestion[]
}
