import {camelCase} from "lodash"
import {GraphQLObjectType} from "graphql"

export const createGraphQlMutationFileContent = (type: GraphQLObjectType) => createFileContent(type.name)

const createFileContent = (typeName: string) => `package graphql.mutations    

import java.util.UUID

import database.generated.public.${typeName}
import graphql.{CustomContext, Private}
import models.{${typeName}Creation, ${typeName}Update}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import scala.concurrent.Future

trait ${typeName}Mutation {
  context: CustomContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def create${typeName}(creation: ${typeName}Creation): Future[${typeName}] =
    ${camelCase(typeName)}Service.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def update${typeName}(id: UUID, update: ${typeName}Update): Future[${typeName}] =
    ${camelCase(typeName)}Service.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def delete${typeName}(id: UUID): Future[UUID] =
    ${camelCase(typeName)}Service.delete(id)
}
`
