package models

import java.util.UUID

case class DirectoryCreation(
    name: String,
    parentDirectoryId: Option[UUID],
    scenarioId: Option[UUID],
    sampleCompanyId: Option[UUID]
)

case class DirectoryUpdate(
    name: String,
    parentDirectoryId: Option[UUID]
)
