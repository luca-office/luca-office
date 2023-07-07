import useEvent from "@react-hook/event"
import {isEqual} from "lodash-es"
import * as React from "react"
import {UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {Dispatch} from "redux"
import {ErpType} from "../../../../../enums"
import {BinaryFile, ErpEntity, ErpEntityByType, ErpStackEntity, ScenarioErpEntitySelector} from "../../../../../models"
import {useLucaTranslation} from "../../../../../translations"
import {Option, some, Subject} from "../../../../../utils"
import {getForeignKeysForEntity} from "../../../config/data/keys"
import {
  useCreateErpEntity,
  useDeleteErpEntity,
  useErpForeignKeys,
  UseErpForeignKeysHook,
  useErpFormMethods,
  useErpReferencingPrimaryKeys,
  UseErpReferencingPrimaryKeysHook,
  useUpdateErpEntity
} from "../../../hooks"
import {getErpLabel, getForeignKeys, toErpStackEntity} from "../../../utils"
import {getScenarioErpEntitySelector} from "../../../utils/scenario-erp-selector"

export enum ErpDataSetMode {
  Default,
  Create
}

export interface UseErpDataSetOverlayHook {
  readonly currentStackEntity: ErpStackEntity
  readonly modalTitleStack: string[]
  readonly formMethods: UseFormMethods<ErpEntity>
  readonly dispatch: Dispatch<any>
  readonly goBack: () => void
  readonly navigateToEntity: (erpType: ErpType, ids: number[]) => void
  readonly dataLoading: boolean
  readonly actionLoading: boolean
  readonly updateErpEntity: (fromValues: ErpEntity) => void
  readonly formValuesChanged: boolean
  readonly deleteErpEntity: () => void
  readonly autoCompleteLists: TypeOf<UseErpForeignKeysHook, "foreignKeys">
  readonly referencingPrimaryKeys: TypeOf<UseErpReferencingPrimaryKeysHook, "primaryKeys">
  readonly currentBinaryFile: Option<BinaryFile>
  readonly shouldCreateCurrentEntity: boolean
  readonly sectionRef: React.RefObject<HTMLElement>
  readonly sectionScrollSubject: Subject<void>
  readonly scenarioErpSelector: ScenarioErpEntitySelector
  readonly deleteOrlyVisible: boolean
  readonly setDeleteOrlyVisible: (deleteOrlyVisible: boolean) => void
}

export interface UseErpDataSetOverlayParams {
  readonly mode: ErpDataSetMode
  readonly sampleCompanyId: UUID
  readonly data: ErpEntity
  readonly dataIndex: number
  readonly getEntity: (erpType: ErpType, ids: number[], sourceErpEntity: ErpEntity) => Promise<ErpStackEntity>
  readonly onDismiss: (entityId: number, dataIndex: number) => void
  readonly onNavigateToReference?: (dataIndex: number, targetType: ErpType, targetId: number) => void
  readonly onNavigateBack?: (type: ErpType, rowId: number, targetType: ErpType, targetId: number) => void
}

export const useErpDataSetOverlay = ({
  mode,
  sampleCompanyId,
  data: rootData,
  dataIndex,
  getEntity,
  onDismiss,
  onNavigateToReference,
  onNavigateBack
}: UseErpDataSetOverlayParams): UseErpDataSetOverlayHook => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()

  const [formValuesChanged, setFormValuesChanged] = React.useState(false)
  const [dataLoading, setDataLoading] = React.useState(false)
  const [entityStack, setEntityStack] = React.useState([
    toErpStackEntity(rootData, getForeignKeysForEntity(rootData), dataIndex)
  ])
  const [deleteOrlyVisible, setDeleteOrlyVisible] = React.useState(false)

  const sectionRef = React.createRef<HTMLElement>()
  const sectionScrollSubject = new Subject<void>()

  useEvent(sectionRef, "scroll", () => sectionScrollSubject.next())

  const currentStackEntity = entityStack.length > 1 ? entityStack[entityStack.length - 1] : entityStack[0]

  const currentBinaryFile = React.useMemo<Option<BinaryFile>>(
    () =>
      currentStackEntity.data.type !== ErpType.ComponentProduct
        ? Option.of(currentStackEntity.data.binaryFile)
        : Option.none(),
    [currentStackEntity]
  )

  const shouldCreateCurrentEntity = mode === ErpDataSetMode.Create

  const modalTitleStack = React.useMemo(
    () =>
      entityStack.map(entity => {
        if (entity.data.type === ErpType.ComponentProduct) {
          const {componentId, productId} = entity.data
          return t("erp_accordion__component_for_product_label", {componentId, productId})
        }

        const title = getErpLabel({
          t,
          type: entity.data.type,
          key: "id",
          foreignKeys: getForeignKeys(entity.foreignKeys),
          showKeyHints: false,
          showType: false
        })

        return `${title} ${entity.data.id}`
      }),
    [entityStack]
  )

  const formMethods = useErpFormMethods(currentStackEntity.data)
  const {loading: autoCompleteListsLoading, foreignKeys: autoCompleteLists} = useErpForeignKeys(
    currentStackEntity.data.sampleCompanyId,
    currentStackEntity.data.type
  )
  const {loading: referencingPrimaryKeysLoading, primaryKeys: referencingPrimaryKeys} = useErpReferencingPrimaryKeys(
    currentStackEntity.data.sampleCompanyId,
    currentStackEntity.data.type,
    currentStackEntity.data.id
  )
  const {createErpEntity, isCreateErpEntityLoading} = useCreateErpEntity(sampleCompanyId, currentStackEntity.data.type)
  const {updateErpEntity, isUpdateErpEntityLoading} = useUpdateErpEntity(sampleCompanyId, currentStackEntity.data.type)
  const {deleteErpEntity, isDeleteErpEntityLoading} = useDeleteErpEntity(
    sampleCompanyId,
    currentStackEntity.data.type,
    currentStackEntity.data
  )

  const scenarioErpSelector = getScenarioErpEntitySelector(currentStackEntity.data.type, currentStackEntity.data)

  const currentFormValues = formMethods.watch()

  const setFormValues = (stackEntity: ErpStackEntity) =>
    formMethods.reset(
      Object.keys(stackEntity.data).reduce((accumulator, key) => {
        const name = key as keyof ErpEntityByType<typeof stackEntity.data.type>
        return {
          ...accumulator,
          [name]: stackEntity.data[name]
        }
      }, {})
    )

  const goBack = () => {
    if (entityStack.length <= 1) {
      return
    }

    const updatedEntityStack = [...entityStack]
    updatedEntityStack.pop()
    setEntityStack(updatedEntityStack)

    const targetEntity = updatedEntityStack[updatedEntityStack.length - 1]
    if (targetEntity.data.id) {
      onNavigateBack?.(
        currentStackEntity.data.type,
        currentStackEntity.data.id,
        targetEntity.data.type,
        targetEntity.data.id
      )
    }
  }

  const navigateToEntity = (erpType: ErpType, ids: number[]) => {
    setDataLoading(true)
    getEntity(erpType, ids, currentStackEntity.data)
      .then(stackEntity => {
        setEntityStack([...entityStack, stackEntity])
        setDataLoading(false)
        onNavigateToReference?.(currentStackEntity.index, erpType, ids[0])
      })
      .catch(() => setDataLoading(false))
  }

  const handleUpdateErpEntity = (formValues: ErpEntity) =>
    (shouldCreateCurrentEntity ? createErpEntity(formValues) : updateErpEntity(formValues)).then(() =>
      onDismiss(rootData.id, dataIndex)
    )

  const handleDeleteErpEntity = () => {
    deleteErpEntity(rootData.id, sampleCompanyId).then(() => onDismiss(rootData.id, dataIndex))
  }

  React.useEffect(() => {
    const valuesChanged = some(dataKey => {
      const key = dataKey as keyof ErpEntity
      return !isEqual(currentStackEntity.data[key], currentFormValues[key])
    }, Object.keys(currentFormValues))
    setFormValuesChanged(valuesChanged)
  }, [currentStackEntity, currentFormValues])

  React.useEffect(() => {
    setFormValues(currentStackEntity)
  }, [currentStackEntity])

  return {
    currentStackEntity,
    dispatch,
    modalTitleStack,
    formMethods: formMethods as UseFormMethods<ErpEntity>,
    goBack,
    navigateToEntity,
    dataLoading: autoCompleteListsLoading || dataLoading || referencingPrimaryKeysLoading,
    actionLoading: isCreateErpEntityLoading || isDeleteErpEntityLoading || isUpdateErpEntityLoading,
    updateErpEntity: handleUpdateErpEntity,
    formValuesChanged,
    deleteErpEntity: handleDeleteErpEntity,
    autoCompleteLists,
    referencingPrimaryKeys,
    currentBinaryFile,
    shouldCreateCurrentEntity,
    sectionRef,
    sectionScrollSubject,
    scenarioErpSelector,
    deleteOrlyVisible,
    setDeleteOrlyVisible
  }
}
