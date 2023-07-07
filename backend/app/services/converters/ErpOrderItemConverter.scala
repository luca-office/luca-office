package services.converters

import database.generated.public.ErpOrderItem
import models.ErpOrderItemCreation

object ErpOrderItemConverter {

  def toErpOrderItem(creation: ErpOrderItemCreation, id: Int): ErpOrderItem =
    ErpOrderItem(
      id = id,
      quantity = creation.quantity,
      totalNetInCents = creation.totalNetInCents,
      orderId = creation.orderId,
      productId = creation.productId,
      binaryFileId = creation.binaryFileId,
      sampleCompanyId = creation.sampleCompanyId
    )

  def toErpOrderItemCreation(creation: ErpOrderItem): ErpOrderItemCreation =
    ErpOrderItemCreation(
      quantity = creation.quantity,
      totalNetInCents = creation.totalNetInCents,
      orderId = creation.orderId,
      productId = creation.productId,
      binaryFileId = creation.binaryFileId,
      sampleCompanyId = creation.sampleCompanyId
    )
}
