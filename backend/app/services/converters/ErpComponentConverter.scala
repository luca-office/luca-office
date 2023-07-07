package services.converters

import database.generated.public.ErpComponent
import models.ErpComponentCreation

object ErpComponentConverter {

  def toErpComponent(creation: ErpComponentCreation, id: Int): ErpComponent =
    ErpComponent(
      id = id,
      name = creation.name,
      category = creation.category,
      purchasingPriceInCents = creation.purchasingPriceInCents,
      margin = creation.margin,
      packSize = creation.packSize,
      availableStock = creation.availableStock,
      stockCostPerUnitInCents = creation.stockCostPerUnitInCents,
      stockCostTotalInCents = creation.stockCostTotalInCents,
      unit = creation.unit,
      note = creation.note,
      binaryFileId = creation.binaryFileId,
      supplierId = creation.supplierId,
      sampleCompanyId = creation.sampleCompanyId
    )

  def toErpComponentCreation(erpComponent: ErpComponent): ErpComponentCreation =
    ErpComponentCreation(
      name = erpComponent.name,
      category = erpComponent.category,
      purchasingPriceInCents = erpComponent.purchasingPriceInCents,
      margin = erpComponent.margin,
      packSize = erpComponent.packSize,
      availableStock = erpComponent.availableStock,
      stockCostPerUnitInCents = erpComponent.stockCostPerUnitInCents,
      stockCostTotalInCents = erpComponent.stockCostTotalInCents,
      note = erpComponent.note,
      unit = erpComponent.unit,
      supplierId = erpComponent.supplierId,
      binaryFileId = erpComponent.binaryFileId,
      sampleCompanyId = erpComponent.sampleCompanyId
    )
}
