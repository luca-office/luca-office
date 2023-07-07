package graphql.player

import graphql.Private
import sangria.execution._
import sangria.schema.Context
import services.Unauthorized

object PlayerSecurityMiddleware extends Middleware[PlayerContext] with MiddlewareBeforeField[PlayerContext] {
  type QueryVal = Unit
  type FieldVal = Unit

  def beforeQuery(context: MiddlewareQueryContext[PlayerContext, _, _]): QueryVal = ()

  def afterQuery(queryVal: QueryVal, context: MiddlewareQueryContext[PlayerContext, _, _]): Unit = ()

  def beforeField(
      queryVal: QueryVal,
      middlewareContext: MiddlewareQueryContext[PlayerContext, _, _],
      context: Context[PlayerContext, _]): BeforeFieldResult[PlayerContext, FieldVal] =
    if (context.field.tags.contains(Private) && !context.ctx.isUserAuthenticated)
      throw Unauthorized
    else
      continue
}
