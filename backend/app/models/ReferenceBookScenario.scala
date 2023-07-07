package models

import java.util.UUID

case class ReferenceBookChapterScenarioCreation(
    referenceBookChapterId: UUID,
    scenarioId: UUID
)

case class ReferenceBookChapterScenarioUpdate(
    referenceBookChapterId: UUID,
    scenarioId: UUID
)
