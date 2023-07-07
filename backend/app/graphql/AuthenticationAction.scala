package graphql

import java.util.UUID

sealed trait AuthenticationAction

case class Login(userAccountId: UUID) extends AuthenticationAction
case object Logout extends AuthenticationAction
