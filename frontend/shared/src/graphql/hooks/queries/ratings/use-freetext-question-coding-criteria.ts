import {useQuery} from "@apollo/client"
import {FreetextQuestionCodingCriterion} from "../../../../models"
import {
  FreetextQuestionCodingCriteriaForQuestionnaireQuery,
  FreetextQuestionCodingCriteriaForQuestionnaireQueryVariables
} from "../../../generated/FreetextQuestionCodingCriteriaForQuestionnaireQuery"
import {freetextQuestionCodingCriteriaForQuestionnaireQuery} from "../../../queries"

export interface UseFreetextQuestionCodingCriteriaForQuestionnaireHook {
  readonly freetextQuestionCodingCriteria: FreetextQuestionCodingCriterion[]
  readonly freetextQuestionCodingCriteriaLoading: boolean
}

export const useFreetextQuestionCodingCriteriaForQuestionnaire = (
  questionnaireId: UUID
): UseFreetextQuestionCodingCriteriaForQuestionnaireHook => {
  const {data, loading} = useQuery<
    FreetextQuestionCodingCriteriaForQuestionnaireQuery,
    FreetextQuestionCodingCriteriaForQuestionnaireQueryVariables
  >(freetextQuestionCodingCriteriaForQuestionnaireQuery, {
    variables: {questionnaireId}
  })

  return {
    freetextQuestionCodingCriteria: data?.freetextQuestionCodingCriteriaForQuestionnaire ?? [],
    freetextQuestionCodingCriteriaLoading: loading
  }
}
