package utils

import enums.SpreadsheetCellType.{General, Number}
import org.scalatest.PrivateMethodTester
import org.scalatestplus.play._
import utils.Excel.{ExcelFile, ExcelFileCell, ExcelFileRow, ExcelFileSheet}

import java.io.File

class ExcelSpec extends PlaySpec with PrivateMethodTester {

  "Excel.importFile" should {

    "successfully parse an existing file" in {
      val path = "./test/resources/spreadsheet.xlsx"
      val rows = Seq(
        ExcelFileRow(
          Seq(
            ExcelFileCell(0, 0, General, "A"),
            ExcelFileCell(0, 1, General, "B"),
            ExcelFileCell(0, 2, General, "C ist jetzt mal ganz lang"),
            ExcelFileCell(0, 3, General, "D"),
            ExcelFileCell(0, 4, General, "E")
          )),
        ExcelFileRow(
          Seq(
            ExcelFileCell(1, 3, Number, "1")
          )),
        ExcelFileRow(
          Seq(
            ExcelFileCell(2, 3, Number, "2")
          )),
        ExcelFileRow(
          Seq(
            ExcelFileCell(3, 3, Number, "3")
          )),
        ExcelFileRow(
          Seq(
            ExcelFileCell(4, 0, Number, "=D5"),
            ExcelFileCell(4, 3, Number, "=D4+1")
          )),
        ExcelFileRow(
          Seq(
            ExcelFileCell(5, 0, Number, "=D6"),
            ExcelFileCell(5, 3, Number, "=D5+1")
          )),
        ExcelFileRow(
          Seq(
            ExcelFileCell(6, 0, Number, "=D7"),
            ExcelFileCell(6, 3, Number, "=D6+1")
          )),
        ExcelFileRow(
          Seq(
            ExcelFileCell(7, 0, Number, "=D8"),
            ExcelFileCell(7, 3, Number, "=D7+1")
          )),
        ExcelFileRow(
          Seq(
            ExcelFileCell(8, 0, Number, "=D9"),
            ExcelFileCell(8, 3, Number, "=D8+1")
          )),
        ExcelFileRow(
          Seq(
            ExcelFileCell(9, 0, Number, "=D10"),
            ExcelFileCell(9, 3, Number, "=D9+1")
          )),
        ExcelFileRow(
          Seq(
            ExcelFileCell(10, 0, Number, "=D11"),
            ExcelFileCell(10, 3, Number, "=D10+1")
          )),
        ExcelFileRow(
          Seq(
            ExcelFileCell(11, 0, Number, "=D12"),
            ExcelFileCell(11, 3, Number, "=D11+1")
          )),
        ExcelFileRow(
          Seq(
            ExcelFileCell(13, 2, Number, "=SUM(D2:D12)")
          ))
      )
      val expectedResult = ExcelFile(Seq(ExcelFileSheet("Tabelle1", rows)))
      val result = Excel.importFile(new File(path), shouldEvaluateFormulas = false)

      result mustBe Right(expectedResult)
    }
  }

  "Excel.parseNumericCellValue" should {

    val parseNumericCellValue = PrivateMethod[String](Symbol("parseNumericCellValue"))

    "parse an integer without decimal places" in {
      Excel.invokePrivate(parseNumericCellValue(1.0)) mustBe "1"
    }

    "parse a big integer without decimal places" in {
      Excel.invokePrivate(parseNumericCellValue(5555555.0)) mustBe "5555555"
    }

    "parse 0.0 as 0" in {
      Excel.invokePrivate(parseNumericCellValue(0.0)) mustBe "0"
    }

    "parse a double value" in {
      Excel.invokePrivate(parseNumericCellValue(0.12)) mustBe "0.12"
    }

    "parse a big double value" in {
      Excel.invokePrivate(parseNumericCellValue(55555.55555)) mustBe "55555.55555"
    }
  }
}
