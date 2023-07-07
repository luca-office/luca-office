package utils

import java.time.format.{DateTimeFormatter, FormatStyle}
import java.time.{Instant, LocalDate, ZoneId}
import java.util.Locale

object DateUtils {

  def now: Instant = Instant.now

  def isBeforeNow(value: Instant): Boolean = value.isBefore(now)

  def parse(value: String): Instant = Instant.parse(value)

  def parseExcelDate(value: String): Instant =
    LocalDate.parse(value, excelDateFormatter).atStartOfDay(excelDateFormatterZoneId).toInstant

  def formatExcelDate(value: Instant): String =
    excelDateFormatter.format(value)

  private val excelDateFormatterZoneId = ZoneId.of("Europe/Berlin")

  private val excelDateFormatter = DateTimeFormatter
    .ofLocalizedDate(FormatStyle.SHORT)
    .withLocale(Locale.GERMAN)
    .withZone(excelDateFormatterZoneId)
}
