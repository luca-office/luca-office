import {intersection, uniq} from "lodash-es"
import {emailRegexPattern} from "shared/utils"
import {EmailAddressesMetadata} from "../models/email-addresses-metadata"

export const getEmailAddressesMetadata = (
  addressesSeparatedWithSemicolon: string,
  alreadyInvitedAddresses: string[]
): EmailAddressesMetadata => {
  const emailAddresses = addressesSeparatedWithSemicolon.split(";").map(address => address.trim())

  const validAddresses = emailAddresses.filter(
    address => emailRegexPattern.test(address) && !alreadyInvitedAddresses.includes(address)
  )

  const uniqueAddresses = uniq(validAddresses)
  const duplicatedAddresses = validAddresses.reduce(
    (accumulator, email, index) =>
      validAddresses.filter(address => address === email).length > 1 && index < validAddresses.lastIndexOf(email)
        ? [...accumulator, email]
        : accumulator,
    [] as string[]
  )

  return {
    validAddresses,
    uniqueAddresses,
    hasInvalidAddress: emailAddresses.length !== validAddresses.length && validAddresses.length > 0,
    duplicatedAddresses,
    alreadyInvitedAddresses: intersection(alreadyInvitedAddresses, emailAddresses)
  }
}

export const getOnlyNewSurveyInvitations = (creations: {email: string}[], existingEmailAddresses: string[]) =>
  creations.filter(creation => !existingEmailAddresses.includes(creation.email))
