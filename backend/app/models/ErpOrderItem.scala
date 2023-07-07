package models

import java.util.UUID

case class ErpOrderItemCreation(
    quantity: Int,
    totalNetInCents: Int,
    orderId: Int,
    productId: Int,
    binaryFileId: Option[UUID],
    sampleCompanyId: UUID,
)

case class ErpOrderItemUpdate(
    quantity: Int,
    totalNetInCents: Int,
    binaryFileId: Option[UUID]
)
