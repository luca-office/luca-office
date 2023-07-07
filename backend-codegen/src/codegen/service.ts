import {GraphQLObjectType} from "graphql"

export const createServiceFileContent = (type: GraphQLObjectType) => createFileContent(type.name)

const createFileContent = (typeName: string) =>
  `package services

import database.DatabaseContext
import database.generated.public.${typeName}
import models.{${typeName}Creation, ${typeName}Update}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ${typeName}Service @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAll${typeName}
    with DefaultFind${typeName}
    with DefaultCreate${typeName}
    with DefaultUpdate${typeName}
    with DefaultDelete${typeName} {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all: Future[Seq[${typeName}]] =
    performIO(all${typeName}sAction)

  def find(id: UUID): Future[Option[${typeName}]] =
    performIO(find${typeName}Action(id))

  def create(creation: ${typeName}Creation): Future[${typeName}] =
    performIO(create${typeName}Action(creation))
      .recover(defaultErrorHandler)

  def update(id: UUID, update: ${typeName}Update): Future[${typeName}] =
    performIO(update${typeName}Action(id, update))
      .recover(defaultErrorHandler)

  def delete(id: UUID): Future[UUID] =
    performIO(delete${typeName}Action(id))
}
`
