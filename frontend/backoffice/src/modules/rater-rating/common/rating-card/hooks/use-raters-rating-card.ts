import {useApolloClient} from "@apollo/client"
import {isEqual} from "lodash-es"
import React from "react"
import {useCodingCriteriaByItemsList, useRatings, useScenarioCodingItemRatingsByRatingsList} from "shared/components"
import {useFreetextQuestionRatingsByRatingsList} from "shared/components/rating/hooks/use-freetext-question-ratings-by-ratings-list"
import {getCodingItemsFromCodingDimensions} from "shared/components/rating/utils"
import {RaterMode, RatingStatus} from "shared/enums"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {useProjectModules, useQuestionnaires, useSurveyInvitations, useSurveyUserAccounts} from "shared/graphql/hooks"
import {
  AutomatedCodingCriterion,
  CodingCriterion,
  CodingDimension,
  CodingItem,
  FreetextQuestionRating,
  ProjectModule,
  QuestionnaireQuestion,
  Rating,
  ScenarioCodingItemRating,
  Survey,
  SurveyInvitationLight,
  UserAccount
} from "shared/models"
import {flatten, Option, toPercent} from "shared/utils"
import {ProjectModuleCodingItemsMap, useProjectModuleCodingItems} from "../../../hooks"
import {
  getCodingDimensions,
  getProjectModuleQuestions,
  getRatedParticipantsCount,
  getRatingPercentageByParticipants,
  getRatingStatus
} from "../../../utils"

export interface UseRatersRatingCardHook {
  readonly ratingStatus: RatingStatus
  readonly ratingPercentage: number
  readonly totalEntitiesCount: number
  readonly ratedEntitiesCount: number
}

export const useRatersRatingCard = (survey: Survey, userAccount: Option<UserAccount>): UseRatersRatingCardHook => {
  const client = useApolloClient()

  const isMounted = React.useRef(false)
  const surveyInvitationsRef = React.useRef<SurveyInvitationLight[]>([])
  const projectModulesRef = React.useRef<ProjectModule[]>([])
  const userRatingsRef = React.useRef<Rating[]>([])
  const ratingsRef = React.useRef<Rating[]>([])
  const codingDimensionsRef = React.useRef<CodingDimension[]>([])
  const codingItemsRef = React.useRef<CodingItem[]>([])
  const codingCriteriaRef = React.useRef<Array<CodingCriterion | AutomatedCodingCriterion>>([])
  const scenarioCodingItemRatingsRef = React.useRef<ScenarioCodingItemRating[]>([])
  const ratersRef = React.useRef<UserAccount[]>([])
  const projectModuleQuestionsRef = React.useRef<QuestionnaireQuestion[]>([])
  const freetextQuestionRatingsRef = React.useRef<FreetextQuestionRating[]>([])
  const projectModuleCodingItemsRef = React.useRef<ProjectModuleCodingItemsMap>({})

  const [codingDimensions, setCodingDimensions] = React.useState<CodingDimension[]>([])

  const {surveyInvitations} = useSurveyInvitations(survey.id)
  const {projectModules} = useProjectModules(survey.project.id)
  const {ratings} = useRatings(survey.id, RaterMode.Rater)
  const {codingCriteria, getCodingCriteria} = useCodingCriteriaByItemsList()
  const {scenarioCodingItemRatings, getScenarioCodingItemRatings} = useScenarioCodingItemRatingsByRatingsList()
  const {surveyUserAccounts: raters} = useSurveyUserAccounts(survey.id)
  const {questionnaires: allQuestionnaires} = useQuestionnaires(false)
  const {freetextQuestionRatings, getFreetextQuestionRatings} = useFreetextQuestionRatingsByRatingsList()
  const {projectModuleCodingItems, getProjectModuleCodingItems} = useProjectModuleCodingItems()

  if (!isEqual(surveyInvitationsRef.current, surveyInvitations)) {
    surveyInvitationsRef.current = surveyInvitations
  }

  if (!isEqual(projectModulesRef.current, projectModules)) {
    projectModulesRef.current = projectModules
  }

  if (!isEqual(ratingsRef.current, ratings)) {
    ratingsRef.current = ratings
  }

  if (!isEqual(ratersRef.current, raters)) {
    ratersRef.current = raters
  }

  if (!isEqual(projectModuleCodingItemsRef.current, projectModuleCodingItems)) {
    projectModuleCodingItemsRef.current = projectModuleCodingItems
  }

  const userRatings = userAccount
    .map(({id: userAccountId}) => ratings.filter(rating => rating.userAccountId === userAccountId))
    .getOrElse([])

  if (!isEqual(userRatingsRef.current, userRatings)) {
    userRatingsRef.current = userRatings
  }

  if (!isEqual(codingDimensionsRef.current, codingDimensions)) {
    codingDimensionsRef.current = codingDimensions
  }

  if (!isEqual(freetextQuestionRatingsRef.current, freetextQuestionRatings)) {
    freetextQuestionRatingsRef.current = freetextQuestionRatings
  }

  const codingItems = React.useMemo(() => getCodingItemsFromCodingDimensions(codingDimensionsRef.current), [
    codingDimensionsRef.current
  ])

  if (!isEqual(codingItemsRef.current, codingItems)) {
    codingItemsRef.current = codingItems
  }

  if (!isEqual(codingCriteriaRef.current, codingCriteria)) {
    codingCriteriaRef.current = codingCriteria
  }

  if (!isEqual(scenarioCodingItemRatingsRef.current, scenarioCodingItemRatings)) {
    scenarioCodingItemRatingsRef.current = scenarioCodingItemRatings
  }

  const projectModuleQuestions = getProjectModuleQuestions({
    allQuestionnaires: allQuestionnaires.getOrElse([]),
    projectModules
  })

  if (!isEqual(projectModuleQuestionsRef.current, projectModuleQuestions)) {
    projectModuleQuestionsRef.current = projectModuleQuestions
  }

  const {totalEntitiesCountForSingleRater, ratedEntitiesCountForSingleRater} = React.useMemo(() => {
    const fullyRatedCount = getRatedParticipantsCount({
      surveyInvitations: surveyInvitationsRef.current,
      raters: ratersRef.current,
      ratings: ratingsRef.current,
      projectModules: projectModulesRef.current,
      projectModuleQuestions: projectModuleQuestionsRef.current,
      freetextQuestionRatings: freetextQuestionRatingsRef.current,
      projectModuleCodingItems: projectModuleCodingItemsRef.current,
      scenarioCodingItemRatings: scenarioCodingItemRatingsRef.current,
      allCodingCriteria: codingCriteriaRef.current,
      codingDimensions: codingDimensionsRef.current
    })
    const ratingPercentageData = getRatingPercentageByParticipants({
      surveyInvitations: surveyInvitationsRef.current,
      raters: ratersRef.current,
      ratings: ratingsRef.current,
      projectModules: projectModulesRef.current,
      projectModuleQuestions: projectModuleQuestionsRef.current,
      freetextQuestionRatings: freetextQuestionRatingsRef.current,
      projectModuleCodingItemsMap: projectModuleCodingItemsRef.current,
      scenarioCodingItemRatings: scenarioCodingItemRatingsRef.current,
      allCodingCriteria: codingCriteriaRef.current,
      codingDimensions: codingDimensionsRef.current
    })
    return {...ratingPercentageData, fullyRatedParticipantsCount: fullyRatedCount}
  }, [
    surveyInvitationsRef.current,
    ratersRef.current,
    ratingsRef.current,
    projectModulesRef.current,
    projectModuleQuestionsRef.current,
    freetextQuestionRatingsRef.current,
    projectModuleCodingItemsRef.current,
    scenarioCodingItemRatingsRef.current,
    codingCriteriaRef.current,
    codingDimensionsRef.current
  ])

  const hasSurveyEnded = survey.endsAt !== null || survey.manualPeriod?.end !== null

  React.useEffect(() => {
    const modules = projectModulesRef.current.filter(
      projectModule =>
        projectModule.moduleType === ProjectModuleType.Scenario &&
        projectModule.scenario !== null &&
        projectModule.scenario.codingModel !== null
    )
    Promise.all(modules.map(projectModule => getCodingDimensions(client, projectModule.scenario!.codingModel!.id)))
      .then(result => isMounted.current && setCodingDimensions(flatten(result)))
      .catch(() => isMounted.current && setCodingDimensions([]))
  }, [projectModulesRef.current])

  React.useEffect(() => {
    getCodingCriteria({items: codingItemsRef.current})
  }, [codingItemsRef.current])

  React.useEffect(() => {
    if (userRatingsRef.current.length > 0) {
      getFreetextQuestionRatings(userRatingsRef.current)
      getScenarioCodingItemRatings(userRatingsRef.current)
    }
  }, [userRatingsRef.current])

  React.useEffect(() => {
    if (projectModulesRef.current !== undefined) {
      getProjectModuleCodingItems(projectModulesRef.current)
    }
  }, [projectModulesRef.current])

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const totalEntitiesCount = totalEntitiesCountForSingleRater
  const ratedEntitiesCount = userAccount.map(({id}) => ratedEntitiesCountForSingleRater(id)).getOrElse(0)

  const ratingPercentage = toPercent(ratedEntitiesCount, totalEntitiesCount)

  const ratingStatus = getRatingStatus(!hasSurveyEnded, totalEntitiesCount, ratedEntitiesCount)

  return {
    ratingStatus,
    ratingPercentage,
    totalEntitiesCount,
    ratedEntitiesCount
  }
}
