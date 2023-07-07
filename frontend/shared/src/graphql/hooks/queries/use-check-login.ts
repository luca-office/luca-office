import {useQuery} from "@apollo/client"
import {UserAccountForLogin} from "../../../models"
import {Option} from "../../../utils"
import {CheckLoginQuery} from "../../generated/CheckLoginQuery"
import {checkLoginQuery} from "../../queries"

export interface UseCheckLogin {
  readonly account: Option<UserAccountForLogin>
  readonly checkLoginLoading: boolean
}

export const useCheckLogin = (skip?: boolean): UseCheckLogin => {
  const {data, loading} = useQuery<CheckLoginQuery>(checkLoginQuery, {skip})

  return {
    account: Option.of(data?.checkLogin),
    checkLoginLoading: loading
  }
}
