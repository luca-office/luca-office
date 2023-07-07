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
import utils.Excel._

import java.io.ByteArrayOutputStream
import scala.util.Try

object ErpExport {

  def createTemplateFile(documentationUrl: String): Try[ByteArrayOutputStream] =
    Excel.createFile(templateSheets(documentationUrl))

  def createDataFile(erpData: ErpData, documentationUrl: String): Try[ByteArrayOutputStream] =
    Excel.createFile(exportSheets(erpData, documentationUrl))

  private def toSupplierCells(row: ErpSupplier) = Seq(
    IntExcelFileCellCreation(row.id),
    StringExcelFileCellCreation(row.company),
    StringExcelFileCellCreation(row.postalCode),
    StringExcelFileCellCreation(row.city),
    StringExcelFileCellCreation(row.addressLine),
    StringExcelFileCellCreation(row.country),
    StringExcelFileCellCreation(formatSalutation(row.salutation)),
    StringExcelFileCellCreation(row.firstName),
    StringExcelFileCellCreation(row.lastName),
    StringExcelFileCellCreation(row.phone),
    StringExcelFileCellCreation(row.email),
    StringOptionExcelFileCellCreation(row.note)
  )

  private def toComponentCells(row: ErpComponent) = Seq(
    IntExcelFileCellCreation(row.id),
    StringExcelFileCellCreation(row.category),
    StringExcelFileCellCreation(row.name),
    MoneyExcelFileCellCreation(row.purchasingPriceInCents),
    PercentageExcelFileCellCreation(row.margin),
    IntExcelFileCellCreation(row.packSize),
    StringExcelFileCellCreation(row.unit),
    IntExcelFileCellCreation(row.availableStock),
    MoneyExcelFileCellCreation(row.stockCostPerUnitInCents),
    MoneyExcelFileCellCreation(row.stockCostTotalInCents),
    StringOptionExcelFileCellCreation(row.note),
    IntExcelFileCellCreation(row.supplierId)
  )

  private def toProductCells(row: ErpProduct) = Seq(
    IntExcelFileCellCreation(row.id),
    StringExcelFileCellCreation(row.name),
    MoneyExcelFileCellCreation(row.netPriceInCents),
    PercentageExcelFileCellCreation(row.taxRate),
    IntExcelFileCellCreation(row.packSize),
    StringExcelFileCellCreation(row.unit),
    IntExcelFileCellCreation(row.availableStock),
    MoneyExcelFileCellCreation(row.stockCostPerUnitInCents),
    MoneyExcelFileCellCreation(row.stockCostTotalInCents),
    StringOptionExcelFileCellCreation(row.note)
  )

  private def toComponentProductCells(row: ErpComponentErpProduct) = Seq(
    IntExcelFileCellCreation(row.productId),
    IntExcelFileCellCreation(row.componentId),
    IntExcelFileCellCreation(row.quantity)
  )

  private def toCustomerCells(row: ErpCustomer) = Seq(
    IntExcelFileCellCreation(row.id),
    StringExcelFileCellCreation(formatSalutation(row.salutation)),
    StringExcelFileCellCreation(row.firstName),
    StringExcelFileCellCreation(row.lastName),
    StringOptionExcelFileCellCreation(row.company),
    StringExcelFileCellCreation(row.addressLine),
    StringExcelFileCellCreation(row.postalCode),
    StringExcelFileCellCreation(row.city),
    StringExcelFileCellCreation(row.country),
    StringOptionExcelFileCellCreation(row.phone),
    StringOptionExcelFileCellCreation(row.email),
    StringOptionExcelFileCellCreation(row.note)
  )

  private def toOrderCells(row: ErpOrder) = Seq(
    IntExcelFileCellCreation(row.id),
    MoneyOptionExcelFileCellCreation(row.cashbackInCents),
    MoneyOptionExcelFileCellCreation(row.discountInCents),
    MoneyExcelFileCellCreation(row.deliveryChargeInCents),
    StringExcelFileCellCreation(formatDeliveryStatus(row.deliveryStatus)),
    DateExcelFileCellCreation(row.deliveryDate),
    StringOptionExcelFileCellCreation(row.note),
    IntExcelFileCellCreation(row.customerId),
    IntExcelFileCellCreation(row.employeeId)
  )

  private def toOrderItemCells(row: ErpOrderItem) = Seq(
    IntExcelFileCellCreation(row.id),
    IntExcelFileCellCreation(row.quantity),
    MoneyExcelFileCellCreation(row.totalNetInCents),
    IntExcelFileCellCreation(row.orderId),
    IntExcelFileCellCreation(row.productId)
  )

  private def toInvoiceCells(row: ErpInvoice) = Seq(
    IntExcelFileCellCreation(row.id),
    DateExcelFileCellCreation(row.invoiceDate),
    StringExcelFileCellCreation(row.paymentTerms),
    MoneyExcelFileCellCreation(row.totalNetInCents),
    MoneyExcelFileCellCreation(row.taxAmountInCents),
    MoneyExcelFileCellCreation(row.totalGrossInCents),
    DateExcelFileCellCreation(row.dueDate),
    MoneyOptionExcelFileCellCreation(row.amountPaidInCents),
    StringExcelFileCellCreation(formatPaymentStatus(row.paymentStatus)),
    MoneyOptionExcelFileCellCreation(row.reminderFeeInCents),
    MoneyOptionExcelFileCellCreation(row.defaultChargesInCents),
    StringOptionExcelFileCellCreation(row.note),
    IntExcelFileCellCreation(row.orderId)
  )

  private def toEmployeeCells(row: ErpEmployee) = Seq(
    IntExcelFileCellCreation(row.id),
    StringExcelFileCellCreation(formatSalutation(row.salutation)),
    StringExcelFileCellCreation(row.firstName),
    StringExcelFileCellCreation(row.lastName),
    StringExcelFileCellCreation(row.addressLine),
    StringExcelFileCellCreation(row.postalCode),
    StringExcelFileCellCreation(row.city),
    StringExcelFileCellCreation(row.country),
    StringOptionExcelFileCellCreation(row.email),
    StringOptionExcelFileCellCreation(row.phone),
    StringExcelFileCellCreation(row.department),
    StringExcelFileCellCreation(row.jobTitle),
    StringExcelFileCellCreation(formatEmploymentMode(row.employmentMode)),
    DateExcelFileCellCreation(row.employedAt),
    DateOptionExcelFileCellCreation(row.employmentEndsAt),
    StringExcelFileCellCreation(row.site),
    StringOptionExcelFileCellCreation(row.graduation),
    StringExcelFileCellCreation(row.furtherEducation.mkString(", ")),
    StringExcelFileCellCreation(row.taxClass),
    StringExcelFileCellCreation(formatFamilyStatus(row.familyStatus)),
    IntOptionExcelFileCellCreation(row.childCount),
    StringOptionExcelFileCellCreation(row.note)
  )

  private def documentationSheet(documentationUrl: String) = ExcelFileSheetCreation(
    documentationSheetName,
    Seq(
      ExcelFileRowCreation(Seq(
        StringExcelFileCellCreation(
          s"Eine Dokumentation des Datenformats kann unter der nachfolgenden URL eingesehen werden."),
        StringExcelFileCellCreation(documentationUrl)
      )))
  )

  private def templateSheets(documentationUrl: String) =
    Seq(
      ExcelFileSheetCreation(
        supplierSheetName,
        Seq(
          ExcelFileRowCreation(toHeaderCellCreations(supplierHeaderLabels), isHeaderRow = true),
          ExcelFileRowCreation(toSupplierCells(supplierTemplateRow))
        )
      ),
      ExcelFileSheetCreation(
        componentSheetName,
        Seq(
          ExcelFileRowCreation(toHeaderCellCreations(componentHeaderLabels), isHeaderRow = true),
          ExcelFileRowCreation(toComponentCells(componentTemplateRow))
        )
      ),
      ExcelFileSheetCreation(
        productSheetName,
        Seq(
          ExcelFileRowCreation(toHeaderCellCreations(productHeaderLabels), isHeaderRow = true),
          ExcelFileRowCreation(toProductCells(productTemplateRow))
        )
      ),
      ExcelFileSheetCreation(
        componentProductSheetName,
        Seq(
          ExcelFileRowCreation(toHeaderCellCreations(componentProductHeaderLabels), isHeaderRow = true),
          ExcelFileRowCreation(toComponentProductCells(componentProductTemplateRow))
        )
      ),
      ExcelFileSheetCreation(
        customerSheetName,
        Seq(
          ExcelFileRowCreation(toHeaderCellCreations(customerHeaderLabels), isHeaderRow = true),
          ExcelFileRowCreation(toCustomerCells(customerTemplateRow))
        )
      ),
      ExcelFileSheetCreation(
        orderSheetName,
        Seq(
          ExcelFileRowCreation(toHeaderCellCreations(orderHeaderLabels), isHeaderRow = true),
          ExcelFileRowCreation(toOrderCells(orderTemplateRow))
        )
      ),
      ExcelFileSheetCreation(
        orderItemSheetName,
        Seq(
          ExcelFileRowCreation(toHeaderCellCreations(orderItemHeaderLabels), isHeaderRow = true),
          ExcelFileRowCreation(toOrderItemCells(orderItemTemplateRow))
        )
      ),
      ExcelFileSheetCreation(
        invoiceSheetName,
        Seq(
          ExcelFileRowCreation(toHeaderCellCreations(invoiceHeaderLabels), isHeaderRow = true),
          ExcelFileRowCreation(toInvoiceCells(invoiceTemplateRow))
        )
      ),
      ExcelFileSheetCreation(
        employeeSheetName,
        Seq(
          ExcelFileRowCreation(toHeaderCellCreations(employeeHeaderLabels), isHeaderRow = true),
          ExcelFileRowCreation(toEmployeeCells(employeeTemplateRow))
        )
      ),
      documentationSheet(documentationUrl)
    )

  private def exportSheets(erpData: ErpData, documentationUrl: String) =
    Seq(
      ExcelFileSheetCreation(
        supplierSheetName,
        ExcelFileRowCreation(toHeaderCellCreations(supplierHeaderLabels), isHeaderRow = true)
          +: erpData.suppliers.map(supplier => ExcelFileRowCreation(toSupplierCells(supplier)))
      ),
      ExcelFileSheetCreation(
        componentSheetName,
        ExcelFileRowCreation(toHeaderCellCreations(componentHeaderLabels), isHeaderRow = true)
          +: erpData.components.map(component => ExcelFileRowCreation(toComponentCells(component)))
      ),
      ExcelFileSheetCreation(
        productSheetName,
        ExcelFileRowCreation(toHeaderCellCreations(productHeaderLabels), isHeaderRow = true)
          +: erpData.products.map(product => ExcelFileRowCreation(toProductCells(product)))
      ),
      ExcelFileSheetCreation(
        componentProductSheetName,
        ExcelFileRowCreation(toHeaderCellCreations(componentProductHeaderLabels), isHeaderRow = true)
          +: erpData.componentProducts.map(componentProduct =>
            ExcelFileRowCreation(toComponentProductCells(componentProduct)))
      ),
      ExcelFileSheetCreation(
        customerSheetName,
        ExcelFileRowCreation(toHeaderCellCreations(customerHeaderLabels), isHeaderRow = true)
          +: erpData.customers.map(customer => ExcelFileRowCreation(toCustomerCells(customer)))
      ),
      ExcelFileSheetCreation(
        orderSheetName,
        ExcelFileRowCreation(toHeaderCellCreations(orderHeaderLabels), isHeaderRow = true)
          +: erpData.orders.map(order => ExcelFileRowCreation(toOrderCells(order)))
      ),
      ExcelFileSheetCreation(
        orderItemSheetName,
        ExcelFileRowCreation(toHeaderCellCreations(orderItemHeaderLabels), isHeaderRow = true)
          +: erpData.orderItems.map(orderItem => ExcelFileRowCreation(toOrderItemCells(orderItem)))
      ),
      ExcelFileSheetCreation(
        invoiceSheetName,
        ExcelFileRowCreation(toHeaderCellCreations(invoiceHeaderLabels), isHeaderRow = true)
          +: erpData.invoices.map(invoice => ExcelFileRowCreation(toInvoiceCells(invoice)))
      ),
      ExcelFileSheetCreation(
        employeeSheetName,
        ExcelFileRowCreation(toHeaderCellCreations(employeeHeaderLabels), isHeaderRow = true)
          +: erpData.employees.map(employee => ExcelFileRowCreation(toEmployeeCells(employee)))
      ),
      documentationSheet(documentationUrl)
    )

  private def toHeaderCellCreations(labels: Seq[String]) =
    labels.map(StringExcelFileCellCreation)

  private def formatDeliveryStatus(value: DeliveryStatus): String =
    value match {
      case InProcess => "in Bearbeitung"
      case Completed => "ausgeliefert"
    }

  private def formatEmploymentMode(value: EmploymentMode): String =
    value match {
      case FullTime => "Vollzeit"
      case PartTime => "Teilzeit"
      case Assistance => "Aushilfe"
      case Student => "Werkstudent"
    }

  private def formatFamilyStatus(value: FamilyStatus): String =
    value match {
      case Married => "verheiratet"
      case Single => "ledig"
      case Divorced => "geschieden"
    }

  private def formatPaymentStatus(value: PaymentStatus): String =
    value match {
      case Paid => "bezahlt"
      case Unpaid => "offen"
    }

  private def formatSalutation(value: Salutation): String =
    value match {
      case Mr => "Herr"
      case Mrs => "Frau"
      case NonBinary => "Divers"
    }
}
