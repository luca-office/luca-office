import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {ReferenceBookChapterCreation} from "shared/graphql/generated/globalTypes"
import {useCreateReferenceBookChapter} from "shared/graphql/hooks"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"

export interface ReferenceBookChapterCreationForm {
  readonly title: string
  readonly description: string
}

export interface UseCreateReferenceBookHook {
  readonly createReferenceBook: (creation: ReferenceBookChapterCreation) => void
  readonly createReferenceBookLoading: boolean
  readonly formMethods: UseFormMethods<ReferenceBookChapterCreationForm>
  readonly dismissModal: () => void
}

export const useCreateReferenceBookModal = (): UseCreateReferenceBookHook => {
  const dispatch = useDispatch()
  const {createReferenceBook, createReferenceBookLoading} = useCreateReferenceBookChapter()
  const formMethods = useForm<ReferenceBookChapterCreationForm>()

  const dismissModal = () => dispatch(navigateToRouteAction(Route.ReferenceBookChapters))

  const handleCreate = (creation: ReferenceBookChapterCreation) => {
    createReferenceBook(creation).then(response =>
      response.forEach(data => dispatch(navigateToRouteAction(Route.ReferenceBookChaptersDetail, {id: data.id})))
    )
  }

  return {
    createReferenceBook: handleCreate,
    createReferenceBookLoading,
    formMethods,
    dismissModal
  }
}
