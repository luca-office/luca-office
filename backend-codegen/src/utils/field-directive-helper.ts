import {GraphQLField} from "graphql"
import {StringValueNode} from "graphql/language/ast"

const hasDirective = (field: GraphQLField<any, any>, directiveName: string) => {
  const directives = field.astNode?.directives || []
  return directives.some(directive => directive.name.value === directiveName)
}

const findDirective = (field: GraphQLField<any, any>, directiveName: string) => {
  const directives = field.astNode?.directives || []
  return directives.find(directive => directive.name.value === directiveName)
}

export const isRelation = (field: GraphQLField<any, any>) => hasDirective(field, "relation")

export const isNoCreationField = (field: GraphQLField<any, any>) => hasDirective(field, "noCreationField")

export const isNoUpdateField = (field: GraphQLField<any, any>) => hasDirective(field, "noUpdateField")

export const isDateField = (field: GraphQLField<any, any>) => hasDirective(field, "isDate")

export const findRelationTypeName = (field: GraphQLField<any, any>) => {
  const directive = findDirective(field, "relation")
  const directiveArguments = directive?.arguments || []
  const typeNameArgument = directiveArguments.find(argument => argument.name.value === "typeName")

  return (typeNameArgument?.value as StringValueNode).value
}
