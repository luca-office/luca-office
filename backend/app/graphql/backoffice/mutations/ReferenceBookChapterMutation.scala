package graphql.backoffice.mutations

import database.generated.public.ReferenceBookChapter
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ReferenceBookChapterCreation, ReferenceBookChapterUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ReferenceBookChapterMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createReferenceBookChapter(creation: ReferenceBookChapterCreation): Future[ReferenceBookChapter] =
    runWithUserAccount(userAccount => referenceBookChapterService.create(userAccount.id)(creation))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateReferenceBookChapter(id: UUID, update: ReferenceBookChapterUpdate): Future[ReferenceBookChapter] =
    referenceBookChapterService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteReferenceBookChapter(id: UUID): Future[UUID] =
    runWithUserAccount(userAccount => referenceBookChapterService.delete(id, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def publishReferenceBookChapter(id: UUID): Future[ReferenceBookChapter] =
    runWithUserAccount(userAccount => referenceBookChapterService.publish(id, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def archiveReferenceBookChapter(id: UUID): Future[ReferenceBookChapter] =
    runWithUserAccount(userAccount => referenceBookChapterService.archive(id, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def duplicateReferenceBookChapter(id: UUID): Future[ReferenceBookChapter] =
    runWithUserAccount(userAccount => referenceBookChapterService.duplicate(id, userAccount))
}
