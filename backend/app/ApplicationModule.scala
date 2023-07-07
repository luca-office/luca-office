import actors.TaskScheduler
import com.google.inject.AbstractModule
import org.flywaydb.core.Flyway
import org.flywaydb.core.internal.jdbc.DriverDataSource
import play.api.{Configuration, Environment, Mode}
import tasks.SeedUserTask
import utils.ApplicationConfiguration

class ApplicationModule(environment: Environment, configuration: Configuration) extends AbstractModule {
  override def configure(): Unit = {
    bind(classOf[ApplicationConfiguration]).toInstance(ApplicationConfiguration(configuration))
    bind(classOf[TaskScheduler]).asEagerSingleton()
    bind(classOf[SeedUserTask]).asEagerSingleton()

    if (environment.mode == Mode.Test)
      clearDatabase()
  }

  private def clearDatabase(): Unit = {
    val driver = configuration.get[String]("db.default.driver")
    val url = configuration.get[String]("db.default.url")
    val user = configuration.get[String]("db.default.user")
    val password = configuration.get[String]("db.default.password")
    val dataSource = new DriverDataSource(getClass.getClassLoader, driver, url, user, password)
    val flyway = new Flyway(Flyway.configure().dataSource(dataSource))

    if (url.contains("-test"))
      flyway.clean()
  }
}
