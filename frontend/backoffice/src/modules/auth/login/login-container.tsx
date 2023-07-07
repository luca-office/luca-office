import {useMutation} from "@apollo/client"
import * as React from "react"
import {useDispatch} from "react-redux"
import {CheckLoginQuery} from "shared/graphql/generated/CheckLoginQuery"
import {LoginMutation, LoginMutationVariables} from "shared/graphql/generated/LoginMutation"
import {loginMutation} from "shared/graphql/mutations"
import {checkLoginQuery} from "shared/graphql/queries"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {Route} from "../../../routes"
import {useErrorHandler} from "../../../utils/errors"
import {Login} from "./login"

export const LoginContainer: React.FC = () => {
  const [login, {loading: loginLoading}] = useMutation<LoginMutation, LoginMutationVariables>(loginMutation, {
    errorPolicy: "all"
  })
  const dispatch = useDispatch()
  const handleError = useErrorHandler()

  const navigate = (route: Route) => dispatch(navigateToRouteAction(route))

  const loginHandler = (email: string, password: string) =>
    login({
      variables: {email, password},
      update: (cache, {data}) => {
        if (data) {
          cache.writeQuery<CheckLoginQuery>({
            query: checkLoginQuery,
            data: {
              checkLogin: data.login
            }
          })
        }
      }
    }).then(({errors}) => {
      errors?.forEach(handleError)
    })

  return <Login navigate={navigate} login={loginHandler} loginLoading={loginLoading} />
}
