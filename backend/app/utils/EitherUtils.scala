package utils

object EitherUtils {

  def sequence[A, B](elements: Seq[Either[A, B]]): Either[A, Seq[B]] =
    elements.foldRight(Right(Nil): Either[A, List[B]])((element, accumulator) =>
      for (xs <- accumulator; x <- element) yield x :: xs)

  def allErrorsOrAllValues[A, B](items: Seq[Either[A, B]]): Either[Seq[A], Seq[B]] =
    items.collect { case Left(error) => error } match {
      case Nil => Right(items.collect { case Right(value) => value })
      case errors => Left(errors)
    }
}
