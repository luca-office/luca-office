import {useQuery} from "@apollo/client"
import {toFile} from "../../../../converters"
import {File} from "../../../../models"
import {Option} from "../../../../utils"
import {FileQuery, FileQueryVariables} from "../../../generated/FileQuery"
import {fileQuery} from "../../../queries"

export interface UseFileHook {
  readonly file: Option<File>
  readonly fileLoading: boolean
}

export const useFile = (id: UUID): UseFileHook => {
  const {data, loading} = useQuery<FileQuery, FileQueryVariables>(fileQuery, {variables: {id}})
  return {
    file: Option.of(data?.file).map(toFile),
    fileLoading: loading
  }
}
