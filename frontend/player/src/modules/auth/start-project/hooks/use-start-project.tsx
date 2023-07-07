import {isEqual} from "lodash-es"
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {NotificationSeverity} from "shared/enums"
import {ProjectModuleType, SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {ProjectModulesQuery} from "shared/graphql/generated/ProjectModulesQuery"
import {useLatestStartedProjectModuleLazy, useSurveyParticipationInfoLazy} from "shared/graphql/hooks"
import {AppNotification, LatestStartedProjectModule, ParticipantData} from "shared/models"
import {OfficeModule} from "shared/models/office-module"
import {updateLatestStartedProjectModuleAction, updateOfficeModules} from "shared/redux/actions/data-action"
import {updateActiveModuleAction, updateNotification} from "shared/redux/actions/ui-action"
import {
  find,
  first,
  isDefined,
  isSurveyParticipationCompleted as checkIsSurveyParticipationCompleted,
  Option,
  sort,
  sortByPosition
} from "shared/utils"
import {useProjectModulesLazy} from "../../../../graphql/hooks"
import {navigateToRouteAction} from "../../../../redux/actions/routing-action"
import {AppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"
import {useSurveyProgress} from "../../../common/hooks/use-survey-progress"
import {toOfficeModule} from "../../util/office-module"

export interface UseStartProjectHook {
  readonly initialized: boolean
  readonly isStartProjectConfirmModalVisible: boolean
  readonly participantData: Option<ParticipantData>
  readonly loading: boolean
  readonly setIsStartProjectConfirmModalVisible: Dispatch<SetStateAction<boolean>>
  readonly loadProjectModules: (projectId: UUID) => void
  readonly isSurveyCompleted: boolean
  readonly isSurveyParticipationCompleted: boolean
  readonly isOpenParticipation: boolean
  readonly surveyId: Option<UUID>
  readonly token: Option<string>
  readonly isPrivacyPolicyChecked: boolean
  readonly updateIsPrivacyPolicyChecked: (value: boolean) => void
}

export const useStartProject = (): UseStartProjectHook => {
  const dispatch = useDispatch()

  const [isPrivacyPolicyChecked, updateIsPrivacyPolicyChecked] = useState(false)
  const tokenRef = useRef<string | null>(null)

  const participantData = useSelector<AppState, Option<ParticipantData>>(state => state.data.common.participantData)
  const executionType = useSelector<AppState, Option<SurveyExecutionType>>(
    state => state.data.surveyInvitation.executionType
  )

  const surveyId = useSelector<AppState, Option<UUID>>(state => state.data.surveyInvitation.surveyId)
  const token = useSelector<AppState, Option<string>>(state => state.data.surveyInvitation.token)

  if (!isEqual(tokenRef.current, token.orNull())) {
    tokenRef.current = token.orNull()
  }

  const {startSpecificModuleById} = useSurveyProgress()

  const {
    surveyParticipationInfoLoading,
    surveyParticipationInfo,
    getSurveyParticipationInfo
  } = useSurveyParticipationInfoLazy()

  const {getLatestStartedProjectModule} = useLatestStartedProjectModuleLazy((latestStartedModuleId, startDate) => {
    const sortedProjectModules = sortByPosition(projectModules.getOrElse([]))
    if (latestStartedModuleId === null) {
      // survey has started but no project module of an attendee -> navigate to first projectModule
      const moduleToBeStarted = first(sortedProjectModules)
      navigateToFirstProjectModule(moduleToBeStarted.map(toOfficeModule))
    } else if (startDate !== null) {
      // navigate to currently active module
      const moduleToBeStarted = find(module => module.id === latestStartedModuleId, sortedProjectModules)
      dispatch(
        updateLatestStartedProjectModuleAction(
          Option.of<LatestStartedProjectModule>({
            projectModuleId: latestStartedModuleId,
            startedAt: startDate?.toISOString()
          })
        )
      )

      navigateToNextProjectModule(moduleToBeStarted.map(toOfficeModule))
    }
  })

  const [isStartProjectConfirmModalVisible, setIsStartProjectConfirmModalVisible] = useState(false)

  const navigateToFirstProjectModule = (firstProjectModule: Option<OfficeModule>) => {
    dispatch(updateActiveModuleAction(firstProjectModule))

    firstProjectModule.forEach(activeModule => {
      dispatch(navigateToRouteAction({routeType: Route.Welcome, parameters: {firstProjectModule: activeModule}}))
    })
  }

  const navigateToNextProjectModule = (nextProjectModule: Option<OfficeModule>) => {
    nextProjectModule.forEach(nextOfficeModule => {
      if (nextOfficeModule.moduleType === ProjectModuleType.Scenario && nextOfficeModule.scenarioId !== null) {
        startSpecificModuleById(ProjectModuleType.Scenario, nextOfficeModule.scenarioId)
      } else if (nextOfficeModule.questionnaireId !== null) {
        startSpecificModuleById(ProjectModuleType.Questionnaire, nextOfficeModule.questionnaireId)
      }
    })
  }

  const onProjectsModulesQueryCompleted = (data: ProjectModulesQuery) => {
    if (data?.projectModules.length > 0) {
      const sortedModules: Array<OfficeModule> = sort(
        projectModule => projectModule.position,
        data.projectModules.map(({moduleType, position, scenarioId, questionnaireId, projectId, id}) => ({
          moduleType,
          position,
          scenarioId,
          questionnaireId,
          projectId,
          id
        }))
      )
      const activeModuleOption = first(sortedModules)

      dispatch(updateOfficeModules(sortedModules))

      if (executionType.exists(type => type === SurveyExecutionType.AutomaticAsynchronous)) {
        navigateToFirstProjectModule(activeModuleOption)
      } else {
        token.forEach(token => {
          getSurveyParticipationInfo(token).then(data => {
            const hasManualSurveyStarted = data.exists(({surveyInvitation}) =>
              isDefined(surveyInvitation.survey.manualPeriod?.start)
            )
            if (hasManualSurveyStarted) {
              surveyId.forEach(surveyId => getLatestStartedProjectModule({variables: {surveyId}}))
            } else {
              dispatch(navigateToRouteAction({routeType: Route.WaitForManualSurveyStart}))
            }
          })
        })
      }
    } else {
      dispatch(
        updateNotification(
          Option.of<AppNotification>({
            severity: NotificationSeverity.Warning,
            messageKey: "scenario__no_scenario_found"
          })
        )
      )
    }
  }

  const onProjectsModulesQueryFailed = () =>
    dispatch(
      updateNotification(
        Option.of<AppNotification>({
          severity: NotificationSeverity.Error,
          messageKey: "scenario__no_scenario_error"
        })
      )
    )

  const {getProjectModules, projectModules, projectModulesLoading, projectModulesCalled} = useProjectModulesLazy({
    onCompleted: onProjectsModulesQueryCompleted,
    onError: onProjectsModulesQueryFailed
  })

  const isSurveyCompleted = surveyParticipationInfo.exists(({surveyInvitation}) => surveyInvitation.survey.isCompleted)
  const isOpenParticipation = surveyParticipationInfo.exists(
    ({surveyInvitation}) => surveyInvitation.isOpenParticipation
  )

  const isSurveyParticipationCompleted = surveyParticipationInfo.exists(({surveyParticipationStatus}) =>
    checkIsSurveyParticipationCompleted(surveyParticipationStatus)
  )

  useEffect(() => {
    if (tokenRef.current !== null) {
      getSurveyParticipationInfo(tokenRef.current)
    }
  }, [tokenRef.current])

  return {
    loadProjectModules: getProjectModules,
    loading: projectModulesLoading || surveyParticipationInfoLoading,
    initialized: projectModulesCalled && !projectModulesLoading,
    isStartProjectConfirmModalVisible,
    setIsStartProjectConfirmModalVisible,
    participantData,
    isSurveyCompleted,
    isSurveyParticipationCompleted,
    isOpenParticipation,
    surveyId,
    token,
    isPrivacyPolicyChecked,
    updateIsPrivacyPolicyChecked
  }
}
