package services.converters

import database.generated.public.File
import models.FileCreation
import utils.DateUtils

import java.util.UUID

object FileConverter {

  def toFile(creation: FileCreation): File =
    File(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      usageType = creation.usageType,
      name = creation.name,
      relevance = creation.relevance,
      tags = creation.tags,
      directoryId = creation.directoryId,
      emailId = creation.emailId,
      binaryFileId = creation.binaryFileId,
      spreadsheetId = creation.spreadsheetId,
      textDocumentId = creation.textDocumentId
    )

  def toFileCreation(file: File): FileCreation =
    FileCreation(
      usageType = file.usageType,
      name = file.name,
      relevance = file.relevance,
      tags = file.tags,
      directoryId = file.directoryId,
      emailId = file.emailId,
      binaryFileId = file.binaryFileId,
      spreadsheetId = file.spreadsheetId,
      textDocumentId = file.textDocumentId
    )
}
