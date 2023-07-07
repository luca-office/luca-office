package services.actions

import database.DatabaseContext
import database.generated.public.ProjectUserAccount

import scala.concurrent.ExecutionContext

trait CreateBulkProjectUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def createBulkProjectUserAccountAction(projectUserAccounts: Seq[ProjectUserAccount]) =
    runIO(createBulkProjectUserAccountQuotation(projectUserAccounts))

  def createBulkProjectUserAccountQuotation(projectUserAccounts: Seq[ProjectUserAccount]) =
    quote(
      liftQuery(projectUserAccounts)
        .foreach(projectUserAccount =>
          query[ProjectUserAccount]
            .insert(projectUserAccount)
            .returning(projectUserAccount => projectUserAccount)))
}
