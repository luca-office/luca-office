import {css} from "@emotion/react"
import React from "react"
import {ReportingProgressInfo} from "shared/components"
import {CompletedParticipantCount, ProjectModule, SurveyResultsOverview} from "shared/models"
import {spacingMedium} from "shared/styles"
import {getFinishedModulesCount} from "../../utils/common"
import {ModulesAndParticipantsTabbedCard} from "./modules-and-participants-tabbed-card"

interface Props {
  readonly surveyResultsOverview: SurveyResultsOverview
  readonly projectModules: ProjectModule[]
  readonly completedParticipantsCount: CompletedParticipantCount
  readonly navigateToParticipantOverview: (surveyInvitationId: UUID) => void
  readonly navigateToScenario: (scenarioId: UUID) => void
  readonly navigateToQuestionnaire: (questionnaireId: UUID) => void
}

export const ReportingProjectOverview: React.FC<Props> = ({
  surveyResultsOverview,
  projectModules,
  completedParticipantsCount,
  navigateToParticipantOverview,
  navigateToScenario,
  navigateToQuestionnaire
}) => {
  const {averageScore, projectModuleResults, maximumScore} = surveyResultsOverview

  const finishedModulesCount = getFinishedModulesCount(projectModuleResults)

  return (
    <>
      <ReportingProgressInfo
        finishedModulesCount={finishedModulesCount}
        allProjectModulesCount={projectModuleResults.length}
        averageScore={averageScore}
        maximumScore={maximumScore}
        completedParticipantsCount={completedParticipantsCount}
      />
      <ModulesAndParticipantsTabbedCard
        surveyResultsOverview={surveyResultsOverview}
        projectModules={projectModules}
        customStyles={styles.tabbedCard}
        navigateToParticipantOverview={navigateToParticipantOverview}
        navigateToScenario={navigateToScenario}
        navigateToQuestionnaire={navigateToQuestionnaire}
      />
    </>
  )
}

const styles = {
  tabbedCard: css({
    marginTop: spacingMedium
  })
}
