package services.converters

import database.generated.public.ErpEmployee
import models.ErpEmployeeCreation

object ErpEmployeeConverter {

  def toErpEmployee(creation: ErpEmployeeCreation, id: Int): ErpEmployee =
    ErpEmployee(
      id = id,
      salutation = creation.salutation,
      firstName = creation.firstName,
      lastName = creation.lastName,
      addressLine = creation.addressLine,
      postalCode = creation.postalCode,
      city = creation.city,
      country = creation.country,
      email = creation.email,
      phone = creation.phone,
      department = creation.department,
      jobTitle = creation.jobTitle,
      employmentMode = creation.employmentMode,
      employedAt = creation.employedAt,
      employmentEndsAt = creation.employmentEndsAt,
      site = creation.site,
      graduation = creation.graduation,
      furtherEducation = creation.furtherEducation,
      taxClass = creation.taxClass,
      familyStatus = creation.familyStatus,
      childCount = creation.childCount,
      note = creation.note,
      binaryFileId = creation.binaryFileId,
      sampleCompanyId = creation.sampleCompanyId
    )

  def toErpEmployeeCreation(erpEmployee: ErpEmployee): ErpEmployeeCreation =
    ErpEmployeeCreation(
      salutation = erpEmployee.salutation,
      firstName = erpEmployee.firstName,
      lastName = erpEmployee.lastName,
      addressLine = erpEmployee.addressLine,
      postalCode = erpEmployee.postalCode,
      city = erpEmployee.city,
      country = erpEmployee.country,
      email = erpEmployee.email,
      phone = erpEmployee.phone,
      department = erpEmployee.department,
      jobTitle = erpEmployee.jobTitle,
      employmentMode = erpEmployee.employmentMode,
      employedAt = erpEmployee.employedAt,
      employmentEndsAt = erpEmployee.employmentEndsAt,
      site = erpEmployee.site,
      graduation = erpEmployee.graduation,
      furtherEducation = erpEmployee.furtherEducation,
      taxClass = erpEmployee.taxClass,
      familyStatus = erpEmployee.familyStatus,
      childCount = erpEmployee.childCount,
      note = erpEmployee.note,
      binaryFileId = erpEmployee.binaryFileId,
      sampleCompanyId = erpEmployee.sampleCompanyId
    )
}
