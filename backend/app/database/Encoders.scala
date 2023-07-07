package database

import java.time.Instant

import io.circe.Json
import io.circe.parser.parse
import io.getquill.MappedEncoding
import org.joda.time.DateTime

object Encoders {

  implicit val decodeInstant: MappedEncoding[DateTime, Instant] =
    MappedEncoding[DateTime, Instant](dateTime => Instant.ofEpochMilli(dateTime.getMillis))
  implicit val encodeInstant: MappedEncoding[Instant, DateTime] =
    MappedEncoding[Instant, DateTime](instant => new DateTime(instant.toEpochMilli))

  implicit val decodeJson: MappedEncoding[String, Json] =
    MappedEncoding[String, Json](string =>
      parse(string).getOrElse(throw new Throwable(s"Couldn't parse json value $string")))
  implicit val encodeJson: MappedEncoding[Json, String] =
    MappedEncoding[Json, String](json => json.toString)
}
