import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {FreetextAnswerFragment} from "../../../generated/FreetextAnswerFragment"
import {
  FreetextAnswersForQuestionnaireQuery,
  FreetextAnswersForQuestionnaireQueryVariables
} from "../../../generated/FreetextAnswersForQuestionnaireQuery"
import {freetextAnswersForQuestionnaireQuery} from "../../../queries"

export interface UseFreetextAnswersForQuestionnaireLazy {
  readonly freetextAnswersForQuestionnaireLoading: boolean
  readonly freetextAnswersForQuestionnaire: Array<FreetextAnswerFragment>
  readonly getFreetextAnswersForQuestionnaire: (questionnaireId: UUID) => Promise<Array<FreetextAnswerFragment>>
}

export const useFreetextAnswersForQuestionnaireLazy = (surveyId: UUID): UseFreetextAnswersForQuestionnaireLazy => {
  const client = useApolloClient()

  const [freetextAnswersForQuestionnaireLoading, setFreetextAnswersForQuestionnaireLoading] = React.useState(false)
  const [freetextAnswersForQuestionnaire, setFreetextAnswersForQuestionnaire] = React.useState<
    Array<FreetextAnswerFragment>
  >([])

  const getFreetextAnswersForQuestionnaire = (questionnaireId: UUID) =>
    new Promise<Array<FreetextAnswerFragment>>((resolve, reject) => {
      setFreetextAnswersForQuestionnaireLoading(true)
      client
        .query<FreetextAnswersForQuestionnaireQuery, FreetextAnswersForQuestionnaireQueryVariables>({
          query: freetextAnswersForQuestionnaireQuery,
          variables: {questionnaireId, surveyId}
        })
        .then(result => {
          setFreetextAnswersForQuestionnaireLoading(false)

          const data = result.data?.freetextAnswersForQuestionnaire ?? []
          setFreetextAnswersForQuestionnaire(data)
          resolve(data)
        })
        .catch(error => {
          setFreetextAnswersForQuestionnaireLoading(false)
          setFreetextAnswersForQuestionnaire([])
          reject(error)
        })
    })

  return {freetextAnswersForQuestionnaireLoading, freetextAnswersForQuestionnaire, getFreetextAnswersForQuestionnaire}
}
