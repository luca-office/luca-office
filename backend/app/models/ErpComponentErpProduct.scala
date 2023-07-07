package models

import java.util.UUID

case class ErpComponentErpProductCreation(
    componentId: Int,
    productId: Int,
    quantity: Int,
    sampleCompanyId: UUID
)

case class ErpComponentErpProductUpdate(
    quantity: Int
)
