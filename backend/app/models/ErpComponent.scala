package models

import java.util.UUID

case class ErpComponentCreation(
    name: String,
    category: String,
    purchasingPriceInCents: Int,
    margin: BigDecimal,
    packSize: Int,
    availableStock: Int,
    stockCostPerUnitInCents: Int,
    stockCostTotalInCents: Int,
    note: Option[String],
    unit: String,
    supplierId: Int,
    binaryFileId: Option[UUID],
    sampleCompanyId: UUID
)

case class ErpComponentUpdate(
    name: String,
    category: String,
    purchasingPriceInCents: Int,
    margin: BigDecimal,
    packSize: Int,
    availableStock: Int,
    stockCostPerUnitInCents: Int,
    stockCostTotalInCents: Int,
    note: Option[String],
    unit: String,
    supplierId: Int,
    binaryFileId: Option[UUID]
)
