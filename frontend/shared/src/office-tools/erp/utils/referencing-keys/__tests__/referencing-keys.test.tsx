import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {erpInvoicesMockGraphQl} from "../../../../../../tests/__mocks__"
import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {ErpType} from "../../../../../enums"
import {ErpDataSetAccordion} from "../../../common/erp-data-set-overlay/erp-data-set-accordion/erp-data-set-accordion"
import {getErpReferencingKeyAccordions, GetErpReferencingKeyAccordionsParams} from "../referencing-keys"

const invoicesKeyList = erpInvoicesMockGraphQl.map(mock => mock.id)
const orderItemsKeyList = erpInvoicesMockGraphQl.map(mock => mock.id)

const defaultErpReferencingKeyAccordionsParams: GetErpReferencingKeyAccordionsParams = {
  t: fakeTranslate,
  navigateToEntity: jest.fn(),
  referencingPrimaryKeys: {[ErpType.Invoice]: {id: invoicesKeyList}, [ErpType.OrderItem]: {id: orderItemsKeyList}},
  onCopyAll: jest.fn()
}

describe("referencing-keys", () => {
  describe("getErpReferencingKeyAccordions", () => {
    it("renders correctly", () => {
      const component = create(
        getErpReferencingKeyAccordions(defaultErpReferencingKeyAccordionsParams) as React.ReactElement
      )
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
    it("has correct structure", () => {
      const component = shallow(<div>{getErpReferencingKeyAccordions(defaultErpReferencingKeyAccordionsParams)}</div>)
      expect(component.find(ErpDataSetAccordion)).toHaveLength(2)
    })
  })
})
