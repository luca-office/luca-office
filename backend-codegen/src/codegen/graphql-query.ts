import {camelCase} from "lodash"
import {GraphQLObjectType} from "graphql"

export const createGraphQlQueryFileContent = (type: GraphQLObjectType) => createFileContent(type.name)

const createFileContent = (typeName: string) => `package graphql.queries

import java.util.UUID

import database.generated.public.${typeName}
import graphql.{CustomContext, Private}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import scala.concurrent.Future

trait ${typeName}Query {
  context: CustomContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def ${camelCase(typeName)}s: Future[Seq[${typeName}]] =
    ${camelCase(typeName)}Service.all

  @GraphQLField
  @GraphQLFieldTags(Private)
  def ${camelCase(typeName)}(id: UUID): Future[Option[${typeName}]] =
    ${camelCase(typeName)}Service.find(id)
}
`
