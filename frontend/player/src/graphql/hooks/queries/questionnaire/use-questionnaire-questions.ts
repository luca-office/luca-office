import {useQuery} from "@apollo/client"
import {
  QuestionnaireQuestionsQuery,
  QuestionnaireQuestionsQueryVariables
} from "shared/graphql/generated/QuestionnaireQuestionsQuery"
import {questionnaireQuestionsQuery} from "shared/graphql/queries"
import {QuestionnaireQuestion} from "shared/models"
import {Option} from "shared/utils"

export interface QuestionnaireQuestionsProps {
  readonly questions: Option<QuestionnaireQuestion[]>
  readonly questionsLoading: boolean
}

export const useQuestionnaireQuestions = (questionnaireId?: UUID): QuestionnaireQuestionsProps => {
  const {data, loading} = useQuery<QuestionnaireQuestionsQuery, QuestionnaireQuestionsQueryVariables>(
    questionnaireQuestionsQuery,
    {
      skip: questionnaireId === undefined,
      variables: {questionnaireId: questionnaireId || ""}
    }
  )

  return {
    questions: data?.questionnaireQuestions
      ? Option.of<QuestionnaireQuestion[]>(data.questionnaireQuestions)
      : Option.none(),
    questionsLoading: loading
  }
}
