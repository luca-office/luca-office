import {
  getSubDimensions,
  hasCodingItemBeenRated,
  haveCodingItemsBeenRated,
  isManualQuestionRated,
  requiresScoring as checkRequiresScoring,
  requiresScoring,
  wasManualQuestionRatedWithoutFinalizedCheck
} from "shared/components/rating/utils"
import {ProjectModuleProgressType, ProjectModuleType, QuestionScoringType} from "shared/graphql/generated/globalTypes"
import {
  AutomatedCodingCriterion,
  CodingCriterion,
  CodingDimension,
  CodingItem,
  FreetextQuestionRating,
  ProjectModule,
  Rating,
  ScenarioCodingItemRating,
  SurveyInvitationLight
} from "shared/models"
import {every, exists, flatten} from "shared/utils"
import {ParticipantRatingCounts} from "../scoring/dashboard/scoring-dashboard-table/scoring-dashboard-table"

interface GetCodingItemsByProjectModuleParams {
  readonly allCodingDimensions: CodingDimension[]
  readonly allCodingItems: CodingItem[]
  readonly projectModule: ProjectModule
}

const getCodingItemsByProjectModule = ({
  allCodingDimensions,
  allCodingItems,
  projectModule
}: GetCodingItemsByProjectModuleParams): CodingItem[] => {
  const codingDimensions = allCodingDimensions.filter(
    codingDimension =>
      codingDimension.parentDimensionId === null &&
      codingDimension.codingModelId === projectModule.scenario?.codingModel?.id
  )
  const allSubDimensions = codingDimensions.reduce(
    (accumulator, codingDimension) => [...accumulator, ...getSubDimensions(codingDimension, allCodingDimensions)],
    [] as CodingDimension[]
  )

  return allCodingItems.filter(({dimensionId}) =>
    exists(codingDimension => codingDimension.id === dimensionId, [...codingDimensions, ...allSubDimensions])
  )
}

interface IsParticipantRatedByScenario {
  readonly projectModule: ProjectModule
  readonly surveyInvitation: SurveyInvitationLight
  readonly codingDimensions: CodingDimension[]
  readonly codingItems: CodingItem[]
  readonly codingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly ratings: Rating[]
}

export const isParticipantFullyRatedByScenario = ({
  projectModule,
  surveyInvitation,
  codingDimensions: allCodingDimensions,
  codingItems: allCodingItems,
  codingCriteria,
  scenarioCodingItemRatings,
  ratings
}: IsParticipantRatedByScenario) => {
  if (projectModule.moduleType !== ProjectModuleType.Scenario || projectModule.scenario === undefined) {
    return false
  }

  const codingItems = getCodingItemsByProjectModule({allCodingDimensions, allCodingItems, projectModule})
  const criteria = codingCriteria.filter(codingCriterion =>
    exists(item => item.id === codingCriterion.itemId, codingItems)
  )

  const participantScenarioCodingItemRatings = scenarioCodingItemRatings.filter(
    scenarioCodingItemRating =>
      scenarioCodingItemRating.surveyInvitationId === surveyInvitation.id &&
      exists(item => scenarioCodingItemRating.codingItemId === item.id, codingItems)
  )
  const criterionSelections = participantScenarioCodingItemRatings.flatMap(
    scenarioCodingItemRating => scenarioCodingItemRating.criterionSelections
  )

  return haveCodingItemsBeenRated({
    codingItems,
    codingCriteria: criteria,
    criterionSelections,
    scenarioCodingItemRatings: participantScenarioCodingItemRatings,
    ratings
  })
}

interface IsParticipantRatedByQuestionnaire {
  readonly projectModule: ProjectModule
  readonly freetextQuestionRatingsForParticipant: FreetextQuestionRating[]
  readonly ratings: Rating[]
}

export const isParticipantRatedByQuestionnaire = ({
  projectModule,
  freetextQuestionRatingsForParticipant,
  ratings
}: IsParticipantRatedByQuestionnaire) => {
  if (projectModule.moduleType !== ProjectModuleType.Questionnaire || projectModule.questionnaire === undefined) {
    return false
  }
  const questions =
    projectModule.questionnaire?.questions.filter(question => question.scoringType !== QuestionScoringType.None) ?? []

  return every(question => {
    const freetextQuestionRatings =
      freetextQuestionRatingsForParticipant?.filter(rating => rating.questionId === question.id) ?? []
    const criterionSelections = flatten(freetextQuestionRatings.map(rating => rating.criterionSelections))

    return (
      !checkRequiresScoring(question) ||
      isManualQuestionRated({
        question,
        criterionSelections,
        freetextQuestionRatings,
        ratings
      })
    )
  }, questions)
}

interface GetParticipantRatedCountByScenarioParams {
  readonly surveyInvitation: SurveyInvitationLight
  readonly codingItems: CodingItem[]
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly codingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
}

export const getParticipantRatedCountByScenario = ({
  surveyInvitation,
  codingItems,
  scenarioCodingItemRatings,
  codingCriteria
}: GetParticipantRatedCountByScenarioParams) =>
  codingItems.reduce((itemsAccumulator, codingItem) => {
    const participantScenarioCodingItemRatings = scenarioCodingItemRatings.filter(
      scenarioCodingItemRating =>
        scenarioCodingItemRating.surveyInvitationId === surveyInvitation.id &&
        scenarioCodingItemRating.codingItemId === codingItem.id
    )
    const criterionSelections = participantScenarioCodingItemRatings.flatMap(
      scenarioCodingItemRating => scenarioCodingItemRating.criterionSelections
    )

    return hasCodingItemBeenRated({
      codingItem,
      scenarioCodingItemRatings: participantScenarioCodingItemRatings,
      codingCriteria,
      criterionSelections
    })
      ? itemsAccumulator + 1
      : itemsAccumulator
  }, 0)

interface GetParticipantRatedCountByQuestionnaireParams {
  readonly surveyInvitation: SurveyInvitationLight
  readonly projectModule: ProjectModule
  readonly freetextQuestionRatings: FreetextQuestionRating[]
}

export const getParticipantRatedCountByQuestionnaire = ({
  surveyInvitation,
  projectModule,
  freetextQuestionRatings
}: GetParticipantRatedCountByQuestionnaireParams) => {
  if (projectModule.moduleType !== ProjectModuleType.Questionnaire) {
    return 0
  }

  const questions =
    projectModule.questionnaire?.questions.filter(question => question.scoringType !== QuestionScoringType.None) ?? []
  const freetextQuestionRatingsForParticipant = freetextQuestionRatings.filter(
    freetextQuestionRating => freetextQuestionRating.surveyInvitationId === surveyInvitation.id
  )

  return questions.reduce((questionAccumulator, question) => {
    const questionRatings =
      freetextQuestionRatingsForParticipant.filter(rating => rating.questionId === question.id) ?? []
    const criterionSelections = flatten(questionRatings.map(rating => rating.criterionSelections))

    return !requiresScoring(question) ||
      wasManualQuestionRatedWithoutFinalizedCheck({
        question,
        criterionSelections,
        freetextQuestionRatings: questionRatings
      })
      ? questionAccumulator + 1
      : questionAccumulator
  }, 0)
}

interface GetParticipantRatingCountsParams {
  readonly surveyInvitation: SurveyInvitationLight
  readonly projectModules: ProjectModule[]
  readonly codingDimensions: CodingDimension[]
  readonly codingItems: CodingItem[]
  readonly scenarioCodingItemRatings: ScenarioCodingItemRating[]
  readonly codingCriteria: Array<CodingCriterion | AutomatedCodingCriterion>
  readonly freetextQuestionRatings: FreetextQuestionRating[]
  readonly finalRatingId: UUID
}

export const getParticipantRatingCounts = ({
  surveyInvitation,
  projectModules,
  codingDimensions: allCodingDimensions,
  codingItems: allCodingItems,
  scenarioCodingItemRatings,
  codingCriteria,
  freetextQuestionRatings,
  finalRatingId
}: GetParticipantRatingCountsParams): ParticipantRatingCounts => {
  const getRatedProjectModulesCount = (useOnlyFinalRater: boolean) =>
    projectModules.reduce((accumulator, projectModule) => {
      const codingItems = getCodingItemsByProjectModule({allCodingDimensions, allCodingItems, projectModule})

      if (projectModule.moduleType === ProjectModuleType.Scenario) {
        const ratedCodingItemsCount = getParticipantRatedCountByScenario({
          surveyInvitation,
          codingItems,
          scenarioCodingItemRatings: useOnlyFinalRater
            ? scenarioCodingItemRatings.filter(rating => rating.ratingId === finalRatingId)
            : scenarioCodingItemRatings,
          codingCriteria
        })

        return accumulator + (ratedCodingItemsCount === codingItems.length && codingItems.length > 0 ? 1 : 0)
      }

      if (projectModule.moduleType === ProjectModuleType.Questionnaire) {
        const questions =
          projectModule.questionnaire?.questions.filter(
            question => question.scoringType !== QuestionScoringType.None
          ) ?? []
        const ratedCodingQuestionsCount = getParticipantRatedCountByQuestionnaire({
          surveyInvitation,
          projectModule,
          freetextQuestionRatings: useOnlyFinalRater
            ? freetextQuestionRatings.filter(rating => rating.ratingId === finalRatingId)
            : freetextQuestionRatings
        })

        return accumulator + (ratedCodingQuestionsCount === questions.length ? 1 : 0)
      }

      return accumulator
    }, 0)

  const finalRatedCounts = getRatedProjectModulesCount(true)

  const ratableProjectModulesCount = surveyInvitation.projectModuleProgresses.filter(
    module => module.status === ProjectModuleProgressType.Completed
  ).length

  return {ratableProjectModulesCount, finalRatedProjectModulesCount: finalRatedCounts}
}
