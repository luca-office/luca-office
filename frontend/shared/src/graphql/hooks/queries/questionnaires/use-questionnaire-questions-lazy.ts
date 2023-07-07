import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {QuestionnaireQuestion} from "../../../../models"
import {
  QuestionnaireQuestionsQuery,
  QuestionnaireQuestionsQueryVariables
} from "../../../generated/QuestionnaireQuestionsQuery"
import {questionnaireQuestionsQuery} from "../../../queries"

export interface UseQuestionnaireQuestionsLazyHook {
  readonly questionnaireQuestionsLoading: boolean
  readonly questionnaireQuestions: QuestionnaireQuestion[]
  readonly getQuestionnaireQuestions: (questionnaireId: UUID) => Promise<QuestionnaireQuestion[]>
}

export const useQuestionnaireQuestionsLazy = (): UseQuestionnaireQuestionsLazyHook => {
  const client = useApolloClient()

  const [questionnaireQuestionsLoading, setQuestionnaireQuestionsLoading] = React.useState(false)
  const [questionnaireQuestions, setQuestionnaireQuestions] = React.useState<QuestionnaireQuestion[]>([])

  const getQuestionnaireQuestions = (questionnaireId: UUID) =>
    new Promise<QuestionnaireQuestion[]>((resolve, reject) => {
      setQuestionnaireQuestionsLoading(true)

      client
        .query<QuestionnaireQuestionsQuery, QuestionnaireQuestionsQueryVariables>({
          query: questionnaireQuestionsQuery,
          variables: {questionnaireId}
        })
        .then(result => {
          setQuestionnaireQuestionsLoading(false)

          const data = result.data?.questionnaireQuestions ?? []
          setQuestionnaireQuestions(data)
          resolve(data)
        })
        .catch(error => {
          setQuestionnaireQuestionsLoading(false)
          setQuestionnaireQuestions([])
          reject(error)
        })
    })

  return {questionnaireQuestionsLoading, questionnaireQuestions, getQuestionnaireQuestions}
}
