package services.converters

import database.generated.public.ReferenceBookContent
import models.ReferenceBookContentCreation
import utils.DateUtils

import java.util.UUID

object ReferenceBookContentConverter {

  def toReferenceBookContent(creation: ReferenceBookContentCreation, position: BigDecimal): ReferenceBookContent =
    ReferenceBookContent(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      position = position,
      contentType = creation.contentType,
      text = creation.text,
      imageBinaryFileId = creation.imageBinaryFileId,
      pdfBinaryFileId = creation.pdfBinaryFileId,
      videoBinaryFileId = creation.videoBinaryFileId,
      referenceBookArticleId = creation.referenceBookArticleId
    )

  def toReferenceBookContentCreation(referenceBookContent: ReferenceBookContent): ReferenceBookContentCreation =
    ReferenceBookContentCreation(
      contentType = referenceBookContent.contentType,
      text = referenceBookContent.text,
      imageBinaryFileId = referenceBookContent.imageBinaryFileId,
      pdfBinaryFileId = referenceBookContent.pdfBinaryFileId,
      videoBinaryFileId = referenceBookContent.videoBinaryFileId,
      referenceBookArticleId = referenceBookContent.id
    )
}
