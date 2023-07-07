package models

import java.util.UUID

case class ProjectModuleProgress(
    projectModuleId: UUID,
    inProgressParticipationsCount: Int,
    completedParticipationsCount: Int)
