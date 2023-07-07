import {trim} from "lodash-es"
import * as React from "react"
import {emailRegexPattern} from "shared/utils"
import {EmailAddressesMetadata} from "../models/email-addresses-metadata"
import {getEmailAddressesMetadata} from "../utils/invite-attendees-modal-utils"

export interface UseManageInvitationsModalHook {
  readonly alreadyInvitedAddresses: string[]
  readonly createInvitations: () => void
  readonly createInvitationsLoading: boolean
  readonly emailAddressesMetadata: EmailAddressesMetadata
  readonly emailAddressesValue: string
  readonly onDeleteEmailAddress: (address: string) => void
  readonly setEmailAddressesValue: (addresses: string) => void
}

export interface UseManageInvitationsModalProps {
  readonly existingInvitations: string[]
  readonly handleInvitations: (uniqueAddresses: string[]) => void | Promise<void>
  readonly invitationProcessLoading: boolean
  readonly onEmailAddressesChange?: (emailAddresses: string[]) => void
}

export const useManageInvitationsModal = ({
  existingInvitations,
  invitationProcessLoading,
  handleInvitations,
  onEmailAddressesChange
}: UseManageInvitationsModalProps): UseManageInvitationsModalHook => {
  const isMounted = React.useRef<boolean>(false)

  const [emailAddressesValue, setEmailAddressesValue] = React.useState("")

  const emailAddressesMetadata = getEmailAddressesMetadata(emailAddressesValue, existingInvitations)

  const handleEmailAddressesChange = (addresses: string) => {
    if (onEmailAddressesChange === undefined) {
      return
    }

    const emails = addresses
      .split(";")
      .map(address => trim(address))
      .filter(addresses => !!addresses && emailRegexPattern.test(addresses))
    onEmailAddressesChange(emails)
  }

  const onDeleteEmailAddress = (address: string) => {
    const allAddresses = [
      ...emailAddressesMetadata.uniqueAddresses,
      ...emailAddressesMetadata.duplicatedAddresses,
      ...emailAddressesMetadata.alreadyInvitedAddresses
    ]
    const targetIndex = allAddresses.lastIndexOf(address)

    const addresses = [...allAddresses]
    addresses.splice(targetIndex, 1)

    setEmailAddressesValue(addresses.join("; "))
    handleEmailAddressesChange(emailAddressesValue.replace(address, ""))
  }
  const onSubmitInvitation = () => {
    const result = handleInvitations(emailAddressesMetadata.uniqueAddresses)
    if (result instanceof Promise) {
      result.then(() => isMounted.current && setEmailAddressesValue(""))
    }
  }

  const handleSetEmailAddressesValue = (addresses: string) => {
    setEmailAddressesValue(addresses)
    handleEmailAddressesChange(addresses)
  }

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    alreadyInvitedAddresses: existingInvitations,
    createInvitations: onSubmitInvitation,
    createInvitationsLoading: invitationProcessLoading,
    emailAddressesMetadata,
    emailAddressesValue,
    onDeleteEmailAddress,
    setEmailAddressesValue: handleSetEmailAddressesValue
  }
}
