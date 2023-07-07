package models

import java.util.UUID

case class ReferenceBookArticleCreation(
    title: String,
    referenceBookChapterId: UUID
)

case class ReferenceBookArticleUpdate(
    title: String
)
