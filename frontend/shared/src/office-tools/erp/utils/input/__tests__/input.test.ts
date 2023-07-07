import {shallow} from "enzyme"
import {ReactElement} from "react"
import {create} from "react-test-renderer"
import {
  erpComponentsMockGraphQl,
  erpCustomersMockGraphQl,
  erpEmployeesMockGraphQl,
  erpInvoicesMockGraphQl,
  erpOrderItemsMockGraphQl,
  erpOrdersMockGraphQl,
  erpProductsMockGraphQl,
  erpSuppliersMockGraphQl
} from "../../../../../../tests/__mocks__"
import {mockedFormMethods} from "../../../../../../tests/utils/form-methods-mock"
import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {TextInput} from "../../../../../components"
import {ErpType} from "../../../../../enums"
import {Option, Subject} from "../../../../../utils"
import {getErpInput} from "../input"

const sectionScrollSubject = new Subject<void>()

const defaultProps = {
  t: fakeTranslate,
  formMethods: mockedFormMethods,
  dispatch: jest.fn(),
  navigateToEntity: jest.fn()
}

describe("input", () => {
  describe("getErpInput", () => {
    it("ErpComponent: renders correctly", () => {
      const component = create(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.Component,
          foreignKeys: [
            {
              key: "supplierId",
              id: erpComponentsMockGraphQl[0].supplierId,
              type: ErpType.Supplier
            }
          ],
          autoCompleteLists: {[ErpType.Supplier]: erpSuppliersMockGraphQl.map(mock => `${mock.id}`)},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("ErpComponent: has correct structure", () => {
      const component = shallow(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.Component,
          foreignKeys: [
            {
              key: "supplierId",
              id: erpComponentsMockGraphQl[0].supplierId,
              type: ErpType.Supplier
            }
          ],
          autoCompleteLists: {[ErpType.Supplier]: erpSuppliersMockGraphQl.map(mock => `${mock.id}`)},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("ErpCustomer: renders correctly", () => {
      const component = create(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.Customer,
          foreignKeys: [],
          autoCompleteLists: {},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("ErpCustomer: has correct structure", () => {
      const component = shallow(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.Customer,
          foreignKeys: [],
          autoCompleteLists: {},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("ErpEmployee: renders correctly", () => {
      const component = create(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.Employee,
          foreignKeys: [],
          autoCompleteLists: {},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("ErpEmployee: has correct structure", () => {
      const component = shallow(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.Employee,
          foreignKeys: [],
          autoCompleteLists: {},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("ErpInvoice: renders correctly", () => {
      const component = create(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.Invoice,
          foreignKeys: [
            {
              key: "orderId",
              id: erpInvoicesMockGraphQl[0].orderId,
              type: ErpType.Order
            }
          ],
          autoCompleteLists: {[ErpType.Order]: erpOrdersMockGraphQl.map(mock => `${mock.id}`)},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("ErpInvoice: has correct structure", () => {
      const component = shallow(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.Invoice,
          foreignKeys: [
            {
              key: "orderId",
              id: erpInvoicesMockGraphQl[0].orderId,
              type: ErpType.Order
            }
          ],
          autoCompleteLists: {[ErpType.Order]: erpOrdersMockGraphQl.map(mock => `${mock.id}`)},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("ErpOrder: renders correctly", () => {
      const component = create(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.Order,
          foreignKeys: [
            {
              key: "customerId",
              id: erpOrdersMockGraphQl[0].customerId,
              type: ErpType.Customer
            },
            {
              key: "employeeId",
              id: erpOrdersMockGraphQl[0].employeeId,
              type: ErpType.Employee
            }
          ],
          autoCompleteLists: {
            [ErpType.Customer]: erpCustomersMockGraphQl.map(mock => `${mock.id}`),
            [ErpType.Employee]: erpEmployeesMockGraphQl.map(mock => `${mock.id}`)
          },
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("ErpOrder: has correct structure", () => {
      const component = shallow(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.Order,
          foreignKeys: [
            {
              key: "customerId",
              id: erpOrdersMockGraphQl[0].customerId,
              type: ErpType.Customer
            },
            {
              key: "employeeId",
              id: erpOrdersMockGraphQl[0].employeeId,
              type: ErpType.Employee
            }
          ],
          autoCompleteLists: {
            [ErpType.Customer]: erpCustomersMockGraphQl.map(mock => `${mock.id}`),
            [ErpType.Employee]: erpEmployeesMockGraphQl.map(mock => `${mock.id}`)
          },
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("ErpOrderItem: renders correctly", () => {
      const component = create(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.OrderItem,
          foreignKeys: [
            {
              key: "orderId",
              id: erpOrderItemsMockGraphQl[0].orderId,
              type: ErpType.Order
            },
            {
              key: "productId",
              id: erpOrderItemsMockGraphQl[0].productId,
              type: ErpType.Product
            }
          ],
          autoCompleteLists: {
            [ErpType.Order]: erpOrdersMockGraphQl.map(mock => `${mock.id}`),
            [ErpType.Product]: erpProductsMockGraphQl.map(mock => `${mock.id}`)
          },
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("ErpOrderItem: has correct structure", () => {
      const component = shallow(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.OrderItem,
          foreignKeys: [
            {
              key: "orderId",
              id: erpOrderItemsMockGraphQl[0].orderId,
              type: ErpType.Order
            },
            {
              key: "productId",
              id: erpOrderItemsMockGraphQl[0].productId,
              type: ErpType.Product
            }
          ],
          autoCompleteLists: {
            [ErpType.Order]: erpOrdersMockGraphQl.map(mock => `${mock.id}`),
            [ErpType.Product]: erpProductsMockGraphQl.map(mock => `${mock.id}`)
          },
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("ErpProduct: renders correctly", () => {
      const component = create(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.Product,
          foreignKeys: [],
          autoCompleteLists: {},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("ErpProduct: has correct structure", () => {
      const component = shallow(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.Product,
          foreignKeys: [],
          autoCompleteLists: {},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("ErpSupplier: renders correctly", () => {
      const component = create(
        getErpInput({
          ...defaultProps,

          key: "id",
          type: ErpType.Supplier,
          foreignKeys: [],
          autoCompleteLists: {},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("ErpSupplier: has correct structure", () => {
      const component = shallow(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.Supplier,
          foreignKeys: [],
          dispatch: jest.fn(),
          autoCompleteLists: {},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
    it("ErpComponentErpProduct: renders correctly", () => {
      const component = create(
        getErpInput({
          ...defaultProps,
          key: "id",
          type: ErpType.ComponentProduct,
          foreignKeys: [],
          autoCompleteLists: {},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("ErpComponentErpProduct: has correct structure", () => {
      const component = shallow(
        getErpInput({
          ...defaultProps,
          key: "componentId",
          type: ErpType.ComponentProduct,
          foreignKeys: [],
          autoCompleteLists: {},
          binaryFile: Option.none(),
          sectionScrollSubject
        }) as ReactElement
      )
      expect(component.find(TextInput)).toHaveLength(1)
    })
  })
})
