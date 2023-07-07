package services.converters

import java.util.UUID

import database.generated.public.BinaryFile
import models.BinaryFileCreation
import utils.DateUtils

object BinaryFileConverter {

  def toBinaryFile(creation: BinaryFileCreation): BinaryFile =
    BinaryFile(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      filename = creation.filename,
      fileSize = creation.fileSize,
      mimeType = creation.mimeType
    )
}
