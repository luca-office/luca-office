import {useQuery} from "@apollo/client"
import {CodingDimension} from "../../../../models"
import {CodingDimensionsQuery, CodingDimensionsQueryVariables} from "../../../generated/CodingDimensionsQuery"
import {codingDimensionsQuery} from "../../../queries"

interface CodingDimensionsProps {
  readonly codingDimensions: CodingDimension[]
  readonly codingDimensionsLoading: boolean
}

export const useCodingDimensions = (modelId: UUID, skip?: boolean): CodingDimensionsProps => {
  const {data, loading} = useQuery<CodingDimensionsQuery, CodingDimensionsQueryVariables>(codingDimensionsQuery, {
    variables: {modelId},
    skip
  })

  return {
    codingDimensions: data?.codingDimensions ?? [],
    codingDimensionsLoading: loading
  }
}
