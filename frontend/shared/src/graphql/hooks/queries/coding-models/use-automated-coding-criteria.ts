import {useQuery} from "@apollo/client"
import {AutomatedCodingCriterion} from "../../../../models"
import {
  ScenarioCodingAutomatedCriteriaQuery,
  ScenarioCodingAutomatedCriteriaQueryVariables
} from "../../../generated/ScenarioCodingAutomatedCriteriaQuery"
import {automatedCodingCriteriaQuery} from "../../../queries"

export interface AutomatedCodingCriteriaProps {
  readonly automatedCodingCriteria: AutomatedCodingCriterion[]
  readonly automatedCodingCriteriaLoading: boolean
}

export const useAutomatedCodingCriteria = (itemId: UUID): AutomatedCodingCriteriaProps => {
  const {data, loading} = useQuery<ScenarioCodingAutomatedCriteriaQuery, ScenarioCodingAutomatedCriteriaQueryVariables>(
    automatedCodingCriteriaQuery,
    {
      variables: {itemId}
    }
  )

  return {
    automatedCodingCriteria: data?.scenarioCodingAutomatedCriteria ?? [],
    automatedCodingCriteriaLoading: loading
  }
}
