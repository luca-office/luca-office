import {GraphQLObjectType} from "graphql"

export const isAssociativeType = (type: GraphQLObjectType) => {
  const directives = type.astNode?.directives || []
  return directives.some(directive => directive.name && directive.name.value === "associative")
}
