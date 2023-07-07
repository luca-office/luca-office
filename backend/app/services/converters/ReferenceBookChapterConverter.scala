package services.converters

import database.generated.public.ReferenceBookChapter
import models.ReferenceBookChapterCreation
import utils.DateUtils

import java.util.UUID

object ReferenceBookChapterConverter {

  def toReferenceBookChapter(creation: ReferenceBookChapterCreation, authorId: UUID): ReferenceBookChapter =
    ReferenceBookChapter(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      publishedAt = None,
      archivedAt = None,
      authorId = authorId,
      title = creation.title,
      description = creation.description
    )

  def toReferenceBookChapterCreation(referenceBookChapter: ReferenceBookChapter): ReferenceBookChapterCreation =
    ReferenceBookChapterCreation(title = referenceBookChapter.title, description = referenceBookChapter.description)
}
