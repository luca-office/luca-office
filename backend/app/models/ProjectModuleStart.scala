package models

import java.time.Instant
import java.util.UUID

case class ProjectModuleStart(projectModuleId: UUID, startedAt: Instant)
