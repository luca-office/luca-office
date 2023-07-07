import {GraphQLObjectType} from "graphql"
import {camelCase} from "lodash"
import {findRelatedTypeNames} from "../utils/associative-type-helper"

export const createServiceAssociativeDefaultCrudFileContent = (type: GraphQLObjectType) => {
  const typeName = type.name
  const [firstRelatedTypeName, secondRelatedTypeName] = findRelatedTypeNames(type)

  return createFileContent(typeName, firstRelatedTypeName, secondRelatedTypeName)
}

const createFileContent = (typeName: string, firstRelatedTypeName: string, secondRelatedTypeName: string) =>
  `package services.generated

import database.DatabaseContext
import database.generated.public.{${firstRelatedTypeName}, ${typeName}, ${secondRelatedTypeName}}

import java.util.UUID
import scala.concurrent.ExecutionContext

trait Default${secondRelatedTypeName}sFor${firstRelatedTypeName} {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def ${camelCase(secondRelatedTypeName)}sFor${firstRelatedTypeName}Action(${camelCase(firstRelatedTypeName)}Id: UUID) =
    runIO(${camelCase(secondRelatedTypeName)}sFor${firstRelatedTypeName}Quotation(${camelCase(firstRelatedTypeName)}Id))

  def ${camelCase(secondRelatedTypeName)}sFor${firstRelatedTypeName}Quotation(${camelCase(firstRelatedTypeName)}Id: UUID) =
    quote(for {
      ${camelCase(firstRelatedTypeName)}${secondRelatedTypeName} <- query[${typeName}].filter(_.${camelCase(firstRelatedTypeName)}Id == lift(${camelCase(firstRelatedTypeName)}Id))
      ${camelCase(secondRelatedTypeName)} <- query[${secondRelatedTypeName}].filter(_.id == ${camelCase(firstRelatedTypeName)}${secondRelatedTypeName}.${camelCase(secondRelatedTypeName)}Id)
    } yield ${camelCase(secondRelatedTypeName)})
}

trait Default${firstRelatedTypeName}sFor${secondRelatedTypeName} {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def ${camelCase(firstRelatedTypeName)}sFor${secondRelatedTypeName}Action(${camelCase(secondRelatedTypeName)}Id: UUID) =
    runIO(${camelCase(firstRelatedTypeName)}sFor${secondRelatedTypeName}Quotation(${camelCase(secondRelatedTypeName)}Id))

  def ${camelCase(firstRelatedTypeName)}sFor${secondRelatedTypeName}Quotation(${camelCase(secondRelatedTypeName)}Id: UUID) =
    quote(for {
      ${camelCase(firstRelatedTypeName)}${secondRelatedTypeName} <- query[${typeName}].filter(_.${camelCase(secondRelatedTypeName)}Id == lift(${camelCase(secondRelatedTypeName)}Id))
      ${camelCase(firstRelatedTypeName)} <- query[${firstRelatedTypeName}].filter(_.id == ${camelCase(firstRelatedTypeName)}${secondRelatedTypeName}.${camelCase(firstRelatedTypeName)}Id)
    } yield ${camelCase(firstRelatedTypeName)})
}

trait DefaultCreate${typeName} {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def create${typeName}Action(${camelCase(firstRelatedTypeName)}Id: UUID, ${camelCase(secondRelatedTypeName)}Id: UUID) =
    runIO(create${typeName}Quotation(${camelCase(firstRelatedTypeName)}Id, ${camelCase(secondRelatedTypeName)}Id))

  def create${typeName}Quotation(${camelCase(firstRelatedTypeName)}Id: UUID, ${camelCase(secondRelatedTypeName)}Id: UUID) =
    quote(
      query[${typeName}]
        .insert(lift(${typeName}(${camelCase(firstRelatedTypeName)}Id = ${camelCase(firstRelatedTypeName)}Id,
          ${camelCase(secondRelatedTypeName)}Id = ${camelCase(secondRelatedTypeName)}Id)))
        .returning(${camelCase(firstRelatedTypeName)} => ${camelCase(firstRelatedTypeName)}))
}

trait DefaultDelete${typeName} {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def delete${typeName}Action(${camelCase(firstRelatedTypeName)}Id: UUID, ${camelCase(secondRelatedTypeName)}Id: UUID)=
    runIO(delete${typeName}Quotation(${camelCase(firstRelatedTypeName)}Id, ${camelCase(secondRelatedTypeName)}Id))

  def delete${typeName}Quotation(${camelCase(firstRelatedTypeName)}Id: UUID, ${camelCase(secondRelatedTypeName)}Id: UUID) =
    quote(
      query[${typeName}]
        .filter(row => row.${camelCase(firstRelatedTypeName)}Id == lift(${camelCase(firstRelatedTypeName)}Id)
          && row.${camelCase(secondRelatedTypeName)}Id == lift(${camelCase(secondRelatedTypeName)}Id))
        .delete
        .returning(row => ${typeName}(row.${camelCase(firstRelatedTypeName)}Id, row.${camelCase(secondRelatedTypeName)}Id)))
}
`
