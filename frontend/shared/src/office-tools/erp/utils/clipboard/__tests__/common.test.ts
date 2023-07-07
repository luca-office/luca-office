import {erpOrderItemsMockGraphQl} from "../../../../../../tests/__mocks__"
import {ErpOrderItemFragment} from "../../../../../graphql/generated/ErpOrderItemFragment"
import {toDataString} from "../common"

describe("common", () => {
  describe("toDataString", () => {
    it("correctly creates data string", () => {
      expect(toDataString<ErpOrderItemFragment>(erpOrderItemsMockGraphQl[0])).toEqual(
        `__typename:ErpOrderItem;id:${erpOrderItemsMockGraphQl[0].id};quantity:${erpOrderItemsMockGraphQl[0].quantity};totalNetInCents:${erpOrderItemsMockGraphQl[0].totalNetInCents};sampleCompanyId:${erpOrderItemsMockGraphQl[0].sampleCompanyId};orderId:${erpOrderItemsMockGraphQl[0].orderId};productId:${erpOrderItemsMockGraphQl[0].productId};binaryFileId:${erpOrderItemsMockGraphQl[0].binaryFileId};binaryFile:${erpOrderItemsMockGraphQl[0].binaryFile}`
      )
    })
  })
})
