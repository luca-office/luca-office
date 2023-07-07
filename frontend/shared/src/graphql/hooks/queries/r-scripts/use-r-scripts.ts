import {useQuery} from "@apollo/client"
import {RScript} from "../../../../models"
import {RScriptsQuery} from "../../../generated/RScriptsQuery"
import {rScriptsQuery} from "../../../queries"

export interface RScriptsProps {
  readonly rScripts: RScript[]
  readonly rScriptsLoading: boolean
}

export const useRScripts = (): RScriptsProps => {
  const {data, loading} = useQuery<RScriptsQuery>(rScriptsQuery)

  return {
    rScripts: data?.rScripts ?? [],
    rScriptsLoading: loading
  }
}
