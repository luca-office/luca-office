package utils

import enums.SpreadsheetCellType
import enums.SpreadsheetCellType.{Date, General, Number}
import org.apache.poi.hssf.usermodel.HSSFDataFormat
import org.apache.poi.ss.usermodel._
import org.apache.poi.ss.util.CellAddress
import org.apache.poi.xssf.usermodel.{XSSFCell, XSSFWorkbook}
import utils.EitherUtils.allErrorsOrAllValues

import java.io._
import java.time.Instant
import scala.jdk.CollectionConverters._
import scala.util.{Failure, Success, Try}

object Excel {

  case class ExcelFile(sheets: Seq[ExcelFileSheet])
  case class ExcelFileSheet(name: String, rows: Seq[ExcelFileRow])
  case class ExcelFileRow(cells: Seq[ExcelFileCell])
  case class ExcelFileCell(rowIndex: Int, columnIndex: Int, cellType: SpreadsheetCellType, value: String)

  case class ExcelFileSheetCreation(name: String, rows: Seq[ExcelFileRowCreation])
  case class ExcelFileRowCreation(cells: Seq[ExcelFileCellCreation], isHeaderRow: Boolean = false)

  sealed trait ExcelFileCellCreation
  case class StringExcelFileCellCreation(value: String) extends ExcelFileCellCreation
  case class StringOptionExcelFileCellCreation(value: Option[String]) extends ExcelFileCellCreation
  case class DateExcelFileCellCreation(value: Instant) extends ExcelFileCellCreation
  case class DateOptionExcelFileCellCreation(value: Option[Instant]) extends ExcelFileCellCreation
  case class IntExcelFileCellCreation(value: Int) extends ExcelFileCellCreation
  case class IntOptionExcelFileCellCreation(value: Option[Int]) extends ExcelFileCellCreation
  case class MoneyExcelFileCellCreation(value: Int) extends ExcelFileCellCreation
  case class MoneyOptionExcelFileCellCreation(value: Option[Int]) extends ExcelFileCellCreation
  case class PercentageExcelFileCellCreation(value: BigDecimal) extends ExcelFileCellCreation

  def importFile(file: File, shouldEvaluateFormulas: Boolean): Either[Seq[Throwable], ExcelFile] =
    readFile(file) match {
      case Success(sheets) =>
        allErrorsOrAllValues(sheets.map(readSheet(_, shouldEvaluateFormulas))) match {
          case Left(errors) => Left(errors.flatten)
          case Right(excelFileSheets) => Right(ExcelFile(excelFileSheets))
        }
      case Failure(error) =>
        Left(Seq(error))
    }

  private def readSheet(sheet: Sheet, shouldEvaluateFormulas: Boolean): Either[Seq[Throwable], ExcelFileSheet] =
    allErrorsOrAllValues(toSeq(sheet.rowIterator()).map(readRow(_, shouldEvaluateFormulas))) match {
      case Right(rows) =>
        Right(
          ExcelFileSheet(
            sheet.getSheetName,
            rows.filter(row => row.cells.nonEmpty && row.cells.exists(_.value.nonEmpty))))
      case Left(errors) => Left(errors.flatten)
    }

  private def readRow(row: Row, shouldEvaluateFormulas: Boolean): Either[Seq[Throwable], ExcelFileRow] =
    allErrorsOrAllValues(toSeq(row.cellIterator()).map(readCell(_, shouldEvaluateFormulas))).map(ExcelFileRow)

  private def readCell(cell: Cell, shouldEvaluateFormulas: Boolean): Either[Throwable, ExcelFileCell] =
    parseCellValue(cell.getCellType, cell, shouldEvaluateFormulas).map { case (value, cellType) =>
      ExcelFileCell(cell.getRowIndex, cell.getColumnIndex, cellType, value)
    }

  private def parseCellValue(
      cellType: CellType,
      cell: Cell,
      shouldEvaluateFormulas: Boolean): Either[Throwable, (String, SpreadsheetCellType)] =
    cellType match {
      case CellType.BLANK =>
        Right(("", General))
      case CellType.STRING =>
        Try((cell.getStringCellValue, General)).toEither
      case CellType.NUMERIC =>
        if (DateUtil.isCellDateFormatted(cell))
          Try((DateUtils.formatExcelDate(cell.getDateCellValue.toInstant), Date)).toEither
        else
          Try((parseNumericCellValue(cell.getNumericCellValue), Number)).toEither
      case CellType.FORMULA =>
        if (shouldEvaluateFormulas)
          parseCellValue(cell.getCachedFormulaResultType, cell, shouldEvaluateFormulas)
        else
          Try((formatFormulaValue(cell.getCellFormula), Number)).toEither
      case _ =>
        Left(new Throwable(s"Unsupported cell type: $cellType"))
    }

  private def parseNumericCellValue(doubleValue: Double) =
    Try(doubleValue.toInt)
      .filter(_ => doubleValue == doubleValue.floor && doubleValue.isFinite)
      .map(_.toString)
      .getOrElse(doubleValue.toString)

  private def formatFormulaValue(value: String) =
    s"=${value.replace(",", ";")}"

  private def readFile(file: File) = Try {
    val fileInputStream = new FileInputStream(file)
    val workbook = new XSSFWorkbook(fileInputStream)
    toSeq(workbook.sheetIterator())
  }

  private def toSeq[T](iterator: java.util.Iterator[T]) =
    iterator.asScala.toSeq

  def createFile(sheetCreations: Seq[ExcelFileSheetCreation]): Try[ByteArrayOutputStream] = {
    val workbook = new XSSFWorkbook()
    val headingCellStyle = createHeadingCellStyle(workbook)
    val defaultCellStyle = createDefaultCellStyle(workbook)
    val percentageCellStyle = createPercentageCellStyle(workbook)
    val moneyCellStyle = createMoneyCellStyle(workbook)
    val dateCellStyle = createDateCellStyle(workbook)

    def chooseStyle(cellCreation: ExcelFileCellCreation) =
      chooseCellStyle(defaultCellStyle, percentageCellStyle, moneyCellStyle, dateCellStyle, cellCreation)

    sheetCreations.foreach { sheetCreation =>
      val sheet = workbook.createSheet(sheetCreation.name)
      sheet.setZoom(sheetZoom)
      sheetCreation.rows.zipWithIndex
        .foreach { case (rowCreation, rowIndex) =>
          val row = sheet.createRow(rowIndex)
          rowCreation.cells.zipWithIndex
            .foreach { case (cellCreation, columnIndex) =>
              val cellType = createCellType(cellCreation)
              val cell = row.createCell(columnIndex, cellType)
              val cellStyle = if (rowCreation.isHeaderRow) headingCellStyle else chooseStyle(cellCreation)
              cell.setCellStyle(cellStyle)
              setCellValue(cell, cellCreation)
            }
        }
      sheetCreation.rows.headOption.foreach(rowCreation => rowCreation.cells.indices.foreach(sheet.autoSizeColumn))
    }

    Try {
      val outputStream = new ByteArrayOutputStream()
      workbook.write(outputStream)
      outputStream
    }
  }

  private def setCellValue(cell: XSSFCell, cellCreation: Excel.ExcelFileCellCreation): Unit =
    cellCreation match {
      case StringExcelFileCellCreation(value) =>
        cell.setCellValue(value)
      case StringOptionExcelFileCellCreation(Some(value)) =>
        cell.setCellValue(value)
      case DateExcelFileCellCreation(value) =>
        cell.setCellValue(java.util.Date.from(value))
      case DateOptionExcelFileCellCreation(Some(value)) =>
        cell.setCellValue(java.util.Date.from(value))
      case IntExcelFileCellCreation(value) =>
        cell.setCellValue(value)
      case IntOptionExcelFileCellCreation(Some(value)) =>
        cell.setCellValue(value)
      case MoneyExcelFileCellCreation(value) =>
        cell.setCellValue((BigDecimal(value) / 100).toDouble)
      case MoneyOptionExcelFileCellCreation(Some(value)) =>
        cell.setCellValue((BigDecimal(value) / 100).toDouble)
      case PercentageExcelFileCellCreation(value) =>
        cell.setCellValue(value.toDouble)
      case _ =>
        ()
    }

  private def createCellType(cellCreation: ExcelFileCellCreation) =
    cellCreation match {
      case StringOptionExcelFileCellCreation(None) | IntOptionExcelFileCellCreation(None) |
          DateOptionExcelFileCellCreation(None) | MoneyOptionExcelFileCellCreation(None) =>
        CellType.BLANK
      case StringExcelFileCellCreation(_) | StringOptionExcelFileCellCreation(Some(_)) =>
        CellType.STRING
      case DateExcelFileCellCreation(_) | DateOptionExcelFileCellCreation(Some(_)) | IntExcelFileCellCreation(_) |
          IntOptionExcelFileCellCreation(Some(_)) | MoneyExcelFileCellCreation(_) | MoneyOptionExcelFileCellCreation(
            Some(_)) | PercentageExcelFileCellCreation(_) =>
        CellType.NUMERIC
    }

  private def chooseCellStyle(
      defaultCellStyle: CellStyle,
      percentageCellStyle: CellStyle,
      moneyCellStyle: CellStyle,
      dateCellStyle: CellStyle,
      cellCreation: ExcelFileCellCreation) =
    cellCreation match {
      case _: StringExcelFileCellCreation | _: StringOptionExcelFileCellCreation | _: IntExcelFileCellCreation |
          _: IntOptionExcelFileCellCreation =>
        defaultCellStyle
      case _: DateExcelFileCellCreation | _: DateOptionExcelFileCellCreation =>
        dateCellStyle
      case _: MoneyExcelFileCellCreation | _: MoneyOptionExcelFileCellCreation =>
        moneyCellStyle
      case _: PercentageExcelFileCellCreation =>
        percentageCellStyle
    }

  private def createDefaultCellStyle(workbook: XSSFWorkbook) = {
    val cellStyle = workbook.createCellStyle()
    val font = workbook.createFont
    font.setFontHeightInPoints(cellFontSize)
    font.setFontName(cellFontName)
    cellStyle.setFont(font)
    cellStyle
  }

  private def createPercentageCellStyle(workbook: XSSFWorkbook) = {
    val cellStyle = createDefaultCellStyle(workbook)
    cellStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("0%"))
    cellStyle
  }

  private def createMoneyCellStyle(workbook: XSSFWorkbook) = {
    val cellStyle = createDefaultCellStyle(workbook)
    cellStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("\"$\"#,##0.00_);[Red](\"$\"#,##0.00)"))
    cellStyle
  }

  private def createDateCellStyle(workbook: XSSFWorkbook) = {
    val cellStyle = createDefaultCellStyle(workbook)
    cellStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("m/d/yy"))
    cellStyle
  }

  private def createHeadingCellStyle(workbook: XSSFWorkbook) = {
    val cellStyle = workbook.createCellStyle()
    val font = workbook.createFont
    font.setFontHeightInPoints(cellFontSize)
    font.setFontName(cellFontName)
    font.setBold(true)
    cellStyle.setFont(font)
    cellStyle
  }

  def indexToCellName(rowIndex: Int, columnIndex: Int): String = new CellAddress(rowIndex, columnIndex).formatAsString()

  private val sheetZoom = 125
  private val cellFontName = "Arial"
  private val cellFontSize: Short = 12
}
