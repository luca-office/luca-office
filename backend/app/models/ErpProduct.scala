package models

import java.util.UUID

case class ErpProductCreation(
    name: String,
    netPriceInCents: Int,
    taxRate: BigDecimal,
    packSize: Int,
    availableStock: Int,
    stockCostPerUnitInCents: Int,
    stockCostTotalInCents: Int,
    unit: String,
    note: Option[String],
    binaryFileId: Option[UUID],
    sampleCompanyId: UUID
)

case class ErpProductUpdate(
    name: String,
    netPriceInCents: Int,
    taxRate: BigDecimal,
    packSize: Int,
    availableStock: Int,
    stockCostPerUnitInCents: Int,
    stockCostTotalInCents: Int,
    unit: String,
    note: Option[String],
    binaryFileId: Option[UUID]
)
