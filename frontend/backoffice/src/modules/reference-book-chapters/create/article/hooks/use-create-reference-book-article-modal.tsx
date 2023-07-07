import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {useCreateReferenceBookArticle} from "shared/graphql/hooks/mutations"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface ReferenceBookArticleCreationForm {
  readonly title: string
}

export interface UseCreateReferenceBookHook {
  readonly createReferenceBookArticle: (creation: ReferenceBookArticleCreationForm) => void
  readonly dataLoading: boolean
  readonly formMethods: UseFormMethods<ReferenceBookArticleCreationForm>
  readonly dismissModal: () => void
}

export const useCreateReferenceBookArticleModal = (
  referenceBookChapterId: UUID,
  articleId?: UUID
): UseCreateReferenceBookHook => {
  const dispatch = useDispatch()
  const {createReferenceBookArticle, createReferenceBookArticleLoading: dataLoading} = useCreateReferenceBookArticle()
  const formMethods = useForm<ReferenceBookArticleCreationForm>()

  const dismissModal = () =>
    articleId
      ? dispatch(
          navigateToRouteAction(Route.ReferenceBookChaptersDetailArticle, {id: referenceBookChapterId, articleId})
        )
      : dispatch(navigateToRouteAction(Route.ReferenceBookChaptersDetail, {id: referenceBookChapterId}))

  const handleCreate = (creation: ReferenceBookArticleCreationForm) => {
    createReferenceBookArticle({...creation, referenceBookChapterId}, true).then(response =>
      response.forEach(data =>
        dispatch(
          navigateToRouteAction(Route.ReferenceBookChaptersDetailArticle, {
            id: data.referenceBookChapterId,
            articleId: data.id
          })
        )
      )
    )
  }

  return {
    createReferenceBookArticle: handleCreate,
    dataLoading,
    formMethods,
    dismissModal
  }
}
