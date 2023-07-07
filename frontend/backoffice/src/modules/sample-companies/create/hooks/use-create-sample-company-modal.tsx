import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {SampleCompanyCreation} from "shared/graphql/generated/globalTypes"
import {useCreateSampleCompany} from "shared/graphql/hooks"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"

export interface SampleCompanyCreationForm {
  readonly title: string
  readonly description: string
}

export interface UseCreateSampleCompanyHook {
  readonly createSampleCompany: (creation: SampleCompanyCreation) => void
  readonly createSampleCompanyLoading: boolean
  readonly formMethods: UseFormMethods<SampleCompanyCreationForm>
  readonly dismissModal: () => void
}

export const useCreateSampleCompanyModal = (): UseCreateSampleCompanyHook => {
  const dispatch = useDispatch()
  const {createSampleCompany, isCreateSampleCompanyLoading} = useCreateSampleCompany()
  const formMethods = useForm<SampleCompanyCreationForm>()

  const dismissModal = () => dispatch(navigateToRouteAction(Route.SampleCompanies))

  const handleCreate = (creation: SampleCompanyCreation) => {
    createSampleCompany(creation).then(response =>
      response.forEach(data => dispatch(navigateToRouteAction(Route.SampleCompanyDetail, {sampleCompanyId: data.id})))
    )
  }

  return {
    createSampleCompany: handleCreate,
    createSampleCompanyLoading: isCreateSampleCompanyLoading,
    formMethods,
    dismissModal
  }
}
