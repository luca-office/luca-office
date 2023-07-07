import {useLazyQuery} from "@apollo/client"
import {CodingCriterion} from "../../../../models"
import {CodingCriteriaQuery, CodingCriteriaQueryVariables} from "../../../generated/CodingCriteriaQuery"
import {codingCriteriaQuery} from "../../../queries"

export interface UseCodingCriteriaLazyHook {
  readonly codingCriteria: CodingCriterion[]
  readonly codingCriteriaLoading: boolean
  readonly getCodingCriteria: (itemId: UUID) => void
}

export const useCodingCriteriaLazy = (): UseCodingCriteriaLazyHook => {
  const [getCodingCriteria, {data, loading}] = useLazyQuery<CodingCriteriaQuery, CodingCriteriaQueryVariables>(
    codingCriteriaQuery
  )

  return {
    codingCriteria: data?.codingCriteria ?? [],
    codingCriteriaLoading: loading,
    getCodingCriteria: (itemId: UUID) => getCodingCriteria({variables: {itemId}})
  }
}
