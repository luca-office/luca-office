import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useQuestionnaireQuestionState} from "shared/components"
import {DEFAULT_PROJECT_MODULE_DURATION_IN_S} from "shared/components/desktop/config"
import {ProjectModuleEndType} from "shared/enums/project-module-end-type"
import {SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {LatestStartedProjectModule, OfficeModule, Questionnaire} from "shared/models"
import {selectSurveyInvitation} from "shared/redux/state/data"
import {ElapsedTimeOfProjectModuleForResumption} from "shared/redux/state/data/project-resumption-state"
import {Option} from "shared/utils"
import {getElapsedTimeOfLaterStartToSurveyInSeconds} from "shared/utils/latest-started-project-module"
import {useQuestionnaire} from "../../../../graphql/hooks"
import {isResumptionOfActiveModule} from "../../../../modules/common/desktop/util"
import {navigateToRouteAction} from "../../../../redux/actions/routing-action"
import {AppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"
import {useSurveyProgress} from "../../../common/hooks/use-survey-progress"
import {useQuestionnaireSurveyEvents} from "../../hooks/use-questionnaire-survey-events"

export interface UseModuleQuestionnaireProps {
  readonly id: Option<UUID>
  readonly isManualSurvey: boolean
}

export const useModuleQuestionnaire = ({id, isManualSurvey}: UseModuleQuestionnaireProps) => {
  const dispatch = useDispatch()
  const activeModuleOption = useSelector<AppState, Option<OfficeModule>>(s => s.ui.common.activeModule)

  const {questionnaire, questionnaireLoading} = useQuestionnaire(id.getOrElse(""))
  const {
    onSelectAnswer,
    onDeselectAnswer,
    onUpdateFreeText,
    isQuestionnaireFinished,
    numberOfAnsweredQuestions
  } = useQuestionnaireQuestionState(questionnaire.map(({questions}) => questions).getOrElse([]))

  const [isStartModalVisible, setIsStartModalVisible] = useState(true)
  const [isFinishModalVisible, setIsFinishModalVisible] = useState(false)
  const [isQuestionnaireDurationExpired, setIsQuestionnaireDurationExpired] = useState(false)

  const {executionType: executionTypeOption} = useSelector(selectSurveyInvitation)
  const {startNextModule, isLastModule, handleEndProject} = useSurveyProgress()
  const surveyEvents = useQuestionnaireSurveyEvents()

  const latestStartedProjectModule = useSelector<AppState, Option<LatestStartedProjectModule>>(
    state => state.data.common.latestStartedProjectModule
  )

  const projectResumptionQuestionnaireDelay = useSelector<AppState, Option<ElapsedTimeOfProjectModuleForResumption>>(
    s => s.data.projectResumption.elapsedTimeOfProjectModule
  )

  useEffect(() => {
    let timeoutId: number
    questionnaire.forEach(questionnaire => {
      const questionnaireDurationInMilliSeconds = getQuestionnaireDurationInMillis(questionnaire)

      if (questionnaireDurationInMilliSeconds !== undefined && !isManualSurvey) {
        timeoutId = window.setTimeout(handleQuestionnaireDurationExpired, questionnaireDurationInMilliSeconds)
      }
    })

    return () => {
      clearTimeout(timeoutId)
    }
  }, [questionnaire.map(q => q.id).orNull()])

  const getQuestionnaireDurationInMillis = (questionnaire: Questionnaire) => {
    const maxDurationInSeconds = questionnaire.maxDurationInSeconds ?? DEFAULT_PROJECT_MODULE_DURATION_IN_S

    const isResumption = isResumptionOfActiveModule(null, questionnaire.id, projectResumptionQuestionnaireDelay)

    const elapsedTimeOfQuestionnaire = isResumption
      ? projectResumptionQuestionnaireDelay.map(delay => delay.elapsedTimeInSeconds).getOrElse(0)
      : getElapsedTimeOfLaterStartToSurveyInSeconds(activeModuleOption, latestStartedProjectModule)

    return (maxDurationInSeconds - elapsedTimeOfQuestionnaire) * 1000
  }

  const onFinishQuestionnaire = (endType: ProjectModuleEndType) => {
    id.forEach(questionnaireId => surveyEvents.sendEndQuestionnaire(questionnaireId, {questionnaireId, endType}))

    executionTypeOption.forEach(type => {
      switch (type) {
        case SurveyExecutionType.AutomaticAsynchronous:
        case SurveyExecutionType.ManualAsynchronous:
          startNextModule()
          setIsStartModalVisible(true)
          break
        case SurveyExecutionType.ManualSynchronous:
          if (isLastModule) {
            handleEndProject()
          } else {
            dispatch(navigateToRouteAction({routeType: Route.WaitForNextModule}))
          }
          break
      }
    })
    setIsFinishModalVisible(false)
  }

  const handleQuestionnaireDurationExpired = () => {
    setIsQuestionnaireDurationExpired(true)
  }

  const handleQuestionnaireTimeUpModalConfirm = () => {
    onFinishQuestionnaire(ProjectModuleEndType.ByTime)
  }

  const navigateToVerifyToken = () => dispatch(navigateToRouteAction({routeType: Route.VerifyToken}))

  return {
    questionnaire,
    getQuestionnaireDurationInMillis,
    loading: questionnaireLoading,
    isQuestionnaireFinished,
    numberOfAnsweredQuestions,
    onSelectAnswer,
    onDeselectAnswer,
    onUpdateFreeText,
    isStartModalVisible,
    setIsStartModalVisible,
    onFinishQuestionnaire,
    isFinishModalVisible,
    setIsFinishModalVisible,
    surveyEvents,
    navigateToVerifyToken,
    isQuestionnaireDurationExpired,
    onTimeUpConfirm: handleQuestionnaireTimeUpModalConfirm
  }
}
