import {ProjectModuleType, QuestionScoringType} from "shared/graphql/generated/globalTypes"
import {ProjectModule, Questionnaire, QuestionnaireQuestion} from "shared/models"
import {exists} from "shared/utils"

interface GetProjectModuleQuestionsParams {
  readonly allQuestionnaires: Questionnaire[]
  readonly projectModules: ProjectModule[]
}

export const getProjectModuleQuestions = ({allQuestionnaires, projectModules}: GetProjectModuleQuestionsParams) =>
  allQuestionnaires.reduce(
    (accumulator, questionnaire) =>
      exists(
        projectModule =>
          projectModule.moduleType === ProjectModuleType.Questionnaire &&
          questionnaire.id === projectModule.questionnaire?.id,
        projectModules
      )
        ? [
            ...accumulator,
            ...questionnaire.questions.filter(question => question.scoringType !== QuestionScoringType.None)
          ]
        : accumulator,
    [] as QuestionnaireQuestion[]
  )
