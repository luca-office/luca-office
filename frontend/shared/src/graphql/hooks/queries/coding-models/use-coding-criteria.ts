import {useQuery} from "@apollo/client"
import {CodingCriterion} from "../../../../models"
import {CodingCriteriaQuery, CodingCriteriaQueryVariables} from "../../../generated/CodingCriteriaQuery"
import {codingCriteriaQuery} from "../../../queries"

export interface CodingCriteriaProps {
  readonly codingCriteria: CodingCriterion[]
  readonly codingCriteriaLoading: boolean
}

export const useCodingCriteria = (itemId: UUID): CodingCriteriaProps => {
  const {data, loading} = useQuery<CodingCriteriaQuery, CodingCriteriaQueryVariables>(codingCriteriaQuery, {
    variables: {itemId}
  })

  return {
    codingCriteria: data?.codingCriteria ?? [],
    codingCriteriaLoading: loading
  }
}
