import {GraphQLObjectType} from "graphql"
import {camelCase} from "lodash"
import {findRelatedTypeNames} from "../utils/associative-type-helper"

export const createServiceAssociativeFileContent = (type: GraphQLObjectType) => {
  const typeName = type.name
  const [firstRelatedTypeName, secondRelatedTypeName] = findRelatedTypeNames(type)

  return createFileContent(typeName, firstRelatedTypeName, secondRelatedTypeName)
}

const createFileContent = (typeName: string, firstRelatedTypeName: string, secondRelatedTypeName: string) =>
  `package services

import database.DatabaseContext
import database.generated.public.{${firstRelatedTypeName}, ${typeName}, ${secondRelatedTypeName}}
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ${typeName}Service @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends Default${firstRelatedTypeName}sFor${secondRelatedTypeName}
    with Default${secondRelatedTypeName}sFor${firstRelatedTypeName}
    with DefaultCreate${typeName}
    with DefaultDelete${typeName} {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def ${camelCase(secondRelatedTypeName)}sFor${firstRelatedTypeName}(${firstRelatedTypeName}Id: UUID): Future[Seq[${secondRelatedTypeName}]] =
    performIO(${camelCase(secondRelatedTypeName)}sFor${firstRelatedTypeName}Action(${firstRelatedTypeName}Id))

  def ${camelCase(firstRelatedTypeName)}sFor${secondRelatedTypeName}(${secondRelatedTypeName}Id: UUID): Future[Seq[${firstRelatedTypeName}]] =
    performIO(${camelCase(firstRelatedTypeName)}sFor${secondRelatedTypeName}Action(${secondRelatedTypeName}Id))

  def create(${firstRelatedTypeName}Id: UUID, ${secondRelatedTypeName}Id: UUID): Future[${typeName}] =
    performIO(create${typeName}Action(${firstRelatedTypeName}Id, ${secondRelatedTypeName}Id))

  def delete(${firstRelatedTypeName}Id: UUID, ${secondRelatedTypeName}Id: UUID): Future[${typeName}] =
    performIO(delete${typeName}Action(${firstRelatedTypeName}Id, ${secondRelatedTypeName}Id))
}
`
