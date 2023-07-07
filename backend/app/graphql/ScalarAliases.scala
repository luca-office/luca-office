package graphql

import java.time.format.DateTimeFormatter
import java.time.{Instant, ZoneOffset}
import java.util.UUID

import io.circe.parser.parse
import io.circe.{Json, ParsingFailure}
import sangria.schema.{FloatType, IntType, ScalarAlias, StringType}
import sangria.validation.ValueCoercionViolation

import scala.util.{Failure, Success, Try}

object ScalarAliases {

  implicit val UnitType: ScalarAlias[Unit, String] = ScalarAlias[Unit, String](
    aliasFor = StringType,
    toScalar = _ => "",
    fromScalar = _ => Right(())
  )

  case object InstantViolation extends ValueCoercionViolation("Invalid date")

  implicit val InstantType: ScalarAlias[Instant, String] = ScalarAlias[Instant, String](
    aliasFor = StringType,
    toScalar = _.atOffset(ZoneOffset.UTC).format(DateTimeFormatter.ISO_ZONED_DATE_TIME),
    fromScalar = value =>
      Try(Instant.parse(value)) match {
        case Success(instant) => Right(instant)
        case Failure(_) => Left(InstantViolation)
      }
  )

  case object UuidViolation extends ValueCoercionViolation("Invalid UUID")

  implicit val UuidType: ScalarAlias[UUID, String] = ScalarAlias[UUID, String](
    aliasFor = StringType,
    toScalar = _.toString,
    fromScalar = value =>
      Try(UUID.fromString(value)) match {
        case Success(uuid) => Right(uuid)
        case Failure(_) => Left(UuidViolation)
      }
  )

  case class JsonViolation(message: String) extends ValueCoercionViolation(message)

  implicit val JsonType: ScalarAlias[Json, String] = ScalarAlias[Json, String](
    aliasFor = StringType,
    toScalar = value => value.toString,
    fromScalar = value =>
      parse(value) match {
        case Left(ParsingFailure(message, _)) => Left(JsonViolation(message))
        case Right(parsedValue) => Right(parsedValue)
      }
  )

  case object LongViolation extends ValueCoercionViolation("Invalid Long")

  implicit val LongType: ScalarAlias[Long, Int] = ScalarAlias[Long, Int](
    aliasFor = IntType,
    toScalar = _.toInt,
    fromScalar = intValue => if (intValue.isValidLong) Right(intValue.toLong) else Left(LongViolation)
  )

  implicit val BigDecimalType: ScalarAlias[BigDecimal, Double] = ScalarAlias[BigDecimal, Double](
    aliasFor = FloatType,
    toScalar = _.toDouble,
    fromScalar = value => Right(BigDecimal(value))
  )
}
