package models

import java.time.Instant

case class Period(start: Option[Instant], end: Option[Instant])
