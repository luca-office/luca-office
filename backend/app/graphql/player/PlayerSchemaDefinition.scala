package graphql.player

import graphql.OutputObjectTypes
import io.circe.generic.auto._
import sangria.macros.derive._
import sangria.schema._

import javax.inject.{Inject, Singleton}

@Singleton
class PlayerSchemaDefinition @Inject() (outputObjectTypes: OutputObjectTypes) {
  import graphql.CommonOutputObjectTypes._
  import graphql.InputObjectTypes._
  import graphql.ScalarAliases._
  import outputObjectTypes._
  import sangria.marshalling.circe._

  val query = deriveContextObjectType[PlayerContext, PlayerQuery, Unit](identity)
  val mutation = deriveContextObjectType[PlayerContext, PlayerMutation, Unit](identity)
  val schema = Schema(query, Some(mutation), additionalTypes = additionalOutputTypes)
}
