/* eslint-disable max-lines */
import {isEqual} from "lodash-es"
import * as React from "react"
import {Payload} from "redux-first-router"
import {RaterMode} from "../../../../../../enums"
import {ProjectModuleProgressType, ProjectModuleType} from "../../../../../../graphql/generated/globalTypes"
import {
  useCheckLogin,
  useCodingDimensionsLazy,
  useProjectModules,
  useProjectNameForSurvey,
  useSurveyInvitations,
  useSurveyInvitationsProgress
} from "../../../../../../graphql/hooks"
import {
  CodingDimension,
  CodingItem,
  NavigationConfig,
  ParticipantData,
  ProjectModule,
  Scenario,
  SurveyInvitationLight,
  SurveyInvitationProgress,
  UserAccount
} from "../../../../../../models"
import {Route} from "../../../../../../routes"
import {find, first, indexOf, indexOfBy, last} from "../../../../../../utils/array"
import {isCodingItem} from "../../../../../../utils/coding-item"
import {Option} from "../../../../../../utils/option"
import {getParticipantNameOrToken} from "../../../../../../utils/participants"
import {sortByPosition} from "../../../../../../utils/sort"
import {Subject} from "../../../../../../utils/subject"
import {useRating} from "../../../../hooks"
import {getCodingItemsFromCodingDimensions} from "../../../../utils"

export interface UseRatingDetailScenarioHook {
  readonly projectName: Option<string>
  readonly projectModules: ProjectModule[]
  readonly participant: Option<SurveyInvitationProgress>
  readonly participants: Option<SurveyInvitationProgress[]>
  readonly participantIndex: number
  readonly participantName: string
  readonly dataLoading: boolean
  readonly navigateToOverview: () => void
  readonly navigateToModule: (module: ProjectModule) => void
  readonly navigateToParticipantWithIndexOffset: (offset: number) => void
  readonly navigateToDimensionWithIndexOffset: (offset: number) => void
  readonly selectedEntityId: Option<UUID>
  readonly selectEntityId: (id: Option<UUID>) => void
  readonly codingDimensions: CodingDimension[]
  readonly ratingId: Option<UUID>
  readonly scenario: Option<Scenario>
  readonly participantFinishedModule: boolean
  readonly refreshRatingSubject: Subject<void>
  readonly isReadonly: boolean
  readonly isNotRatable: boolean
  readonly refreshData: () => void
  readonly isContentMissing: boolean
}

interface UseRatingDetailScenarioParams<TRoute> {
  readonly projectId: UUID
  readonly surveyId: UUID
  readonly moduleId: UUID
  readonly surveyInvitationId?: UUID
  readonly dimensionId?: UUID
  readonly navigationOverviewConfig?: NavigationConfig<TRoute>
  readonly mode: RaterMode
  readonly disabled: boolean
  readonly raterId?: UUID
  readonly navigateTo: (route: TRoute | Route, payload?: Payload) => void
}

export const useRatingDetailScenario = <TRoute>({
  projectId,
  surveyId,
  moduleId,
  surveyInvitationId,
  dimensionId,
  navigationOverviewConfig,
  mode,
  disabled,
  raterId,
  navigateTo
}: UseRatingDetailScenarioParams<TRoute>): UseRatingDetailScenarioHook => {
  const codingDimensionsRef = React.useRef<CodingDimension[]>([])
  const projectModuleRef = React.useRef<ProjectModule | null>(null)
  const surveyInvitationsRef = React.useRef<SurveyInvitationLight[]>([])
  const surveyInvitationsProgressRef = React.useRef<Option<SurveyInvitationProgress[]>>(Option.none())

  const {projectName, projectNameLoading} = useProjectNameForSurvey(surveyId)
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)
  const projectModule = find(projectModule => projectModule.id === moduleId, projectModules)
  const {surveyInvitationsProgress, surveyInvitationsProgressLoading} = useSurveyInvitationsProgress(surveyId)

  const scenario = projectModule.map(projectModule => projectModule.scenario as Scenario)
  const {codingDimensions, codingDimensionsLoading, getCodingDimensions} = useCodingDimensionsLazy()
  const {account: userAccount, checkLoginLoading: userAccountLoading} = useCheckLogin()
  const {surveyInvitations, surveyInvitationsLoading} = useSurveyInvitations(surveyId)

  const refreshRatingSubject = new Subject<void>()

  if (!isEqual(codingDimensionsRef.current, codingDimensions)) {
    codingDimensionsRef.current = codingDimensions
  }

  if (!isEqual(projectModuleRef.current, projectModule.orNull())) {
    projectModuleRef.current = projectModule.orNull()
  }

  if (!isEqual(surveyInvitationsRef.current, surveyInvitations)) {
    surveyInvitationsRef.current = surveyInvitations
  }

  if (!isEqual(surveyInvitationsProgressRef.current, surveyInvitationsProgress)) {
    surveyInvitationsProgressRef.current = surveyInvitationsProgress
  }

  const {isContentMissing, ratingsLoading, ratingId, isReadonly} = useRating({
    surveyId,
    mode,
    projectModulesLoading,
    projectModule,
    userAccount: userAccount.safeAsSubtype<UserAccount>(),
    raterId,
    disabled
  })

  const sortedCodingDimensions = React.useMemo(
    () =>
      sortByPosition(
        codingDimensionsRef.current.map(codingDimension => ({
          ...codingDimension,
          items: sortByPosition(codingDimension.items)
        }))
      ),
    [codingDimensionsRef.current]
  )

  const sortedParentCodingDimensions = sortedCodingDimensions.filter(
    ({parentDimensionId}) => parentDimensionId === null
  )

  const sortMainAndSubDimensions = () => {
    const dimensions: CodingDimension[] = []
    sortedParentCodingDimensions.map(parentDimension => {
      dimensions.push(parentDimension)
      sortedCodingDimensions
        .filter(dimension => dimension.parentDimensionId === parentDimension.id)
        .forEach(dimension => dimensions.push(dimension))
    })

    return dimensions
  }

  const allCodingItems = React.useMemo(
    () => getCodingItemsFromCodingDimensions(sortedCodingDimensions),
    [sortedCodingDimensions]
  )

  const sortedMainAndSubDimensions = React.useMemo(() => sortMainAndSubDimensions(), [sortedParentCodingDimensions])

  const navigateToOverview = () =>
    navigationOverviewConfig
      ? navigateTo(navigationOverviewConfig.route, navigationOverviewConfig.payload)
      : navigateTo(Route.SurveyMonitoring, {
          projectId,
          surveyId,
          moduleId
        })

  const navigateToScenarioOverview = () =>
    projectModule.forEach(module => {
      navigateTo(
        mode === RaterMode.FinalRater
          ? Route.RatingOverviewSurveyModuleParticipantScenarioOverview
          : Route.RatingOverviewSurveyModuleParticipantScenarioOverviewNormalRater,
        {
          id: projectId,
          surveyId,
          surveyInvitationId,
          moduleId: module.id
        }
      )
    })
  const navigateToQuestionnaire = (module: ProjectModule) => {
    navigateTo(
      mode === RaterMode.FinalRater
        ? Route.RatingOverviewSurveyModuleParticipantQuestionnaire
        : Route.RatingOverviewSurveyModuleParticipantQuestionnaireNormalRater,
      {
        id: projectId,
        surveyId,
        surveyInvitationId,
        moduleId: module.id,
        questionnaireId: module.questionnaireId
      }
    )
  }
  const navigateToElement = ({
    newModuleId,
    newSurveyInvitationId,
    newDimensionId
  }: {
    readonly newModuleId?: UUID
    readonly newSurveyInvitationId?: UUID
    readonly newDimensionId?: UUID
  }) => {
    navigateTo(
      mode === RaterMode.FinalRater
        ? Route.RatingOverviewSurveyModuleParticipantScenarioDimension
        : Route.RatingOverviewSurveyModuleParticipantScenarioDimensionNormalRater,
      {
        id: projectId,
        surveyId,
        surveyInvitationId: newSurveyInvitationId ?? surveyInvitationId,
        moduleId: newModuleId ?? moduleId,
        dimensionId: newDimensionId ?? dimensionId
      }
    )
  }
  const navigateToNodeId = (dimensionId: UUID) => navigateToElement({newDimensionId: dimensionId})
  const navigateToParticipant = (invitationId: UUID) => navigateToElement({newSurveyInvitationId: invitationId})
  const navigateToModule = (module: ProjectModule) =>
    module.moduleType === ProjectModuleType.Scenario
      ? navigateToElement({newModuleId: module.id})
      : navigateToQuestionnaire(module)

  const getAtIndex = <T>(array: T[], index: number): T => {
    // enable rotating navigation
    index = (index >= 0 ? index : array.length - 1) % array.length
    return array[index]
  }

  const navigateToNextDimension = (dimension: CodingDimension, offset: number) => {
    const currentIndex = indexOfBy(({id}) => id === dimension.id, sortedMainAndSubDimensions)
    const nextDimension = getAtIndex(sortedMainAndSubDimensions, currentIndex + offset)

    if (
      (offset === -1 && currentIndex === 0) ||
      (offset === 1 && dimension.items.length === 0 && currentIndex === sortedMainAndSubDimensions.length - 1)
    ) {
      navigateToScenarioOverview()
      return
    }

    if (offset === 1 && dimension.items.length > 0) {
      navigateToNodeId(dimension.items[0].id)
      return
    }

    if (offset === -1 && nextDimension.items.length > 0) {
      navigateToNodeId(nextDimension.items[nextDimension.items.length - 1].id)
      return
    }

    navigateToNodeId(nextDimension.id)
  }

  const navigateToNextOrPreviousItem = (item: CodingItem, offset: number) => {
    const allItems = sortedMainAndSubDimensions.flatMap(dimension => dimension.items)
    const currentIndexOfItem = indexOf(item, allItems)

    if (offset === 1) {
      //next item
      if (currentIndexOfItem === allItems.length - 1) {
        navigateToNodeId(allItems[0].id)
      } else {
        navigateToNodeId(allItems[currentIndexOfItem + 1].id)
      }
    } else {
      if (currentIndexOfItem === 0) {
        navigateToNodeId(allItems[allItems.length - 1].id)
      } else {
        navigateToNodeId(allItems[currentIndexOfItem - 1].id)
      }
    }
  }

  const navigateToDimensionWithIndexOffset = (offset: number) => {
    const currentCodingEntity = find<CodingDimension | CodingItem>(
      ({id}) => id === dimensionId,
      sortedMainAndSubDimensions
    ).orElse(find(({id}) => id === dimensionId, allCodingItems) as Option<CodingDimension | CodingItem>)

    const isOverview = currentCodingEntity.isEmpty()

    if (isOverview && offset === 1) {
      first(sortedMainAndSubDimensions).forEach(dimension => navigateToNodeId(dimension.id))
      return
    }

    if (isOverview && offset === -1) {
      last(sortedMainAndSubDimensions).forEach(dimension => navigateToNodeId(dimension.id))
      return
    }

    currentCodingEntity.forEach(currentEntity =>
      isCodingItem(currentEntity)
        ? navigateToNextOrPreviousItem(currentEntity, offset)
        : navigateToNextDimension(currentEntity, offset)
    )
  }

  const participantsOption = surveyInvitationsProgress
  const participant = find(progress => progress.id === surveyInvitationId, surveyInvitationsProgress.getOrElse([]))
  const participantData = participant.map(participant => participant.participantData).orUndefined()
  const participantToken = participant.map(participant => participant.token).getOrElse("")
  const participantName = getParticipantNameOrToken(participantData as ParticipantData, participantToken)
  const participantIndex = participant.map(p => indexOf(p, participantsOption.getOrElse([]))).getOrElse(-1)

  const participantFinishedModule = React.useMemo(() => {
    const projectModuleProgresses = surveyInvitationsProgress
      .map(surveyInvitationProgress =>
        surveyInvitationProgress.find(surveyInvitationProgress => surveyInvitationProgress.id === surveyInvitationId)
      )
      .map(surveyInvitationProgress => surveyInvitationProgress?.projectModuleProgresses ?? [])
      .getOrElse([])

    const currentModuleProgress = find(
      moduleProgress => moduleProgress.scenarioId === projectModuleRef.current?.scenario?.id,
      projectModuleProgresses
    )

    return currentModuleProgress
      .map(moduleProgress => moduleProgress.status === ProjectModuleProgressType.Completed)
      .getOrElse(false)
  }, [projectModuleRef.current, surveyInvitationId, surveyInvitationsProgressRef.current])

  const hasData = React.useMemo(
    () => codingDimensionsRef.current.filter(dimension => dimension.parentDimensionId === null).length > 0,
    [codingDimensionsRef.current]
  )
  const isNotRatable = !participantFinishedModule || !hasData

  const navigateToParticipantWithIndexOffset = (offset: number) => {
    const participants = participantsOption.getOrElse([])
    navigateToParticipant(getAtIndex(participants, participantIndex + offset).id)
  }

  const selectedEntityId = Option.of(dimensionId)
  const selectEntityId = (nodeId: Option<UUID>) => {
    if (nodeId.isEmpty()) {
      navigateToScenarioOverview()
      return
    }
    nodeId.forEach(navigateToNodeId)
  }

  const refreshData = () =>
    scenario.forEach(({codingModel}) => codingModel && getCodingDimensions(codingModel.id, "network-only"))

  React.useEffect(() => {
    scenario.forEach(({codingModel}) => codingModel && getCodingDimensions(codingModel.id))
  }, [scenario.orNull()])

  return {
    projectName,
    projectModules,
    participant,
    participantIndex,
    participantName,
    participants: participantsOption,
    dataLoading:
      codingDimensionsLoading ||
      projectNameLoading ||
      projectModulesLoading ||
      ratingsLoading ||
      surveyInvitationsProgressLoading ||
      userAccountLoading ||
      surveyInvitationsLoading,
    navigateToOverview,
    selectedEntityId,
    selectEntityId,
    navigateToModule,
    navigateToParticipantWithIndexOffset,
    navigateToDimensionWithIndexOffset,
    codingDimensions,
    ratingId,
    scenario,
    participantFinishedModule,
    refreshRatingSubject,
    isReadonly,
    isNotRatable,
    refreshData,
    isContentMissing
  }
}
