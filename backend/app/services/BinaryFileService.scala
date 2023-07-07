package services

import database.DatabaseContext
import database.generated.public.BinaryFile
import io.getquill.Query
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class BinaryFileService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllBinaryFile
    with DefaultFindBinaryFile
    with DefaultCreateBinaryFile {
  val context = databaseContext

  import context._

  def deleteOrphaned: Future[Long] =
    performIO(deleteOrphanedAction)

  private def deleteOrphanedAction =
    runIO(foreignKeyItemsQuotation)
      .flatMap(foreignKeyItems => runIO(deleteOrphanedQuotation(foreignKeyItems)))

  private def deleteOrphanedQuotation(foreignKeyItems: Seq[ForeignKeyItem]) =
    quote(
      query[BinaryFile]
        // TODO: seems to be a quill bug, variable name binary_file is directly used in the resulting sql
        // https://github.com/getquill/quill/issues/2061
        .filter(binary_file => referencedBinaryIdsQuotation(foreignKeyItems).filter(_.id == binary_file.id).isEmpty)
        .delete)

  private def referencedBinaryIdsQuotation(foreignKeyItems: Seq[ForeignKeyItem]) =
    quote(infix"#${referencedBinaryIdsQueryString(foreignKeyItems)}".as[Query[BinaryFileItem]])

  private def referencedBinaryIdsQueryString(foreignKeyItems: Seq[ForeignKeyItem]) =
    foreignKeyItems
      .map(foreignKeyItem => s"""
          SELECT ${foreignKeyItem.columnName} AS id
          FROM ${foreignKeyItem.tableName}
          WHERE ${foreignKeyItem.columnName} IS NOT NULL""")
      .mkString(" UNION ")

  private def foreignKeyItemsQuotation =
    quote(
      infix"""
        SELECT tc.table_name, kcu.column_name
        FROM information_schema.table_constraints tc
          JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
          JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
        WHERE constraint_type = 'FOREIGN KEY'
        AND ccu.table_name = 'binary_file'
      """
        .as[Query[ForeignKeyItem]])

  case class ForeignKeyItem(tableName: String, columnName: String)

  case class BinaryFileItem(id: UUID)
}
