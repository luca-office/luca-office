package models

import enums.Salutation

case class UserAccountCreation(
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    organization: String,
    salutation: Salutation,
    hasConfirmedBackofficeTermsAndConditions: Boolean
)

case class UserAccountUpdate(
    firstName: String,
    lastName: String,
    organization: String,
    salutation: Salutation,
    mayAdministrateUserAccounts: Boolean,
    mayArchive: Boolean,
    mayFinalizeWithoutPublishing: Boolean,
    mayAdministrateRScripts: Boolean
)
