package graphql.backoffice

import graphql.Private
import sangria.execution.{BeforeFieldResult, Middleware, MiddlewareBeforeField, MiddlewareQueryContext}
import sangria.schema.Context
import services.Unauthorized

object BackofficeSecurityMiddleware
    extends Middleware[BackofficeContext]
    with MiddlewareBeforeField[BackofficeContext] {
  type QueryVal = Unit
  type FieldVal = Unit

  def beforeQuery(context: MiddlewareQueryContext[BackofficeContext, _, _]): QueryVal = ()

  def afterQuery(queryVal: QueryVal, context: MiddlewareQueryContext[BackofficeContext, _, _]): Unit = ()

  def beforeField(
      queryVal: QueryVal,
      middlewareContext: MiddlewareQueryContext[BackofficeContext, _, _],
      context: Context[BackofficeContext, _]): BeforeFieldResult[BackofficeContext, FieldVal] =
    if (context.field.tags.contains(Private) && !context.ctx.isUserAuthenticated)
      throw Unauthorized
    else
      continue
}
