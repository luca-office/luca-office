package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait SurveyParticipationStatus

object SurveyParticipationStatus {

  case object ParticipationNotStarted extends SurveyParticipationStatus
  case object ParticipationInProgress extends SurveyParticipationStatus
  case object ParticipationFinished extends SurveyParticipationStatus
  case object RatingFinalized extends SurveyParticipationStatus

  def parse(value: String): SurveyParticipationStatus =
    value match {
      case "ParticipationNotStarted" => ParticipationNotStarted
      case "ParticipationInProgress" => ParticipationInProgress
      case "ParticipationFinished" => ParticipationFinished
      case "RatingFinalized" => RatingFinalized
    }

  def print(value: SurveyParticipationStatus): String = value.toString

  implicit val decoder: Decoder[SurveyParticipationStatus] =
    CirceUtils.mkDecoderWith[SurveyParticipationStatus](parse)

  implicit val encoder: Encoder[SurveyParticipationStatus] =
    CirceUtils.mkEncoderWith[SurveyParticipationStatus](print)
}
