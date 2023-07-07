import {useMemo} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
  useCheckLogin,
  useReferenceBookChapters as useReferenceBooksQuery,
  UseReferenceBookChaptersHook as UseReferenceBooksQueryHook
} from "shared/graphql/hooks/queries"
import {ReferenceBookChapter} from "shared/models"
import {Option} from "shared/utils"
import {EntityFilterConfig} from "../../../../models"
import {AppAction} from "../../../../redux/actions/app-action"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {AppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"
import {applyFilterAndSortEntities} from "../../../../utils"

export interface UseReferenceBookChaptersHook extends Omit<UseReferenceBooksQueryHook, "referenceBookChapters"> {
  readonly referenceBookChapters: ReferenceBookChapter[]
  readonly navigateToCreation: () => void
  readonly navigateToDetail: (id: UUID) => void
}

export const useReferenceBookChapters = (): UseReferenceBookChaptersHook => {
  const dispatch = useDispatch()
  const filterOptions = useSelector<AppState, EntityFilterConfig>(
    state => state.ui.common.entityFilters.referenceBookChapters
  )
  const {account: user} = useCheckLogin()
  const {referenceBookChapters: referenceBooksOption, referenceBooksLoading} = useReferenceBooksQuery()

  const referenceBookChapters = useMemo<ReferenceBookChapter[]>(
    () =>
      applyFilterAndSortEntities<ReferenceBookChapter>(
        filterOptions,
        referenceBooksOption.getOrElse([]),
        user.safeAsSubtype(),
        Option.none()
      ),
    [referenceBooksOption, filterOptions]
  )

  const navigateToCreation = () => dispatch<AppAction>(navigateToRouteAction(Route.ReferenceBookChaptersCreation))

  const navigateToDetail = (id: UUID) =>
    dispatch<AppAction>(navigateToRouteAction(Route.ReferenceBookChaptersDetail, {id}))

  return {
    referenceBookChapters,
    referenceBooksLoading,
    navigateToCreation,
    navigateToDetail
  }
}
