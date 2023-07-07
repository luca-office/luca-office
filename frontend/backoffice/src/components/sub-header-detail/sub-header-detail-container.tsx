import * as React from "react"
import {useDispatch} from "react-redux"
import {Payload} from "redux-first-router"
import {OrlyButtonProps} from "shared/components"
import {ButtonVariant} from "shared/enums"
import {Route as SharedRoute} from "shared/routes"
import {CustomStyle} from "shared/styles"
import {AppAction} from "../../redux/actions/app-action"
import {navigateToRouteAction} from "../../redux/actions/navigation-action"
import {Route} from "../../routes"
import {SubHeaderDetail} from "./sub-header-detail"

export interface SubHeaderDetailContainerProps extends CustomStyle {
  readonly returnTo: ReturnTo
  readonly title: JSX.Element | string
  readonly buttonText?: string
  readonly onButtonClick?: () => void
  readonly buttonVariant?: ButtonVariant
  readonly buttonDisabled?: boolean
  readonly deleteButtonConfig?: OrlyButtonProps
}

export interface ReturnTo {
  readonly text: string
  readonly route: Route | SharedRoute
  readonly params?: Payload
}

export const SubHeaderDetailContainer: React.FC<SubHeaderDetailContainerProps> = ({...rest}) => {
  const dispatch = useDispatch()

  const navigate = (route: Route | SharedRoute, params?: Payload) => {
    dispatch<AppAction>(navigateToRouteAction(route, params))
  }

  return <SubHeaderDetail navigate={navigate} {...rest} />
}
