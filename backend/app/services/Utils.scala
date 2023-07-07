package services

import com.github.jasync.sql.db.postgresql.exceptions.GenericDatabaseException

object Utils {

  private val sqlStateKey = 'C'

  private val foreignKeyConstraintViolationErrorCode = "23503"
  private val uniqueConstraintViolationErrorCode = "23505"

  def isForeignKeyConstraintViolation(error: GenericDatabaseException): Boolean =
    error.getErrorMessage.getFields.getOrDefault(sqlStateKey, "-1") == foreignKeyConstraintViolationErrorCode

  def isUniqueConstraintViolation(error: GenericDatabaseException): Boolean =
    error.getErrorMessage.getFields.getOrDefault(sqlStateKey, "-1") == uniqueConstraintViolationErrorCode

  def defaultErrorHandler[T]: PartialFunction[Throwable, T] =
    (throwable: Throwable) =>
      throwable match {
        case apiError: ApiError =>
          throw apiError
        case _ =>
          throwable.getCause match {
            case error if error.isInstanceOf[ApiError] =>
              throw error
            case error: GenericDatabaseException if isForeignKeyConstraintViolation(error) =>
              throw ForeignKeyConstraintViolation(error.getMessage)
            case error: GenericDatabaseException if isUniqueConstraintViolation(error) =>
              throw UniqueConstraintViolation(error.getMessage)
            case null =>
              throw DatabaseError(s"Unknown error: ${throwable.getMessage}")
            case error =>
              throw DatabaseError(error.getMessage)
          }
      }
}
