import {useApolloClient, useMutation} from "@apollo/client"
import {useDispatch} from "react-redux"
import {resetApplicationAction} from "../../../redux/actions/ui-action"
import {LogoutMutation} from "../../generated/LogoutMutation"
import {logoutMutation} from "../../mutations"

interface WithLogoutHook {
  readonly logout: () => void
}

export const useLogout = (): WithLogoutHook => {
  const [logout] = useMutation<LogoutMutation>(logoutMutation)
  const client = useApolloClient()
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    try {
      // logout
      await logout()
      // reset entire apollo client cache
      await client.cache.reset()
      // reset redux
      dispatch(resetApplicationAction())
      // extend by any localStorage or sessionStorage data if needed
    } catch (exception) {
      console.log("Error on logout", exception)
    }
  }
  return {
    logout: logoutHandler
  }
}
