import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {QuestionnaireCreation} from "shared/graphql/generated/globalTypes"
import {useCreateQuestionnaire} from "shared/graphql/hooks"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"

export interface QuestionnaireCreationForm {
  readonly title: string
  readonly description: string
}

export interface UseCreateQuestionnaireHook {
  readonly createQuestionnaire: (creation: QuestionnaireCreation) => void
  readonly createQuestionnaireLoading: boolean
  readonly formMethods: UseFormMethods<QuestionnaireCreationForm>
  readonly dismissModal: () => void
}

export const useCreateQuestionnaireModal = (isRuntimeSurvey: boolean): UseCreateQuestionnaireHook => {
  const dispatch = useDispatch()
  const {createQuestionnaire, createQuestionnaireLoading} = useCreateQuestionnaire(isRuntimeSurvey)
  const formMethods = useForm<QuestionnaireCreationForm>()

  const dismissModal = () => dispatch(navigateToRouteAction(isRuntimeSurvey ? Route.Events : Route.Questionnaires))

  const handleCreate = (creation: QuestionnaireCreation) => {
    createQuestionnaire(creation).then(response =>
      response.forEach(data =>
        isRuntimeSurvey
          ? dispatch(navigateToRouteAction(Route.EventDetail, {eventId: data.id}))
          : dispatch(navigateToRouteAction(Route.QuestionnaireDetail, {questionnaireId: data.id}))
      )
    )
  }

  return {
    createQuestionnaire: handleCreate,
    createQuestionnaireLoading: createQuestionnaireLoading,
    formMethods,
    dismissModal
  }
}
