package services.converters

import database.generated.public.Scenario
import models.ScenarioCreation
import utils.DateUtils

import java.util.UUID

object ScenarioConverter {

  def toScenario(creation: ScenarioCreation, authorId: UUID): Scenario =
    Scenario(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      finalizedAt = None,
      publishedAt = None,
      archivedAt = None,
      date = creation.date,
      name = creation.name,
      description = creation.description,
      maxDurationInSeconds = creation.maxDurationInSeconds,
      introductionEmailId = creation.introductionEmailId,
      authorId = authorId,
      shouldDisplayTime = creation.shouldDisplayTime,
      tags = creation.tags,
      completionEmailAddress = creation.completionEmailAddress,
      shouldHideReferenceBookChapters = creation.shouldHideReferenceBookChapters,
      sampleCompanyId = creation.sampleCompanyId
    )

  def toScenarioCreation(scenario: Scenario): ScenarioCreation =
    ScenarioCreation(
      date = scenario.date,
      name = scenario.name,
      description = scenario.description,
      maxDurationInSeconds = scenario.maxDurationInSeconds,
      introductionEmailId = scenario.introductionEmailId,
      shouldDisplayTime = scenario.shouldDisplayTime,
      tags = scenario.tags,
      completionEmailAddress = scenario.completionEmailAddress,
      shouldHideReferenceBookChapters = scenario.shouldHideReferenceBookChapters,
      sampleCompanyId = scenario.sampleCompanyId
    )
}
