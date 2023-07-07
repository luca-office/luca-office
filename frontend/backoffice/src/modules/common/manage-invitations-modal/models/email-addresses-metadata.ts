export interface EmailAddressesMetadata {
  readonly validAddresses: string[]
  readonly uniqueAddresses: string[]
  readonly hasInvalidAddress: boolean
  readonly duplicatedAddresses: string[]
  readonly alreadyInvitedAddresses: string[]
}
