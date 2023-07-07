package services.converters

import database.generated.public.SampleCompany
import models.SampleCompanyCreation
import utils.DateUtils

import java.util.UUID

object SampleCompanyConverter {

  def toSampleCompany(creation: SampleCompanyCreation, authorId: UUID): SampleCompany =
    SampleCompany(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      publishedAt = None,
      archivedAt = None,
      authorId = authorId,
      name = creation.name,
      description = creation.description,
      tags = creation.tags,
      emailSignature = creation.emailSignature,
      profileFileId = creation.profileFileId,
      logoFileId = creation.logoFileId,
      domain = creation.domain
    )

  def toSampleCompanyCreation(sampleCompany: SampleCompany): SampleCompanyCreation =
    SampleCompanyCreation(
      name = sampleCompany.name,
      description = sampleCompany.description,
      tags = sampleCompany.tags,
      emailSignature = sampleCompany.emailSignature,
      profileFileId = sampleCompany.profileFileId,
      logoFileId = sampleCompany.logoFileId,
      domain = sampleCompany.domain
    )
}
