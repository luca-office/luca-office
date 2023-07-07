import {useQuery} from "@apollo/client"
import {CodingModel} from "../../../../models"
import {Option} from "../../../../utils"
import {CodingModelQuery, CodingModelQueryVariables} from "../../../generated/CodingModelQuery"
import {codingModelQuery} from "../../../queries"

export interface CodingModelProps {
  readonly codingModel: Option<CodingModel>
  readonly codingModelLoading: boolean
}

export const useCodingModel = (id: UUID, skip?: boolean): CodingModelProps => {
  const {data, loading} = useQuery<CodingModelQuery, CodingModelQueryVariables>(codingModelQuery, {
    variables: {id},
    skip
  })

  return {
    codingModel: Option.of<CodingModel>(data?.codingModel),
    codingModelLoading: loading
  }
}
