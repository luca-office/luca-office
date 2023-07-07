import {useDispatch, useSelector} from "react-redux"
import {useCheckLogin, useSampleCompanies as useSampleCompaniesQuery} from "shared/graphql/hooks"
import {SampleCompany} from "shared/models"
import {Option} from "shared/utils"
import {EntityFilterConfig} from "../../../../models"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {AppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"
import {applyFilterAndSortEntities} from "../../../../utils"

export interface UseSampleCompaniesHook {
  readonly navigateCreateSampleCompany: () => void
  readonly navigateSampleCompanyDetail: (id: string) => void
  readonly sampleCompanies: SampleCompany[]
  readonly sampleCompaniesLoading: boolean
}

export const useSampleCompanies = (): UseSampleCompaniesHook => {
  const {sampleCompanies, sampleCompaniesLoading} = useSampleCompaniesQuery()
  const dispatch = useDispatch()
  const {account: user} = useCheckLogin()
  const filterOptions = useSelector<AppState, EntityFilterConfig>(
    state => state.ui.common.entityFilters.sampleCompanies
  )

  const searchableSampleCompanies = sampleCompanies.map(entity => ({...entity, title: entity.name}))

  return {
    sampleCompanies: applyFilterAndSortEntities<SampleCompany>(
      filterOptions,
      searchableSampleCompanies,
      user.safeAsSubtype(),
      Option.none()
    ),
    sampleCompaniesLoading,
    navigateCreateSampleCompany: () => dispatch(navigateToRouteAction(Route.SampleCompanyCreation)),
    navigateSampleCompanyDetail: (id: string) =>
      dispatch(navigateToRouteAction(Route.SampleCompanyDetail, {sampleCompanyId: id}))
  }
}
