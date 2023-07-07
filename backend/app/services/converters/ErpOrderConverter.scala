package services.converters

import database.generated.public.ErpOrder
import models.ErpOrderCreation

object ErpOrderConverter {

  def toErpOrder(creation: ErpOrderCreation, id: Int): ErpOrder =
    ErpOrder(
      id = id,
      cashbackInCents = creation.cashbackInCents,
      discountInCents = creation.discountInCents,
      deliveryChargeInCents = creation.deliveryChargeInCents,
      deliveryStatus = creation.deliveryStatus,
      deliveryDate = creation.deliveryDate,
      note = creation.note,
      customerId = creation.customerId,
      employeeId = creation.employeeId,
      binaryFileId = creation.binaryFileId,
      sampleCompanyId = creation.sampleCompanyId
    )

  def toErpOrderCreation(erpOrder: ErpOrder): ErpOrderCreation =
    ErpOrderCreation(
      cashbackInCents = erpOrder.cashbackInCents,
      discountInCents = erpOrder.discountInCents,
      deliveryChargeInCents = erpOrder.deliveryChargeInCents,
      deliveryStatus = erpOrder.deliveryStatus,
      deliveryDate = erpOrder.deliveryDate,
      note = erpOrder.note,
      customerId = erpOrder.customerId,
      employeeId = erpOrder.employeeId,
      binaryFileId = erpOrder.binaryFileId,
      sampleCompanyId = erpOrder.sampleCompanyId
    )
}
