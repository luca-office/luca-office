package services.converters

import database.generated.public.ErpComponentErpProduct
import models.ErpComponentErpProductCreation

object ErpComponentErpProductConverter {

  def toErpComponentErpProduct(creation: ErpComponentErpProductCreation): ErpComponentErpProduct =
    ErpComponentErpProduct(
      id = -1,
      componentId = creation.componentId,
      productId = creation.productId,
      quantity = creation.quantity,
      sampleCompanyId = creation.sampleCompanyId
    )
}
