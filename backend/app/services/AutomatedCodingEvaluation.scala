package services

import database.generated.public.{RScriptEvaluationResult, ScenarioCodingAutomatedCriterion, SurveyEvent}
import enums.{FeatureType, OfficeTool}
import models._
import services.converters.ScenarioCodingAutomatedCriterionConverter.toScenarioCodingAutomatedCriterionBase

object AutomatedCodingEvaluation {

  def evaluate(
      surveyEvents: Seq[SurveyEvent],
      rScriptEvaluationResults: Seq[RScriptEvaluationResult],
      criterion: ScenarioCodingAutomatedCriterion): Boolean = {
    val eventDataItems = surveyEvents
      .collect { case SurveyEvent(_, eventType, Some(data), _, _, _) =>
        SurveyEventService.decodeData(data, eventType)
      }
      .collect { case Right(eventData) => eventData }

    toScenarioCodingAutomatedCriterionBase(criterion) match {
      case criterion: DocumentViewScenarioCodingAutomatedCriterion =>
        documentView(criterion, eventDataItems)
      case criterion: FeatureUsageScenarioCodingAutomatedCriterion =>
        featureUsage(criterion, eventDataItems)
      case criterion: InputValueScenarioCodingAutomatedCriterion =>
        inputValue(criterion, eventDataItems)
      case criterion: RScriptScenarioCodingAutomatedCriterion =>
        rScriptEvaluation(criterion, rScriptEvaluationResults)
      case criterion: ToolUsageScenarioCodingAutomatedCriterion =>
        toolUsage(criterion, eventDataItems)
    }
  }

  def documentView(
      criterion: DocumentViewScenarioCodingAutomatedCriterion,
      eventDataItems: Seq[SurveyEventData]): Boolean =
    if (criterion.fileId.isDefined)
      eventDataItems.exists {
        case data: OpenImageBinary =>
          data.fileId.contains(criterion.fileId.get)
        case data: OpenVideoBinary =>
          data.fileId.contains(criterion.fileId.get)
        case data: OpenPdfBinary =>
          data.fileId.contains(criterion.fileId.get)
        case data: OpenSpreadsheet =>
          data.fileId == criterion.fileId.get
        case data: OpenTextDocument =>
          data.fileId == criterion.fileId.get
        case _ =>
          false
      }
    else if (criterion.emailId.isDefined)
      eventDataItems.exists {
        case data: ShowEmail =>
          criterion.emailId.contains(data.id)
        case _ =>
          false
      }
    else if (criterion.referenceBookArticleId.isDefined)
      eventDataItems.exists {
        case data: ViewReferenceBookArticle =>
          criterion.referenceBookArticleId.contains(data.articleId)
        case _ =>
          false
      }
    else if (criterion.erpRowId.isDefined)
      eventDataItems.exists {
        case data: ErpOpenRow =>
          criterion.erpRowId.contains(data.rowId) && criterion.erpTableType.contains(data.tableType)
        case _ =>
          false
      }
    else
      false

  def featureUsage(
      criterion: FeatureUsageScenarioCodingAutomatedCriterion,
      eventDataItems: Seq[SurveyEventData]): Boolean =
    criterion.officeTool match {
      case OfficeTool.EmailClient =>
        criterion.featureType match {
          case FeatureType.AnswerEmail =>
            eventDataItems.exists {
              case _: AnswerEmail => true
              case _ => false
            }
          case FeatureType.Search =>
            eventDataItems.exists {
              case _: SearchEmails => true
              case _ => false
            }
          case _ =>
            false
        }
      case OfficeTool.Erp =>
        criterion.featureType match {
          case FeatureType.CopyToClipboard =>
            eventDataItems.exists {
              case _: CopyToClipboard => true
              case _ => false
            }
          case FeatureType.PasteFromClipboard =>
            eventDataItems.exists {
              case _: PasteFromClipboard => true
              case _ => false
            }
          case FeatureType.Search =>
            eventDataItems.exists {
              case _: ErpSearchTable => true
              case _ => false
            }
          case _ =>
            false
        }
      case OfficeTool.Notes =>
        criterion.featureType match {
          case FeatureType.CopyToClipboard =>
            eventDataItems.exists {
              case _: CopyToClipboard => true
              case _ => false
            }
          case FeatureType.PasteFromClipboard =>
            eventDataItems.exists {
              case _: PasteFromClipboard => true
              case _ => false
            }
          case _ =>
            false
        }
      case OfficeTool.ReferenceBookViewer =>
        criterion.featureType match {
          case FeatureType.Search =>
            eventDataItems.exists {
              case _: SearchReferenceBook => true
              case _ => false
            }
          case _ =>
            false
        }
      case OfficeTool.SpreadsheetEditor =>
        criterion.featureType match {
          case FeatureType.FormulaUsage =>
            eventDataItems
              .exists {
                case data: UpdateSpreadsheetCellValue => data.value.trim.startsWith("=")
                case _ => false
              }
          case FeatureType.CopyToClipboard =>
            eventDataItems.exists {
              case _: CopyToClipboard => true
              case _ => false
            }
          case FeatureType.PasteFromClipboard =>
            eventDataItems.exists {
              case _: PasteFromClipboard => true
              case _ => false
            }
          case _ =>
            false
        }
      case _ =>
        false
    }

  def inputValue(
      criterion: InputValueScenarioCodingAutomatedCriterion,
      sortedEventDataItems: Seq[SurveyEventData]): Boolean =
    criterion.officeTool match {
      case OfficeTool.EmailClient =>
        sortedEventDataItems
          .collect { case data: UpdateEmailText => data }
          .groupBy(_.id)
          .values
          .map(_.last.text.toLowerCase)
          .exists(_.contains(criterion.value.toLowerCase))
      case OfficeTool.Notes =>
        sortedEventDataItems
          .collect { case data: UpdateNotesText => data.text }
          .lastOption
          .exists(_.toLowerCase.contains(criterion.value.toLowerCase))
      case OfficeTool.SpreadsheetEditor =>
        val latestValuesPerColumn = sortedEventDataItems
          .collect { case data: UpdateSpreadsheetCellValue if criterion.fileId.contains(data.fileId) => data }
          .groupBy(data => (data.rowIndex, data.columnIndex))
          .view
          .mapValues(_.last.value)
        (criterion.spreadsheetRowIndex, criterion.spreadsheetColumnIndex) match {
          case (Some(rowIndex), Some(columnIndex)) =>
            latestValuesPerColumn.get((rowIndex, columnIndex)).map(_.toLowerCase).contains(criterion.value.toLowerCase)
          case (None, None) =>
            latestValuesPerColumn.values.exists(_.toLowerCase == criterion.value.toLowerCase)
          case _ =>
            false
        }
      case _ =>
        false
    }

  def rScriptEvaluation(
      criterion: RScriptScenarioCodingAutomatedCriterion,
      rScriptEvaluationResults: Seq[RScriptEvaluationResult]): Boolean =
    rScriptEvaluationResults.exists {
      case data: RScriptEvaluationResult =>
        data.criterionId == criterion.id && data.criterionFulfilled.contains(true)
      case _ => false
    }

  def toolUsage(criterion: ToolUsageScenarioCodingAutomatedCriterion, eventDataItems: Seq[SurveyEventData]): Boolean =
    eventDataItems.exists {
      case data: OpenTool => data.tool == criterion.officeTool
      case _ => false
    }
}
