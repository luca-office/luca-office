package actors

import akka.actor.Actor
import play.api.Logging
import services.BinaryFileService
import utils.Storage

import scala.concurrent.ExecutionContext

class BinaryFileCleanUpActor(binaryFileService: BinaryFileService, storage: Storage)(implicit
    executionContext: ExecutionContext)
    extends Actor
    with Logging {

  def receive: Receive = {
    case () =>
      binaryFileService.deleteOrphaned
        .foreach { deletedBinaryFilesCount =>
          logger.info(s"Deleted $deletedBinaryFilesCount orphaned binary files from database")

          storage.allIds.foreach(binaryIds =>
            binaryFileService.all.foreach(binaryFiles =>
              storage
                .delete(binaryIds.diff(binaryFiles.map(_.id)))
                .recover {
                  case error =>
                    logger.error("Error while deleting orphaned binary files from aws", error)
                }
                .foreach(deletedBinariesCount =>
                  logger.info(s"Deleted $deletedBinariesCount orphaned binary files from aws"))))
        }
  }
}
