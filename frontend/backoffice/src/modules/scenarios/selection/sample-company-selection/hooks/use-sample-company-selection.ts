import {useDispatch} from "react-redux"
import {useSampleCompanies, useScenario, useUpdateScenario} from "shared/graphql/hooks"
import {SampleCompany, Scenario} from "shared/models"
import {first, Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface UseSampleCompanySelectionHook {
  readonly loading: boolean
  readonly navigateToScenarioDetail: () => void
  readonly openSampleCompany: (sampleCompanyId: UUID) => void
  readonly sampleCompanies: SampleCompany[]
  readonly scenarioOption: Option<Scenario>
  readonly updateScenario: (selectedSampleCompanies: SampleCompany[]) => void
}

export const useSampleCompanySelection = (scenarioId: UUID): UseSampleCompanySelectionHook => {
  const dispatch = useDispatch()

  const {sampleCompanies, sampleCompaniesLoading} = useSampleCompanies()
  const {scenario: scenarioOption} = useScenario(scenarioId)
  const {updateScenario, isUpdateScenarioLoading} = useUpdateScenario()

  const navigateToScenarioDetail = () => dispatch(navigateToRouteAction(Route.ScenarioDetail, {scenarioId}))

  const navigateToAssignedSampleCompany = (sampleCompanyId: UUID) =>
    dispatch(navigateToRouteAction(Route.ScenarioAssignedSampleCompanyDetail, {scenarioId, sampleCompanyId}))

  const openSampleCompany = (sampleCompanyId: UUID) =>
    dispatch(navigateToRouteAction(Route.ScenarioSampleCompanyDetail, {scenarioId, sampleCompanyId}))

  const handleUpdate = (selectedSampleCompanies: SampleCompany[]) => {
    first(selectedSampleCompanies).forEach(sampleCompany =>
      scenarioOption.forEach(scenario =>
        updateScenario(scenario.id, {
          description: scenario.description,
          name: scenario.name,
          shouldDisplayTime: scenario.shouldDisplayTime,
          shouldHideReferenceBookChapters: scenario.shouldHideReferenceBookChapters,
          tags: scenario.tags,
          completionEmailAddress: scenario.completionEmailAddress,
          date: scenario.date,
          introductionEmailId: scenario.introductionEmailId,
          maxDurationInSeconds: scenario.maxDurationInSeconds,
          sampleCompanyId: sampleCompany.id
        }).then(() => navigateToAssignedSampleCompany(sampleCompany.id))
      )
    )
  }

  return {
    loading: sampleCompaniesLoading || isUpdateScenarioLoading,
    openSampleCompany,
    sampleCompanies,
    navigateToScenarioDetail,
    scenarioOption,
    updateScenario: handleUpdate
  }
}
