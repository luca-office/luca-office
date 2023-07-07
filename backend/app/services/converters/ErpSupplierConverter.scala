package services.converters

import database.generated.public.ErpSupplier
import models.ErpSupplierCreation

object ErpSupplierConverter {

  def toErpSupplier(creation: ErpSupplierCreation, id: Int): ErpSupplier =
    ErpSupplier(
      id = id,
      salutation = creation.salutation,
      firstName = creation.firstName,
      lastName = creation.lastName,
      company = creation.company,
      addressLine = creation.addressLine,
      postalCode = creation.postalCode,
      city = creation.city,
      country = creation.country,
      email = creation.email,
      phone = creation.phone,
      note = creation.note,
      binaryFileId = creation.binaryFileId,
      sampleCompanyId = creation.sampleCompanyId
    )

  def toErpSupplierCreation(creation: ErpSupplier): ErpSupplierCreation =
    ErpSupplierCreation(
      salutation = creation.salutation,
      firstName = creation.firstName,
      lastName = creation.lastName,
      company = creation.company,
      addressLine = creation.addressLine,
      postalCode = creation.postalCode,
      city = creation.city,
      country = creation.country,
      email = creation.email,
      phone = creation.phone,
      note = creation.note,
      binaryFileId = creation.binaryFileId,
      sampleCompanyId = creation.sampleCompanyId
    )
}
