import {EmailAddressesMetadata} from "../models/email-addresses-metadata"

export const emailAddressesMetadataMock: EmailAddressesMetadata = {
  validAddresses: [
    "testmail@test.de",
    "cap@cap3.de",
    "testmail@test.de",
    "testmai2l@test.de",
    "cap3@cap3.de",
    "cap@cap3.de"
  ],
  uniqueAddresses: ["testmail@test.de", "cap@cap3.de", "testmai2l@test.de", "cap3@cap3.de"],
  hasInvalidAddress: false,
  duplicatedAddresses: ["testmail@test.de"],
  alreadyInvitedAddresses: ["cap@cap3.de"]
}
