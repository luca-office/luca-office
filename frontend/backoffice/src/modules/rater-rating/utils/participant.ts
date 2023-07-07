import {sum} from "lodash-es"
import {isManualQuestionRated, requiresScoring} from "shared/components/rating/utils"
import {ProjectModuleProgressType, ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {
  AutomatedCodingCriterion,
  CodingCriterion,
  CodingDimension,
  FreetextQuestionRating,
  FreetextQuestionRatingCriterionSelection,
  ProjectModule,
  QuestionnaireQuestion,
  Rating,
  ScenarioCodingItemRating,
  SurveyInvitationLight,
  UserAccount
} from "shared/models"
import {exists, find, roundNumber, toPercent} from "shared/utils"
import {ProjectModuleCodingItemsMap} from "../hooks"

const getProjectModuleCodingItemsMap = (
  codingDimensions: CodingDimension[],
  projectModuleCodingItemsMap: ProjectModuleCodingItemsMap
): ProjectModuleCodingItemsMap => {
  const dimensions = codingDimensions.filter(({parentDimensionId}) => parentDimensionId === null)
  return Object.keys(projectModuleCodingItemsMap).reduce(
    (accumulator, projectModuleId) => ({
      ...accumulator,
      [projectModuleId]:
        projectModuleCodingItemsMap[projectModuleId]?.filter(codingItem =>
          exists(dimension => codingItem.dimensionId === dimension.id, dimensions)
        ) ?? []
    }),
    {} as ProjectModuleCodingItemsMap
  )
}

interface GetRatedEntitiesCount {
  readonly surveyInvitation: SurveyInvitationLight
  readonly projectModule: ProjectModule
  readonly raterRatings: Rating[]
  readonly projectModuleQuestions: QuestionnaireQuestion[]
  readonly freetextQuestionRatings: FreetextQuestionRating[]
  readonly projectModuleCodingItemsMap: ProjectModuleCodingItemsMap
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly allCodingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
}

const getRatedEntitiesCountByProjectModule = ({
  surveyInvitation,
  projectModule,
  raterRatings,
  projectModuleQuestions,
  freetextQuestionRatings,
  projectModuleCodingItemsMap,
  scenarioCodingItemRatings,
  allCodingCriteria
}: GetRatedEntitiesCount): number => {
  if (projectModule.moduleType === ProjectModuleType.Questionnaire) {
    const isCompletedByParticipant =
      surveyInvitation.projectModuleProgresses.find(
        progress => progress.questionnaireId === projectModule.questionnaireId
      )?.status === ProjectModuleProgressType.Completed

    if (!isCompletedByParticipant) {
      // only completed Modules are relevant for rating
      return 0
    }

    const questions = projectModuleQuestions.filter(
      question => question.questionnaireId === projectModule.questionnaire?.id
    )
    const raterFreetextQuestionRatings = freetextQuestionRatings.filter(
      freetextQuestionRating =>
        freetextQuestionRating.surveyInvitationId === surveyInvitation.id &&
        exists(({id}) => freetextQuestionRating.ratingId === id, raterRatings)
    )
    const criterionSelections = raterFreetextQuestionRatings.reduce(
      (acc, raterFreetextQuestionRating) =>
        raterFreetextQuestionRating.surveyInvitationId === surveyInvitation.id
          ? [...acc, ...raterFreetextQuestionRating.criterionSelections]
          : acc,
      [] as FreetextQuestionRatingCriterionSelection[]
    )

    return questions.filter(
      question =>
        !requiresScoring(question) ||
        isManualQuestionRated({
          question,
          criterionSelections,
          freetextQuestionRatings: find(
            raterFreetextQuestionRating => raterFreetextQuestionRating.questionId === question.id,
            raterFreetextQuestionRatings
          )
            .map(raterFreetextQuestionRating => [raterFreetextQuestionRating])
            .getOrElse([]),
          ratings: raterRatings
        }),
      questions
    ).length
  }

  const isCompletedByParticipant =
    surveyInvitation.projectModuleProgresses.find(progress => progress.scenarioId === projectModule.scenarioId)
      ?.status === ProjectModuleProgressType.Completed

  if (!isCompletedByParticipant) {
    // only completed Modules are relevant for rating
    return 0
  }

  const codingItemsOfProjectModule = projectModuleCodingItemsMap[projectModule.id] ?? []

  const codingItemsOfProjectModuleIds = codingItemsOfProjectModule.map(codingItem => codingItem.id)
  const raterScenarioCodingItemRatingsForProjectModule = scenarioCodingItemRatings.filter(
    scenarioCodingItemRating =>
      scenarioCodingItemRating.surveyInvitationId === surveyInvitation.id &&
      codingItemsOfProjectModuleIds.includes(scenarioCodingItemRating.codingItemId) &&
      exists(({id}) => scenarioCodingItemRating.ratingId === id, raterRatings) &&
      (scenarioCodingItemRating.noCriterionFulfilled || scenarioCodingItemRating.criterionSelections.length > 0)
  )

  // return length, because query only contains items, that have been rated (either noCriterionFulfilled or criterionSelections > 0)
  return raterScenarioCodingItemRatingsForProjectModule.length
}

interface GetRatedParticipantsCountParams {
  readonly surveyInvitations: SurveyInvitationLight[]
  readonly raters: UserAccount[]
  readonly ratings: Rating[]
  readonly projectModules: ProjectModule[]
  readonly projectModuleQuestions: QuestionnaireQuestion[]
  readonly freetextQuestionRatings: FreetextQuestionRating[]
  readonly projectModuleCodingItems: ProjectModuleCodingItemsMap
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly allCodingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
  readonly codingDimensions: CodingDimension[]
}

export const getRatedParticipantsCount = ({
  surveyInvitations,
  raters,
  ratings,
  projectModules,
  projectModuleQuestions,
  freetextQuestionRatings,
  projectModuleCodingItems: allProjectModuleCodingItems,
  scenarioCodingItemRatings,
  allCodingCriteria,
  codingDimensions
}: GetRatedParticipantsCountParams) => {
  const projectModuleCodingItems = getProjectModuleCodingItemsMap(codingDimensions, allProjectModuleCodingItems)
  return surveyInvitations.reduce((surveyInvitationsAccumulator, surveyInvitation) => {
    const ratedProjectModuleCountsByRater = raters.map(rater => {
      const raterRatings = ratings.filter(({userAccountId}) => userAccountId === rater.id)

      const ratedProjectModulesCount = projectModules.reduce((projectModulesAccumulator, projectModule) => {
        if (projectModule.moduleType === ProjectModuleType.Questionnaire) {
          const questions = projectModuleQuestions.filter(
            question => question.questionnaireId === projectModule.questionnaire?.id
          )

          return questions.length > 0 &&
            questions.length ===
              getRatedEntitiesCountByProjectModule({
                surveyInvitation,
                projectModule,
                raterRatings,
                projectModuleQuestions,
                freetextQuestionRatings,
                projectModuleCodingItemsMap: projectModuleCodingItems,
                scenarioCodingItemRatings,
                allCodingCriteria
              })
            ? projectModulesAccumulator + 1
            : projectModulesAccumulator
        }

        const codingItems = projectModuleCodingItems[projectModule.id] ?? []
        return codingItems.length > 0 &&
          codingItems.length ===
            getRatedEntitiesCountByProjectModule({
              surveyInvitation,
              projectModule,
              raterRatings,
              projectModuleQuestions,
              freetextQuestionRatings,
              projectModuleCodingItemsMap: projectModuleCodingItems,
              scenarioCodingItemRatings,
              allCodingCriteria
            })
          ? projectModulesAccumulator + 1
          : projectModulesAccumulator
      }, 0)

      return ratedProjectModulesCount > 0 ? roundNumber(ratedProjectModulesCount / projectModules.length) : 0
    }, 0)

    return surveyInvitationsAccumulator + sum(ratedProjectModuleCountsByRater)
  }, 0)
}

interface GetRatingPercentageByParticipantsParams {
  readonly surveyInvitations: SurveyInvitationLight[]
  readonly codingDimensions: CodingDimension[]
  readonly projectModuleCodingItemsMap: ProjectModuleCodingItemsMap
  readonly projectModules: ProjectModule[]
  readonly projectModuleQuestions: QuestionnaireQuestion[]
  readonly raters: UserAccount[]
  readonly ratings: Rating[]
  readonly freetextQuestionRatings: FreetextQuestionRating[]
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly allCodingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
}

interface GetRatingPercentageByParticipants {
  readonly ratingPercentage: number
  readonly totalEntitiesCount: number
  readonly totalEntitiesCountForSingleRater: number
  readonly ratedEntitiesCount: number
  readonly ratedEntitiesCountForSingleRater: (raterId: UUID) => number
}

export const getRatingPercentageByParticipants = ({
  surveyInvitations,
  codingDimensions,
  projectModuleCodingItemsMap,
  projectModules,
  projectModuleQuestions,
  raters,
  ratings,
  freetextQuestionRatings,
  scenarioCodingItemRatings,
  allCodingCriteria
}: GetRatingPercentageByParticipantsParams): GetRatingPercentageByParticipants => {
  const totalEntitiesCountForSingleRater = sum(
    surveyInvitations.map(surveyInvitation => {
      const entitiesCounts = projectModules.map(projectModule => {
        if (projectModule.moduleType === ProjectModuleType.Questionnaire) {
          const isCompletedByParticipant =
            surveyInvitation.projectModuleProgresses.find(
              progress => progress.questionnaireId === projectModule.questionnaireId
            )?.status === ProjectModuleProgressType.Completed

          const questions = projectModuleQuestions.filter(
            question => question.questionnaireId === projectModule.questionnaire?.id
          )
          return isCompletedByParticipant ? questions.length : 0
        }

        const isCompletedByParticipant =
          surveyInvitation.projectModuleProgresses.find(progress => progress.scenarioId === projectModule.scenarioId)
            ?.status === ProjectModuleProgressType.Completed

        const codingItems = projectModuleCodingItemsMap[projectModule.id] ?? []
        return isCompletedByParticipant ? codingItems.length : 0
      })
      return sum(entitiesCounts)
    })
  )

  const ratedEntitiesCount = surveyInvitations.reduce((accumulator, surveyInvitation) => {
    const ratedEntitiesByRaters = raters.map(rater => {
      const raterRatings = ratings.filter(({userAccountId}) => userAccountId === rater.id)
      return sum(
        projectModules.map(projectModule =>
          getRatedEntitiesCountByProjectModule({
            surveyInvitation,
            projectModule,
            raterRatings,
            projectModuleQuestions,
            freetextQuestionRatings,
            projectModuleCodingItemsMap: projectModuleCodingItemsMap,
            scenarioCodingItemRatings,
            allCodingCriteria
          })
        )
      )
    }, 0)
    return accumulator + sum(ratedEntitiesByRaters)
  }, 0)

  const ratedEntitiesCountForRater = (raterId: UUID) =>
    surveyInvitations.reduce((accumulator, surveyInvitation) => {
      const raterRatings = ratings.filter(({userAccountId}) => userAccountId === raterId)
      return (
        accumulator +
        sum(
          projectModules.map(projectModule =>
            getRatedEntitiesCountByProjectModule({
              surveyInvitation,
              projectModule,
              raterRatings,
              projectModuleQuestions,
              freetextQuestionRatings,
              projectModuleCodingItemsMap: projectModuleCodingItemsMap,
              scenarioCodingItemRatings,
              allCodingCriteria
            })
          )
        )
      )
    }, 0)

  const totalEntitiesCount = totalEntitiesCountForSingleRater * raters.length

  const ratingPercentage = totalEntitiesCount > 0 ? toPercent(ratedEntitiesCount, totalEntitiesCount) : 0

  return {
    ratingPercentage,
    totalEntitiesCount,
    ratedEntitiesCount,
    totalEntitiesCountForSingleRater,
    ratedEntitiesCountForSingleRater: ratedEntitiesCountForRater
  }
}
