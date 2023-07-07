package utils

import io.circe.generic.extras.{AutoDerivation, Configuration}
import models.ActorMessage

import scala.concurrent.duration.DurationInt

object ActorUtils {

  import CirceCodec._
  import io.circe.syntax._

  val pingDelay = 10.seconds

  def serialize(message: ActorMessage): String = message.asJson.spaces2
}

object CirceCodec extends AutoDerivation {
  implicit val configuration: Configuration = Configuration.default.withDiscriminator("type")
}
