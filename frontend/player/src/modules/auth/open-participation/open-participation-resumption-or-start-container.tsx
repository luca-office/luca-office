import * as React from "react"
import {useDispatch} from "react-redux"
import {LoadingIndicator} from "shared/components"
import {Option} from "shared/utils"
import {navigateToRouteAction} from "../../../redux/actions/routing-action"
import {Route} from "../../../routes"
import {useOpenParticipation} from "./hooks/use-open-participation"
import {OpenParticipation} from "./open-participation"
import {OpenParticipationResumptionOrStart} from "./open-participation-resumption-or-start"

interface Props {
  readonly surveyId: Option<UUID>
}

export const OpenParticipationResumptionOrStartContainer: React.FC<Props> = ({surveyId}) => {
  const dispatch = useDispatch()
  const {startOpenParticipation, isLoading, isSurveyLoading, errorCode, hasBeenCalled} = useOpenParticipation(surveyId)

  const navigateToResumption = () => dispatch(navigateToRouteAction({routeType: Route.ResumeProject}))
  const navigateToStartOpenParticipation = () => surveyId.forEach(startOpenParticipation)

  if (isSurveyLoading) {
    return <LoadingIndicator />
  }

  return !hasBeenCalled ? (
    <OpenParticipationResumptionOrStart
      startOpenParticipation={navigateToStartOpenParticipation}
      navigateToResumption={navigateToResumption}
    />
  ) : (
    <OpenParticipation surveyId={surveyId} isLoading={isLoading} errorCode={errorCode} />
  )
}
