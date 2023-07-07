package models

import enums.ReferenceBookContentType

import java.util.UUID

case class ReferenceBookContentCreation(
    contentType: ReferenceBookContentType,
    text: Option[String],
    imageBinaryFileId: Option[UUID],
    pdfBinaryFileId: Option[UUID],
    videoBinaryFileId: Option[UUID],
    referenceBookArticleId: UUID
)

case class ReferenceBookContentUpdate(
    text: Option[String],
    imageBinaryFileId: Option[UUID],
    pdfBinaryFileId: Option[UUID],
    videoBinaryFileId: Option[UUID]
)
