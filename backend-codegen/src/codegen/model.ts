import {
  GraphQLField,
  GraphQLFieldMap,
  GraphQLNamedType,
  GraphQLObjectType,
  isEnumType,
  isNonNullType,
  isObjectType
} from "graphql"
import {TypeMap} from "graphql/type/schema"
import {isDateField, isNoCreationField, isNoUpdateField} from "../utils/field-directive-helper"
import {extractInnerFieldType, toScalaType} from "../utils/type-helper"

export const createModelFileContent = (type: GraphQLObjectType, typeMap: TypeMap) => {
  const creationFields = Object.values(type.getFields()).filter(field => !isNoCreationField(field))
  const creationCaseClassString = createCaseClassString(`${type.name}Creation`, typeMap, creationFields)

  const updateFields = Object.values(type.getFields()).filter(field => !isNoUpdateField(field))
  const updateCaseClassString = createCaseClassString(`${type.name}Update`, typeMap, updateFields)

  return createFileContent(type, typeMap, creationCaseClassString, updateCaseClassString)
}

const createFileContent = (
  type: GraphQLObjectType,
  typeMap: TypeMap,
  creationCaseClass: string,
  updateCaseClass: string
) => `package models

import java.util.UUID
import java.time.Instant

${createUsedEnumImports(type)}
${creationCaseClass}
${updateCaseClass}
`

const createUsedEnumImports = (type: GraphQLObjectType) =>
  toFilteredFieldArray(type.getFields(), [])
    .map(extractInnerFieldType)
    .filter(isEnumType)
    .map(enumFieldType => `import enums.${enumFieldType.name}`)
    .join("\n")

const toFilteredFieldArray = (fields: GraphQLFieldMap<any, any>, excludedFieldNames: string[]) =>
  Object.keys(fields)
    .filter(fieldName => !excludedFieldNames.includes(fieldName))
    .map(fieldName => fields[fieldName])

const createCaseClassString = (typeName: string, typeMap: TypeMap, fields: GraphQLField<any, any>[] = []) => {
  const fieldsString = fields
    .map(field => {
      const innerFieldType = extractInnerFieldType(field)
      const propertyName = isObjectType(innerFieldType) ? `${field.name}Id` : field.name
      const propertyType = createPropertyType(field, innerFieldType)

      return `${propertyName}: ${propertyType}`
    })
    .join(", \n")

  return `
case class ${typeName}
(
    ${fieldsString}
)
    `
}

const createPropertyType = (field: GraphQLField<any, any>, innerFieldType: GraphQLNamedType) =>
  isObjectType(innerFieldType) ? createObjectPropertyType(field) : createPrimitivePropertyType(field)

const createPrimitivePropertyType = (field: GraphQLField<any, any>) =>
  isDateField(field) ? createDatePropertyType(field) : toScalaType(field.type)

const createObjectPropertyType = (field: GraphQLField<any, any>) =>
  isNonNullType(field.type) ? `UUID` : `Option[UUID]`

const createDatePropertyType = (field: GraphQLField<any, any>) =>
  isNonNullType(field.type) ? "Instant" : "Option[Instant]"
