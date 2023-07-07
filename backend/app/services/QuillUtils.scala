package services

import database.DatabaseContext

trait QuillUtils {
  val context: DatabaseContext

  import context.{Effect, IO}

  def liftIOOrFail[A](throwable: Throwable)(option: Option[A]): IO[A, Effect] =
    option.fold(IO.failed[A](throwable))(IO.successful)
}
