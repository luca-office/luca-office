import {useMemo, useState} from "react"
import {useDispatch} from "react-redux"
import {TableContainerProps} from "shared/components"
import {ReferenceBookChapterUpdate, ReferenceBookContentType} from "shared/graphql/generated/globalTypes"
import {
  CreateReferenceBookContentProps,
  useCreateReferenceBookContent,
  useRepositionReferenceBookArticle,
  useRepositionReferenceBookContent,
  useUpdateReferenceBookArticle,
  useUpdateReferenceBookChapter,
  useUpdateReferenceBookContent
} from "shared/graphql/hooks/mutations"
import {ReferenceBookArticle, ReferenceBookArticleContent, ReferenceBookChapter} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {exists, find, Option, sort} from "shared/utils"
import {ResortableEntity, ResortedEntity} from "../../../../../models"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {getBookArticleTableProps} from "../../../config"
import {convertArticleToSortableArticleContents} from "../../../utils/reference-book-article-detail-utils"
import {useUpdateReferenceBookContents} from "./use-update-reference-book-contents"

export interface UseReferenceBookDetailHook
  extends Pick<CreateReferenceBookContentProps, "createReferenceBookContent"> {
  readonly articles: ReferenceBookArticle[]
  readonly articleTableProps: TableContainerProps<ReferenceBookArticle>
  readonly contentTypeModalVisible: boolean
  readonly dataLoading: boolean
  readonly hideSortModal: () => void
  readonly isPublished: boolean
  readonly navigateToChapterOverview: () => void
  readonly repositionArticleContent: (orderedArticleContent: ResortedEntity[]) => void
  readonly repositionReferenceBookContentLoading: boolean
  readonly selectContentType: (type: Option<ReferenceBookContentType>) => void
  readonly selectedArticle: Option<ReferenceBookArticle>
  readonly selectedContentType: Option<ReferenceBookContentType>
  readonly selectedEntityIsAnArticle: boolean
  readonly showSortModal: () => void
  readonly sortableArticleContents: Option<ResortableEntity[]>
  readonly sortModalVisible: boolean
  readonly title: string
  readonly toggleContentTypeModal: (visible: boolean) => void
  readonly toggleUpdateDescriptionModal: (visible: boolean) => void
  readonly updateArticleTitle: (title: string) => Promise<Option<ReferenceBookArticle>>
  readonly updateDescriptionModalVisible: boolean
  readonly updateReferenceBook: (update: Partial<ReferenceBookChapterUpdate>) => Promise<Option<ReferenceBookChapter>>
  readonly updateTextContent: (contentId: UUID, text: string) => Promise<Option<ReferenceBookArticleContent>>
}

export const useReferenceBookArticleDetail = (
  referenceBookChapter: ReferenceBookChapter,
  selectedEntityId: Option<UUID>,
  selectEntityId: (id: Option<UUID>) => void
): UseReferenceBookDetailHook => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()

  const {updateReferenceBook, updateReferenceBookLoading} = useUpdateReferenceBookChapter()
  const {updateReferenceBookArticle, updateReferenceBookArticleLoading} = useUpdateReferenceBookArticle(
    referenceBookChapter.id
  )
  const {updateReferenceBookContent, updateReferenceBookContentLoading} = useUpdateReferenceBookContent(
    referenceBookChapter.id
  )
  const {createReferenceBookContent, createReferenceBookContentLoading} = useCreateReferenceBookContent(
    referenceBookChapter.id
  )
  const {repositionReferenceBookArticle, repositionReferenceBookArticleLoading} = useRepositionReferenceBookArticle(
    referenceBookChapter.id
  )
  const {repositionReferenceBookContent, repositionReferenceBookContentLoading} = useRepositionReferenceBookContent()
  const {updateContentsInCache} = useUpdateReferenceBookContents(referenceBookChapter.id)

  const [contentTypeModalVisible, toggleContentTypeModal] = useState(false)
  const [selectedContentType, selectContentType] = useState<Option<ReferenceBookContentType>>(Option.none())
  const [updateDescriptionModalVisible, toggleUpdateDescriptionModal] = useState(false)
  const [isArticleActionbarVisible, setIsArticleActionbarVisible] = useState<boolean>(false)
  const [sortModalVisible, setSortModalVisible] = useState<boolean>(false)

  const articles = useMemo<ReferenceBookArticle[]>(
    () => sort(article => article.position, referenceBookChapter.articles),
    [referenceBookChapter]
  )

  const selectedArticle = selectedEntityId.flatMap(id =>
    find(referenceBookArticle => referenceBookArticle.id === id, articles)
  )
  const title = selectedArticle.map(article => article.title).getOrElse(referenceBookChapter.title)

  const isPublished = !!referenceBookChapter.publishedAt

  const selectedEntityIsAnArticle = selectedEntityId
    .map(id => id !== referenceBookChapter.id && exists(article => article.id === id, articles))
    .getOrElse(false)

  const sortableArticleContents = convertArticleToSortableArticleContents(selectedArticle, t)

  const navigateToChapterOverview = () =>
    dispatch(navigateToRouteAction(Route.ReferenceBookChaptersDetail, {id: referenceBookChapter.id}))

  const navigateToArticleCreation = () =>
    dispatch(navigateToRouteAction(Route.ReferenceBookChaptersDetailArticleCreation, {id: referenceBookChapter.id}))

  const moveArticleUpwards = (article: ReferenceBookArticle) => {
    const currentIndex = articles.indexOf(article)
    repositionReferenceBookArticle(article.id, currentIndex === 1 ? undefined : articles[currentIndex - 2]?.id)
  }
  const moveArticleDownwards = (article: ReferenceBookArticle) => {
    const currentIndex = articles.indexOf(article)
    repositionReferenceBookArticle(article.id, articles[currentIndex + 1]?.id)
  }

  const handleUpdateBook = (update: Partial<ReferenceBookChapterUpdate>) =>
    updateReferenceBook(referenceBookChapter.id, {
      title: update.title || referenceBookChapter.title,
      description: update.description || referenceBookChapter.description
    })

  const handleUpdateArticleTitle = (title: string) =>
    selectedArticle.isDefined()
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        updateReferenceBookArticle(selectedArticle.map(article => article.id).orNull()!, {title})
      : Promise.resolve(Option.none<ReferenceBookArticle>())

  const handleUpdateTextContent = (contentId: UUID, text: string) => updateReferenceBookContent(contentId, {text})

  const showSortModal = () => setSortModalVisible(true)
  const hideSortModal = () => setSortModalVisible(false)

  const repositionArticleContent = (orderedArticleContent: ResortedEntity[]) => {
    Promise.all(orderedArticleContent.map(({id, predecessorId}) => repositionReferenceBookContent(id, predecessorId)))
      .then(contents => selectedArticle.forEach(article => updateContentsInCache(article.id, contents)))
      .then(hideSortModal)
  }

  const articleTableProps = getBookArticleTableProps({
    articles,
    isArticleActionbarVisible,
    isPublished,
    moveArticleDownwards,
    moveArticleUpwards,
    navigateToArticleCreation,
    referenceBookChapterId: referenceBookChapter.id,
    repositionArticleLoading: repositionReferenceBookArticleLoading,
    selectEntityId,
    setIsArticleActionbarVisible,
    t
  })

  return {
    articles,
    articleTableProps,
    contentTypeModalVisible,
    createReferenceBookContent,
    dataLoading:
      createReferenceBookContentLoading ||
      repositionReferenceBookArticleLoading ||
      repositionReferenceBookContentLoading ||
      updateReferenceBookArticleLoading ||
      updateReferenceBookContentLoading ||
      updateReferenceBookLoading,
    hideSortModal,
    isPublished,
    navigateToChapterOverview,
    repositionArticleContent,
    repositionReferenceBookContentLoading,
    selectContentType,
    selectedArticle,
    selectedContentType,
    selectedEntityIsAnArticle,
    showSortModal,
    sortableArticleContents,
    sortModalVisible,
    title,
    toggleContentTypeModal,
    toggleUpdateDescriptionModal,
    updateArticleTitle: handleUpdateArticleTitle,
    updateDescriptionModalVisible,
    updateReferenceBook: handleUpdateBook,
    updateTextContent: handleUpdateTextContent
  }
}
