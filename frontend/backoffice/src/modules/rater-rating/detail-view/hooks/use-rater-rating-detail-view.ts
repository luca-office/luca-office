import {useApolloClient} from "@apollo/client"
import {isEqual} from "lodash-es"
import React from "react"
import {useDispatch} from "react-redux"
import {useCodingCriteriaByItemsList, useRatings, useScenarioCodingItemRatingsByRatingsList} from "shared/components"
import {useFreetextQuestionRatingsByRatingsList} from "shared/components/rating/hooks/use-freetext-question-ratings-by-ratings-list"
import {RaterMode} from "shared/enums"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {
  useCheckLogin,
  useProjectModulesLazy,
  useQuestionnaires,
  useSurveyInvitations,
  useSurveyUserAccounts
} from "shared/graphql/hooks"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {
  AutomatedCodingCriterion,
  CodingCriterion,
  CodingDimension,
  FreetextQuestionRating,
  ProjectModule,
  QuestionnaireQuestion,
  Rating,
  ScenarioCodingItemRating,
  SurveyInvitationLight,
  SurveyLight,
  UserAccount
} from "shared/models"
import {flatten, Option, toPercent} from "shared/utils"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {ProjectModuleCodingItemsMap, useProjectModuleCodingItems} from "../../hooks"
import {getCodingDimensions, getProjectModuleQuestions, getRatingPercentageByParticipants} from "../../utils"

export interface UseRaterRatingDetailViewHook {
  readonly dataLoading: boolean
  readonly ratingPercentage: number
  readonly totalEntitiesCount: number
  readonly ratedEntitiesCount: number
  readonly userAccount: Option<UserAccount>
  readonly navigateToOverview: () => void
}

export const useRaterRatingDetailView = (surveyId: UUID): UseRaterRatingDetailViewHook => {
  const client = useApolloClient()
  const dispatch = useDispatch()

  const isMounted = React.useRef(false)
  const surveyRef = React.useRef<SurveyLight | null>()
  const userRatingsRef = React.useRef<Rating[]>()
  const projectModulesRef = React.useRef<ProjectModule[]>([])
  const surveyInvitationsRef = React.useRef<SurveyInvitationLight[]>([])
  const projectModuleCodingItemsRef = React.useRef<ProjectModuleCodingItemsMap>({})
  const ratersRef = React.useRef<UserAccount[]>([])
  const ratingsRef = React.useRef<Rating[]>([])
  const projectModuleQuestionsRef = React.useRef<QuestionnaireQuestion[]>([])
  const freetextQuestionRatingsRef = React.useRef<FreetextQuestionRating[]>([])
  const scenarioCodingItemRatingsRef = React.useRef<ScenarioCodingItemRating[]>([])
  const allCodingCriteriaRef = React.useRef<Array<CodingCriterion | AutomatedCodingCriterion>>([])
  const codingDimensionsRef = React.useRef<CodingDimension[]>([])

  const [codingDimensions, setCodingDimensions] = React.useState<CodingDimension[]>([])

  const {account: userAccount, checkLoginLoading: userAccountLoading} = useCheckLogin()
  const {ratings, ratingsLoading} = useRatings(surveyId, RaterMode.Rater)
  const {survey, surveyLoading} = useSurveyLight(surveyId)
  const {projectModules, projectModulesLoading, getProjectModules} = useProjectModulesLazy()
  const {surveyInvitations, surveyInvitationsLoading} = useSurveyInvitations(surveyId)
  const {
    freetextQuestionRatings,
    freetextQuestionRatingsLoading,
    getFreetextQuestionRatings
  } = useFreetextQuestionRatingsByRatingsList()
  const {
    scenarioCodingItemRatings,
    scenarioCodingItemRatingsLoading,
    getScenarioCodingItemRatings
  } = useScenarioCodingItemRatingsByRatingsList()
  const {
    projectModuleCodingItems,
    projectModuleCodingItemsLoading,
    getProjectModuleCodingItems
  } = useProjectModuleCodingItems()
  const {
    codingCriteria: allCodingCriteria,
    codingCriteriaLoading: allCodingCriteriaLoading,
    getCodingCriteria: getAllCodingCriteria
  } = useCodingCriteriaByItemsList()
  const {surveyUserAccounts: raters, surveyUserAccountsLoading: raterLoading} = useSurveyUserAccounts(surveyId)
  const {questionnaires: allQuestionnaires} = useQuestionnaires(false)

  const userRatings = React.useMemo(
    () => userAccount.map(account => ratings.filter(rating => rating.userAccountId === account.id)).getOrElse([]),
    [userAccount.orNull(), ratings]
  )

  if (!isEqual(surveyRef.current, survey.orNull())) {
    surveyRef.current = survey.orNull()
  }

  if (!isEqual(userRatingsRef.current, userRatings)) {
    userRatingsRef.current = userRatings
  }

  if (!isEqual(projectModulesRef.current, projectModules)) {
    projectModulesRef.current = projectModules
  }

  if (!isEqual(surveyInvitationsRef.current, surveyInvitations)) {
    surveyInvitationsRef.current = surveyInvitations
  }

  if (!isEqual(projectModuleCodingItemsRef.current, projectModuleCodingItems)) {
    projectModuleCodingItemsRef.current = projectModuleCodingItems
  }

  if (!isEqual(ratersRef.current, raters)) {
    ratersRef.current = raters
  }

  if (!isEqual(ratingsRef.current, ratings)) {
    ratingsRef.current = ratings
  }

  if (!isEqual(freetextQuestionRatingsRef.current, freetextQuestionRatings)) {
    freetextQuestionRatingsRef.current = freetextQuestionRatings
  }

  if (!isEqual(scenarioCodingItemRatingsRef.current, scenarioCodingItemRatings)) {
    scenarioCodingItemRatingsRef.current = scenarioCodingItemRatings
  }

  if (!isEqual(allCodingCriteriaRef.current, allCodingCriteria)) {
    allCodingCriteriaRef.current = allCodingCriteria
  }

  if (!isEqual(codingDimensionsRef.current, codingDimensions)) {
    codingDimensionsRef.current = codingDimensions
  }

  const projectModuleQuestions = getProjectModuleQuestions({
    allQuestionnaires: allQuestionnaires.getOrElse([]),
    projectModules
  })

  if (!isEqual(projectModuleQuestionsRef.current, projectModuleQuestions)) {
    projectModuleQuestionsRef.current = projectModuleQuestions
  }

  const {ratedEntitiesCountForSingleRater, totalEntitiesCountForSingleRater} = React.useMemo(
    () =>
      getRatingPercentageByParticipants({
        surveyInvitations: surveyInvitationsRef.current,
        raters: ratersRef.current,
        ratings: ratingsRef.current,
        projectModules: projectModulesRef.current,
        projectModuleQuestions: projectModuleQuestionsRef.current,
        freetextQuestionRatings: freetextQuestionRatingsRef.current,
        projectModuleCodingItemsMap: projectModuleCodingItemsRef.current,
        scenarioCodingItemRatings: scenarioCodingItemRatingsRef.current,
        allCodingCriteria: allCodingCriteriaRef.current,
        codingDimensions: codingDimensionsRef.current
      }),
    [
      surveyInvitationsRef.current,
      ratersRef.current,
      projectModulesRef.current,
      ratingsRef.current,
      projectModuleQuestionsRef.current,
      freetextQuestionRatingsRef.current,
      projectModuleCodingItemsRef.current,
      scenarioCodingItemRatingsRef.current,
      allCodingCriteriaRef.current,
      codingDimensionsRef.current
    ]
  )

  const navigateToOverview = () => {
    dispatch(navigateToRouteAction(Route.RaterRatingOverview))
  }

  React.useEffect(() => {
    if (surveyRef.current !== null && surveyRef.current !== undefined) {
      getProjectModules(surveyRef.current.project.id)
    }
  }, [surveyRef.current])

  React.useEffect(() => {
    if (userRatingsRef.current !== undefined && userRatingsRef.current?.length > 0) {
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
    const items = flatten(Object.values(projectModuleCodingItemsRef.current))
    if (items.length > 0) {
      getAllCodingCriteria({items})
    }
  }, [projectModuleCodingItemsRef.current])

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
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const totalEntitiesCount = totalEntitiesCountForSingleRater
  const ratedEntitiesCount = userAccount.map(({id}) => ratedEntitiesCountForSingleRater(id)).getOrElse(0)

  const ratingPercentage = toPercent(ratedEntitiesCount, totalEntitiesCount)

  return {
    dataLoading:
      freetextQuestionRatingsLoading ||
      projectModulesLoading ||
      ratingsLoading ||
      scenarioCodingItemRatingsLoading ||
      surveyLoading ||
      surveyInvitationsLoading ||
      userAccountLoading ||
      projectModuleCodingItemsLoading ||
      allCodingCriteriaLoading ||
      raterLoading,
    ratingPercentage,
    totalEntitiesCount,
    ratedEntitiesCount,
    userAccount: userAccount.safeAsSubtype(),
    navigateToOverview
  }
}
