package services.converters

import java.util.UUID

import database.generated.public.Project
import models.ProjectCreation
import utils.DateUtils

object ProjectConverter {

  def toProject(creation: ProjectCreation, authorId: UUID): Project =
    Project(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      authorId = authorId,
      name = creation.name,
      description = creation.description,
      usageField = creation.usageField,
      audience = creation.audience,
      welcomeText = creation.welcomeText
    )
}
