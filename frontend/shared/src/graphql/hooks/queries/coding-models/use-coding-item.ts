import {useQuery} from "@apollo/client"
import {CodingItem} from "../../../../models"
import {Option} from "../../../../utils"
import {CodingItemQuery, CodingItemQueryVariables} from "../../../generated/CodingItemQuery"
import {codingItemQuery} from "../../../queries"

interface CodingItemsProps {
  readonly codingItem: Option<CodingItem>
  readonly codingItemLoading: boolean
}

export const useCodingItem = (itemId: UUID, skip?: boolean): CodingItemsProps => {
  const {data, loading} = useQuery<CodingItemQuery, CodingItemQueryVariables>(codingItemQuery, {
    variables: {id: itemId},
    skip
  })

  return {
    codingItem: Option.of<CodingItem>(data?.codingItem),
    codingItemLoading: loading
  }
}
