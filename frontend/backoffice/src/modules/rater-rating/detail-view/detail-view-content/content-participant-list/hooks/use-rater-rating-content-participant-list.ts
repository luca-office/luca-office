import {useApolloClient} from "@apollo/client"
import {isEqual, sumBy} from "lodash-es"
import React from "react"
import {useCodingCriteriaByItemsList, useScenarioCodingItemRatingsByRatingsList} from "shared/components"
import {getCodingItemsFromCodingDimensions} from "shared/components/rating/utils"
import {ProjectModuleProgressType, ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {useProjectModules, useRatings, useSurveyInvitations} from "shared/graphql/hooks"
import {
  AutomatedCodingCriterion,
  CodingCriterion,
  CodingDimension,
  CodingItem,
  ProjectModule,
  Rating,
  ScenarioCodingItemRating,
  SurveyInvitationLight,
  SurveyLight
} from "shared/models"
import {every, find, flatten, sortByPosition} from "shared/utils"
import {
  isParticipantFullyRatedByScenario,
  isParticipantRatedByQuestionnaire as checkIsParticipantRatedByQuestionnaire
} from "../../../../../rating/utils"
import {FreetextQuestionRatingsForParticipants, useFreetextQuestionRatingsForParticipants} from "../../../../hooks"
import {RatingByParticipant, RatingProjectModule} from "../../../../models"
import {getCodingDimensions} from "../../../../utils"

export interface UseRaterRatingContentParticipantListHook {
  readonly dataLoading: boolean
  readonly participantCount: number
  readonly fullyRatedParticipantsCount: number
  readonly projectModulesCount: number
  readonly fullyRatedProjectModulesCount: number
  readonly surveyInvitations: SurveyInvitationLight[]
  readonly ratingProjectModules: RatingProjectModule[]
  readonly allCodingDimensions: CodingDimension[]
}

export const useRaterRatingContentParticipantList = (
  userAccountId: UUID,
  survey: SurveyLight
): UseRaterRatingContentParticipantListHook => {
  const client = useApolloClient()

  const isMounted = React.useRef(false)
  const surveyInvitationsRef = React.useRef<SurveyInvitationLight[]>([])
  const projectModulesRef = React.useRef<ProjectModule[]>([])
  const scenarioCodingItemRatingsRef = React.useRef<ScenarioCodingItemRating[]>([])
  const userRatingsRef = React.useRef<Rating[]>([])
  const raterRatingsRef = React.useRef<Rating[]>([])
  const codingDimensionsRef = React.useRef<CodingDimension[]>([])
  const ratingProjectModulesRef = React.useRef<RatingProjectModule[]>([])
  const codingCriteriaRef = React.useRef<Array<CodingCriterion | AutomatedCodingCriterion>>([])
  const codingItemsRef = React.useRef<CodingItem[]>([])
  const freetextQuestionRatingsForParticipantsRef = React.useRef<FreetextQuestionRatingsForParticipants>({})

  const [codingDimensions, setCodingDimensions] = React.useState<CodingDimension[]>([])

  const {surveyInvitations, surveyInvitationsLoading} = useSurveyInvitations(survey.id)
  const {projectModules, projectModulesLoading} = useProjectModules(survey.project.id)
  const {
    scenarioCodingItemRatings,
    scenarioCodingItemRatingsLoading,
    getScenarioCodingItemRatings
  } = useScenarioCodingItemRatingsByRatingsList()
  const {ratings, ratingsLoading} = useRatings(survey.id)
  const {codingCriteria, codingCriteriaLoading, getCodingCriteria} = useCodingCriteriaByItemsList()
  const {
    freetextQuestionRatingsForParticipants,
    freetextQuestionRatingsForParticipantsLoading,
    getFreetextQuestionRatingsForParticipants
  } = useFreetextQuestionRatingsForParticipants()

  const raterRatings = ratings.filter(({isFinalScore}) => !isFinalScore)

  const participantCount = surveyInvitationsRef.current.length

  const userRatings = React.useMemo(
    () => raterRatingsRef.current.filter(rating => rating.userAccountId === userAccountId),
    [raterRatingsRef.current, userAccountId]
  )

  const codingItems = React.useMemo(() => getCodingItemsFromCodingDimensions(codingDimensions), [codingDimensions])

  if (!isEqual(surveyInvitationsRef.current, surveyInvitations)) {
    surveyInvitationsRef.current = surveyInvitations
  }

  if (!isEqual(projectModulesRef.current, projectModules)) {
    projectModulesRef.current = projectModules
  }

  if (!isEqual(scenarioCodingItemRatingsRef.current, scenarioCodingItemRatings)) {
    scenarioCodingItemRatingsRef.current = scenarioCodingItemRatings
  }

  if (!isEqual(userRatingsRef.current, userRatings)) {
    userRatingsRef.current = userRatings
  }

  if (!isEqual(raterRatingsRef.current, raterRatings)) {
    raterRatingsRef.current = raterRatings
  }

  if (!isEqual(codingDimensionsRef.current, codingDimensions)) {
    codingDimensionsRef.current = codingDimensions
  }

  if (!isEqual(codingCriteriaRef.current, codingCriteria)) {
    codingCriteriaRef.current = codingCriteria
  }

  if (!isEqual(codingItemsRef.current, codingItems)) {
    codingItemsRef.current = codingItems
  }

  if (!isEqual(freetextQuestionRatingsForParticipantsRef.current, freetextQuestionRatingsForParticipants)) {
    freetextQuestionRatingsForParticipantsRef.current = freetextQuestionRatingsForParticipants
  }

  const isParticipantRatedByQuestionnaire = (projectModule: ProjectModule, surveyInvitation: SurveyInvitationLight) =>
    checkIsParticipantRatedByQuestionnaire({
      projectModule,
      freetextQuestionRatingsForParticipant:
        freetextQuestionRatingsForParticipantsRef.current[surveyInvitation.id] ?? [],
      ratings: userRatingsRef.current
    })

  const getRatingsByParticipants = (projectModule: ProjectModule): RatingByParticipant[] =>
    surveyInvitationsRef.current.map(surveyInvitation => {
      return {
        participantId: surveyInvitation.id,
        isNotRatable:
          projectModule.moduleType === ProjectModuleType.Scenario
            ? surveyInvitation.projectModuleProgresses.find(
                progress => progress.scenarioId === projectModule.scenarioId
              )?.status !== ProjectModuleProgressType.Completed
            : surveyInvitation.projectModuleProgresses.find(
                progress => progress.questionnaireId === projectModule.questionnaireId
              )?.status !== ProjectModuleProgressType.Completed,
        isFullyRated:
          projectModule.moduleType === ProjectModuleType.Scenario
            ? isParticipantFullyRatedByScenario({
                projectModule,
                surveyInvitation,
                codingDimensions: codingDimensionsRef.current,
                codingItems: codingItemsRef.current,
                codingCriteria: codingCriteriaRef.current,
                scenarioCodingItemRatings: scenarioCodingItemRatingsRef.current,
                ratings: userRatingsRef.current
              })
            : isParticipantRatedByQuestionnaire(projectModule, surveyInvitation)
      }
    })

  const ratingProjectModules: RatingProjectModule[] = React.useMemo(
    () =>
      sortByPosition(projectModulesRef.current).map(projectModule => {
        const ratingsByParticipants = getRatingsByParticipants(projectModule)
        const ratedParticipantCount = ratingsByParticipants.filter(entity => entity.isFullyRated || entity.isNotRatable)
          .length
        return {
          ...projectModule,
          participantCount,
          ratingsByParticipants,
          ratedParticipantCount
        }
      }),
    [
      surveyInvitationsRef.current,
      projectModulesRef.current,
      scenarioCodingItemRatingsRef.current,
      codingDimensionsRef.current,
      codingCriteriaRef.current,
      codingItemsRef.current,
      freetextQuestionRatingsForParticipantsRef.current,
      userRatingsRef.current
    ]
  )

  if (!isEqual(ratingProjectModulesRef.current, ratingProjectModules)) {
    ratingProjectModulesRef.current = ratingProjectModules
  }

  const projectModulesCount = ratingProjectModules.length

  const fullyRatedProjectModulesCount = React.useMemo(
    () =>
      sumBy(ratingProjectModules, ({participantCount, ratedParticipantCount}) =>
        participantCount === ratedParticipantCount ? 1 : 0
      ),
    [ratingProjectModules]
  )

  const fullyRatedParticipantsCount = React.useMemo(
    () =>
      sumBy(surveyInvitationsRef.current, participant => {
        const allProjectModulesRated = every(
          ({ratingsByParticipants}) =>
            find(({participantId}) => participantId === participant.id, ratingsByParticipants)
              .map(({isFullyRated, isNotRatable}) => isFullyRated || isNotRatable)
              .getOrElse(false),
          ratingProjectModules
        )
        return allProjectModulesRated ? 1 : 0
      }),
    [ratingProjectModules, surveyInvitationsRef.current]
  )

  React.useEffect(() => {
    if (userRatingsRef.current.length > 0) {
      getScenarioCodingItemRatings(userRatingsRef.current)
    }
  }, [userRatingsRef.current])

  React.useEffect(() => {
    const modules = ratingProjectModulesRef.current.filter(
      projectModule =>
        projectModule.moduleType === ProjectModuleType.Scenario &&
        projectModule.scenario !== null &&
        projectModule.scenario.codingModel !== null
    )
    Promise.all(modules.map(projectModule => getCodingDimensions(client, projectModule.scenario!.codingModel!.id)))
      .then(result => isMounted.current && setCodingDimensions(flatten(result)))
      .catch(() => isMounted.current && setCodingDimensions([]))
  }, [ratingProjectModulesRef.current])

  React.useEffect(() => {
    getCodingCriteria({items: codingItemsRef.current})
  }, [codingItemsRef.current])

  React.useEffect(() => {
    if (userRatingsRef.current.length > 0) {
      getFreetextQuestionRatingsForParticipants(
        userRatingsRef.current,
        surveyInvitationsRef.current.map(({id}) => id)
      )
    }
  }, [userRatingsRef.current, surveyInvitationsRef.current])

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    dataLoading:
      projectModulesLoading ||
      ratingsLoading ||
      surveyInvitationsLoading ||
      scenarioCodingItemRatingsLoading ||
      codingCriteriaLoading ||
      freetextQuestionRatingsForParticipantsLoading,
    participantCount,
    fullyRatedParticipantsCount,
    projectModulesCount,
    fullyRatedProjectModulesCount,
    surveyInvitations,
    ratingProjectModules,
    allCodingDimensions: codingDimensions
  }
}
