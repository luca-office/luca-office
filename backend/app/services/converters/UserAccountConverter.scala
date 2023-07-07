package services.converters

import database.generated.public.UserAccount
import models.UserAccountCreation
import utils.DateUtils

import java.util.UUID

object UserAccountConverter {

  def toUserAccount(creation: UserAccountCreation, passwordHash: String): UserAccount =
    UserAccount(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      email = creation.email.trim.toLowerCase,
      passwordHash = passwordHash,
      firstName = creation.firstName,
      lastName = creation.lastName,
      organization = creation.organization,
      resetPasswordToken = None,
      salutation = creation.salutation,
      mayAdministrateUserAccounts = false,
      mayArchive = false,
      mayFinalizeWithoutPublishing = false,
      mayAdministrateRScripts = false,
      isGlobalSuperAdmin = false,
      hasConfirmedBackofficeTermsAndConditionsAt =
        if (creation.hasConfirmedBackofficeTermsAndConditions) Some(DateUtils.now) else None
    )
}
