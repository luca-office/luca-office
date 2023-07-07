package models

import enums.{FileUsageType, Relevance}

import java.util.UUID

case class FileCreation(
    usageType: FileUsageType,
    name: String,
    relevance: Relevance,
    tags: Seq[String],
    directoryId: Option[UUID],
    emailId: Option[UUID],
    binaryFileId: Option[UUID],
    spreadsheetId: Option[UUID],
    textDocumentId: Option[UUID]
)

case class FileUpdate(
    name: String,
    relevance: Relevance,
    tags: Seq[String],
    directoryId: Option[UUID],
    binaryFileId: Option[UUID]
)
