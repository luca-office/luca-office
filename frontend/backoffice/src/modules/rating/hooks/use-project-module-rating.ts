import {useApolloClient} from "@apollo/client"
import {isEqual} from "lodash-es"
import * as React from "react"
import {
  useCodingCriteriaByItemsList,
  useFreetextQuestionRatingsByRatingsList,
  useScenarioCodingItemRatingsByRatingsList
} from "shared/components"
import {getCodingItemsFromCodingDimensions} from "shared/components/rating/utils"
import {ProjectModuleProgressType, ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {useProjectModulesLazy, useRatings} from "shared/graphql/hooks"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {CodingDimension, CodingItem, ProjectModule, Rating, SurveyInvitationLight, SurveyLight} from "shared/models"
import {every, find, flatten} from "shared/utils"
import {getCodingDimensions} from "../../rater-rating/utils"
import {
  isParticipantFullyRatedByScenario,
  isParticipantRatedByQuestionnaire as checkIsParticipantRatedByQuestionnaire
} from "../utils"

export interface UseProjectModuleRatingHook {
  readonly loading: boolean
  readonly areAllProjectModulesRated: (surveyInvitation: SurveyInvitationLight) => boolean
}

export const useProjectModuleRating = (surveyId: UUID, useOnlyFinalScores = false): UseProjectModuleRatingHook => {
  const client = useApolloClient()

  const isMounted = React.useRef(false)
  const surveyRef = React.useRef<SurveyLight | null>(null)
  const projectModulesRef = React.useRef<ProjectModule[]>([])
  const codingItemsRef = React.useRef<CodingItem[]>([])
  const ratingsRef = React.useRef<Rating[]>([])

  const [codingDimensions, setCodingDimensions] = React.useState<CodingDimension[]>([])

  const {surveyLoading, survey} = useSurveyLight(surveyId)
  const {ratingsLoading: allRatingsLoading, ratings: allRatings} = useRatings(surveyId)
  const {projectModulesLoading, projectModules, getProjectModules} = useProjectModulesLazy()
  const {codingCriteriaLoading, codingCriteria, getCodingCriteria} = useCodingCriteriaByItemsList()
  const {
    freetextQuestionRatingsLoading,
    freetextQuestionRatings,
    getFreetextQuestionRatings
  } = useFreetextQuestionRatingsByRatingsList()
  const {
    scenarioCodingItemRatingsLoading,
    scenarioCodingItemRatings,
    getScenarioCodingItemRatings
  } = useScenarioCodingItemRatingsByRatingsList()

  const codingItems = getCodingItemsFromCodingDimensions(codingDimensions)

  const ratings = useOnlyFinalScores ? allRatings.filter(({isFinalScore}) => isFinalScore) : allRatings

  if (!isEqual(surveyRef.current, survey.orNull())) {
    surveyRef.current = survey.orNull()
  }

  if (!isEqual(projectModulesRef.current, projectModules)) {
    projectModulesRef.current = projectModules
  }

  if (!isEqual(codingItemsRef.current, codingItems)) {
    codingItemsRef.current = codingItems
  }

  if (!isEqual(ratingsRef.current, ratings)) {
    ratingsRef.current = ratings
  }

  const isParticipantRatedByQuestionnaire = (projectModule: ProjectModule, surveyInvitation: SurveyInvitationLight) =>
    checkIsParticipantRatedByQuestionnaire({
      projectModule,
      freetextQuestionRatingsForParticipant: freetextQuestionRatings.filter(
        freetextQuestionRating => freetextQuestionRating.surveyInvitationId === surveyInvitation.id
      ),
      ratings
    })

  const areAllProjectModulesRated = (surveyInvitation: SurveyInvitationLight) =>
    projectModules.length === 0 ||
    every(projectModule => {
      const projectModuleProgresses = find(
        moduleProgress =>
          projectModule.moduleType === ProjectModuleType.Scenario
            ? moduleProgress.scenarioId === projectModule.scenarioId
            : moduleProgress.questionnaireId === projectModule.questionnaireId,
        surveyInvitation.projectModuleProgresses
      )

      const hasParticipantCompletedProjectModule = projectModuleProgresses.exists(
        ({status}) => status === ProjectModuleProgressType.Completed
      )
      const wasProjectModuleRated =
        projectModule.moduleType === ProjectModuleType.Scenario
          ? isParticipantFullyRatedByScenario({
              projectModule,
              surveyInvitation,
              codingDimensions,
              codingItems,
              codingCriteria,
              scenarioCodingItemRatings,
              ratings
            })
          : isParticipantRatedByQuestionnaire(projectModule, surveyInvitation)

      return !hasParticipantCompletedProjectModule || wasProjectModuleRated
    }, projectModulesRef.current)

  React.useEffect(() => {
    const projectId = surveyRef.current?.projectId
    if (projectId !== undefined) {
      getProjectModules(projectId)
    }
  }, [surveyRef.current])

  React.useEffect(() => {
    const modules = projectModulesRef.current.filter(
      projectModule =>
        projectModule.moduleType === ProjectModuleType.Scenario &&
        projectModule.scenario !== null &&
        projectModule.scenario.codingModel !== null
    )
    Promise.all(modules.map(projectModule => getCodingDimensions(client, `${projectModule.scenario?.codingModel?.id}`)))
      .then(result => isMounted.current && setCodingDimensions(flatten(result)))
      .catch(() => isMounted.current && setCodingDimensions([]))
  }, [projectModulesRef.current])

  React.useEffect(() => {
    getCodingCriteria({items: codingItemsRef.current})
  }, [codingItemsRef.current])

  React.useEffect(() => {
    if (ratingsRef.current.length > 0) {
      getFreetextQuestionRatings(ratingsRef.current)
      getScenarioCodingItemRatings(ratingsRef.current)
    }
  }, [ratingsRef.current])

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    loading:
      surveyLoading ||
      projectModulesLoading ||
      codingCriteriaLoading ||
      scenarioCodingItemRatingsLoading ||
      allRatingsLoading ||
      freetextQuestionRatingsLoading,
    areAllProjectModulesRated
  }
}
