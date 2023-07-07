import {useState} from "react"
import {useDispatch} from "react-redux"
import {NotificationSeverity} from "shared/enums"
import {
  ReferenceBookProps,
  useDuplicateReferenceBookChapter,
  usePublishReferenceBookChapter,
  useReferenceBookChapter
} from "shared/graphql/hooks"
import {AppNotification, NavigationConfig, ReferenceBookChapter, TocChapter} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {convertReferenceBookChaptersToChapters, Option} from "shared/utils"
import {useCheckUserClaims} from "../../../../hooks/use-check-user-claims"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {updateNotification} from "../../../../redux/actions/ui/common-ui-action"
import {Route} from "../../../../routes"

export interface UseReferenceBookDetailHook extends Pick<ReferenceBookProps, "referenceBookChapter"> {
  readonly bookChapters: TocChapter[]
  readonly dataLoading: boolean
  readonly duplicateReferenceBook: () => void
  readonly hidePreview: () => void
  readonly isPreviewVisible: boolean
  readonly navigateToArticleCreation: () => void
  readonly navigateToOverview: () => void
  readonly publishReferenceBook: () => void
  readonly selectEntityId: (id: Option<UUID>) => void
  readonly selectedEntityId: Option<UUID>
  readonly showPreview: () => void
  readonly userMayArchive: boolean
}

export const useReferenceBookDetail = ({
  referenceBookChapterId,
  articleId,
  navigationOverviewConfig,
  navigationDetailsConfig,
  articleNavigationConfig
}: {
  readonly referenceBookChapterId: UUID
  readonly articleId?: UUID
  readonly navigationOverviewConfig?: NavigationConfig<Route>
  readonly navigationDetailsConfig?: NavigationConfig<Route>
  readonly articleNavigationConfig?: NavigationConfig<Route>
}): UseReferenceBookDetailHook => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()

  const [isPreviewVisible, setIsPreviewVisible] = useState(false)
  const showPreview = () => setIsPreviewVisible(true)
  const hidePreview = () => setIsPreviewVisible(false)

  const navigateToOverview = () =>
    navigationOverviewConfig
      ? dispatch(navigateToRouteAction(navigationOverviewConfig.route, navigationOverviewConfig.payload))
      : dispatch(navigateToRouteAction(Route.ReferenceBookChapters))

  const navigateToArticleCreation = () =>
    articleId
      ? dispatch(
          navigateToRouteAction(Route.ReferenceBookChaptersDetailArticleDetailsCreation, {
            id: referenceBookChapterId,
            articleId
          })
        )
      : dispatch(navigateToRouteAction(Route.ReferenceBookChaptersDetailArticleCreation, {id: referenceBookChapterId}))

  const navigateToDetailView = (chapterId: UUID) =>
    navigationDetailsConfig
      ? dispatch(navigateToRouteAction(navigationDetailsConfig.route, navigationDetailsConfig.payload))
      : dispatch(navigateToRouteAction(Route.ReferenceBookChaptersDetail, {id: chapterId}))

  const navigateToArticle = (chapterId: UUID, articleId: UUID) =>
    articleNavigationConfig
      ? dispatch(navigateToRouteAction(articleNavigationConfig.route, {...articleNavigationConfig.payload, articleId}))
      : dispatch(
          navigateToRouteAction(Route.ReferenceBookChaptersDetailArticle, {
            id: chapterId,
            articleId
          })
        )

  const selectedEntityId = Option.of(articleId)

  const selectEntityId = (entityId: Option<UUID>) =>
    entityId.isEmpty()
      ? navigateToDetailView(referenceBookChapterId)
      : entityId.forEach(id =>
          !id || id === referenceBookChapterId
            ? navigateToDetailView(id)
            : navigateToArticle(referenceBookChapterId, id)
        )

  const {referenceBookChapter, referenceBookLoading} = useReferenceBookChapter(referenceBookChapterId)
  const {publishReferenceBook, publishReferenceBookLoading} = usePublishReferenceBookChapter()
  const {duplicateReferenceBook, duplicateReferenceBookLoading} = useDuplicateReferenceBookChapter()
  const {userClaims, userClaimsCheckLoading} = useCheckUserClaims(
    referenceBookChapter.map(referenceBookChapter => referenceBookChapter.author.id)
  )

  const bookChapters = referenceBookChapter
    .map(book => convertReferenceBookChaptersToChapters(t, [book as ReferenceBookChapter], true))
    .getOrElse([])

  const handlePublish = () => publishReferenceBook(referenceBookChapterId)

  const handleDuplicate = () =>
    duplicateReferenceBook(referenceBookChapterId)
      .then(response => response.forEach(bookChapter => navigateToDetailView(bookChapter.id)))
      .then(() =>
        dispatch(
          updateNotification(
            Option.of<AppNotification>({
              messageKey: "reference_books__duplicate_success",
              severity: NotificationSeverity.Success
            })
          )
        )
      )
      .catch(() =>
        dispatch(
          updateNotification(
            Option.of<AppNotification>({
              severity: NotificationSeverity.Error,
              messageKey: "reference_books__duplicate_error"
            })
          )
        )
      )

  return {
    bookChapters,
    dataLoading: duplicateReferenceBookLoading || publishReferenceBookLoading || referenceBookLoading,
    duplicateReferenceBook: handleDuplicate,
    navigateToArticleCreation,
    navigateToOverview,
    publishReferenceBook: handlePublish,
    referenceBookChapter,
    selectEntityId,
    selectedEntityId,
    showPreview,
    hidePreview,
    isPreviewVisible,
    userMayArchive: !userClaimsCheckLoading && userClaims.mayArchive
  }
}
