import {useQuery} from "@apollo/client"
import {CodingDimension} from "../../../../models"
import {Option} from "../../../../utils"
import {CodingDimensionQuery, CodingDimensionQueryVariables} from "../../../generated/CodingDimensionQuery"
import {codingDimensionQuery} from "../../../queries"

export interface CodingDimensionProps {
  readonly codingDimension: Option<CodingDimension>
  readonly codingDimensionLoading: boolean
}

export const useCodingDimension = (id: UUID, skip?: boolean): CodingDimensionProps => {
  const {data, loading} = useQuery<CodingDimensionQuery, CodingDimensionQueryVariables>(codingDimensionQuery, {
    variables: {id},
    skip
  })

  return {
    codingDimension: Option.of<CodingDimension>(data?.codingDimension),
    codingDimensionLoading: loading
  }
}
