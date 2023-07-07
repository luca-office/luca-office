import {useDispatch} from "react-redux"
import {SampleCompany} from "shared/models"
import {Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface UseSettingsHook {
  readonly navigateToDocuments: () => void
  readonly navigateToDomainSignature: () => void
  readonly navigateToErp: () => void
}

interface UseSettingsParams {
  readonly sampleCompany: Option<SampleCompany>
  readonly scenarioId?: UUID
}

export const useSettings = ({sampleCompany, scenarioId}: UseSettingsParams): UseSettingsHook => {
  const dispatch = useDispatch()

  const navigateToDocuments = () => {
    if (scenarioId) {
      sampleCompany.forEach(({id}) =>
        dispatch(navigateToRouteAction(Route.ScenarioAssignedSampleCompanyDocuments, {scenarioId, sampleCompanyId: id}))
      )
    } else {
      sampleCompany.forEach(({id}) =>
        dispatch(navigateToRouteAction(Route.SampleCompanyDocuments, {sampleCompanyId: id}))
      )
    }
  }

  const navigateToDomainSignature = () => {
    if (scenarioId) {
      sampleCompany.forEach(({id}) =>
        dispatch(
          navigateToRouteAction(Route.ScenarioAssignedSampleCompanyDomainSignature, {scenarioId, sampleCompanyId: id})
        )
      )
    } else {
      sampleCompany.forEach(({id}) =>
        dispatch(navigateToRouteAction(Route.SampleCompanyDomainSignature, {sampleCompanyId: id}))
      )
    }
  }

  const navigateToErp = () => {
    sampleCompany.forEach(({id}) =>
      !scenarioId
        ? dispatch(navigateToRouteAction(Route.SampleCompanyErp, {sampleCompanyId: id}))
        : dispatch(
            navigateToRouteAction(Route.ScenarioAssignedSampleCompanyDetailErp, {scenarioId, sampleCompanyId: id})
          )
    )
  }

  return {
    navigateToDocuments,
    navigateToDomainSignature,
    navigateToErp
  }
}
