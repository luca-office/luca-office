import {GraphQLObjectType} from "graphql"
import {camelCase} from "lodash"
import {findRelatedTypeNames} from "../utils/associative-type-helper"

export const createGraphQlMutationAssociativeFileContent = (type: GraphQLObjectType) => {
  const [firstRelatedTypeName, secondRelatedTypeName] = findRelatedTypeNames(type)
  return createFileContent(type.name, firstRelatedTypeName, secondRelatedTypeName)
}

const createFileContent = (typeName: string, firstRelatedTypeName: string, secondRelatedTypeName: string) =>
  `package graphql.mutations    

import java.util.UUID

import database.generated.public.${typeName}
import graphql.{CustomContext, Private}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import scala.concurrent.Future

trait ${typeName}Mutation {
  context: CustomContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def create${typeName}(${camelCase(firstRelatedTypeName)}Id: UUID, ${camelCase(secondRelatedTypeName)}Id: UUID): Future[${typeName}] =
    ${camelCase(typeName)}Service.create(${camelCase(firstRelatedTypeName)}Id, ${camelCase(secondRelatedTypeName)}Id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def delete${typeName}(${camelCase(firstRelatedTypeName)}Id: UUID, ${camelCase(secondRelatedTypeName)}Id: UUID): Future[${typeName}] =
    ${camelCase(typeName)}Service.delete(${camelCase(firstRelatedTypeName)}Id, ${camelCase(secondRelatedTypeName)}Id)
}
`
