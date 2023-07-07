import {endOfDay} from "date-fns"
import {pick} from "lodash-es"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {AuthenticationType, SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {useUpdateSurvey} from "shared/graphql/hooks"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {SurveyForm} from "../../models"
import {UseSurveyFormHook} from "./use-create-survey"

export const useEditSurvey = (projectId: UUID, surveyId: UUID): UseSurveyFormHook => {
  const {updateSurvey, updateSurveyLoading} = useUpdateSurvey()
  const {survey: surveyOption} = useSurveyLight(surveyId)

  const dispatch = useDispatch()
  const navigateSurveyDetail = () =>
    surveyOption.map(survey =>
      dispatch(navigateToRouteAction(Route.SurveyDetail, {id: projectId, surveyId: survey.id}))
    )
  const formMethods = useForm<SurveyForm>({
    defaultValues: surveyOption
      .map(survey => ({
        dateRange: [
          survey.startsAt ? new Date(survey.startsAt) : new Date(),
          survey.endsAt ? new Date(survey.endsAt) : endOfDay(survey.startsAt ? new Date(survey.startsAt) : new Date())
        ],
        isOpenParticipationEnabled: survey.isOpenParticipationEnabled,
        isAutomaticStartEnabled: survey.executionType === SurveyExecutionType.AutomaticAsynchronous,
        isManualAsynchronous: survey.executionType === SurveyExecutionType.ManualAsynchronous,
        isAnonymousAuthAllowed: survey.authenticationType === AuthenticationType.RegisteredOrAnonymous
      }))
      .getOrElse({
        dateRange: [new Date(), endOfDay(new Date())],
        isOpenParticipationEnabled: false,
        isAnonymousAuthAllowed: false,
        isAutomaticStartEnabled: false,
        isManualAsynchronous: false
      })
  })

  const handleUpdate = (update: SurveyForm) =>
    surveyOption.forEach(survey => {
      updateSurvey(survey.id, {
        ...pick(survey, "title", "description"),
        authenticationType: update.isAnonymousAuthAllowed
          ? AuthenticationType.RegisteredOrAnonymous
          : AuthenticationType.OnlyRegistered,
        startsAt: update.dateRange[0]?.toISOString() ?? null,
        endsAt: update.dateRange[1]?.toISOString() ?? null,
        isOpenParticipationEnabled: update.isOpenParticipationEnabled,
        executionType: update.isAutomaticStartEnabled
          ? SurveyExecutionType.AutomaticAsynchronous
          : update.isManualAsynchronous
          ? SurveyExecutionType.ManualAsynchronous
          : SurveyExecutionType.ManualSynchronous
      }).then(response =>
        response.forEach(() =>
          dispatch(navigateToRouteAction(Route.SurveyDetail, {id: projectId, surveyId: survey.id}))
        )
      )
    })

  return {
    onCancel: navigateSurveyDetail,
    onConfirm: navigateSurveyDetail,
    formMethods,
    submitSurvey: handleUpdate,
    submitSurveyLoading: updateSurveyLoading,
    initialized: true
  }
}
