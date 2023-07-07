package graphql.backoffice

import database.generated.public.RScript
import graphql.OutputObjectTypes
import io.circe.generic.auto._
import sangria.macros.derive._
import sangria.schema._

import javax.inject.{Inject, Singleton}

@Singleton
class BackofficeSchemaDefinition @Inject() (outputObjectTypes: OutputObjectTypes) {
  import graphql.CommonOutputObjectTypes._
  import graphql.ErpOutputObjectTypes._
  import graphql.InputObjectTypes._
  import graphql.ScalarAliases._
  import outputObjectTypes._
  import sangria.marshalling.circe._

  implicit val RScriptObjectType: ObjectType[BackofficeContext, RScript] =
    deriveObjectType[BackofficeContext, RScript](
      AddFields(
        Field(
          name = "isEditable",
          fieldType = BooleanType,
          resolve = context => context.ctx.rScriptService.isEditable(context.value.id)
        )
      )
    )

  val query = deriveContextObjectType[BackofficeContext, BackofficeQuery, Unit](identity)
  val mutation = deriveContextObjectType[BackofficeContext, BackofficeMutation, Unit](identity)
  val schema = Schema(query, Some(mutation), additionalTypes = additionalOutputTypes)
}
