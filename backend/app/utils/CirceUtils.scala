package utils

import cats.implicits._
import io.circe.syntax.EncoderOps
import io.circe.{Decoder, Encoder, Json}

import scala.util.Try

object CirceUtils {
  def mkEncoderWith[T](encode: T => String): Encoder[T] = Encoder.encodeString.contramap(encode)
  def mkDecoderWith[T](decode: String => T): Decoder[T] = Decoder.decodeString.emap(attemptOrError(decode))

  private def attemptOrError[A, R](mapping: A => R)(argument: A): Either[String, R] =
    Try(mapping(argument)).toEither.leftMap(_.getMessage)

  def addProperties(json: Json, properties: Seq[(String, String)]): Option[Json] =
    json.asObject.map(jsonObject =>
      properties
        .foldLeft(jsonObject) { case (accumulator, (key, value)) => accumulator.add(key, Json.fromString(value)) }
        .asJson)
}
