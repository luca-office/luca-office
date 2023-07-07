package graphql

import database.generated.public._
import sangria.macros.derive._
import sangria.schema.{BooleanType, Field, ObjectType, StringType}

object CommonOutputObjectTypes {
  import graphql.EnumTypes._
  import graphql.ScalarAliases._

  implicit val BinaryFileObjectType: ObjectType[ContextBase, BinaryFile] =
    deriveObjectType[ContextBase, BinaryFile](
      AddFields(
        Field(
          name = "url",
          fieldType = StringType,
          resolve = context => context.ctx.storage.createDownloadUrl(context.value.id)
        )
      )
    )

  implicit val UserAccountObjectType: ObjectType[ContextBase, UserAccount] =
    deriveObjectType[ContextBase, UserAccount](
      ExcludeFields("passwordHash", "resetPasswordToken"),
      AddFields(
        Field(
          name = "needsToConfirmBackofficeTermsAndConditions",
          fieldType = BooleanType,
          resolve = context => context.value.hasConfirmedBackofficeTermsAndConditionsAt.isEmpty
        )
      ),
      ReplaceField(
        "mayAdministrateUserAccounts",
        Field(
          name = "mayAdministrateUserAccounts",
          fieldType = BooleanType,
          resolve = context => context.value.mayAdministrateUserAccounts || context.value.isGlobalSuperAdmin
        )
      ),
      ReplaceField(
        "mayAdministrateRScripts",
        Field(
          name = "mayAdministrateRScripts",
          fieldType = BooleanType,
          resolve = context => context.value.mayAdministrateRScripts || context.value.isGlobalSuperAdmin
        )
      ),
      ReplaceField(
        "mayArchive",
        Field(
          name = "mayArchive",
          fieldType = BooleanType,
          resolve = context => context.value.mayArchive || context.value.isGlobalSuperAdmin
        )
      )
    )
}
