package services.converters

import java.util.UUID

import database.generated.public.ReferenceBookArticle
import models.ReferenceBookArticleCreation
import utils.DateUtils

object ReferenceBookArticleConverter {

  def toReferenceBookArticle(creation: ReferenceBookArticleCreation, position: BigDecimal): ReferenceBookArticle =
    ReferenceBookArticle(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      referenceBookChapterId = creation.referenceBookChapterId,
      position = position
    )

  def toReferenceBookArticleCreation(referenceBookArticle: ReferenceBookArticle): ReferenceBookArticleCreation =
    ReferenceBookArticleCreation(
      title = referenceBookArticle.title,
      referenceBookChapterId = referenceBookArticle.referenceBookChapterId)
}
