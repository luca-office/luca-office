package services.converters

import database.generated.public.ErpProduct
import models.ErpProductCreation

object ErpProductConverter {

  def toErpProduct(creation: ErpProductCreation, id: Int): ErpProduct =
    ErpProduct(
      id = id,
      name = creation.name,
      netPriceInCents = creation.netPriceInCents,
      taxRate = creation.taxRate,
      packSize = creation.packSize,
      availableStock = creation.availableStock,
      stockCostPerUnitInCents = creation.stockCostPerUnitInCents,
      stockCostTotalInCents = creation.stockCostTotalInCents,
      note = creation.note,
      unit = creation.unit,
      binaryFileId = creation.binaryFileId,
      sampleCompanyId = creation.sampleCompanyId
    )

  def toErpProductCreation(creation: ErpProduct): ErpProductCreation =
    ErpProductCreation(
      name = creation.name,
      netPriceInCents = creation.netPriceInCents,
      taxRate = creation.taxRate,
      packSize = creation.packSize,
      availableStock = creation.availableStock,
      stockCostPerUnitInCents = creation.stockCostPerUnitInCents,
      stockCostTotalInCents = creation.stockCostTotalInCents,
      note = creation.note,
      unit = creation.unit,
      binaryFileId = creation.binaryFileId,
      sampleCompanyId = creation.sampleCompanyId
    )
}
