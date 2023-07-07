import * as React from "react"
import {AutomatedCodingItemRule, ManualCodingItemUpdate} from "shared/graphql/generated/globalTypes"
import {
  useAutomatedCodingCriteria,
  useCodingCriteria,
  useCreateCodingCriterion,
  useRScripts,
  useScenario,
  useUpdateManualCodingItem
} from "shared/graphql/hooks"
import {
  AutomatedCodingCriterion,
  AutomatedCodingItem,
  CodingCriterion,
  CodingItem,
  DocumentViewScenarioCodingAutomatedCriterion,
  RScript
} from "shared/models"
import {Option} from "shared/utils"
import {UpdateCodingItemType} from "../../common/update-coding-item-modal/hooks/use-update-coding-item-modal"
import {AutomatedCodingItemDetailView} from "./automated-coding-item-detail-view"
import {useTitlesForDocumentViewAutomatedCriterion} from "./hooks/use-titles-for-document-view-automated-criterion"
import {ManualCodingItemDetailView} from "./manual-coding-item-detail-view"

export interface CodingItemDetailViewContainerProps {
  readonly codingItem: CodingItem
  readonly scenarioId: UUID
  readonly isReadOnly: boolean
  readonly codingModelId: UUID
}

export interface ManualCodingItemDetailViewComponentProps extends CodingItemDetailViewContainerProps {
  readonly addCodingCriterion: () => void
  readonly codingCriteria: CodingCriterion[]
  readonly codingItem: CodingItem
  readonly hideCodingItemUpdateModal: () => void
  readonly hideEditCodingCriterionModal: () => void
  readonly showEditCodingCriterionModal: (defaultSelectedCriterionId: Option<UUID>) => void
  readonly editCodingCriterionModalVisibility: EditCodingCriterionModalVisibility
  readonly isReadOnly: boolean
  readonly showUpdateCodingItemTypeModal: () => void
  readonly updateCodingItem: (update: Partial<ManualCodingItemUpdate>) => void
  readonly visibleCodingItemUpdateModalType: Option<UpdateCodingItemType>
}
export interface AutomatedCodingItemDetailViewComponentProps extends CodingItemDetailViewContainerProps {
  readonly codingCriteria: AutomatedCodingCriterion[]
  readonly codingItem: AutomatedCodingItem
  readonly editCodingCriterionModalVisibility: EditCodingCriterionModalVisibility
  readonly getTitleForDocumentViewTableEntity: (criterion: DocumentViewScenarioCodingAutomatedCriterion) => string
  readonly hideCodingItemUpdateModal: () => void
  readonly hideEditCodingCriterionModal: () => void
  readonly isLoading: boolean
  readonly isReadOnly: boolean
  readonly sampleCompanyId?: UUID
  readonly showEditCodingCriterionModal: (defaultSelectedCriterionId: Option<UUID>) => void
  readonly updateCodingItem: (update: Partial<ManualCodingItemUpdate>) => void
  readonly visibleCodingItemUpdateModalType: Option<UpdateCodingItemType>
  readonly rScripts: RScript[]
  readonly visibleCreateCriterionModal: Option<CodingCriterionCreationModalVisibility>
  readonly setVisibleCreateCriterionModal: React.Dispatch<
    React.SetStateAction<Option<CodingCriterionCreationModalVisibility>>
  >
}

export interface EditCodingCriterionModalVisibility {
  readonly isVisible: boolean
  readonly defaultSelectedCriterionId: Option<UUID>
}

export interface CodingCriterionCreationModalVisibility {
  readonly visibleCriterionType: AutomatedCodingItemRule
}

export const CodingItemDetailViewContainer: React.FC<CodingItemDetailViewContainerProps> = ({
  codingItem,
  scenarioId,
  codingModelId,
  ...rest
}) => {
  const [visibleCodingItemUpdateModalType, setVisibleCodingItemUpdateModalType] = React.useState<
    Option<UpdateCodingItemType>
  >(Option.none())
  const [
    editCodingCriterionModalVisibility,
    setEditCodingCriterionModalVisibility
  ] = React.useState<EditCodingCriterionModalVisibility>({defaultSelectedCriterionId: Option.none(), isVisible: false})

  const [visibleCreateCriterionModal, setVisibleCreateCriterionModal] = React.useState<
    Option<CodingCriterionCreationModalVisibility>
  >(Option.none())

  const {updateManualCodingItem} = useUpdateManualCodingItem()

  const {scenario} = useScenario(scenarioId)

  const {codingCriteria} = useCodingCriteria(codingItem.id)
  const {rScripts} = useRScripts()
  const {automatedCodingCriteria} = useAutomatedCodingCriteria(codingItem.id)
  const {createCodingCriterion} = useCreateCodingCriterion(codingItem.id, codingModelId)

  const sampleCompanyId = scenario.map(s => s.sampleCompanyId ?? undefined).orUndefined()

  const {titleForId, isLoading} = useTitlesForDocumentViewAutomatedCriterion(scenarioId, sampleCompanyId)

  const showUpdateCodingItemTypeModal = () => {
    setVisibleCodingItemUpdateModalType(Option.of<UpdateCodingItemType>(UpdateCodingItemType.Type))
  }
  const hideCodingItemUpdateModal = () => {
    setVisibleCodingItemUpdateModalType(Option.none())
  }
  const showEditCodingCriterionModal = (defaultSelectedCriterionId: Option<UUID>) => {
    setEditCodingCriterionModalVisibility({isVisible: true, defaultSelectedCriterionId})
  }
  const hideEditCodingCriterionModal = () => {
    setEditCodingCriterionModalVisibility({defaultSelectedCriterionId: Option.none(), isVisible: false})
  }

  const handleUpdate = (update: Partial<ManualCodingItemUpdate>) => {
    const codingItemUpdate: ManualCodingItemUpdate = {
      title: update.title ?? codingItem.title,
      description: update.description ?? codingItem.description,
      scoringType: update.scoringType ?? codingItem.scoringType
    }
    updateManualCodingItem(codingItem.id, codingItemUpdate)
  }

  const addCodingCriterion = () => createCodingCriterion({description: "", itemId: codingItem.id, score: 0})

  return codingItem.__typename === "AutomatedCodingItem" ? (
    <AutomatedCodingItemDetailView
      getTitleForDocumentViewTableEntity={titleForId}
      updateCodingItem={handleUpdate}
      codingItem={codingItem}
      isLoading={isLoading}
      visibleCreateCriterionModal={visibleCreateCriterionModal}
      setVisibleCreateCriterionModal={setVisibleCreateCriterionModal}
      scenarioId={scenarioId}
      codingCriteria={automatedCodingCriteria.filter(criterion => criterion.itemId === codingItem.id)}
      visibleCodingItemUpdateModalType={visibleCodingItemUpdateModalType}
      hideCodingItemUpdateModal={hideCodingItemUpdateModal}
      editCodingCriterionModalVisibility={editCodingCriterionModalVisibility}
      showEditCodingCriterionModal={showEditCodingCriterionModal}
      hideEditCodingCriterionModal={hideEditCodingCriterionModal}
      rScripts={rScripts}
      sampleCompanyId={sampleCompanyId}
      codingModelId={codingModelId}
      {...rest}
    />
  ) : (
    <ManualCodingItemDetailView
      addCodingCriterion={addCodingCriterion}
      updateCodingItem={handleUpdate}
      codingItem={codingItem}
      scenarioId={scenarioId}
      codingCriteria={codingCriteria}
      visibleCodingItemUpdateModalType={visibleCodingItemUpdateModalType}
      showUpdateCodingItemTypeModal={showUpdateCodingItemTypeModal}
      hideCodingItemUpdateModal={hideCodingItemUpdateModal}
      editCodingCriterionModalVisibility={editCodingCriterionModalVisibility}
      showEditCodingCriterionModal={showEditCodingCriterionModal}
      hideEditCodingCriterionModal={hideEditCodingCriterionModal}
      codingModelId={codingModelId}
      {...rest}
    />
  )
}
