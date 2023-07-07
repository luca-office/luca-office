package utils

import scala.util.Random

object TokenUtils {

  private val length = 6

  def create: String = Random.alphanumeric.take(length).mkString("")
}
