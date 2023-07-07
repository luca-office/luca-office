package utils

import database.generated.public._
import enums.DeliveryStatus.{Completed, InProcess}
import enums.EmploymentMode.{Assistance, FullTime, PartTime, Student}
import enums.FamilyStatus.{Divorced, Married, Single}
import enums.PaymentStatus.{Paid, Unpaid}
import enums.Salutation.{Mr, Mrs, NonBinary}
import enums._
import services.ErpData
import utils.ErpImportExportConfig._
import utils.Excel.{ExcelFile, ExcelFileRow}

import java.time.Instant
import java.util.UUID
import scala.util.{Failure, Try}

object ErpImport {

  def importFile(sampleCompanyId: UUID, excelFile: ExcelFile): Try[ErpData] =
    findRows(excelFile) match {
      case Some(
            (
              componentRows,
              componentProductRows,
              customerRows,
              employeeRows,
              invoiceRows,
              orderItemRows,
              orderRows,
              productRows,
              supplierRows)) =>
        Try {
          ErpData(
            createComponents(componentRows, sampleCompanyId),
            createComponentProducts(componentProductRows, sampleCompanyId),
            createCustomers(customerRows, sampleCompanyId),
            createEmployees(employeeRows, sampleCompanyId),
            createInvoices(invoiceRows, sampleCompanyId),
            createOrderItems(orderItemRows, sampleCompanyId),
            createOrders(orderRows, sampleCompanyId),
            createProducts(productRows, sampleCompanyId),
            createSuppliers(supplierRows, sampleCompanyId)
          )
        }

      case _ =>
        Failure(new Throwable("Could not find all mandatory sheets"))
    }

  private def findSheetAndRows(sheetName: String, excelFile: ExcelFile) =
    excelFile.sheets
      .find(sheet => sheetNameMapping.get(sheetName).exists(sheetNames => sheetNames.contains(sheet.name)))
      .flatMap(sheet => Some(sheet.rows.drop(1)))

  private def findRows(excelFile: ExcelFile) =
    for {
      componentRows <- findSheetAndRows(componentSheetName, excelFile)
      componentProductRows <- findSheetAndRows(componentProductSheetName, excelFile)
      customerRows <- findSheetAndRows(customerSheetName, excelFile)
      employeeRows <- findSheetAndRows(employeeSheetName, excelFile)
      invoiceRows <- findSheetAndRows(invoiceSheetName, excelFile)
      orderItemRows <- findSheetAndRows(orderItemSheetName, excelFile)
      orderRows <- findSheetAndRows(orderSheetName, excelFile)
      productRows <- findSheetAndRows(productSheetName, excelFile)
      supplierRows <- findSheetAndRows(supplierSheetName, excelFile)
    } yield (
      componentRows,
      componentProductRows,
      customerRows,
      employeeRows,
      invoiceRows,
      orderItemRows,
      orderRows,
      productRows,
      supplierRows
    )

  private def createComponents(rows: Seq[ExcelFileRow], sampleCompanyId: UUID) =
    rows.map { row =>
      val values = row.cells.map(_.value)
      val Seq(
        id,
        category,
        name,
        purchasingPriceInCents,
        margin,
        packSize,
        unit,
        availableStock,
        stockCostPerUnit,
        stockCostTotal,
        note,
        supplierId,
        _*) = values

      ErpComponent(
        id = parseId(id),
        name = name,
        category = category,
        purchasingPriceInCents = parseMoney(purchasingPriceInCents),
        margin = parseBigDecimal(margin),
        packSize = parseInt(packSize),
        availableStock = parseInt(availableStock),
        stockCostPerUnitInCents = parseMoney(stockCostPerUnit),
        stockCostTotalInCents = parseMoney(stockCostTotal),
        unit = unit,
        note = Some(note).filter(_.nonEmpty),
        supplierId = parseId(supplierId),
        binaryFileId = None,
        sampleCompanyId = sampleCompanyId
      )
    }

  private def createComponentProducts(rows: Seq[ExcelFileRow], sampleCompanyId: UUID) =
    rows.map { row =>
      val values = row.cells.map(_.value)
      val Seq(productId, componentId, quantity, _*) = values
      ErpComponentErpProduct(
        id = -1,
        quantity = parseInt(quantity),
        productId = parseId(productId),
        componentId = parseId(componentId),
        sampleCompanyId = sampleCompanyId
      )
    }

  private def createCustomers(rows: Seq[ExcelFileRow], sampleCompanyId: UUID) =
    rows.map { row =>
      val values = row.cells.map(_.value)
      val Seq(
        id,
        salutation,
        firstName,
        lastName,
        company,
        addressLine,
        postalCode,
        city,
        country,
        phone,
        email,
        tail @ _*) =
        values
      ErpCustomer(
        id = parseId(id),
        salutation = parseSalutation(salutation, customerSheetName),
        firstName = firstName,
        lastName = lastName,
        company = Some(company).filter(_.nonEmpty),
        addressLine = addressLine,
        postalCode = postalCode,
        city = city,
        country = country,
        phone = Some(phone).filter(_.nonEmpty),
        email = Some(email).filter(_.nonEmpty),
        note = tail.headOption.filter(_.nonEmpty),
        binaryFileId = None,
        sampleCompanyId = sampleCompanyId
      )
    }

  private def createEmployees(rows: Seq[ExcelFileRow], sampleCompanyId: UUID) =
    rows.map { row =>
      val values = row.cells.map(_.value)
      val Seq(
        id,
        salutation,
        firstName,
        lastName,
        addressLine,
        postalCode,
        city,
        country,
        email,
        phone,
        department,
        jobTitle,
        employmentMode,
        employedAt,
        employmentEndsAt,
        site,
        graduation,
        furtherEducation,
        taxClass,
        familyStatus,
        tail @ _*
      ) = values
      ErpEmployee(
        id = parseId(id),
        salutation = parseSalutation(salutation, employeeSheetName),
        firstName = firstName,
        lastName = lastName,
        addressLine = addressLine,
        postalCode = postalCode,
        city = city,
        country = country,
        email = Some(email).filter(_.nonEmpty),
        phone = Some(phone).filter(_.nonEmpty),
        department = department,
        jobTitle = jobTitle,
        employmentMode = parseEmploymentMode(employmentMode),
        employedAt = parseDate(employedAt),
        employmentEndsAt = Some(employmentEndsAt).filter(_.nonEmpty).map(parseDate),
        site = site,
        graduation = Some(graduation).filter(_.nonEmpty),
        furtherEducation = furtherEducation.split(",").toSeq.map(_.trim),
        taxClass = taxClass,
        familyStatus = parseFamilyStatus(familyStatus),
        childCount = tail.headOption.filter(_.nonEmpty).map(parseInt),
        note = tail.lift(1).filter(_.nonEmpty),
        binaryFileId = None,
        sampleCompanyId = sampleCompanyId
      )
    }

  private def createInvoices(rows: Seq[ExcelFileRow], sampleCompanyId: UUID) =
    rows.map { row =>
      val values = row.cells.map(_.value)
      val Seq(
        id,
        invoiceDate,
        paymentTerms,
        totalNet,
        taxAmount,
        totalGross,
        dueDate,
        amountPaid,
        paymentStatus,
        reminderFee,
        defaultCharges,
        note,
        orderId,
        _*) = values
      ErpInvoice(
        id = parseId(id),
        invoiceDate = parseDate(invoiceDate),
        dueDate = parseDate(dueDate),
        paymentTerms = paymentTerms,
        totalNetInCents = parseMoney(totalNet),
        totalGrossInCents = parseMoney(totalGross),
        taxAmountInCents = parseMoney(taxAmount),
        amountPaidInCents = Some(amountPaid).filter(_.nonEmpty).map(parseMoney),
        paymentStatus = parsePaymentStatus(paymentStatus),
        reminderFeeInCents = Some(reminderFee).filter(_.nonEmpty).map(parseMoney),
        defaultChargesInCents = Some(defaultCharges).filter(_.nonEmpty).map(parseMoney),
        note = Some(note).filter(_.nonEmpty),
        orderId = parseId(orderId),
        binaryFileId = None,
        sampleCompanyId = sampleCompanyId
      )
    }

  private def createOrderItems(rows: Seq[ExcelFileRow], sampleCompanyId: UUID) =
    rows.map { row =>
      val values = row.cells.map(_.value)
      val Seq(id, quantity, totalNet, orderId, productId, _*) = values
      ErpOrderItem(
        id = parseId(id),
        quantity = parseInt(quantity),
        totalNetInCents = parseMoney(totalNet),
        orderId = parseId(orderId),
        productId = parseId(productId),
        binaryFileId = None,
        sampleCompanyId = sampleCompanyId
      )
    }

  private def createOrders(rows: Seq[ExcelFileRow], sampleCompanyId: UUID) =
    rows.map { row =>
      val values = row.cells.map(_.value)
      val Seq(
        id,
        cashbackInCents,
        discountInCents,
        deliveryChargeInCents,
        deliveryStatus,
        deliveryDate,
        note,
        customerId,
        employeeId,
        _*) = values

      ErpOrder(
        id = parseId(id),
        cashbackInCents = Some(cashbackInCents).filter(_.nonEmpty).map(parseMoney),
        discountInCents = Some(discountInCents).filter(_.nonEmpty).map(parseMoney),
        deliveryChargeInCents = parseMoney(deliveryChargeInCents),
        deliveryStatus = parseDeliveryStatus(deliveryStatus),
        deliveryDate = parseDate(deliveryDate),
        note = Some(note).filter(_.nonEmpty),
        customerId = parseId(customerId),
        employeeId = parseId(employeeId),
        binaryFileId = None,
        sampleCompanyId = sampleCompanyId
      )
    }

  private def createProducts(rows: Seq[ExcelFileRow], sampleCompanyId: UUID) =
    rows.map { row =>
      val values = row.cells.map(_.value)
      val Seq(
        id,
        name,
        netPriceInCents,
        taxRate,
        packSize,
        unit,
        availableStock,
        stockCostPerUnitInCents,
        stockCostTotalInCents,
        tail @ _*) = values
      ErpProduct(
        id = parseId(id),
        name = name,
        netPriceInCents = parseMoney(netPriceInCents),
        taxRate = parseBigDecimal(taxRate),
        packSize = parseInt(packSize),
        unit = unit,
        availableStock = parseInt(availableStock),
        stockCostPerUnitInCents = parseMoney(stockCostPerUnitInCents),
        stockCostTotalInCents = parseMoney(stockCostTotalInCents),
        note = tail.headOption.filter(_.nonEmpty),
        binaryFileId = None,
        sampleCompanyId = sampleCompanyId
      )
    }

  private def createSuppliers(rows: Seq[ExcelFileRow], sampleCompanyId: UUID) =
    rows.map { row =>
      val values = row.cells.map(_.value)
      val Seq(
        id,
        company,
        postalCode,
        city,
        addressLine,
        country,
        salutation,
        firstName,
        lastName,
        phone,
        email,
        tail @ _*) =
        values
      ErpSupplier(
        id = parseId(id),
        company = company,
        postalCode = postalCode,
        city = city,
        addressLine = addressLine,
        country = country,
        salutation = parseSalutation(salutation, supplierSheetName),
        firstName = firstName,
        lastName = lastName,
        phone = phone,
        email = email,
        note = tail.headOption.filter(_.nonEmpty),
        binaryFileId = None,
        sampleCompanyId = sampleCompanyId
      )
    }

  private def parseInt(value: String): Int = value.toDouble.toInt

  private def parseBigDecimal(value: String): BigDecimal = BigDecimal(value.toDouble)

  private def parseId(value: String): Int = parseInt(value)

  private def parseMoney(value: String): Int = (value.toDouble * 100).toInt

  private def parseDate(value: String): Instant = DateUtils.parseExcelDate(value)

  private def parseDeliveryStatus(value: String): DeliveryStatus =
    value match {
      case "in Bearbeitung" | "in progress" => InProcess
      case "ausgeliefert" | "delivered" => Completed
      case _ => throw new Exception("Could not parse Delivery Status " + value)
    }

  private def parseEmploymentMode(value: String): EmploymentMode =
    value match {
      case "Vollzeit" | "Full-time" => FullTime
      case "Teilzeit" | "Part-time" => PartTime
      case "Aushilfe" | "Temp" => Assistance
      case "Werkstudent" | "Working Student" => Student
      case _ => throw new Exception("Could not parse Employment Mode " + value)
    }

  private def parseFamilyStatus(value: String): FamilyStatus =
    value match {
      case "verheiratet" | "married" => Married
      case "ledig" | "single" => Single
      case "geschieden" | "divorced" => Divorced
      case _ => throw new Exception("Could not parse Family Status " + value)
    }

  private def parsePaymentStatus(value: String): PaymentStatus =
    value match {
      case "bezahlt" | "paid" => Paid
      case "offen" | "open" => Unpaid
      case _ => throw new Exception("Could not parse Payment Status " + value)
    }

  private def parseSalutation(value: String, sheetName: String): Salutation =
    value match {
      case "Herr" | "Mr." => Mr
      case "Frau" | "Mrs." | "Ms." => Mrs
      case "Divers" => NonBinary
      case _ => throw new Exception("Could not parse Salutation " + value + " in sheet " + sheetName)
    }
}
