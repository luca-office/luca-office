import {shallow} from "enzyme"
import {SpyInstance} from "jest-mock"
import * as React from "react"
import {create} from "react-test-renderer"
import {
  erpCustomersMockGraphQl,
  erpEmployeesMockGraphQl,
  erpInvoicesMockGraphQl,
  erpOrdersMock,
  sampleCompanyIdMock
} from "../../../../../../tests/__mocks__"
import {mockedFormMethods} from "../../../../../../tests/utils/form-methods-mock"
import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {ContentLoadingIndicator, Modal, Overlay, SettingsFooterCard} from "../../../../../components"
import {ErpType} from "../../../../../enums"
import {UseAutoCompleteHook} from "../../../../../hooks"
import * as useAutoCompleteHook from "../../../../../hooks/use-auto-complete"
import {ErpKeyEntity} from "../../../../../models"
import {Option, Subject} from "../../../../../utils"
import {getErpLabel, toErpStackEntity} from "../../../utils"
import {ErpDataSetAccordion} from "../erp-data-set-accordion/erp-data-set-accordion"
import {ErpDataSetOverlay, ErpDataSetOverlayProps} from "../erp-data-set-overlay"
import * as useErpDataSetOverlayHook from "../hooks/use-erp-data-set-overlay"
import {UseErpDataSetOverlayHook, UseErpDataSetOverlayParams} from "../hooks/use-erp-data-set-overlay"

const customerAutoCompleteList = erpCustomersMockGraphQl.map(mock => `${mock.id}`)
const employeeAutoCompleteList = erpEmployeesMockGraphQl.map(mock => `${mock.id}`)
const invoicesKeyList = erpInvoicesMockGraphQl.map(mock => mock.id)
const orderItemsKeyList = erpInvoicesMockGraphQl.map(mock => mock.id)

const erpOrder = erpOrdersMock[0]
const overlayTitle = getErpLabel({
  t: fakeTranslate,
  type: ErpType.Order,
  key: "id",
  foreignKeys: ["customerId", "employeeId"],
  showKeyHints: false
})

const hookValuesDefault: UseErpDataSetOverlayHook = {
  dispatch: jest.fn(),
  currentStackEntity: toErpStackEntity(
    erpOrder,
    [
      {key: "customerId", id: erpOrder.customerId, type: ErpType.Customer},
      {key: "employeeId", id: erpOrder.employeeId, type: ErpType.Employee}
    ] as Array<ErpKeyEntity<typeof erpOrder.type>>,
    0
  ),
  modalTitleStack: [`${overlayTitle} ${erpOrder.id}`],
  formMethods: mockedFormMethods,
  goBack: jest.fn(),
  navigateToEntity: jest.fn(),
  dataLoading: false,
  actionLoading: false,
  updateErpEntity: jest.fn(),
  formValuesChanged: false,
  deleteErpEntity: jest.fn(),
  autoCompleteLists: {[ErpType.Customer]: customerAutoCompleteList, [ErpType.Employee]: employeeAutoCompleteList},
  referencingPrimaryKeys: {[ErpType.Invoice]: {id: invoicesKeyList}, [ErpType.OrderItem]: {id: orderItemsKeyList}},
  currentBinaryFile: Option.none(),
  shouldCreateCurrentEntity: false,
  sectionRef: {current: null},
  sectionScrollSubject: new Subject<void>(),
  scenarioErpSelector: {orderId: erpOrder.id},
  deleteOrlyVisible: false,
  setDeleteOrlyVisible: jest.fn()
}

const stateSpy = jest.spyOn(useErpDataSetOverlayHook, "useErpDataSetOverlay") as unknown as SpyInstance<any>

const autocompleteValuesDefault: UseAutoCompleteHook = {
  setSearchQuery: jest.fn(),
  results: []
}

const autocompleteSpy = jest.spyOn(useAutoCompleteHook, "useAutoComplete")

const defaultProps: ErpDataSetOverlayProps = {
  currentErpType: ErpType.Component,
  sampleCompanyId: sampleCompanyIdMock,
  data: erpOrder,
  getEntity: jest.fn(),
  disabled: false,
  onDismiss: jest.fn(),
  dataIndex: 1
}

const getComponent = (props?: Partial<ErpDataSetOverlayProps>) => <ErpDataSetOverlay {...{...defaultProps, ...props}} />

describe("erp-data-set-overlay", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (disabled)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    autocompleteSpy.mockReturnValue(autocompleteValuesDefault)
    const component = create(getComponent({disabled: true}))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    autocompleteSpy.mockReturnValue(autocompleteValuesDefault)

    const component = shallow(getComponent())

    const overlay = component.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()
    expect(modalContent.find(SettingsFooterCard)).toHaveLength(0)

    const content = modalContent.find(".erp-dataset-content")
    expect(content).toHaveLength(1)

    const primaryKey = modalContent.find(".erp-dataset-primary-key")
    expect(primaryKey).toHaveLength(1)

    const entities = modalContent.find(".erp-dataset-entities")
    expect(entities).toHaveLength(1)

    const copyDataset = modalContent.find(".copy-dataset-to-clipboard")
    expect(copyDataset).toHaveLength(0)

    const loadingIndicator = modalContent.find(ContentLoadingIndicator)
    expect(loadingIndicator).toHaveLength(0)

    const erpDataSetAccordions = modalContent.find(ErpDataSetAccordion)
    expect(erpDataSetAccordions).toHaveLength(0)
  })
  it("has correct structure (loading)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, dataLoading: true})
    autocompleteSpy.mockReturnValue(autocompleteValuesDefault)

    const component = shallow(getComponent())

    const overlay = component.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()
    expect(modalContent.find(SettingsFooterCard)).toHaveLength(0)

    const content = modalContent.find(".erp-dataset-content")
    expect(content).toHaveLength(0)

    const primaryKey = modalContent.find(".erp-dataset-primary-key")
    expect(primaryKey).toHaveLength(0)

    const entities = modalContent.find(".erp-dataset-entities")
    expect(entities).toHaveLength(0)

    const copyDataset = modalContent.find(".copy-dataset-to-clipboard")
    expect(copyDataset).toHaveLength(0)

    const loadingIndicator = modalContent.find(ContentLoadingIndicator)
    expect(loadingIndicator).toHaveLength(1)

    const erpDataSetAccordions = modalContent.find(ErpDataSetAccordion)
    expect(erpDataSetAccordions).toHaveLength(0)
  })
  it("has correct structure (disabled)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    autocompleteSpy.mockReturnValue(autocompleteValuesDefault)

    const component = shallow(getComponent({disabled: true}))

    const overlay = component.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()
    expect(modalContent.find(SettingsFooterCard)).toHaveLength(0)

    const content = modalContent.find(".erp-dataset-content")
    expect(content).toHaveLength(1)

    const primaryKey = modalContent.find(".erp-dataset-primary-key")
    expect(primaryKey).toHaveLength(1)

    const entities = modalContent.find(".erp-dataset-entities")
    expect(entities).toHaveLength(1)

    const copyDataset = modalContent.find(".copy-dataset-to-clipboard")
    expect(copyDataset).toHaveLength(1)

    const loadingIndicator = modalContent.find(ContentLoadingIndicator)
    expect(loadingIndicator).toHaveLength(0)

    const erpDataSetAccordions = modalContent.find(ErpDataSetAccordion)
    expect(erpDataSetAccordions).toHaveLength(2)
  })
  it("triggers dismiss correctly", async () => {
    const onDismissMock = jest.fn()
    stateSpy.mockReturnValue(hookValuesDefault)
    autocompleteSpy.mockReturnValue(autocompleteValuesDefault)

    const component = shallow(getComponent({onDismiss: onDismissMock}))

    const modal = component.find(Overlay).dive().find(Modal)
    expect(modal).toHaveLength(1)

    const onDismissHandler = modal.prop("onDismiss")
    expect(onDismissHandler).toBeDefined()

    onDismissHandler!()
    expect(onDismissMock).toHaveBeenCalledTimes(1)
  })
})
