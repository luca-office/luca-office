package utils

import org.scalatest.TryValues.convertTryToSuccessOrFailure
import org.scalatestplus.play._
import utils.ErpImportExportConfig._
import utils.Excel.ExcelFile

import java.io.FileOutputStream
import java.nio.file.Files
import java.util.UUID

class ErpImportSpec extends PlaySpec {

  "ErpImport.importFile" should {

    "successfully parse a generated import template file" in {
      val sampleCompanyId = UUID.randomUUID()
      val templateByteArrayOutputStream = ErpExport.createTemplateFile("").success.value
      val tempFilePath = Files.createTempFile(null, null)

      var fileOutputStream = new FileOutputStream(tempFilePath.toFile)
      try {
        fileOutputStream = new FileOutputStream(tempFilePath.toFile)
        templateByteArrayOutputStream.writeTo(fileOutputStream)
      }
      finally if (fileOutputStream != null) fileOutputStream.close()

      val excelFile = Excel.importFile(tempFilePath.toFile, shouldEvaluateFormulas = true).getOrElse(ExcelFile(Nil))
      val result = ErpImport.importFile(sampleCompanyId, excelFile)

      result.success.value.components mustBe Seq(componentTemplateRow.copy(sampleCompanyId = sampleCompanyId))
      result.success.value.componentProducts mustBe Seq(
        componentProductTemplateRow.copy(sampleCompanyId = sampleCompanyId))
      result.success.value.customers mustBe Seq(customerTemplateRow.copy(sampleCompanyId = sampleCompanyId))
      result.success.value.employees mustBe Seq(employeeTemplateRow.copy(sampleCompanyId = sampleCompanyId))
      result.success.value.invoices mustBe Seq(invoiceTemplateRow.copy(sampleCompanyId = sampleCompanyId))
      result.success.value.orderItems mustBe Seq(orderItemTemplateRow.copy(sampleCompanyId = sampleCompanyId))
      result.success.value.orders mustBe Seq(orderTemplateRow.copy(sampleCompanyId = sampleCompanyId))
      result.success.value.products mustBe Seq(productTemplateRow.copy(sampleCompanyId = sampleCompanyId))
      result.success.value.suppliers mustBe Seq(supplierTemplateRow.copy(sampleCompanyId = sampleCompanyId))
    }
  }
}
