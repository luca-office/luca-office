import {GraphQLEnumType} from "graphql"

export const createEnumEncodersFileContent = (types: GraphQLEnumType[]) => {
  const encodersDecoders = types.map(type => createEncoderDecoder(type.name)).join("")
  return createFileContent(encodersDecoders)
}

const createFileContent = (encodersDecoders: string) =>
  `package database

import enums._
import io.getquill.MappedEncoding

object EnumEncoders {
  ${encodersDecoders}
}
`

const createEncoderDecoder = (typeName: string) =>
  `
implicit val decode${typeName}: MappedEncoding[String, ${typeName}] =
  MappedEncoding[String, ${typeName}](${typeName}.parse)
implicit val encode${typeName}: MappedEncoding[${typeName}, String] =
  MappedEncoding[${typeName}, String](${typeName}.print)
`
