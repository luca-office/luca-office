import React from "react"
import {useSelector} from "react-redux"
import {Survey} from "shared/models"
import {Option} from "shared/utils"
import {SurveyTiming} from "../../../../../enums"
import {AppState} from "../../../../../redux/state/app-state"
import {ProjectModuleManualSurvey} from "../../../../../redux/state/ui/synchron-survey-state"
import {MonitoringManualSurveyCard} from "./monitoring-manual-survey-card"

interface Props {
  readonly navigateToProjectDashboard: () => void
  readonly survey: Survey
  readonly surveyTiming: SurveyTiming
}

export const MonitoringManualSurveyCardContainer: React.FC<Props> = ({
  navigateToProjectDashboard,
  survey,
  surveyTiming
}) => {
  const activeModule = useSelector<AppState, Option<ProjectModuleManualSurvey>>(
    state => state.ui.synchronSurvey.activeModule
  )
  const activeModuleIndex = useSelector<AppState, Option<number>>(state => state.ui.synchronSurvey.activeModuleIndex)

  const availableParticipantIds = useSelector<AppState, UUID[]>(state => state.chat.availableParticipantIds)
  const onlineCount = availableParticipantIds.length

  return (
    <MonitoringManualSurveyCard
      activeModule={activeModule}
      activeModuleIndexZeroBased={activeModuleIndex}
      survey={survey}
      surveyTiming={surveyTiming}
      onlineCount={onlineCount}
      navigateToProjectDashboard={navigateToProjectDashboard}
    />
  )
}
