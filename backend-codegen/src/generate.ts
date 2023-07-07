import {buildSchema, GraphQLEnumType, GraphQLObjectType, isEnumType, isObjectType} from "graphql"
import {TypeMap} from "graphql/type/schema"
import {startsWith} from "lodash"
import {createModelFileContent} from "./codegen/model"
import {createServiceFileContent} from "./codegen/service"
import {createGraphQlQueryFileContent} from "./codegen/graphql-query"
import {createGraphQlMutationFileContent} from "./codegen/graphql-mutation"
import {createEnumEncodersFileContent} from "./codegen/enum-encoders"
import {createEnumTypesFileContent} from "./codegen/enum-types"
import {createEnumFileContent} from "./codegen/enum"
import {isAssociativeType} from "./utils/type-directive-helper"
import {createServiceAssociativeFileContent} from "./codegen/service-associative"
import {createGraphQlQueryAssociativeFileContent} from "./codegen/graphql-query-associative"
import {createGraphQlMutationAssociativeFileContent} from "./codegen/graphql-mutation-associative"
import {createServiceDefaultCrudFileContent} from "./codegen/service-default-crud"
import {createServiceAssociativeDefaultCrudFileContent} from "./codegen/service-default-crud-associative"

export const createFileContents = (inputFileContent: string): {[filename: string]: string} => {
  const typeMap = buildSchema(inputFileContent).getTypeMap()
  const types = Object.values(typeMap).filter(type => !startsWith(type.name, "__"))
  const objectTypes = types.filter(isObjectType)
  const enumTypes = types.filter(isEnumType)

  return {
    [`/app/database/EnumEncoders.scala`]: createEnumEncodersFileContent(enumTypes),
    [`/app/graphql/EnumTypes.scala`]: createEnumTypesFileContent(enumTypes),
    ...createEnumTypeFileContents(enumTypes),
    ...objectTypeFileContents(objectTypes, typeMap)
  }
}

const createEnumTypeFileContents = (enumTypes: GraphQLEnumType[]) =>
  enumTypes.reduce(
    (accumulator, enumType) => ({
      ...accumulator,
      [`/app/enums/${enumType.name}.scala`]: createEnumFileContent(enumType)
    }),
    {}
  )

const objectTypeFileContents = (objectTypes: GraphQLObjectType[], typeMap: TypeMap) =>
  objectTypes.reduce(
    (accumulator, type) => ({
      ...accumulator,
      [`/app/models/${type.name}.scala`]: createModelFileContent(type, typeMap),
      [`/app/services/generated/${type.name}ServiceDefaultCrud.scala`]: isAssociativeType(type)
        ? createServiceAssociativeDefaultCrudFileContent(type)
        : createServiceDefaultCrudFileContent(type),
      [`/app/services/${type.name}Service.scala`]: (isAssociativeType(type)
        ? createServiceAssociativeFileContent
        : createServiceFileContent)(type),
      [`/app/graphql/queries/${type.name}Query.scala`]: (isAssociativeType(type)
        ? createGraphQlQueryAssociativeFileContent
        : createGraphQlQueryFileContent)(type),
      [`/app/graphql/mutations/${type.name}Mutation.scala`]: (isAssociativeType(type)
        ? createGraphQlMutationAssociativeFileContent
        : createGraphQlMutationFileContent)(type)
    }),
    {}
  )
