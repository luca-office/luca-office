package utils

object OptionUtils {

  def sequence[T](options: Seq[Option[T]]): Option[Seq[T]] =
    if (options.contains(None)) None else Some(options.flatten)
}
