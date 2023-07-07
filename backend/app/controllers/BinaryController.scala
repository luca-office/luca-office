package controllers

import akka.stream.alpakka.file.ArchiveMetadata
import akka.stream.alpakka.file.scaladsl.Archive
import akka.stream.scaladsl.Source
import akka.util.ByteString
import enums.MimeType
import enums.MimeType.{ApplicationPdf, ImageGif, ImageJpeg, ImagePng, ImageSvg, Spreadsheet, TextHtml, VideoMp4}
import io.circe.generic.auto._
import io.circe.syntax._
import models.{BinaryFileCreation, SpreadsheetCreation}
import play.api.libs.Files
import play.api.libs.circe._
import play.api.mvc._
import services.{BinaryFileService, ErpService, SpreadsheetService, SurveyDataExportService}
import utils._

import java.io.{File, PrintWriter}
import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

class BinaryController @Inject() (
    controllerComponents: ControllerComponents,
    applicationConfiguration: ApplicationConfiguration,
    optionUserAction: OptionUserAction,
    binaryFileService: BinaryFileService,
    erpService: ErpService,
    spreadsheetService: SpreadsheetService,
    surveyDataExportService: SurveyDataExportService,
    storage: Storage)(implicit executionContext: ExecutionContext)
    extends AbstractController(controllerComponents)
    with Circe {

  def userRequiredAction: ActionBuilder[UserAccountRequest, AnyContent] =
    optionUserAction.andThen(UserRequiredFilter.UserRequiredFilter)

  case class Response[T](isSpreadsheet: Boolean, data: T)

  def create: Action[MultipartFormData[Files.TemporaryFile]] =
    userRequiredAction(parse.multipartFormData).async { request =>
      request.body.files.headOption match {
        case Some(file) =>
          file.contentType match {
            case Some(contentType) =>
              createForContentType(file, contentType)
            case None =>
              Future.successful(BadRequest("File has no content type"))
          }
        case _ =>
          Future.successful(BadRequest("No file available"))
      }
    }

  def createErpData(sampleCompanyId: UUID): Action[MultipartFormData[Files.TemporaryFile]] =
    userRequiredAction(parse.multipartFormData).async { request =>
      request.body.files.headOption match {
        case Some(file) =>
          file.contentType.map(toMimeType).flatMap(_.toOption) match {
            case Some(Spreadsheet) =>
              Excel.importFile(file.ref, shouldEvaluateFormulas = true) match {
                case Right(excelFile) =>
                  ErpImport.importFile(sampleCompanyId, excelFile) match {
                    case Success(erpData) =>
                      erpService.delete(sampleCompanyId).flatMap(_ => erpService.create(erpData).map(_ => Ok))
                    case Failure(error) =>
                      Future.successful(BadRequest(error.getMessage))
                  }
                case Left(error) =>
                  Future.successful(BadRequest(error.map(_.getMessage).mkString(", ")))
              }
            case _ =>
              Future.successful(BadRequest("File has no content type or content type is invalid"))
          }
        case _ =>
          Future.successful(BadRequest("No file available"))
      }
    }

  def downloadErpTemplate: Action[AnyContent] = userRequiredAction { _ =>
    ErpExport.createTemplateFile(erpImportDocumentationUrl) match {
      case Success(byteArrayStream) =>
        Ok(byteArrayStream.toByteArray)
          .withHeaders(("Content-Disposition", "attachment; filename=Luca ERP-Import-Template.xlsx"))
      case Failure(error) =>
        InternalServerError(error.getMessage)
    }
  }

  def downloadErpData(sampleCompanyId: UUID): Action[AnyContent] = userRequiredAction.async { _ =>
    erpService
      .all(sampleCompanyId)
      .map(erpData =>
        ErpExport.createDataFile(erpData, erpImportDocumentationUrl) match {
          case Success(byteArrayStream) =>
            Ok(byteArrayStream.toByteArray)
              .withHeaders(("Content-Disposition", "attachment; filename=Luca ERP-Export.xlsx"))
          case Failure(error) =>
            InternalServerError(error.getMessage)
        })
  }

  def downloadSurveyData(surveyId: UUID): Action[AnyContent] = userRequiredAction.async(
    surveyDataExportService
      .export(surveyId)
      .map { surveyDataExports =>
        val (contentLength, dataSourcePairs) =
          surveyDataExports.foldLeft((0, Nil): (Int, Seq[(ArchiveMetadata, Source[ByteString, Any])])) {
            (accumulator, exportData) =>
              val dataByteString = ByteString(exportData.asJson.spaces2)
              val source = Source.single(dataByteString)
              val metadata = ArchiveMetadata(s"${exportData.surveyInvitation.token}.json")
              val (contentLength, dataSourcePairs) = accumulator
              (contentLength + dataByteString.length, dataSourcePairs :+ (metadata, source))
          }

        Ok.streamed(
          content = Source(dataSourcePairs).via(Archive.zip()),
          inline = false,
          fileName = Some(s"Luca-Erhebungsdaten-${DateUtils.now.toString}.zip"),
          contentLength = Some(contentLength)
        )
      })

  def downloadSurveyBinaries(surveyId: UUID): Action[AnyContent] = userRequiredAction.async(
    surveyDataExportService
      .exportBinaries(surveyId)
      .map { binaryFiles =>
        if (binaryFiles.isEmpty) {
          val file = File.createTempFile("Luca-Erhebungsdaten-Empty-Binaries", "txt")
          new PrintWriter(file) {
            try write("Für diese Erhebung wurden keine Medien gefunden.")
            finally close()
          }
          file.deleteOnExit()
          Ok.sendFile(file)
        }
        else {
          val binaryFileTuplesSource = Source(binaryFiles)
            .flatMapConcat(binaryFile =>
              storage
                .download(binaryFile.id)
                .collect { case Some(response) => response }
                .map { case (source, _) =>
                  val filename = s"${binaryFile.id}-${binaryFile.filename}"
                  (ArchiveMetadata(filename), source)
                })

          Ok.chunked(
            content = binaryFileTuplesSource.via(Archive.zip()),
            inline = false,
            fileName = Some(s"Luca-Erhebungsdaten-Binaries-${DateUtils.now.toString}.zip")
          )
        }
      })

  private def createForContentType(file: MultipartFormData.FilePart[Files.TemporaryFile], contentType: String) =
    toMimeType(contentType) match {
      case Right(Spreadsheet) =>
        createSpreadsheet(file)
          .map(spreadsheet => Ok(Response(isSpreadsheet = true, data = spreadsheet).asJson))
          .recover { case error => BadRequest(error.getMessage) }
      case Right(mimeType) =>
        createBinaryFile(file, mimeType)
          .flatMap(binaryFile =>
            storage
              .create(binaryFile.id, contentType, file.ref)
              .map {
                case Success(_) => Ok(Response(isSpreadsheet = false, data = binaryFile).asJson)
                case Failure(error) => InternalServerError(error.getMessage)
              })
      case _ =>
        Future.successful(BadRequest(s"Unsupported content type $contentType"))
    }

  private def createBinaryFile(file: MultipartFormData.FilePart[Files.TemporaryFile], mimeType: MimeType) = {
    val creation = BinaryFileCreation(
      filename = file.filename,
      fileSize = file.fileSize,
      mimeType = mimeType
    )

    binaryFileService.create(creation)
  }

  private def createSpreadsheet(file: MultipartFormData.FilePart[Files.TemporaryFile]) =
    Excel.importFile(file.ref, shouldEvaluateFormulas = false) match {
      case Right(excelFile) =>
        val cells = excelFile.sheets.head.rows.flatMap(_.cells).filter(_.value.nonEmpty)
        spreadsheetService.createFromExcelFileCells(SpreadsheetCreation(file.filename, file.fileSize), cells)
      case Left(error) =>
        Future.failed(error.headOption.getOrElse(new Throwable("Unknown error")))
    }

  private def toMimeType(contentType: String) =
    contentType match {
      case "application/pdf" => Right(ApplicationPdf)
      case "image/gif" => Right(ImageGif)
      case "image/jpeg" => Right(ImageJpeg)
      case "image/png" => Right(ImagePng)
      case "image/svg+xml" => Right(ImageSvg)
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" => Right(Spreadsheet)
      case "text/html" => Right(TextHtml)
      case "video/mp4" => Right(VideoMp4)
      case _ => Left(())
    }

  private val erpImportDocumentationUrl =
    s"${applicationConfiguration.misc.backendBaseUrl}documentation/erp-import"
}
