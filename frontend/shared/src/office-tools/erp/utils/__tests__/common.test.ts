import {
  erpComponentsMockGraphQl,
  erpInvoicesMock,
  erpInvoicesMockGraphQl,
  erpOrderItemsMock,
  erpProductsMock
} from "../../../../../tests/__mocks__"
import {fakeTranslate} from "../../../../../tests/utils/translate-mock"
import {ErpType} from "../../../../enums"
import {
  DeliveryStatus,
  EmploymentMode,
  FamilyStatus,
  PaymentStatus,
  Salutation
} from "../../../../graphql/generated/globalTypes"
import {ErpKeyEntity} from "../../../../models"
import {
  getDeliveryStatusLabel,
  getEmploymentModeLabel,
  getFamilyStatusLabel,
  getForeignKeys,
  getPaymentStatusLabel,
  getSalutationLabel,
  isForeignKey,
  toErpStackEntity
} from "../common"

describe("common", () => {
  describe("getForeignKeys", () => {
    it("handles empty array", () => {
      expect(getForeignKeys([])).toEqual([])
    })

    it("creates foreign-keys list", () => {
      expect(
        getForeignKeys<ErpType.Component>([
          {
            key: "supplierId",
            type: ErpType.Supplier,
            id: erpComponentsMockGraphQl[0].supplierId
          }
        ])
      ).toEqual(["supplierId"])
      expect(
        getForeignKeys<ErpType.Invoice>([
          {
            key: "orderId",
            type: ErpType.Order,
            id: erpInvoicesMockGraphQl[0].orderId
          }
        ])
      ).toEqual(["orderId"])
    })

    describe("isForeignKey", () => {
      it("recognizes other key", () => {
        expect(isForeignKey<ErpType.Invoice>(["orderId"], "id")).toBe(false)
      })
      it("recognizes foreign key", () => {
        expect(isForeignKey<ErpType.Invoice>(["orderId"], "orderId")).toBe(true)
      })
    })

    describe("getSalutationLabel", () => {
      it("returns label for Salutation.Mr", () => {
        expect(getSalutationLabel(fakeTranslate, Salutation.Mr)).toEqual("erp__salutation_label_mr")
      })
      it("returns label for Salutation.Mrs", () => {
        expect(getSalutationLabel(fakeTranslate, Salutation.Mrs)).toEqual("erp__salutation_label_mrs")
      })
    })

    describe("getEmploymentModeLabel", () => {
      it("returns label for EmploymentMode.Assistance", () => {
        expect(getEmploymentModeLabel(fakeTranslate, EmploymentMode.Assistance)).toEqual(
          "erp__employment_mode_label_assistance"
        )
      })
      it("returns label for EmploymentMode.FullTime", () => {
        expect(getEmploymentModeLabel(fakeTranslate, EmploymentMode.FullTime)).toEqual(
          "erp__employment_mode_label_full_time"
        )
      })
      it("returns label for EmploymentMode.PartTime", () => {
        expect(getEmploymentModeLabel(fakeTranslate, EmploymentMode.PartTime)).toEqual(
          "erp__employment_mode_label_part_time"
        )
      })
      it("returns label for EmploymentMode.Student", () => {
        expect(getEmploymentModeLabel(fakeTranslate, EmploymentMode.Student)).toEqual(
          "erp__employment_mode_label_student"
        )
      })
    })

    describe("getFamilyStatusLabel", () => {
      it("returns label for FamilyStatus.Divorced", () => {
        expect(getFamilyStatusLabel(fakeTranslate, FamilyStatus.Divorced)).toEqual("erp__family_status_label_divorced")
      })
      it("returns label for FamilyStatus.Married", () => {
        expect(getFamilyStatusLabel(fakeTranslate, FamilyStatus.Married)).toEqual("erp__family_status_label_married")
      })
      it("returns label for FamilyStatus.Single", () => {
        expect(getFamilyStatusLabel(fakeTranslate, FamilyStatus.Single)).toEqual("erp__family_status_label_single")
      })
    })

    describe("getPaymentStatusLabel", () => {
      it("returns label for PaymentStatus.Paid", () => {
        expect(getPaymentStatusLabel(fakeTranslate, PaymentStatus.Paid)).toEqual("erp__payment_status_label_paid")
      })
      it("returns label for PaymentStatus.Unpaid", () => {
        expect(getPaymentStatusLabel(fakeTranslate, PaymentStatus.Unpaid)).toEqual("erp__payment_status_label_unpaid")
      })
    })

    describe("getDeliveryStatusLabel", () => {
      it("returns label for DeliveryStatus.Completed", () => {
        expect(getDeliveryStatusLabel(fakeTranslate, DeliveryStatus.Completed)).toEqual(
          "erp__delivery_status_label_completed"
        )
      })
      it("returns label for DeliveryStatus.InProcess", () => {
        expect(getDeliveryStatusLabel(fakeTranslate, DeliveryStatus.InProcess)).toEqual(
          "erp__delivery_status_label_in_process"
        )
      })
    })

    describe("toErpStackEntity", () => {
      it("creates stack entity with single foreign key", () => {
        expect(
          toErpStackEntity(
            erpInvoicesMock[0],
            [{key: "orderId", id: erpInvoicesMock[0].orderId, type: ErpType.Order}] as Array<
              ErpKeyEntity<ErpType.Invoice>
            >,
            0
          )
        ).toEqual({
          data: erpInvoicesMock[0],
          foreignKeys: [{key: "orderId", id: erpInvoicesMock[0].orderId, type: ErpType.Order}],
          index: 0
        })
      })
      it("creates stack entity with multiple foreign keys", () => {
        expect(
          toErpStackEntity(
            erpOrderItemsMock[0],
            [
              {key: "orderId", id: erpOrderItemsMock[0].orderId, type: ErpType.Order},
              {key: "productId", id: erpOrderItemsMock[0].productId, type: ErpType.Product}
            ] as Array<ErpKeyEntity<ErpType.OrderItem>>,
            0
          )
        ).toEqual({
          data: erpOrderItemsMock[0],
          foreignKeys: [
            {key: "orderId", id: erpOrderItemsMock[0].orderId, type: ErpType.Order},
            {key: "productId", id: erpOrderItemsMock[0].orderId, type: ErpType.Product}
          ],
          index: 0
        })
      })
      it("creates stack entity without foreign keys", () => {
        expect(toErpStackEntity(erpProductsMock[0], [], 0)).toEqual({
          data: erpProductsMock[0],
          foreignKeys: [],
          index: 0
        })
      })
    })
  })
})
