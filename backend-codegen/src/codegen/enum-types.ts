import {GraphQLEnumType} from "graphql"

export const createEnumTypesFileContent = (types: GraphQLEnumType[]) => {
  const enumTypes = types.map(type => createType(type.name)).join("\n")
  return createFileContent(enumTypes)
}

const createFileContent = (enumTypes: string) =>
  `package graphql

import enums._
import sangria.macros.derive.deriveEnumType

object EnumTypes {

  ${enumTypes}
}
`

const createType = (typeName: string) => `implicit val ${typeName}EnumType = deriveEnumType[${typeName}]()`
