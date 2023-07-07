import {useQuery} from "@apollo/client"
import {CodingItem} from "../../../../models"
import {CodingItemsQuery, CodingItemsQueryVariables} from "../../../generated/CodingItemsQuery"
import {codingItemsQuery} from "../../../queries"

interface CodingItemsProps {
  readonly codingItems: CodingItem[]
  readonly codingItemsLoading: boolean
}

export const useCodingItems = (dimensionId: UUID): CodingItemsProps => {
  const {data, loading} = useQuery<CodingItemsQuery, CodingItemsQueryVariables>(codingItemsQuery, {
    variables: {dimensionId}
  })

  return {
    codingItems: data?.codingItems ?? [],
    codingItemsLoading: loading
  }
}
