import {useQuery} from "@apollo/client"
import {Option, removeTypename} from "shared/utils"
import {Directory} from "../../../../models"
import {DirectoryQuery, DirectoryQueryVariables} from "../../../generated/DirectoryQuery"
import {directoryQuery} from "../../../queries"

export interface UseDirectoryHook {
  readonly directory: Option<Directory>
  readonly directoryLoading: boolean
}

export const useDirectory = (id: UUID): UseDirectoryHook => {
  const {data, loading} = useQuery<DirectoryQuery, DirectoryQueryVariables>(directoryQuery, {variables: {id}})
  return {
    directory: data && data.directory ? Option.of(removeTypename(data.directory)) : Option.none(),
    directoryLoading: loading
  }
}
