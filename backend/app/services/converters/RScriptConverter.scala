package services.converters

import database.generated.public.RScript
import models.RScriptCreation
import utils.DateUtils

import java.util.UUID

object RScriptConverter {

  def toRScript(creation: RScriptCreation): RScript =
    RScript(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      archivedAt = None,
      title = creation.title,
      description = creation.description,
      version = creation.version,
      gitCommitHash = creation.gitCommitHash
    )
}
