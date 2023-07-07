import {ParticipantProjectProgress, ProjectModule, ProjectModuleScore, SurveyInvitationProgress} from "../models"
import {getModuleProgress} from "./module-progress"
import {Option} from "./option"
import {getParticipantNameOrToken} from "./participants"
import {sortByPosition} from "./sort"

export const computeSurveyProgress = (
  projectModules: ProjectModule[],
  surveyInvitationsProgress: Option<SurveyInvitationProgress[]>,
  projectModulesScores: ProjectModuleScore[] = []
): ParticipantProjectProgress[] =>
  surveyInvitationsProgress.getOrElse([]).map(progress => ({
    id: progress.id,
    token: progress.token,
    salutation: progress.participantData?.salutation,
    displayName: getParticipantNameOrToken(progress.participantData, progress.token),
    moduleProgress: sortByPosition(projectModules).map(projectModule =>
      getModuleProgress({
        projectModule,
        projectModuleProgresses: progress.projectModuleProgresses,
        projectModulesScores
      })
    )
  }))
