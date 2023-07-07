package database

import io.getquill.{PostgresJAsyncContext, SnakeCase}
import javax.inject.Singleton

@Singleton
class DatabaseContext extends PostgresJAsyncContext(SnakeCase, "quill.postgres.async")
