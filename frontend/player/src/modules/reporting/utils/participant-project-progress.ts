import {compact} from "lodash-es"
import {Salutation} from "shared/graphql/generated/globalTypes"
import {ParticipantProjectProgress, ProjectModule, ProjectModuleScore, SurveyInvitation} from "shared/models"
import {find, getModuleProgress, isEmpty, Option} from "shared/utils"

interface GetParticipantProjectProgress {
  readonly surveyInvitation: SurveyInvitation
  readonly participantName: Option<string>
  readonly projectModules: ProjectModule[]
  readonly projectModulesScores: ProjectModuleScore[]
}

export const getParticipantProjectProgress = ({
  surveyInvitation,
  participantName,
  projectModules,
  projectModulesScores
}: GetParticipantProjectProgress): ParticipantProjectProgress => ({
  id: surveyInvitation.id,
  displayName: participantName.getOrElse(""),
  moduleProgress: compact(
    surveyInvitation.projectModuleProgresses
      .slice()
      .sort((a, b) => {
        const aPosition = find(
          ({scenarioId, questionnaireId}) =>
            a.scenarioId !== null ? scenarioId === a.scenarioId : questionnaireId === a.questionnaireId,
          projectModules
        )
          .map(module => module.position)
          .getOrElse(-1)

        const bPosition = find(
          ({scenarioId, questionnaireId}) =>
            b.scenarioId !== null ? scenarioId === b.scenarioId : questionnaireId === b.questionnaireId,
          projectModules
        )
          .map(module => module.position)
          .getOrElse(-1)

        return aPosition - bPosition
      })
      .map(projectModuleProgress => {
        const projectModule = projectModules.find(projectModule =>
          projectModuleProgress.scenarioId !== null
            ? projectModule.scenarioId === projectModuleProgress.scenarioId
            : projectModuleProgress.questionnaireId === projectModule.questionnaireId
        )

        if (projectModule !== undefined) {
          return getModuleProgress({
            projectModule,
            projectModuleProgresses: surveyInvitation.projectModuleProgresses,
            projectModulesScores
          })
        } else {
          if(!isEmpty(projectModules)) {
            // log error if project modules are loaded, but no related progress found
            console.warn("ProjectModule could not be found")
          }
          return null
        }
      })
  ),
  salutation: surveyInvitation.participantData?.salutation ?? Salutation.NonBinary,
  token: surveyInvitation.token
})
