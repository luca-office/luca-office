package models

import enums.ProjectModuleProgressType

import java.util.UUID

case class ParticipantProjectModuleProgress(
    scenarioId: Option[UUID],
    questionnaireId: Option[UUID],
    status: ProjectModuleProgressType,
    questionsInProgressCount: Option[Int],
    requiredDocumentsCount: Option[Int],
    openedRequiredDocumentsCount: Option[Int])
