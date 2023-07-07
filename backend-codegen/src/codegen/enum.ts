import {GraphQLEnumType} from "graphql"

export const createEnumFileContent = (type: GraphQLEnumType) => {
  const typeName = type.name
  const values = type.getValues()
  const caseObjects = values.map(value => `case object ${value.name} extends ${typeName}`).join("\n")
  const cases = values.map(value => `case "${value.name}" => ${value.name}`).join("\n")

  return createFileContent(typeName, caseObjects, cases)
}

const createFileContent = (typeName: string, caseObjects: string, cases: string) =>
  `package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait ${typeName}

object ${typeName} {

  ${caseObjects}

  def parse(value: String): ${typeName} =
    value match {
      ${cases}
    }

  def print(value: ${typeName}): String = value.toString

  implicit val decoder: Decoder[${typeName}] =
    CirceUtils.mkDecoderWith[${typeName}](parse)

  implicit val encoder: Encoder[${typeName}] =
    CirceUtils.mkEncoderWith[${typeName}](print)
}
`
