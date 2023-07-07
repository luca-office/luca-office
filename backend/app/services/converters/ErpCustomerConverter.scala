package services.converters

import database.generated.public.ErpCustomer
import models.ErpCustomerCreation

object ErpCustomerConverter {

  def toErpCustomer(creation: ErpCustomerCreation, id: Int): ErpCustomer =
    ErpCustomer(
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

  def toErpCustomerCreation(erpCustomer: ErpCustomer): ErpCustomerCreation =
    ErpCustomerCreation(
      salutation = erpCustomer.salutation,
      firstName = erpCustomer.firstName,
      lastName = erpCustomer.lastName,
      company = erpCustomer.company,
      addressLine = erpCustomer.addressLine,
      postalCode = erpCustomer.postalCode,
      city = erpCustomer.city,
      country = erpCustomer.country,
      email = erpCustomer.email,
      phone = erpCustomer.phone,
      note = erpCustomer.note,
      binaryFileId = erpCustomer.binaryFileId,
      sampleCompanyId = erpCustomer.sampleCompanyId
    )
}
