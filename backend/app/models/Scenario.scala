package models

import java.time.Instant
import java.util.UUID

case class ScenarioCreation(
    date: Option[Instant],
    name: String,
    description: String,
    maxDurationInSeconds: Option[Int],
    introductionEmailId: Option[UUID],
    shouldDisplayTime: Boolean,
    tags: Seq[String],
    completionEmailAddress: Option[String],
    shouldHideReferenceBookChapters: Boolean,
    sampleCompanyId: Option[UUID]
)

case class ScenarioUpdate(
    date: Option[Instant],
    name: String,
    description: String,
    maxDurationInSeconds: Option[Int],
    introductionEmailId: Option[UUID],
    shouldDisplayTime: Boolean,
    tags: Seq[String],
    completionEmailAddress: Option[String],
    shouldHideReferenceBookChapters: Boolean,
    sampleCompanyId: Option[UUID]
)
