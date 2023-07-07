import {useState} from "react"
import {useDispatch} from "react-redux"
import {Relevance} from "shared/graphql/generated/globalTypes"
import {
  useCreateScenarioSampleCompanyFile,
  useInterventions,
  useScenario,
  useScenarioSampleCompanyFiles,
  useUpdateScenarioSampleCompanyFile
} from "shared/graphql/hooks"
import {FileOpeningIntervention, ScenarioSampleCompanyFile, SelectOption} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {find, first, getRelevanceCriteria, Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../../routes"
import {getInterventionsForTypeName, interventionTypeToGroupType} from "../../../../../scenario-interventions/utils"

export interface UseFileDetailFooterHook {
  readonly interventionCount: number
  readonly isCreateInterventionModalVisible: boolean
  readonly navigateToIntervention: () => void
  readonly onCreateInterventionClick: () => void
  readonly relevanceOptions: SelectOption[]
  readonly scenarioSampleCompanyFile: Option<ScenarioSampleCompanyFile>
  readonly updateRelevance: (relevance: Relevance) => void
  readonly toggleIsCreateInterventionModalVisible: () => void
  readonly scenarioDurationInSeconds: number
}

export const useFileDetailFooter = (scenarioId: UUID, fileId: UUID): UseFileDetailFooterHook => {
  const {t} = useLucaTranslation()

  const [isCreateInterventionModalVisible, setIsCreateInterventionModalVisible] = useState(false)

  const {scenarioSampleCompanyFiles} = useScenarioSampleCompanyFiles(scenarioId)
  const {scenario} = useScenario(scenarioId)
  const {createScenarioSampleCompanyFile} = useCreateScenarioSampleCompanyFile()
  const {updateScenarioSampleCompanyFile} = useUpdateScenarioSampleCompanyFile()
  const {interventions} = useInterventions(scenarioId)

  const dispatch = useDispatch()

  const scenarioSampleCompanyFile = find(entry => entry.fileId === fileId, scenarioSampleCompanyFiles)

  const interventionsForFile = (getInterventionsForTypeName(
    interventions.getOrElse([]),
    "FileOpeningIntervention"
  ) as FileOpeningIntervention[]).filter(intervention => intervention.fileId === fileId)

  const relevanceOptions = getRelevanceCriteria(t)

  const updateRelevance = (relevance: Relevance) => {
    if (scenarioSampleCompanyFile.isEmpty()) {
      createScenarioSampleCompanyFile({scenarioId, fileId, relevance})
      return
    }
    updateScenarioSampleCompanyFile(scenarioId, fileId, {relevance})
  }

  const navigateToIntervention = () =>
    first(interventionsForFile).forEach(intervention => {
      const interventionGroupType = interventionTypeToGroupType(intervention.interventionType)

      dispatch(
        navigateToRouteAction(Route.ScenarioInterventionsGroupEntityDetail, {
          scenarioId,
          groupType: interventionGroupType,
          headerGroupType: interventionGroupType,
          groupEntityId: fileId
        })
      )
    })

  return {
    scenarioSampleCompanyFile,
    scenarioDurationInSeconds: scenario.map(s => s.maxDurationInSeconds || 0).getOrElse(0),
    relevanceOptions,
    updateRelevance,
    navigateToIntervention,
    interventionCount: interventionsForFile.length,
    onCreateInterventionClick: () => setIsCreateInterventionModalVisible(true),
    isCreateInterventionModalVisible,
    toggleIsCreateInterventionModalVisible: () => setIsCreateInterventionModalVisible(!isCreateInterventionModalVisible)
  }
}
