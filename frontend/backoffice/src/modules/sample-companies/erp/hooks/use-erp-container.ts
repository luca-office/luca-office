import {Dispatch, SetStateAction, useState} from "react"
import {useDispatch} from "react-redux"
import {useInterventions, useSampleCompany, useScenario} from "shared/graphql/hooks"
import {Intervention, SampleCompany, Scenario} from "shared/models"
import {isDefined, Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"

export interface UseErpContainerHook {
  readonly navigateBack: () => void
  readonly sampleCompany: Option<SampleCompany>
  readonly isLoading: boolean
  readonly scenarioMaxDurationInSeconds: number
  readonly isPreviewVisible: boolean
  readonly setIsPreviewVisible: Dispatch<SetStateAction<boolean>>
  readonly isReadonly: boolean
  readonly scenario: Option<Scenario>
  readonly interventions: Intervention[]
  readonly disableInterventionCreation: boolean
}

interface UseErpContainerParams {
  readonly sampleCompanyId: UUID
  readonly scenarioId?: UUID
  readonly disabled?: boolean
}

export const useErpContainer = ({sampleCompanyId, scenarioId, disabled = false}: UseErpContainerParams) => {
  const dispatch = useDispatch()

  const {sampleCompany, sampleCompanyLoading} = useSampleCompany(sampleCompanyId)
  const {scenario, scenarioLoading} = useScenario(scenarioId ?? "", scenarioId === undefined)
  const {interventions, interventionsLoading} = useInterventions(scenarioId ?? "", scenarioId === undefined)
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)

  const isPublished = sampleCompany.map(({publishedAt}) => isDefined(publishedAt)).getOrElse(false)
  const isReadonly = isDefined(scenarioId) || isPublished || disabled

  const disableInterventionCreation = scenario.exists(
    scenario => scenario.publishedAt !== null || scenario.finalizedAt !== null
  )

  const navigateBack = () => {
    if (scenarioId) {
      dispatch(navigateToRouteAction(Route.ScenarioAssignedSampleCompanyDetail, {scenarioId, sampleCompanyId}))
      return
    }
    dispatch(navigateToRouteAction(Route.SampleCompanyDetail, {sampleCompanyId}))
  }

  return {
    navigateBack,
    sampleCompany,
    isLoading: sampleCompanyLoading || scenarioLoading || interventionsLoading,
    isPreviewVisible,
    setIsPreviewVisible,
    scenarioMaxDurationInSeconds: scenario.map(s => s.maxDurationInSeconds || 0).getOrElse(0),
    isReadonly,
    scenario,
    interventions: interventions.getOrElse([]),
    disableInterventionCreation
  }
}
