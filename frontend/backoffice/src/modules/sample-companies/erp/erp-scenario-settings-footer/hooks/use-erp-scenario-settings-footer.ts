import * as React from "react"
import {ErpType} from "shared/enums"
import {Relevance} from "shared/graphql/generated/globalTypes"
import {ScenarioErpEntity, ScenarioErpEntitySelector} from "shared/models"
import {
  useCreateScenarioErpEntity,
  useDeleteScenarioErpEntity,
  useScenarioErpEntity,
  useUpdateScenarioErpEntity
} from "shared/office-tools/erp/hooks"
import {Option} from "shared/utils"

export interface UseErpScenarioSettingsFooterHook {
  readonly dataLoading: boolean
  readonly actionLoading: boolean
  readonly scenarioErpEntity: Option<ScenarioErpEntity>
  readonly onRelevanceUpdate: (relevance?: Relevance) => void
  readonly isCreateInterventionModalVisible: boolean
  readonly toggleIsCreateInterventionModalVisible: () => void
}

interface UseErpScenarioSettingsFooterParams {
  readonly scenarioId: UUID
  readonly sampleCompanyId: UUID
  readonly type: ErpType
  readonly selector: ScenarioErpEntitySelector
}

export const useErpScenarioSettingsFooter = ({
  scenarioId,
  sampleCompanyId,
  type,
  selector
}: UseErpScenarioSettingsFooterParams): UseErpScenarioSettingsFooterHook => {
  const [scenarioErpEntity, setScenarioErpEntity] = React.useState<Option<ScenarioErpEntity>>(Option.none())
  const [isCreateInterventionModalVisible, setIsCreateInterventionModalVisible] = React.useState(false)

  const {getScenarioErpEntity, loading: scenarioErpEntityLoading} = useScenarioErpEntity(scenarioId)

  const {createScenarioErpEntity, loading: createScenarioErpEntityLoading} = useCreateScenarioErpEntity(
    scenarioId,
    sampleCompanyId
  )
  const {updateScenarioErpEntity, loading: updateScenarioErpEntityLoading} = useUpdateScenarioErpEntity(scenarioId)
  const {deleteScenarioErpEntity, loading: deleteScenarioErpEntityLoading} = useDeleteScenarioErpEntity(scenarioId)

  const onRelevanceUpdate = (relevance?: Relevance) => {
    const hasNoScenarioErpEntity = scenarioErpEntity.isEmpty()

    if (relevance === undefined && hasNoScenarioErpEntity) {
      return
    }

    if (relevance !== undefined && hasNoScenarioErpEntity) {
      createScenarioErpEntity(type, selector, relevance)
      setScenarioErpEntity(Option.of({selector, scenarioId, sampleCompanyId, relevance}))
      return
    }

    scenarioErpEntity.forEach(entity => {
      if (relevance === undefined) {
        deleteScenarioErpEntity(type, selector)
        setScenarioErpEntity(Option.none())
        return
      }
      updateScenarioErpEntity(type, selector, relevance)
      setScenarioErpEntity(Option.of({...entity, relevance}))
    })
  }

  React.useEffect(() => {
    getScenarioErpEntity(type, selector).then(setScenarioErpEntity)
  }, [scenarioId, sampleCompanyId, type, selector])

  return {
    dataLoading: scenarioErpEntityLoading,
    actionLoading: createScenarioErpEntityLoading || deleteScenarioErpEntityLoading || updateScenarioErpEntityLoading,
    isCreateInterventionModalVisible,
    toggleIsCreateInterventionModalVisible: () =>
      setIsCreateInterventionModalVisible(!isCreateInterventionModalVisible),
    scenarioErpEntity,
    onRelevanceUpdate
  }
}
