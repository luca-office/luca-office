import {GraphQLField, GraphQLNamedType, GraphQLOutputType, isListType, isNonNullType} from "graphql"

const toScalaTypePrimitive = (type: GraphQLNamedType) => {
  switch (type.name) {
    case "ID":
      return "UUID"
    default:
      return type.name
  }
}

export const toScalaType = (type: GraphQLOutputType, isInnerType = false): string => {
  if (isNonNullType(type)) {
    return toScalaType(type.ofType, true)
  }

  if (isListType(type)) {
    return `Seq[${toScalaType(type.ofType, true)}]`
  }

  if (!isInnerType) {
    return `Option[${toScalaTypePrimitive(type)}]`
  }

  return toScalaTypePrimitive(type)
}

const extractMostInnerType = (type: GraphQLOutputType): GraphQLNamedType =>
  isNonNullType(type) || isListType(type) ? extractMostInnerType(type.ofType) : type

export const extractInnerFieldType = (field: GraphQLField<any, any>) => extractMostInnerType(field.type)
