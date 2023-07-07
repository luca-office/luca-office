package services

import akka.actor.ActorRef
import database.DatabaseContext
import database.generated.public.SurveyEvent
import enums.SurveyEventType
import enums.SurveyEventType._
import io.circe.generic.auto._
import io.circe.parser.parse
import io.circe.syntax.EncoderOps
import io.circe.{Decoder, DecodingFailure, Json, ParsingFailure}
import models.{
  DecodedSurveyEvent,
  HasQuestionnaireId,
  HasScenarioId,
  ProjectModuleSurveyEvents,
  ScenarioIdOrQuestionnaireId,
  SupervisorSurveyEventCreation,
  SurveyEventCreation,
  SurveyEventCreationBase,
  SurveyEventData
}
import play.api.Logging
import services.SurveyEventService.toDecodedSurveyEvents
import services.Utils.defaultErrorHandler
import services.actions.AllSurveyEvent
import services.converters.SurveyEventConverter.toSurveyEvent
import services.generated.DefaultFindSurveyInvitation
import tasks.ExecuteRScriptEvaluationActor
import utils.DateUtils

import java.util.UUID
import javax.inject.{Inject, Named}
import scala.concurrent.{ExecutionContext, Future}

class SurveyEventService @Inject() (
    databaseContext: DatabaseContext,
    @Named("execute-rscript-evaluation-actor")
    executeRScriptEvaluationActor: ActorRef
)(implicit val executionContext: ExecutionContext)
    extends AllSurveyEvent
    with DefaultFindSurveyInvitation
    with SurveyEventServiceActions
    with QuillUtils
    with Logging {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allForSurvey(surveyId: UUID): Future[Seq[SurveyEvent]] =
    performIO(allSurveyEventsForSurveyAction(surveyId))

  def allForScenario(surveyId: UUID, scenarioId: UUID): Future[Seq[SurveyEvent]] =
    performIO(allSurveyEventsForScenarioAction(surveyId, scenarioId))

  def allForParticipant(invitationId: UUID): Future[Seq[SurveyEvent]] =
    performIO(allSurveyEventsForParticipantAction(invitationId))

  def allForParticipantForScenario(invitationId: UUID, scenarioId: UUID): Future[Seq[SurveyEvent]] =
    performIO(allSurveyEventsForParticipantForScenarioAction(invitationId, scenarioId))

  def allForLatestInProgressProjectModule(invitationId: UUID): Future[Option[ProjectModuleSurveyEvents]] = {
    val surveyEventAction = for {
      surveyInvitation <- findSurveyInvitationAction(invitationId).flatMap(liftIOOrFail(EntityNotFound))
      surveyEvents <- runIO(
        projectModuleStartAndEndEventsQuotation(surveyInvitation.surveyId)
          .filter(_.invitationId.contains(lift(invitationId))))
    } yield surveyEvents

    val action = surveyEventAction.map(findInProgressProjectModuleId).flatMap {
      case ScenarioIdOrQuestionnaireId(Some(scenarioId), _) =>
        allSurveyEventsForParticipantForScenarioAction(invitationId, scenarioId)
          .map(events => Some(ProjectModuleSurveyEvents(Some(scenarioId), None, events)))
      case ScenarioIdOrQuestionnaireId(_, Some(questionnaireId)) =>
        allSurveyEventsForParticipantForQuestionnaireAction(invitationId, questionnaireId)
          .map(events => Some(ProjectModuleSurveyEvents(None, Some(questionnaireId), events)))
      case _ =>
        IO.successful(None)
    }

    performIO(action)
  }

  def findInProgressProjectModuleId(startAndEndSurveyEvents: Seq[SurveyEvent]): ScenarioIdOrQuestionnaireId = {
    def findLatestInProgressPair[A](startAndEndEventsPerProjectModule: Map[UUID, Seq[(Int, A)]]) =
      startAndEndEventsPerProjectModule.values
        .filter(_.length == 1)
        .map(_.head)
        .maxByOption { case (index, _) => index }

    val eventDataPairs = toDecodedSurveyEvents(startAndEndSurveyEvents).map(event => (event.index, event.data))

    val scenarioPair = findLatestInProgressPair(
      eventDataPairs
        .collect { case (index, data: HasScenarioId) => (index, data) }
        .groupBy { case (_, data) => data.scenarioId })

    val questionnairePair = findLatestInProgressPair(
      eventDataPairs
        .collect { case (index, data: HasQuestionnaireId) => (index, data) }
        .groupBy { case (_, data) => data.questionnaireId })

    (scenarioPair, questionnairePair) match {
      case (Some((scenarioIndex, scenarioEvent)), Some((questionnaireIndex, questionnaireEvent))) =>
        if (scenarioIndex > questionnaireIndex)
          ScenarioIdOrQuestionnaireId(Some(scenarioEvent.scenarioId), None)
        else
          ScenarioIdOrQuestionnaireId(None, Some(questionnaireEvent.questionnaireId))
      case (Some((_, scenarioEvent)), _) =>
        ScenarioIdOrQuestionnaireId(Some(scenarioEvent.scenarioId), None)
      case (_, Some((_, questionnaireEvent))) =>
        ScenarioIdOrQuestionnaireId(None, Some(questionnaireEvent.questionnaireId))
      case _ =>
        ScenarioIdOrQuestionnaireId(None, None)
    }
  }

  def createBulk(creations: Seq[SurveyEventCreationBase]): Future[String] = {
    val dbActionResult = performIO(createBulkAction(creations).transactional)

    dbActionResult.foreach { _ =>
      initiateRScriptEvaluationOnEndScenarioEvent(creations)
    }

    dbActionResult.recover(defaultErrorHandler)
  }

  def createBulkAction(creations: Seq[SurveyEventCreationBase]): IO[String, Effect.Write] =
    creations match {
      case creation +: _ =>
        val parsingResults = SurveyEventService.toSurveyEvents(creations)
        val parsingSuccesses = parsingResults.collect { case Right(event) => event }
        val parsingFailures = parsingResults.collect { case Left(event) => event }

        val checkingResults = parsingSuccesses.map(SurveyEventService.checkData)
        val checkingSuccesses = checkingResults.collect { case Right(event) => event }
        val checkingFailures = checkingResults.collect { case Left(event) => event }

        if (parsingFailures.nonEmpty) {
          logger.error(s"Survey event creation parsing errors: ${parsingFailures.map(_.message).mkString(", ")}")
        }

        if (checkingFailures.nonEmpty) {
          logger.error(s"Survey event creation data errors: ${checkingFailures.mkString(", ")}")
        }

        runIO(createBulkQuotation(checkingSuccesses)).map(_ =>
          (parsingFailures.map(_.message) ++ checkingFailures).mkString(", "))
      case Nil =>
        IO.failed(CustomError("Creations list is empty"))
    }

  private def createBulkQuotation(surveyEvents: Seq[SurveyEvent]) =
    quote(liftQuery(surveyEvents).foreach(createQuotation))

  private def createQuotation(surveyEvent: SurveyEvent) =
    quote(query[SurveyEvent].insert(surveyEvent).returning(event => event))

  def createSendParticipantChatMessageEvent(
      surveyId: UUID,
      invitationId: UUID,
      currentScenarioId: Option[UUID],
      currentQuestionnaireId: Option[UUID],
      message: String,
      clientSurveyEventIndex: Int): Future[String] =
    createBulk(
      Seq(
        SurveyEventCreation(
          invitationId = invitationId,
          surveyId = surveyId,
          timestamp = DateUtils.now,
          index = clientSurveyEventIndex,
          eventType = SendParticipantChatMessage,
          data = Some(
            models
              .SendParticipantChatMessage(invitationId, message, currentScenarioId, currentQuestionnaireId)
              .asJson
              .toString)
        )))

  def createSendSupervisorChatMessageEvent(
      surveyId: UUID,
      userAccountId: UUID,
      recipientInvitationIds: Seq[UUID],
      message: String): Future[String] =
    createSupervisorEvent(
      surveyId,
      SendSupervisorChatMessage,
      recipientInvitationIds.map(recipientInvitationId =>
        models.SendSupervisorChatMessage(userAccountId, recipientInvitationId, message).asJson)
    )

  def createStartSurveyCommandEvent(surveyId: UUID, userAccountId: UUID): Future[String] = {
    val validationAction = runIO(
      allSurveyEventsForSupervisorQuotation(surveyId)
        .filter(surveyEvent => surveyEvent.eventType == lift(SurveyEventType.StartSurveyCommand: SurveyEventType))
        .isEmpty
    )

    createSupervisorEvent(
      surveyId,
      SurveyEventType.StartSurveyCommand,
      Seq(models.StartSurveyCommand(surveyId, userAccountId).asJson),
      Some(validationAction)
    )
  }

  def createEndSurveyCommandEvent(surveyId: UUID, userAccountId: UUID): Future[String] = {
    val validationAction = runIO(
      allSurveyEventsForSupervisorQuotation(surveyId)
        .filter(surveyEvent => surveyEvent.eventType == lift(SurveyEventType.EndSurveyCommand: SurveyEventType))
        .isEmpty
    )

    createSupervisorEvent(
      surveyId,
      EndSurveyCommand,
      Seq(models.EndSurveyCommand(surveyId, userAccountId).asJson),
      Some(validationAction))
  }

  def createStartScenarioCommandEvent(surveyId: UUID, scenarioId: UUID, userAccountId: UUID): Future[String] = {
    val validationAction = runIO(
      allSurveyEventsForSupervisorQuotation(surveyId)
        .filter(surveyEvent =>
          surveyEvent.eventType == lift(SurveyEventType.StartScenarioCommand: SurveyEventType) && quote(
            infix"(data ->> 'scenarioId')::uuid = ${lift(scenarioId)}".asCondition))
        .isEmpty
    )

    createSupervisorEvent(
      surveyId,
      StartScenarioCommand,
      Seq(models.StartScenarioCommand(surveyId, scenarioId, userAccountId).asJson),
      Some(validationAction)
    )
  }

  def createStartQuestionnaireCommandEvent(
      surveyId: UUID,
      questionnaireId: UUID,
      userAccountId: UUID): Future[String] = {
    val validationAction = runIO(
      allSurveyEventsForSupervisorQuotation(surveyId)
        .filter(surveyEvent =>
          surveyEvent.eventType == lift(SurveyEventType.StartQuestionnaireCommand: SurveyEventType) && quote(
            infix"(data ->> 'questionnaireId')::uuid = ${lift(questionnaireId)}".asCondition))
        .isEmpty
    )

    createSupervisorEvent(
      surveyId,
      StartQuestionnaireCommand,
      Seq(models.StartQuestionnaireCommand(surveyId, questionnaireId, userAccountId).asJson),
      Some(validationAction)
    )
  }

  private def createSupervisorEvent(
      surveyId: UUID,
      eventType: SurveyEventType,
      dataItems: Seq[Json],
      validationAction: Option[IO[RunQuerySingleResult[Boolean], Effect.Read]] = None
  ): Future[String] = {
    val action = for {
      validationResult <- validationAction.getOrElse(IO.successful(true))
      _ <- if (validationResult) IO.successful() else IO.failed(DataValidationError("Data validation failed"))
      lastIndex <- runIO(allSurveyEventsForSupervisorQuotation(surveyId).map(_.index).max)
      creations = dataItems.zipWithIndex.map { case (data, dataIndex) =>
        SupervisorSurveyEventCreation(
          surveyId = surveyId,
          timestamp = DateUtils.now,
          eventType = eventType,
          index = lastIndex.getOrElse(0) + 1 + dataIndex,
          data = Some(data.toString)
        )
      }
      result <- createBulkAction(creations)
    } yield result

    performIO(action.transactional)
  }

  private def initiateRScriptEvaluationOnEndScenarioEvent(creations: Seq[SurveyEventCreationBase]): Unit = {
    val actorMsg = for {
      // Assume that the list of creations can contain at most one end-scenario-event since it is sent by one player instance
      SurveyEventCreation(surveyId, invitationId, _, _, _, Some(data)) <- creations.find(event =>
        event.eventType == SurveyEventType.EndScenario)
      eventDataJson <- parse(data).toOption
      parsedEventData <- eventDataJson.as[models.EndScenario].toOption
    } yield ExecuteRScriptEvaluationActor.MessageEvaluateRScript(surveyId, invitationId, parsedEventData.scenarioId)

    actorMsg.foreach(msg => executeRScriptEvaluationActor ! msg)
  }
}

object SurveyEventService {
  def toSurveyEvents(creations: Seq[SurveyEventCreationBase]): Seq[Either[ParsingFailure, SurveyEvent]] =
    creations.map { case (creation) =>
      creation.data.map(parse) match {
        case Some(data) =>
          data.map(parsedData => toSurveyEvent(creation, Some(parsedData)))
        case _ =>
          Right(toSurveyEvent(creation, None))
      }
    }

  def toDecodedSurveyEvent(surveyEvent: SurveyEvent): Either[DecodingFailure, DecodedSurveyEvent] =
    surveyEvent.data match {
      case Some(data) =>
        SurveyEventService
          .decodeData(data, surveyEvent.eventType)
          .map(decodedData =>
            DecodedSurveyEvent(
              timestamp = surveyEvent.timestamp,
              eventType = surveyEvent.eventType,
              data = decodedData,
              surveyId = surveyEvent.surveyId,
              index = surveyEvent.index,
              invitationId = surveyEvent.invitationId
            ))
      case _ =>
        Left(DecodingFailure(s"Event type ${surveyEvent.eventType} does not have data", Nil))
    }

  def toDecodedSurveyEvents(surveyEvents: Seq[SurveyEvent]): Seq[DecodedSurveyEvent] =
    surveyEvents.map(toDecodedSurveyEvent).collect { case Right(event) => event }

  def checkData(surveyEvent: SurveyEvent): Either[String, SurveyEvent] =
    surveyEvent.data match {
      case Some(data) =>
        SurveyEventService.decodeData(data, surveyEvent.eventType) match {
          case Right(_) => Right(surveyEvent)
          case Left(value) => Left(s"${surveyEvent.eventType}: ${value.getMessage()}")
        }
      case _ =>
        surveyEvent.eventType match {
          case StartProject | EndProject | ResumeProject =>
            Right(surveyEvent)
          case surveyEventType =>
            Left(s"Event type $surveyEventType should have data")
        }
    }

  def decodeData(data: Json, eventType: SurveyEventType): Decoder.Result[SurveyEventData] =
    eventType match {
      case StoreParticipantData => data.as[models.StoreParticipantData]
      case StartScenario => data.as[models.StartScenario]
      case EndScenario => data.as[models.EndScenario]
      case ResumeScenario => data.as[models.ResumeScenario]
      case StartQuestionnaire => data.as[models.StartQuestionnaire]
      case EndQuestionnaire => data.as[models.EndQuestionnaire]
      case ResumeQuestionnaire => data.as[models.ResumeQuestionnaire]

      case OpenTool => data.as[models.OpenTool]
      case CloseTool => data.as[models.CloseTool]
      case MinimizeTool => data.as[models.MinimizeTool]
      case RestoreTool => data.as[models.RestoreTool]
      case CopyToClipboard => data.as[models.CopyToClipboard]
      case PasteFromClipboard => data.as[models.PasteFromClipboard]
      case StartEvent => data.as[models.StartEvent]
      case EndEvent => data.as[models.EndEvent]
      case ResumeEvent => data.as[models.ResumeEvent]
      case EvaluateIntervention => data.as[models.EvaluateIntervention]

      case CreateEmail => data.as[models.CreateEmail]
      case AnswerEmail => data.as[models.AnswerEmail]
      case ShowEmail => data.as[models.ShowEmail]
      case DeleteEmailDraft => data.as[models.DeleteEmailDraft]
      case MoveEmailToTrash => data.as[models.MoveEmailToTrash]
      case SendEmail => data.as[models.SendEmail]
      case SelectEmailDirectory => data.as[models.SelectEmailDirectory]
      case SearchEmails => data.as[models.SearchEmails]
      case UpdateEmail => data.as[models.UpdateEmail]
      case UpdateEmailText => data.as[models.UpdateEmailText]
      case DownloadEmailAttachment => data.as[models.DownloadEmailAttachment]
      case AddEmailAttachment => data.as[models.AddEmailAttachment]
      case DeleteEmailAttachment => data.as[models.DeleteEmailAttachment]
      case ReceiveEmail => data.as[models.ReceiveEmail]

      case CalculatorKeyPressed => data.as[models.CalculatorKeyPressed]

      case ViewFile => data.as[models.ViewFile]
      case ViewDirectory => data.as[models.ViewDirectory]
      case ViewDownloadsDirectory => data.as[models.ViewDownloadsDirectory]

      case ViewReferenceBookChapter => data.as[models.ViewReferenceBookChapter]
      case ViewReferenceBookArticle => data.as[models.ViewReferenceBookArticle]
      case ViewReferenceBookBinary => data.as[models.ViewReferenceBookBinary]
      case SearchReferenceBook => data.as[models.SearchReferenceBook]

      case OpenImageBinary => data.as[models.OpenImageBinary]
      case CloseImageBinary => data.as[models.CloseImageBinary]
      case SelectImageBinary => data.as[models.SelectImageBinary]
      case OpenVideoBinary => data.as[models.OpenVideoBinary]
      case CloseVideoBinary => data.as[models.CloseVideoBinary]
      case SelectVideoBinary => data.as[models.SelectVideoBinary]
      case OpenPdfBinary => data.as[models.OpenPdfBinary]
      case ClosePdfBinary => data.as[models.ClosePdfBinary]
      case SelectPdfBinary => data.as[models.SelectPdfBinary]
      case OpenSpreadsheet => data.as[models.OpenSpreadsheet]
      case CloseSpreadsheet => data.as[models.CloseSpreadsheet]
      case SelectSpreadsheet => data.as[models.SelectSpreadsheet]

      case OpenTextDocument => data.as[models.OpenTextDocument]
      case CloseTextDocument => data.as[models.CloseTextDocument]
      case SelectTextDocument => data.as[models.CloseTextDocument]
      case UpdateTextDocumentContent => data.as[models.UpdateTextDocumentContent]

      case PlayVideo => data.as[models.PlayVideo]
      case PauseVideo => data.as[models.PauseVideo]

      case UpdateSpreadsheetCellValue => data.as[models.UpdateSpreadsheetCellValue]
      case UpdateSpreadsheetCellType => data.as[models.UpdateSpreadsheetCellType]
      case UpdateSpreadsheetCellStyle => data.as[models.UpdateSpreadsheetCellStyle]
      case SelectSpreadsheetCell => data.as[models.SelectSpreadsheetCell]
      case SelectSpreadsheetCellRange => data.as[models.SelectSpreadsheetCellRange]

      case SelectQuestionnaireAnswer => data.as[models.SelectQuestionnaireAnswer]
      case DeselectQuestionnaireAnswer => data.as[models.DeselectQuestionnaireAnswer]
      case SelectQuestionnaireFreetextAnswer => data.as[models.SelectQuestionnaireFreetextAnswer]
      case DeselectQuestionnaireFreetextAnswer => data.as[models.DeselectQuestionnaireFreetextAnswer]
      case UpdateQuestionnaireFreeTextAnswer => data.as[models.UpdateQuestionnaireFreeTextAnswer]
      case EnlargeQuestionnaireBinary => data.as[models.EnlargeQuestionnaireBinary]
      case ShrinkQuestionnaireBinary => data.as[models.ShrinkQuestionnaireBinary]
      case PlayQuestionnaireVideo => data.as[models.PlayQuestionnaireVideo]
      case PauseQuestionnaireVideo => data.as[models.PauseQuestionnaireVideo]
      case EnterFullscreenQuestionnaireVideo => data.as[models.EnterFullscreenQuestionnaireVideo]
      case LeaveFullscreenQuestionnaireVideo => data.as[models.LeaveFullscreenQuestionnaireVideo]
      case QuestionnaireVideoPlaybackEnded => data.as[models.QuestionnaireVideoPlaybackEnded]
      case EnlargeQuestionnaireQuestionBinary => data.as[models.EnlargeQuestionnaireQuestionBinary]
      case ShrinkQuestionnaireQuestionBinary => data.as[models.ShrinkQuestionnaireQuestionBinary]
      case PlayQuestionnaireQuestionVideo => data.as[models.PlayQuestionnaireQuestionVideo]
      case PauseQuestionnaireQuestionVideo => data.as[models.PauseQuestionnaireQuestionVideo]
      case EnterFullscreenQuestionnaireQuestionVideo => data.as[models.EnterFullscreenQuestionnaireQuestionVideo]
      case LeaveFullscreenQuestionnaireQuestionVideo => data.as[models.LeaveFullscreenQuestionnaireQuestionVideo]
      case QuestionnaireQuestionVideoPlaybackEnded => data.as[models.QuestionnaireQuestionVideoPlaybackEnded]

      case ErpExpandDirectory => data.as[models.ErpExpandDirectory]
      case ErpCollapseDirectory => data.as[models.ErpCollapseDirectory]
      case ErpSelectTable => data.as[models.ErpSelectTable]
      case ErpSelectRow => data.as[models.ErpSelectRow]
      case ErpDeselectRow => data.as[models.ErpDeselectRow]
      case ErpSelectAllRows => data.as[models.ErpSelectAllRows]
      case ErpDeselectAllRows => data.as[models.ErpDeselectAllRows]
      case ErpSelectCell => data.as[models.ErpSelectCell]
      case ErpCopyCellContentToClipboard => data.as[models.ErpCopyCellContentToClipboard]
      case ErpSearchTable => data.as[models.ErpSearchTable]
      case ErpUpdateShowOnlySelectedRows => data.as[models.ErpUpdateShowOnlySelectedRows]
      case ErpSortTable => data.as[models.ErpSortTable]
      case ErpOpenRow => data.as[models.ErpOpenRow]
      case ErpCloseRow => data.as[models.ErpCloseRow]
      case ErpOpenAttachment => data.as[models.ErpOpenAttachment]
      case ErpCopyCoreDataToClipboard => data.as[models.ErpCopyCoreDataToClipboard]
      case ErpCopyCoreDataAndReferencesToClipboard => data.as[models.ErpCopyCoreDataAndReferencesToClipboard]
      case ErpCopyReferenceToClipboard => data.as[models.ErpCopyReferenceToClipboard]
      case ErpNavigateToReference => data.as[models.ErpNavigateToReference]
      case ErpNavigateBack => data.as[models.ErpNavigateBack]

      case UpdateNotesText => data.as[models.UpdateNotesText]

      case StartSurveyCommand => data.as[models.StartSurveyCommand]
      case EndSurveyCommand => data.as[models.EndSurveyCommand]
      case StartScenarioCommand => data.as[models.StartScenarioCommand]
      case StartQuestionnaireCommand => data.as[models.StartQuestionnaireCommand]

      case SendSupervisorChatMessage => data.as[models.SendSupervisorChatMessage]
      case SendParticipantChatMessage => data.as[models.SendParticipantChatMessage]
      case ReceiveSupervisorChatMessage => data.as[models.ReceiveSupervisorChatMessage]

      case surveyEventType => Left(DecodingFailure(s"Event type $surveyEventType should not have data", Nil))
    }
}

trait SurveyEventServiceActions extends AllSurveyEvent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def surveyStartAndEndEventsQuotation(invitationId: UUID) =
    quote(
      allSurveyEventsForParticipantQuotation(invitationId)
        .filter(event =>
          event.eventType == lift(StartProject: SurveyEventType)
            || event.eventType == lift(EndProject: SurveyEventType)))

  def projectModuleStartAndEndEventsQuotation(surveyId: UUID) =
    quote(
      allSurveyEventsForSurveyQuotation(surveyId)
        .filter(event =>
          event.eventType == lift(StartScenario: SurveyEventType)
            || event.eventType == lift(EndScenario: SurveyEventType)
            || event.eventType == lift(StartQuestionnaire: SurveyEventType)
            || event.eventType == lift(EndQuestionnaire: SurveyEventType)))
}
