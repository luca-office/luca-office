import {useApolloClient} from "@apollo/client"
import {isEqual} from "lodash-es"
import * as React from "react"
import {
  useCodingCriteriaByItemsList,
  useFreetextQuestionRatingsByRatingsList,
  useScenarioCodingItemRatingsByRatingsList
} from "shared/components"
import {getCodingItemsFromCodingDimensions} from "shared/components/rating/utils"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {
  useCheckLogin,
  useProjectModules,
  useRatings,
  useSurveyInvitations,
  useSurveyUserAccounts
} from "shared/graphql/hooks"
import {
  AutomatedCodingCriterion,
  CodingCriterion,
  CodingDimension,
  CodingItem,
  FreetextQuestionRating,
  ProjectModule,
  Rating,
  ScenarioCodingItemRating,
  SurveyInvitationLight,
  UserAccount
} from "shared/models"
import {find, flatten, getParticipantNameOrToken, isDefined, sortByCreatedAt} from "shared/utils"
import {
  getCodingDimensions,
  isRatingOfEveryModulePossible,
  isRatingOfSomeModulePossible
} from "../../rater-rating/utils"
import {useProjectModuleRating} from "../hooks"
import {getParticipantRatingCounts} from "../utils"
import {ParticipantTableEntity} from "./dashboard/scoring-dashboard-table/scoring-dashboard-table"

export interface UseScoringHook {
  readonly loading: boolean
  readonly participantTableEntities: ParticipantTableEntity[]
  readonly raters: UserAccount[]
  readonly allRatings: Rating[]
}

export const useScoring = (surveyId: UUID, projectId: UUID): UseScoringHook => {
  const client = useApolloClient()

  const isMounted = React.useRef(false)
  const accountRef = React.useRef<UserAccount | null>(null)
  const surveyInvitationsRef = React.useRef<SurveyInvitationLight[]>([])
  const allRatingsRef = React.useRef<Rating[]>([])
  const freetextQuestionRatingsRef = React.useRef<FreetextQuestionRating[]>([])
  const scenarioCodingItemRatingsRef = React.useRef<ScenarioCodingItemRating[]>([])
  const projectModulesRef = React.useRef<ProjectModule[]>([])
  const codingDimensionsRef = React.useRef<CodingDimension[]>([])
  const codingItemsRef = React.useRef<CodingItem[]>([])
  const codingCriteriaRef = React.useRef<Array<CodingCriterion | AutomatedCodingCriterion>>([])

  const [codingDimensions, setCodingDimensions] = React.useState<CodingDimension[]>([])

  const {account, checkLoginLoading} = useCheckLogin()
  const {surveyInvitations, surveyInvitationsLoading} = useSurveyInvitations(surveyId)
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)
  const {surveyUserAccounts: raters, surveyUserAccountsLoading: ratersLoading} = useSurveyUserAccounts(surveyId)
  const {ratings: allRatings, ratingsLoading} = useRatings(surveyId)
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
  const {codingCriteria, codingCriteriaLoading, getCodingCriteria} = useCodingCriteriaByItemsList()
  const {loading: allProjectModulesRatedDataLoading, areAllProjectModulesRated} = useProjectModuleRating(surveyId)

  const codingItems = React.useMemo(() => getCodingItemsFromCodingDimensions(codingDimensions), [codingDimensions])

  if (!isEqual(accountRef.current, account.orNull())) {
    accountRef.current = account.orNull()
  }

  if (!isEqual(surveyInvitationsRef.current, surveyInvitations)) {
    surveyInvitationsRef.current = surveyInvitations
  }

  if (!isEqual(allRatingsRef.current, allRatings)) {
    allRatingsRef.current = allRatings
  }

  if (!isEqual(freetextQuestionRatingsRef.current, freetextQuestionRatings)) {
    freetextQuestionRatingsRef.current = freetextQuestionRatings
  }

  if (!isEqual(scenarioCodingItemRatingsRef.current, scenarioCodingItemRatings)) {
    scenarioCodingItemRatingsRef.current = scenarioCodingItemRatings
  }

  if (!isEqual(projectModulesRef.current, projectModules)) {
    projectModulesRef.current = projectModules
  }

  if (!isEqual(codingDimensionsRef.current, codingDimensions)) {
    codingDimensionsRef.current = codingDimensions
  }

  if (!isEqual(codingItemsRef.current, codingItems)) {
    codingItemsRef.current = codingItems
  }

  if (!isEqual(codingCriteriaRef.current, codingCriteria)) {
    codingCriteriaRef.current = codingCriteria
  }

  const participantTableEntities = React.useMemo<ParticipantTableEntity[]>(
    () =>
      // notice to use same sort as in rater-rating/use-rater-rating-participant-table
      sortByCreatedAt(surveyInvitationsRef.current).map((surveyInvitation, index) => {
        const ratingIdOption = find(({surveyInvitationId}) => surveyInvitationId === surveyInvitation.id, [
          ...scenarioCodingItemRatingsRef.current,
          ...freetextQuestionRatingsRef.current
        ]).map(({ratingId}) => ratingId)
        const rating = ratingIdOption.flatMap(ratingId => find(rating => rating.id === ratingId, allRatingsRef.current))
        const finalRatingId = allRatingsRef.current.find(rating => rating.isFinalScore)?.id
        const isRatingCompleted =
          rating.exists(({finalizedAt}) => isDefined(finalizedAt)) || areAllProjectModulesRated(surveyInvitation)
        const name = getParticipantNameOrToken(surveyInvitation.participantData, surveyInvitation.token)

        const ratingCounts = getParticipantRatingCounts({
          surveyInvitation,
          projectModules: projectModulesRef.current,
          codingDimensions: codingDimensionsRef.current,
          codingItems: codingItemsRef.current,
          scenarioCodingItemRatings: scenarioCodingItemRatingsRef.current,
          codingCriteria: codingCriteriaRef.current,
          freetextQuestionRatings: freetextQuestionRatingsRef.current,
          finalRatingId: finalRatingId ?? ""
        })

        return {
          id: surveyInvitation.id,
          name,
          isRatingOfAllModulesPossible: isRatingOfEveryModulePossible(surveyInvitation.projectModuleProgresses),
          isRatingOfSomeModulePossible: isRatingOfSomeModulePossible(surveyInvitation.projectModuleProgresses),
          index: index + 1,
          ...rating
            .map(({isFinalScore, userAccountId}) => ({
              isFinalScore,
              isRatingCompleted: isRatingCompleted,
              isRatingOfMainRater: userAccountId === accountRef.current?.id
            }))
            .getOrElse({
              isFinalScore: false,
              isRatingCompleted: false,
              isRatingOfMainRater: false
            }),
          ratingCounts
        }
      }),
    [
      surveyInvitationsRef.current,
      scenarioCodingItemRatingsRef.current,
      freetextQuestionRatingsRef.current,
      accountRef.current,
      allRatingsRef.current,
      projectModulesRef.current,
      codingDimensionsRef.current,
      codingItemsRef.current,
      codingCriteriaRef.current
    ]
  )

  React.useEffect(() => {
    if (allRatingsRef.current.length > 0) {
      getFreetextQuestionRatings(allRatingsRef.current)
      getScenarioCodingItemRatings(allRatingsRef.current)
    }
  }, [allRatingsRef.current])

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
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    loading:
      checkLoginLoading ||
      projectModulesLoading ||
      ratersLoading ||
      ratingsLoading ||
      surveyInvitationsLoading ||
      freetextQuestionRatingsLoading ||
      scenarioCodingItemRatingsLoading ||
      codingCriteriaLoading ||
      allProjectModulesRatedDataLoading,
    participantTableEntities,
    raters,
    allRatings
  }
}
