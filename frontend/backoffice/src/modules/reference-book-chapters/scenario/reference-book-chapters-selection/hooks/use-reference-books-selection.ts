import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
  CreateReferenceBookScenarioProps,
  useCheckLogin,
  useCreateReferenceBookScenario,
  useReferenceBookChapters,
  useScenarioReferenceBookChapters
} from "shared/graphql/hooks"
import {ReferenceBookChapter} from "shared/models"
import {exists, Option} from "shared/utils"
import {EntityFilterConfig} from "../../../../../models"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {AppState} from "../../../../../redux/state/app-state"
import {Route} from "../../../../../routes"
import {applyFilterAndSortEntities} from "../../../../../utils"

export interface UseReferenceBooksSelectionHook
  extends Pick<CreateReferenceBookScenarioProps, "createReferenceBookScenario"> {
  readonly actionLoading: boolean
  readonly createReferenceBookScenarios: () => void
  readonly deselectReferenceBook: (referenceBookChapterId: UUID) => void
  readonly loading: boolean
  readonly navigateToCreation: () => void
  readonly openReferenceBook: (referenceBookChapterId: UUID) => void
  readonly openReferenceBookOverview: () => void
  readonly referenceBookChapters: ReferenceBookChapter[]
  readonly scenarioReferenceBookIds: UUID[]
  readonly selectedReferenceBookIds: UUID[]
  readonly selectReferenceBook: (referenceBookChapterId: UUID) => void
}

export const useReferenceBooksSelection = (scenarioId: UUID): UseReferenceBooksSelectionHook => {
  const dispatch = useDispatch()
  const [selectedReferenceBookIds, setSelectedReferenceBookIds] = useState<UUID[]>([])
  const filterOptions = useSelector<AppState, EntityFilterConfig>(
    state => state.ui.common.entityFilters.scenarioReferenceBookChaptersSelection
  )

  const {account: user} = useCheckLogin()
  const {referenceBookChapters, referenceBooksLoading} = useReferenceBookChapters()
  const {scenarioReferenceBooks, scenarioReferenceBooksLoading} = useScenarioReferenceBookChapters(scenarioId)
  const {createReferenceBookScenario, createReferenceBookScenarioLoading} = useCreateReferenceBookScenario()

  const allReferenceBooks = referenceBookChapters.map(
    referenceBookChapters => referenceBookChapters as ReferenceBookChapter[]
  )
  const scenarioReferenceBooksOption = scenarioReferenceBooks.map(
    referenceBookChapters => referenceBookChapters as ReferenceBookChapter[]
  )

  // handler
  const navigateToCreation = () => dispatch(navigateToRouteAction(Route.ScenarioReferenceBookChapters, {scenarioId}))
  const openReferenceBookOverview = () =>
    dispatch(navigateToRouteAction(Route.ScenarioReferenceBookChapters, {scenarioId}))

  const openReferenceBook = (referenceBookChapterId: UUID) =>
    dispatch(navigateToRouteAction(Route.ScenarioReferenceBookChaptersDetail, {scenarioId, referenceBookChapterId}))

  const selectReferenceBook = (referenceBookChapterId: UUID) =>
    setSelectedReferenceBookIds([...selectedReferenceBookIds, referenceBookChapterId])

  const deselectReferenceBook = (referenceBookChapterId: UUID) =>
    setSelectedReferenceBookIds(selectedReferenceBookIds.filter(id => id !== referenceBookChapterId))

  const createReferenceBookScenarios = () => {
    const scenarioReferenceBooks = scenarioReferenceBooksOption.getOrElse([])
    const createdReferenceBookIds = selectedReferenceBookIds.filter(
      id =>
        !exists(
          (scenarioReferenceBook: ReferenceBookChapter) => scenarioReferenceBook.id === id,
          scenarioReferenceBooks
        )
    )

    Promise.all(
      createdReferenceBookIds.map(referenceBookChapterId =>
        createReferenceBookScenario({referenceBookChapterId, scenarioId})
      )
    ).then(navigateToCreation)
  }

  return {
    actionLoading: createReferenceBookScenarioLoading,
    createReferenceBookScenarios,
    createReferenceBookScenario,
    deselectReferenceBook,
    loading: referenceBooksLoading || scenarioReferenceBooksLoading,
    navigateToCreation,
    openReferenceBook,
    openReferenceBookOverview,

    referenceBookChapters: applyFilterAndSortEntities<ReferenceBookChapter>(
      filterOptions,
      allReferenceBooks.getOrElse([]),
      user.safeAsSubtype(),
      Option.of(selectedReferenceBookIds)
    ),

    scenarioReferenceBookIds: scenarioReferenceBooksOption
      .getOrElse([])
      .map((referenceBookChapter: ReferenceBookChapter) => referenceBookChapter.id),

    selectedReferenceBookIds,
    selectReferenceBook
  }
}
