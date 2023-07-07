import {compact} from "lodash-es"
import {createRef, RefObject, useEffect, useMemo, useState} from "react"
import {useDispatch} from "react-redux"
import {Dispatch} from "redux"
import {ErpNavigationEntryId, ErpType} from "../../../../enums"
import {useSampleCompany} from "../../../../graphql/hooks"
import {BaseNode, ErpEntity, ErpStackEntity} from "../../../../models"
import {useLucaTranslation} from "../../../../translations"
import {first, isDefined, Option} from "../../../../utils"
import {searchTree} from "../../../../utils/tree"
import {getColumnsByType} from "../../config/columns/column-hooks"
import {buildErpTree} from "../../erp-navigation/hooks/use-erp-navigation"
import {getStaticErpStructure} from "../../erp-navigation/static-erp-structure"
import {ErpTableColumn} from "../../erp-table"
import {useErpEntity} from "../../hooks/use-erp-entity"
import {erpEntryIdToLabel, navigationIdToType} from "../../utils"

export interface UseErpView {
  readonly columns: Option<Array<ErpTableColumn>>
  readonly currentErpType: Option<ErpType>
  readonly currentErpTypeName: string
  readonly dispatch: Dispatch<any>
  readonly entities: Option<Array<ErpEntity>>
  readonly getEntity: (erpType: ErpType, ids: number[], sourceErpEntity: ErpEntity) => Promise<ErpStackEntity>
  readonly isDataSetOverlayVisible: boolean
  readonly isImportDialogVisible: boolean
  readonly isLoading: boolean
  readonly isReadOnly: boolean
  readonly linkRef: RefObject<HTMLAnchorElement>
  readonly selectedEntity: Option<ErpEntity>
  readonly selectedEntityIndex: number
  readonly selectedErpNavigationNode: Option<BaseNode>
  readonly selectErpNavigationNode: (node: BaseNode) => void
  readonly setIsDataSetOverlayVisible: (isVisible: boolean) => void
  readonly setIsImportDialogVisible: (isVisible: boolean) => void
  readonly setSelectedEntity: (entityOption: Option<ErpEntity>) => void
  readonly setSelectedEntityIndex: (index: number) => void
}

export const useErpView = (
  sampleCompanyId: UUID,
  sampleCompanyName: string,
  readOnly: boolean,
  selectedErpNodeId: Option<string>
): UseErpView => {
  const {t} = useLucaTranslation()

  useEffect(() => {
    const baseNodes = buildErpTree(getStaticErpStructure(sampleCompanyName, t), null, false)

    selectedErpNodeId.map(nodeId => {
      const defaultNode: Option<BaseNode> = first(compact(baseNodes.map(node => searchTree(node, nodeId))))
      setSelectedErpNavigationNode(defaultNode)
    })
  }, [selectedErpNodeId])

  const [isDataSetOverlayVisible, setIsDataSetOverlayVisible] = useState(false)
  const [isImportDialogVisible, setIsImportDialogVisible] = useState(false)
  const [selectedEntityIndex, setSelectedEntityIndex] = useState(-1)
  const [selectedEntity, setSelectedEntity] = useState<Option<ErpEntity>>(Option.none())
  const [selectedErpNavigationNode, setSelectedErpNavigationNode] = useState<Option<BaseNode>>(Option.none())

  const {sampleCompany, sampleCompanyLoading} = useSampleCompany(sampleCompanyId)

  const dispatch = useDispatch()

  const {
    getEntities,
    getEntity,
    isLoading,
    components,
    customers,
    employees,
    invoices,
    orderItems,
    orders,
    products,
    suppliers,
    componentProducts
  } = useErpEntity(sampleCompanyId)

  const linkRef = createRef<HTMLAnchorElement>()

  const isReadOnly = sampleCompany.map(({publishedAt}) => isDefined(publishedAt) || readOnly).getOrElse(readOnly)

  const currentErpType = useMemo(
    () => selectedErpNavigationNode.flatMap(node => Option.of(navigationIdToType(node.id as ErpNavigationEntryId))),
    [selectedErpNavigationNode.orNull()]
  )

  const currentErpTypeName = useMemo(
    () =>
      selectedErpNavigationNode
        .map(node => erpEntryIdToLabel(node.id as ErpNavigationEntryId, t, sampleCompanyName))
        .getOrElse(""),
    [selectedErpNavigationNode.orNull()]
  )

  const columns = useMemo(() => currentErpType.map(type => getColumnsByType(t, type)), [currentErpType.orNull()])

  const entities = useMemo(() => {
    return currentErpType.map(erpType => {
      switch (erpType) {
        case ErpType.Component:
          return components as Array<ErpEntity>
        case ErpType.Customer:
          return customers as Array<ErpEntity>
        case ErpType.Employee:
          return employees as Array<ErpEntity>
        case ErpType.Invoice:
          return invoices as Array<ErpEntity>
        case ErpType.Order:
          return orders as Array<ErpEntity>
        case ErpType.OrderItem:
          return orderItems as Array<ErpEntity>
        case ErpType.Product:
          return products as Array<ErpEntity>
        case ErpType.Supplier:
          return suppliers as Array<ErpEntity>
        case ErpType.ComponentProduct:
          return componentProducts as Array<ErpEntity>
        default:
          return [] as Array<ErpEntity>
      }
    })
  }, [currentErpType.orNull(), components, customers, employees, invoices, orders, orderItems, products, suppliers])

  useEffect(() => {
    currentErpType.forEach(erpType => getEntities(erpType))
  }, [currentErpType.orNull()])

  const selectErpNavigationNode = (node: BaseNode) => {
    setSelectedErpNavigationNode(Option.of(node))
  }

  return {
    selectErpNavigationNode,
    selectedErpNavigationNode,
    columns,
    dispatch,
    entities,
    isLoading: isLoading || sampleCompanyLoading,
    currentErpTypeName,
    isDataSetOverlayVisible,
    setIsDataSetOverlayVisible,
    selectedEntity,
    setSelectedEntity,
    selectedEntityIndex,
    setSelectedEntityIndex,
    getEntity,
    currentErpType,
    isImportDialogVisible,
    setIsImportDialogVisible,
    linkRef,
    isReadOnly
  }
}
