package services

trait ApiError extends Throwable {
  def message: String
}

case object LoginFailed extends ApiError {
  override def message = "Login failed"
}

case object EmailAddressAlreadyRegistered extends ApiError {
  override def message = "Email address already registered"
}

case object BackofficeTermsAndConditionsNotConfirmed extends ApiError {
  override def message = "Backoffice terms and conditions not confirmed"
}

case object InsufficientRights extends ApiError {
  override def message = "Insufficient rights"
}

case object Unauthorized extends ApiError {
  override def message = "Unauthorized"
}

case class ForeignKeyConstraintViolation(message: String) extends ApiError

case class UniqueConstraintViolation(message: String) extends ApiError

case class CustomError(message: String) extends ApiError

case class DatabaseError(message: String) extends ApiError

case class DataValidationError(message: String) extends ApiError

case object EntityNotFound extends ApiError {
  override def message = "Entity not found"
}

case object EntityAlreadyFinalized extends ApiError {
  override def message = "Entity already finalized"
}

case object EntityNotFinalized extends ApiError {
  override def message = "Entity not finalized"
}

case object EntityAlreadyPublished extends ApiError {
  override def message = "Entity already published"
}

case object EntityNotPublished extends ApiError {
  override def message = "Entity not published"
}

case object EntityNotFinalizedAndNotPublished extends ApiError {
  override def message = "Entity not finalized and not published"
}

case object EntityAlreadyArchived extends ApiError {
  override def message = "Entity already archived"
}

case object EntityIsInUse extends ApiError {
  override def message = "Entity is in use"
}

case object OpenParticipationIsDisabled extends ApiError {
  override def message = "Open participation is disabled"
}

case object ProjectHasPrivateModules extends ApiError {
  override def message = "Project has private modules"
}

case object ProjectAlreadyHasSurveys extends ApiError {
  override def message = "Project already has surveys"
}

case object SurveyNotStartedYet extends ApiError {
  override def message = "Survey not started yet"
}

case object SurveyAlreadyStarted extends ApiError {
  override def message = "Survey already started"
}

case object SurveyAlreadyEnded extends ApiError {
  override def message = "Survey already ended"
}

case object TokenAlreadyUsed extends ApiError {
  override def message = "Token already used"
}

case object UserAccountHasAlreadyParticipated extends ApiError {
  override def message = "User account has already participated"
}

case object ResetPasswordTokensDontMatch extends ApiError {
  override def message = "Reset password token is wrong"
}
