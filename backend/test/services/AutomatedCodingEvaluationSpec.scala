package services

import enums.MimeType.ImagePng
import enums.OfficeTool.{EmailClient, Notes}
import enums.SpreadsheetCellType.General
import models._
import org.scalatestplus.play._
import services.helpers.Factories.{
  documentViewScenarioCodingAutomatedCriterionFactory,
  featureUsageScenarioCodingAutomatedCriterionFactory,
  inputValueScenarioCodingAutomatedCriterionFactory
}

import java.util.UUID

class AutomatedCodingEvaluationSpec extends PlaySpec {

  "AutomatedCodingEvaluation.documentView" should {
    "return false for empty event data list" in {
      val criterion = documentViewScenarioCodingAutomatedCriterionFactory.copy(fileId = Some(UUID.randomUUID()))
      val result = AutomatedCodingEvaluation.documentView(criterion, Nil)

      result mustBe false
    }

    "return false for event data list without matching file event" in {
      val fileId = UUID.randomUUID()
      val criterion = documentViewScenarioCodingAutomatedCriterionFactory.copy(fileId = Some(fileId))
      val eventDataItems = Seq(
        ViewFile(UUID.randomUUID(), Some(UUID.randomUUID()), fileId, ImagePng),
        ViewFile(UUID.randomUUID(), Some(UUID.randomUUID()), UUID.randomUUID(), ImagePng),
        OpenImageBinary(UUID.randomUUID(), Some(UUID.randomUUID()), Some(UUID.randomUUID()), UUID.randomUUID(), "", ""),
        OpenVideoBinary(UUID.randomUUID(), Some(UUID.randomUUID()), Some(UUID.randomUUID()), UUID.randomUUID(), "", ""),
        ViewFile(UUID.randomUUID(), Some(UUID.randomUUID()), UUID.randomUUID(), ImagePng),
        OpenImageBinary(UUID.randomUUID(), Some(UUID.randomUUID()), Some(UUID.randomUUID()), UUID.randomUUID(), "", "")
      )
      val result = AutomatedCodingEvaluation.documentView(criterion, eventDataItems)

      result mustBe false
    }

    "return true for event data list with matching file event" in {
      val fileId = UUID.randomUUID()
      val criterion = documentViewScenarioCodingAutomatedCriterionFactory.copy(fileId = Some(fileId))
      val eventDataItems = Seq(
        ViewFile(UUID.randomUUID(), Some(UUID.randomUUID()), fileId, ImagePng),
        OpenVideoBinary(UUID.randomUUID(), Some(UUID.randomUUID()), Some(UUID.randomUUID()), UUID.randomUUID(), "", ""),
        OpenImageBinary(UUID.randomUUID(), Some(UUID.randomUUID()), Some(fileId), UUID.randomUUID(), "", ""),
        ViewFile(UUID.randomUUID(), Some(UUID.randomUUID()), UUID.randomUUID(), ImagePng),
        OpenImageBinary(UUID.randomUUID(), Some(UUID.randomUUID()), Some(UUID.randomUUID()), UUID.randomUUID(), "", "")
      )
      val result = AutomatedCodingEvaluation.documentView(criterion, eventDataItems)

      result mustBe true
    }

    "return true for event data list with matching ShowEmail event" in {
      val emailId = UUID.randomUUID()
      val criterion = documentViewScenarioCodingAutomatedCriterionFactory.copy(emailId = Some(emailId))
      val eventDataItems = Seq(
        ShowEmail(UUID.randomUUID(), UUID.randomUUID()),
        ShowEmail(UUID.randomUUID(), emailId),
        ViewFile(UUID.randomUUID(), Some(UUID.randomUUID()), UUID.randomUUID(), ImagePng),
        ShowEmail(UUID.randomUUID(), UUID.randomUUID())
      )
      val result = AutomatedCodingEvaluation.documentView(criterion, eventDataItems)

      result mustBe true
    }
  }

  "AutomatedCodingEvaluation.featureUsage" should {
    "return false for empty event data list" in {
      val criterion = featureUsageScenarioCodingAutomatedCriterionFactory
      val result = AutomatedCodingEvaluation.featureUsage(criterion, Nil)

      result mustBe false
    }

    "return false for event data list without AnswerEmail event" in {
      val criterion = featureUsageScenarioCodingAutomatedCriterionFactory
      val eventDataItems = Seq(
        ViewFile(UUID.randomUUID(), Some(UUID.randomUUID()), UUID.randomUUID(), ImagePng),
        ViewFile(UUID.randomUUID(), Some(UUID.randomUUID()), UUID.randomUUID(), ImagePng),
        ViewFile(UUID.randomUUID(), Some(UUID.randomUUID()), UUID.randomUUID(), ImagePng)
      )
      val result = AutomatedCodingEvaluation.featureUsage(criterion, eventDataItems)

      result mustBe false
    }

    "return true for event data list with AnswerEmail event" in {
      val criterion = featureUsageScenarioCodingAutomatedCriterionFactory
      val eventDataItems = Seq(
        ViewFile(UUID.randomUUID(), Some(UUID.randomUUID()), UUID.randomUUID(), ImagePng),
        AnswerEmail(UUID.randomUUID(), UUID.randomUUID(), UUID.randomUUID()),
        ViewFile(UUID.randomUUID(), Some(UUID.randomUUID()), UUID.randomUUID(), ImagePng)
      )
      val result = AutomatedCodingEvaluation.featureUsage(criterion, eventDataItems)

      result mustBe true
    }
  }

  "AutomatedCodingEvaluation.inputValue" should {
    "return false for a spreadsheet criterion and an empty event data list" in {
      val criterion = inputValueScenarioCodingAutomatedCriterionFactory
      val result = AutomatedCodingEvaluation.inputValue(criterion, Nil)

      result mustBe false
    }

    "return false for a spreadsheet criterion and an event data list without matching value" in {
      val criterion = inputValueScenarioCodingAutomatedCriterionFactory.copy(value = "10")
      val eventDataItems = Seq(
        UpdateSpreadsheetCellValue(
          UUID.randomUUID(),
          UUID.randomUUID(),
          UUID.randomUUID(),
          1,
          1,
          UUID.randomUUID(),
          General,
          "1"),
        UpdateSpreadsheetCellValue(
          UUID.randomUUID(),
          UUID.randomUUID(),
          UUID.randomUUID(),
          1,
          1,
          UUID.randomUUID(),
          General,
          "12"),
        UpdateSpreadsheetCellValue(
          UUID.randomUUID(),
          UUID.randomUUID(),
          UUID.randomUUID(),
          1,
          1,
          UUID.randomUUID(),
          General,
          "123")
      )
      val result = AutomatedCodingEvaluation.inputValue(criterion, eventDataItems)

      result mustBe false
    }

    "return false for a spreadsheet criterion and an event data list without matching last value" in {
      val scenarioId = UUID.randomUUID()
      val fileId = UUID.randomUUID()
      val spreadsheetId = UUID.randomUUID()
      val criterion = inputValueScenarioCodingAutomatedCriterionFactory.copy(value = "12", fileId = Some(fileId))
      val eventDataItem =
        UpdateSpreadsheetCellValue(scenarioId, fileId, spreadsheetId, 1, 1, UUID.randomUUID(), General, "")
      val eventDataItems = Seq(
        UpdateSpreadsheetCellValue(scenarioId, fileId, spreadsheetId, 1, 2, UUID.randomUUID(), General, "2"),
        UpdateSpreadsheetCellValue(scenarioId, fileId, spreadsheetId, 1, 3, UUID.randomUUID(), General, "3"),
        eventDataItem.copy(value = "1"),
        eventDataItem.copy(value = "12"),
        eventDataItem.copy(value = "123"),
        UpdateSpreadsheetCellValue(scenarioId, fileId, spreadsheetId, 1, 4, UUID.randomUUID(), General, "4")
      )
      val result = AutomatedCodingEvaluation.inputValue(criterion, eventDataItems)

      result mustBe false
    }

    "return true for a spreadsheet criterion and an event data list with matching last value" in {
      val scenarioId = UUID.randomUUID()
      val fileId = UUID.randomUUID()
      val spreadsheetId = UUID.randomUUID()
      val criterion = inputValueScenarioCodingAutomatedCriterionFactory.copy(value = "123", fileId = Some(fileId))
      val eventDataItem =
        UpdateSpreadsheetCellValue(scenarioId, fileId, spreadsheetId, 1, 1, UUID.randomUUID(), General, "")
      val eventDataItems = Seq(
        UpdateSpreadsheetCellValue(scenarioId, fileId, spreadsheetId, 1, 2, UUID.randomUUID(), General, "2"),
        UpdateSpreadsheetCellValue(scenarioId, fileId, spreadsheetId, 1, 3, UUID.randomUUID(), General, "3"),
        eventDataItem.copy(value = "1"),
        eventDataItem.copy(value = "12"),
        eventDataItem.copy(value = "123"),
        UpdateSpreadsheetCellValue(scenarioId, fileId, spreadsheetId, 1, 4, UUID.randomUUID(), General, "4")
      )
      val result = AutomatedCodingEvaluation.inputValue(criterion, eventDataItems)

      result mustBe true
    }

    "return false for an email criterion and an event data list without matching last value" in {
      val scenarioId = UUID.randomUUID()
      val emailId = UUID.randomUUID()
      val criterion = inputValueScenarioCodingAutomatedCriterionFactory.copy(officeTool = EmailClient, value = "abc")
      val eventDataItems = Seq(
        UpdateEmailText(scenarioId, emailId, "a"),
        UpdateEmailText(scenarioId, emailId, "ab"),
        UpdateSpreadsheetCellValue(
          scenarioId,
          UUID.randomUUID(),
          UUID.randomUUID(),
          1,
          1,
          UUID.randomUUID(),
          General,
          "1"),
        UpdateEmailText(scenarioId, emailId, "abc"),
        UpdateEmailText(scenarioId, emailId, "ab"),
        UpdateSpreadsheetCellValue(
          scenarioId,
          UUID.randomUUID(),
          UUID.randomUUID(),
          1,
          1,
          UUID.randomUUID(),
          General,
          "2")
      )
      val result = AutomatedCodingEvaluation.inputValue(criterion, eventDataItems)

      result mustBe false
    }

    "return true for an email criterion and an event data list with matching last value" in {
      val scenarioId = UUID.randomUUID()
      val emailId = UUID.randomUUID()
      val criterion = inputValueScenarioCodingAutomatedCriterionFactory.copy(officeTool = EmailClient, value = "ab")
      val eventDataItems = Seq(
        UpdateEmailText(scenarioId, emailId, "a"),
        UpdateEmailText(scenarioId, emailId, "ab"),
        UpdateSpreadsheetCellValue(
          scenarioId,
          UUID.randomUUID(),
          UUID.randomUUID(),
          1,
          1,
          UUID.randomUUID(),
          General,
          "1"),
        UpdateEmailText(scenarioId, emailId, "abc"),
        UpdateEmailText(scenarioId, emailId, "ab"),
        UpdateSpreadsheetCellValue(
          scenarioId,
          UUID.randomUUID(),
          UUID.randomUUID(),
          1,
          1,
          UUID.randomUUID(),
          General,
          "2")
      )
      val result = AutomatedCodingEvaluation.inputValue(criterion, eventDataItems)

      result mustBe true
    }

    "return false for a notes criterion and an event data list without matching last value" in {
      val scenarioId = UUID.randomUUID()
      val criterion = inputValueScenarioCodingAutomatedCriterionFactory.copy(officeTool = Notes, value = "abc")
      val eventDataItems = Seq(
        UpdateNotesText(scenarioId, "a"),
        UpdateNotesText(scenarioId, "ab"),
        UpdateSpreadsheetCellValue(
          scenarioId,
          UUID.randomUUID(),
          UUID.randomUUID(),
          1,
          1,
          UUID.randomUUID(),
          General,
          "1"),
        UpdateNotesText(scenarioId, "abc"),
        UpdateNotesText(scenarioId, "ab"),
        UpdateSpreadsheetCellValue(
          scenarioId,
          UUID.randomUUID(),
          UUID.randomUUID(),
          1,
          1,
          UUID.randomUUID(),
          General,
          "2")
      )
      val result = AutomatedCodingEvaluation.inputValue(criterion, eventDataItems)

      result mustBe false
    }

    "return true for a notes criterion and an event data list with matching last value" in {
      val scenarioId = UUID.randomUUID()
      val criterion = inputValueScenarioCodingAutomatedCriterionFactory.copy(officeTool = Notes, value = "ab")
      val eventDataItems = Seq(
        UpdateNotesText(scenarioId, "a"),
        UpdateNotesText(scenarioId, "ab"),
        UpdateSpreadsheetCellValue(
          scenarioId,
          UUID.randomUUID(),
          UUID.randomUUID(),
          1,
          1,
          UUID.randomUUID(),
          General,
          "1"),
        UpdateNotesText(scenarioId, "abc"),
        UpdateNotesText(scenarioId, "ab"),
        UpdateSpreadsheetCellValue(
          scenarioId,
          UUID.randomUUID(),
          UUID.randomUUID(),
          1,
          1,
          UUID.randomUUID(),
          General,
          "2")
      )
      val result = AutomatedCodingEvaluation.inputValue(criterion, eventDataItems)

      result mustBe true
    }

    "return true for a notes criterion and an event data list with matching last value ignoring case " in {
      val scenarioId = UUID.randomUUID()
      val criterion = inputValueScenarioCodingAutomatedCriterionFactory.copy(officeTool = Notes, value = "Ab")
      val eventDataItems = Seq(
        UpdateNotesText(scenarioId, "Ab"))
      val result = AutomatedCodingEvaluation.inputValue(criterion, eventDataItems)

      result mustBe true
    }
  }
}
