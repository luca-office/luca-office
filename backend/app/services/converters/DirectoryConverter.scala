package services.converters

import database.generated.public.Directory
import models.DirectoryCreation
import utils.DateUtils

import java.util.UUID

object DirectoryConverter {

  def toDirectory(creation: DirectoryCreation): Directory =
    Directory(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      name = creation.name,
      parentDirectoryId = creation.parentDirectoryId,
      scenarioId = creation.scenarioId,
      sampleCompanyId = creation.sampleCompanyId
    )

  def toDirectoryCreation(directory: Directory): DirectoryCreation =
    DirectoryCreation(
      name = directory.name,
      parentDirectoryId = directory.parentDirectoryId,
      scenarioId = directory.scenarioId,
      sampleCompanyId = directory.sampleCompanyId
    )
}
