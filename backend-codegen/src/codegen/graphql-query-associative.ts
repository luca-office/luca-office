import {GraphQLObjectType} from "graphql"
import {camelCase} from "lodash"
import {findRelatedTypeNames} from "../utils/associative-type-helper"

export const createGraphQlQueryAssociativeFileContent = (type: GraphQLObjectType) => {
  const [firstRelatedTypeName, secondRelatedTypeName] = findRelatedTypeNames(type)
  return createFileContent(type.name, firstRelatedTypeName, secondRelatedTypeName)
}

const createFileContent = (typeName: string, firstRelatedTypeName: string, secondRelatedTypeName: string) =>
  `package graphql.queries    

import java.util.UUID

import database.generated.public.{${firstRelatedTypeName}, ${secondRelatedTypeName}}
import graphql.{CustomContext, Private}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import scala.concurrent.Future

trait ${typeName}Query {
  context: CustomContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def ${camelCase(secondRelatedTypeName)}sFor${firstRelatedTypeName}(${camelCase(firstRelatedTypeName)}Id: UUID): Future[Seq[${secondRelatedTypeName}]] =
    ${camelCase(typeName)}Service.${camelCase(secondRelatedTypeName)}sFor${firstRelatedTypeName}(${camelCase(firstRelatedTypeName)}Id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def ${camelCase(firstRelatedTypeName)}sFor${secondRelatedTypeName}(${camelCase(secondRelatedTypeName)}Id: UUID): Future[Seq[${firstRelatedTypeName}]] =
    ${camelCase(typeName)}Service.${camelCase(firstRelatedTypeName)}sFor${secondRelatedTypeName}(${camelCase(secondRelatedTypeName)}Id)
}
`
