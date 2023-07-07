package actors

import akka.actor.{ActorSystem, Props}
import services.BinaryFileService
import utils.{ApplicationConfiguration, Storage}

import javax.inject.Inject
import scala.concurrent.duration.DurationInt

class TaskScheduler @Inject() (
    system: ActorSystem,
    applicationConfiguration: ApplicationConfiguration,
    binaryFileService: BinaryFileService,
    storage: Storage) {
  import system.dispatcher

  private val binaryFileCleanUpActor =
    system.actorOf(Props(new BinaryFileCleanUpActor(binaryFileService, storage)), "binary-file-clean-up-actor")

  if (applicationConfiguration.misc.isBinaryCleanUpEnabled)
    system.scheduler.scheduleWithFixedDelay(15.minutes, 1.day, binaryFileCleanUpActor, ())
}
