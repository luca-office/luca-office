import {endOfDay} from "date-fns"
import * as React from "react"
import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {AuthenticationType, SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {useCreateSurvey as useCreateSurveyMutation, useSurveys} from "shared/graphql/hooks"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {SurveyForm} from "../../models"

export interface UseSurveyFormHook {
  readonly onCancel: () => void
  readonly onConfirm: () => void
  readonly submitSurvey: (creation: SurveyForm) => void
  readonly submitSurveyLoading: boolean
  readonly formMethods: UseFormMethods<SurveyForm>
  readonly firstProjectSurveyOrlyVisible?: boolean
  readonly initialized?: boolean
}

export const useCreateSurvey = (projectId: UUID, isTestSurvey: boolean): UseSurveyFormHook => {
  const [firstProjectSurveyOrlyVisible, toggleFirstProjectSurveyOrly] = React.useState(false)
  const [initialized, setInitialized] = React.useState(false)
  const dispatch = useDispatch()
  const confirmCreation = () => toggleFirstProjectSurveyOrly(false)
  const cancelCreation = () => dispatch(navigateToRouteAction(Route.ProjectDetail, {id: projectId}))
  const formMethods = useForm<SurveyForm>({
    defaultValues: {
      dateRange: [new Date(), endOfDay(new Date())],
      isOpenParticipationEnabled: true,
      isAutomaticStartEnabled: true,
      isManualAsynchronous: true
    }
  })
  const {createSurvey, isCreateSurveyLoading} = useCreateSurveyMutation()
  const {surveys, surveysLoading} = useSurveys(projectId)

  React.useEffect(() => {
    if (!surveysLoading) {
      if (!firstProjectSurveyOrlyVisible) {
        toggleFirstProjectSurveyOrly(!surveys.length)
      }
      setInitialized(true)
    }
  }, [surveysLoading])

  const handleCreateSurvey = (creation: SurveyForm) => {
    createSurvey({
      title: creation.title,
      authenticationType: creation.isAnonymousAuthAllowed
        ? AuthenticationType.RegisteredOrAnonymous
        : AuthenticationType.OnlyRegistered,
      projectId,
      description: "",
      startsAt:
        !creation.isAutomaticStartEnabled && !creation.isManualAsynchronous
          ? null
          : creation.dateRange[0]?.toISOString(),
      endsAt:
        !creation.isAutomaticStartEnabled && !creation.isManualAsynchronous
          ? null
          : creation.dateRange[1]?.toISOString(),
      isOpenParticipationEnabled: creation.isOpenParticipationEnabled,
      isTestSurvey,
      executionType: creation.isAutomaticStartEnabled
        ? SurveyExecutionType.AutomaticAsynchronous
        : creation.isManualAsynchronous
        ? SurveyExecutionType.ManualAsynchronous
        : SurveyExecutionType.ManualSynchronous
    }).then(response =>
      response.forEach(entity =>
        dispatch(navigateToRouteAction(Route.SurveyDetail, {id: projectId, surveyId: entity.id}))
      )
    )
  }

  return {
    onCancel: cancelCreation,
    onConfirm: confirmCreation,
    firstProjectSurveyOrlyVisible,
    formMethods,
    submitSurvey: handleCreateSurvey,
    submitSurveyLoading: isCreateSurveyLoading,
    initialized
  }
}
