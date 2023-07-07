import {useQuery} from "@apollo/client"
import {CodingModel} from "../../../../models"
import {Option} from "../../../../utils"
import {CodingModelsQuery} from "../../../generated/CodingModelsQuery"
import {codingModelsQuery} from "../../../queries"

export interface CodingModelsProps {
  readonly codingModels: Option<CodingModel[]>
  readonly codingModelsLoading: boolean
}

export const useCodingModels = (): CodingModelsProps => {
  const {data, loading} = useQuery<CodingModelsQuery>(codingModelsQuery)

  return {
    codingModels: Option.of(data?.codingModels),
    codingModelsLoading: loading
  }
}
