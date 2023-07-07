import * as React from "react"
import {Payload} from "redux-first-router"
import {Route} from "../../routes"
import {useAuth} from "./hooks/use-auth"
import {LoginContainer} from "./login/login-container"
import {ResetPassword} from "./reset-password"
import {SignupContainer} from "./signup/signup-container"

export const Auth: React.FC = () => {
  const {activeRoute, urlParams} = useAuth()

  const getScreenForActiveRoute = (route: Route | undefined, urlParams: Payload | undefined) => {
    switch (route) {
      case Route.ResetPassword:
        return <ResetPassword token={urlParams?.token} email={urlParams?.email} />
      case Route.Register:
        return <SignupContainer />
      default:
        return <LoginContainer />
    }
  }

  return getScreenForActiveRoute(activeRoute, urlParams)
}
