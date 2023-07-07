package graphql.backoffice.mutations

import database.generated.public.SampleCompany
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{SampleCompanyCreation, SampleCompanyUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SampleCompanyMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createSampleCompany(creation: SampleCompanyCreation): Future[SampleCompany] =
    runWithUserAccount(userAccount => sampleCompanyService.create(userAccount.id)(creation))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateSampleCompany(id: UUID, update: SampleCompanyUpdate): Future[SampleCompany] =
    sampleCompanyService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteSampleCompany(id: UUID): Future[UUID] =
    sampleCompanyService.delete(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def publishSampleCompany(id: UUID): Future[SampleCompany] =
    runWithUserAccount(userAccount => sampleCompanyService.publish(id, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def archiveSampleCompany(id: UUID): Future[SampleCompany] =
    runWithUserAccount(userAccount => sampleCompanyService.archive(id, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def duplicateSampleCompany(id: UUID): Future[SampleCompany] =
    runWithUserAccount(userAccount => sampleCompanyService.duplicate(userAccount)(id))
}
