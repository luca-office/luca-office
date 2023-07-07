import {GraphQLError} from "graphql"
import {useDispatch} from "react-redux"
import {Option} from "shared/utils"
import {LucaErrorType, mapErrorToNotification} from "shared/utils/errors"
import {updateNotification} from "../redux/actions/ui/common-ui-action"

export const useErrorHandler = () => {
  const dispatch = useDispatch()

  const handleError = (error: GraphQLError) => {
    const errorType = error.extensions?.type as LucaErrorType
    const notification = errorType ? mapErrorToNotification(errorType) : null

    if (notification !== null) {
      dispatch(updateNotification(Option.of(notification)))
    }
  }

  return handleError
}
