import {partial} from "lodash-es"
import React from "react"
import {useDispatch} from "react-redux"
import {IconName} from "shared/enums"
import {
  useRepositionReferenceBookChapterScenario,
  useScenario,
  useScenarioReferenceBookChapters,
  useUpdateScenario
} from "shared/graphql/hooks"
import {useDeleteScenarioReferenceBookChapter} from "shared/graphql/hooks/mutations"
import {Binary, DeleteEntityHook, ReferenceBookArticle, ReferenceBookChapter, TocChapter} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {
  convertReferenceBookChaptersToChapters as convertReferenceBookChaptersToTocChapters,
  exists,
  find,
  findSelectedReferenceBookArticle,
  findSelectedReferenceBookChapter,
  Option
} from "shared/utils"
import {ResortableEntity, ResortedEntity} from "../../../../../models"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface UseScenarioReferenceBookOverviewHook {
  readonly addChapter: () => void
  readonly removeChapter: (referenceBookChapterId: UUID) => DeleteEntityHook
  readonly isBundled: boolean
  readonly isScenarioReadOnly: boolean
  readonly hideSortOverlay: () => void
  readonly loading: boolean
  readonly repositionChapter: (orderedChapters: ResortedEntity[]) => void
  readonly repositionChapterLoading: boolean
  readonly scenarioReferenceBooks: Option<ReferenceBookChapter[]>
  readonly scenarioChapters: Option<TocChapter[]>
  readonly selectedEntityId: Option<UUID>
  readonly selectedArticle: Option<ReferenceBookArticle>
  readonly selectedReferenceBook: Option<ReferenceBookChapter>
  readonly selectEntityId: (id: Option<UUID>) => void
  readonly handleBundleChapters: (shouldHideChapters: boolean) => void
  readonly showSortOverlay: () => void
  readonly sortableChapters: ResortableEntity[]
  readonly sortChaptersOverlayVisible: boolean
  readonly showPreview: () => void
  readonly hidePreview: () => void
  readonly isPreviewVisible: boolean
  readonly openPdf: (id: UUID, url: string, title?: string) => void
  readonly hidePdf: () => void
  readonly selectedPdf: Option<Binary>
}

export const useScenarioReferenceBookOverview = (
  scenarioId: UUID,
  referenceBookChapterId?: UUID,
  articleId?: UUID
): UseScenarioReferenceBookOverviewHook => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()
  const [sortChaptersOverlayVisible, setSortChaptersOverlayVisible] = React.useState<boolean>(false)
  const [isPreviewVisible, setIsPreviewVisible] = React.useState(false)
  const [selectedPdf, setSelectedPdf] = React.useState<Option<Binary>>(Option.none)

  const {scenarioReferenceBooks, scenarioReferenceBooksLoading} = useScenarioReferenceBookChapters(scenarioId)
  const {
    repositionReferenceBookScenario,
    repositionReferenceBookScenarioLoading
  } = useRepositionReferenceBookChapterScenario(scenarioId)

  const scenarioReferenceBooksOption = scenarioReferenceBooks.map(
    referenceBookChapters => referenceBookChapters as ReferenceBookChapter[]
  )
  const scenarioChapters = scenarioReferenceBooksOption.map(books =>
    convertReferenceBookChaptersToTocChapters(t, books)
  )
  const {updateScenario} = useUpdateScenario()
  const {scenario: scenarioOption} = useScenario(scenarioId)

  const isScenarioReadOnly = scenarioOption.exists(
    scenario => scenario.finalizedAt !== null || scenario.publishedAt !== null
  )

  const selectedEntityId = Option.of(articleId ?? referenceBookChapterId)

  const sortableChapters = scenarioChapters.getOrElse([]).map<ResortableEntity>(chapter => ({
    id: chapter.id,
    position: chapter.position,
    icon: IconName.Book,
    title: chapter.title
  }))

  const showSortOverlay = () => setSortChaptersOverlayVisible(true)
  const hideSortOverlay = () => setSortChaptersOverlayVisible(false)

  const showPreview = () => setIsPreviewVisible(true)
  const hidePreview = () => setIsPreviewVisible(false)

  const openPdf = (id: UUID, url: string, title?: string) =>
    setSelectedPdf(
      Option.of<Binary>({id: id, path: url, title: title})
    )
  const hidePdf = () => setSelectedPdf(Option.none)

  const repositionChapter = (orderedChapters: ResortedEntity[]) => {
    Promise.all(
      orderedChapters.map(({id, predecessorId}) =>
        repositionReferenceBookScenario(
          {scenarioId, referenceBookChapterId: id},
          predecessorId ? {scenarioId, referenceBookChapterId: predecessorId} : undefined
        )
      )
    ).then(hideSortOverlay)
  }

  const selectEntityId = (articleId: Option<UUID>) => {
    if (articleId.isEmpty()) {
      dispatch(navigateToRouteAction(Route.ScenarioReferenceBookChapters, {scenarioId}))
      return
    }

    const targetReferenceBook = articleId.flatMap(id =>
      scenarioReferenceBooksOption.flatMap(books =>
        find(book => book.id === id || exists(article => article.id === id, book.articles), books)
      )
    )

    targetReferenceBook.forEach(book =>
      articleId.forEach(id =>
        book.id === id
          ? dispatch(
              navigateToRouteAction(Route.ScenarioReferenceBookChapters, {
                scenarioId,
                referenceBookChapterId: book.id
              })
            )
          : dispatch(
              navigateToRouteAction(Route.ScenarioReferenceBookChaptersArticle, {
                scenarioId,
                referenceBookChapterId: book.id,
                articleId: id
              })
            )
      )
    )
  }

  const addChapter = () => dispatch(navigateToRouteAction(Route.ScenarioReferenceBookChaptersSelection, {scenarioId}))

  const selectedArticle = findSelectedReferenceBookArticle(scenarioReferenceBooksOption, selectedEntityId)
  const selectedReferenceBook = findSelectedReferenceBookChapter(scenarioReferenceBooksOption, selectedEntityId)

  const handleBundleChapters = (shouldHideChapters: boolean) =>
    scenarioOption.forEach(scenario =>
      updateScenario(scenarioId, {
        description: scenario.description,
        name: scenario.name,
        shouldDisplayTime: scenario.shouldDisplayTime,
        tags: scenario.tags,
        completionEmailAddress: scenario.completionEmailAddress,
        date: scenario.date,
        introductionEmailId: scenario.introductionEmailId,
        maxDurationInSeconds: scenario.maxDurationInSeconds,
        shouldHideReferenceBookChapters: shouldHideChapters,
        sampleCompanyId: scenario.sampleCompanyId
      })
    )

  return {
    addChapter,
    removeChapter: partial(useDeleteScenarioReferenceBookChapter, scenarioId),
    isBundled: scenarioOption.exists(scenario => scenario.shouldHideReferenceBookChapters),
    hideSortOverlay,
    loading: scenarioReferenceBooksLoading,
    repositionChapter,
    repositionChapterLoading: repositionReferenceBookScenarioLoading,
    scenarioReferenceBooks: scenarioReferenceBooksOption,
    scenarioChapters,
    selectedEntityId,
    selectEntityId,
    selectedArticle,
    selectedReferenceBook,
    handleBundleChapters,
    showSortOverlay,
    sortableChapters,
    sortChaptersOverlayVisible,
    isScenarioReadOnly,
    showPreview,
    hidePreview,
    isPreviewVisible,
    openPdf,
    hidePdf,
    selectedPdf
  }
}
