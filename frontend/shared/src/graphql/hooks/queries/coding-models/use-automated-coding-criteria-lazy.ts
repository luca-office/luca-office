import {useLazyQuery} from "@apollo/client"
import {AutomatedCodingCriterion} from "../../../../models"
import {
  ScenarioCodingAutomatedCriteriaQuery,
  ScenarioCodingAutomatedCriteriaQueryVariables
} from "../../../generated/ScenarioCodingAutomatedCriteriaQuery"
import {automatedCodingCriteriaQuery} from "../../../queries"

export interface UseAutomatedCodingCriteriaLazyHook {
  readonly automatedCodingCriteria: AutomatedCodingCriterion[]
  readonly automatedCodingCriteriaLoading: boolean
  readonly getAutomatedCodingCriteria: (codingItemId: UUID) => void
}

export const useAutomatedCodingCriteriaLazy = (): UseAutomatedCodingCriteriaLazyHook => {
  const [getAutomatedCodingCriteria, {data, loading}] = useLazyQuery<
    ScenarioCodingAutomatedCriteriaQuery,
    ScenarioCodingAutomatedCriteriaQueryVariables
  >(automatedCodingCriteriaQuery)

  return {
    automatedCodingCriteria: data?.scenarioCodingAutomatedCriteria ?? [],
    automatedCodingCriteriaLoading: loading,
    getAutomatedCodingCriteria: (codingItemId: UUID) => getAutomatedCodingCriteria({variables: {itemId: codingItemId}})
  }
}
