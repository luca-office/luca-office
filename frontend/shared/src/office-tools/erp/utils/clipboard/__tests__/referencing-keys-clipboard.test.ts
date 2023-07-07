import {erpComponentErpProductsMockGraphQl, erpOrdersMockGraphQl} from "../../../../../../tests/__mocks__"
import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {getReferencingKeysClipboardString} from "../referencing-keys-clipboard"

const simpleReferencingKeys = {id: erpOrdersMockGraphQl.map(({id}) => id)}
const multipleReferencingKeys = erpComponentErpProductsMockGraphQl.reduce(
  (accumulator, {componentId, productId}) => ({
    componentId: [...accumulator.componentId, componentId],
    productId: [...accumulator.productId, productId]
  }),
  {componentId: [] as number[], productId: [] as number[]}
)

describe("referencing-keys-clipboard", () => {
  describe("getReferencingKeysClipboardString", () => {
    it("gets clipboard string for simple referencing keys", () => {
      expect(getReferencingKeysClipboardString(fakeTranslate, simpleReferencingKeys)).toEqual(
        `erp_dataset__foreign_key:{erp__table_label_id: [${simpleReferencingKeys.id.join(", ")}]}`
      )
    })
    it("gets clipboard string for multiple referencing keys", () => {
      expect(getReferencingKeysClipboardString(fakeTranslate, multipleReferencingKeys)).toEqual(
        `erp_dataset__foreign_key:{erp__table_label_component_id,erp__table_label_product_id: [${multipleReferencingKeys.componentId[0]},${multipleReferencingKeys.productId[0]}], [${multipleReferencingKeys.componentId[1]},${multipleReferencingKeys.productId[1]}], [${multipleReferencingKeys.componentId[2]},${multipleReferencingKeys.productId[2]}]}`
      )
    })
  })
})
