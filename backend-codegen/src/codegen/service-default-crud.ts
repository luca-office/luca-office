import {GraphQLField, GraphQLObjectType} from "graphql"
import {camelCase} from "lodash"
import {isNoUpdateField} from "../utils/field-directive-helper"

export const createServiceDefaultCrudFileContent = (type: GraphQLObjectType) =>
  createFileContent(type.name, createUpdateMapping(Object.values(type.getFields())))

const createFileContent = (typeName: string, updateMapping: string) =>
  `package services.generated

import database.DatabaseContext
import database.generated.public.${typeName}
import models.{${typeName}Creation, ${typeName}Update}
import services.converters.${typeName}Converter.to${typeName}
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAll${typeName} {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all${typeName}sAction =
    runIO(all${typeName}sQuotation)

  def all${typeName}sQuotation =
    quote(query[${typeName}])
}

trait DefaultFind${typeName} {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def find${typeName}Action(id: UUID) =
    runIO(find${typeName}Quotation(id)).map(_.headOption)

  def find${typeName}Quotation(id: UUID) =
    quote(query[${typeName}].filter(_.id == lift(id)))
}

trait DefaultCreate${typeName} {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def create${typeName}Action(creation: ${typeName}Creation) =
    runIO(create${typeName}Quotation(creation))

  def create${typeName}Quotation(creation: ${typeName}Creation) =
    quote(
      query[${typeName}]
        .insert(lift(to${typeName}(creation)))
        .returning(${camelCase(typeName)} => ${camelCase(typeName)}))
}

trait DefaultUpdate${typeName} {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def update${typeName}Action(id: UUID, update: ${typeName}Update) =
    runIO(update${typeName}Quotation(id, update))

  def update${typeName}Quotation(id: UUID, update: ${typeName}Update) =
    quote(
      query[${typeName}]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          ${updateMapping}
        )
        .returning(${camelCase(typeName)} => ${camelCase(typeName)}))
}

trait DefaultDelete${typeName} {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def delete${typeName}Action(id: UUID) =
    runIO(delete${typeName}Quotation(id))

  def delete${typeName}Quotation(id: UUID) =
    quote(
      query[${typeName}]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
`

const createUpdateMapping = (fields: GraphQLField<any, any>[]) =>
  fields
    .filter(field => !isNoUpdateField(field))
    .map(field => `_.${field.name} -> lift(update.${field.name})`)
    .join(",")
