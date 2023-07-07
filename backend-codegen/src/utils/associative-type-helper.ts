import {GraphQLObjectType} from "graphql"
import {findRelationTypeName, isRelation} from "./field-directive-helper"

export const findRelatedTypeNames = (type: GraphQLObjectType) =>
  Object.values(type.getFields()).filter(isRelation).map(findRelationTypeName)
