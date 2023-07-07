import {useDispatch, useSelector} from "react-redux"
import {useCheckLogin, useLightQuestionnaires} from "shared/graphql/hooks"
import {QuestionnaireLight} from "shared/models"
import {Option} from "shared/utils"
import {useCheckUserClaims} from "../../../../hooks/use-check-user-claims"
import {EntityFilterConfig} from "../../../../models"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {AppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"
import {applyFilterAndSortEntities} from "../../../../utils"

export interface UseQuestionnairesHook {
  readonly navigateCreateQuestionnaire: () => void
  readonly navigateQuestionnaireDetail: (id: string) => void
  readonly questionnaires: QuestionnaireLight[]
  readonly questionnairesLoading: boolean
  readonly userMayFinalizeWithoutPublishing: boolean
}

export const useQuestionnaires = (isRuntimeSurvey: boolean): UseQuestionnairesHook => {
  const {questionnaires: questionnairesOption, questionnairesLoading} = useLightQuestionnaires(isRuntimeSurvey)
  const dispatch = useDispatch()
  const {account: user} = useCheckLogin()
  const filterOptions = useSelector<AppState, EntityFilterConfig>(state =>
    isRuntimeSurvey ? state.ui.common.entityFilters.events : state.ui.common.entityFilters.questionnaires
  )

  const {userClaims, userClaimsCheckLoading} = useCheckUserClaims()

  return {
    questionnaires: applyFilterAndSortEntities<QuestionnaireLight>(
      filterOptions,
      questionnairesOption.getOrElse([]),
      user.safeAsSubtype(),
      Option.none()
    ),
    questionnairesLoading,
    navigateCreateQuestionnaire: () =>
      dispatch(navigateToRouteAction(isRuntimeSurvey ? Route.EventCreation : Route.QuestionnaireCreation)),
    navigateQuestionnaireDetail: (id: string) =>
      isRuntimeSurvey
        ? dispatch(navigateToRouteAction(Route.EventDetail, {eventId: id}))
        : dispatch(navigateToRouteAction(Route.QuestionnaireDetail, {questionnaireId: id})),
    userMayFinalizeWithoutPublishing: !userClaimsCheckLoading && userClaims.mayFinalizeWithoutPublishing
  }
}
