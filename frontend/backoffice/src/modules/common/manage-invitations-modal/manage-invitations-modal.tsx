import {css} from "@emotion/react"
import * as React from "react"
import {Modal} from "shared/components"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {useManageInvitationsModal, UseManageInvitationsModalProps} from "./hooks/use-manage-invitations-modal"
import {
  InviteAttendeesEmailAddressesGrid,
  InviteAttendeesErrorConfig
} from "./invite-attendees-email-addresses-grid/invite-attendees-email-addresses-grid"
import {InviteAttendeesEmailTextarea} from "./invite-attendees-email-textarea/invite-attendees-email-textarea"

export interface ManageInvitationModalProps extends UseManageInvitationsModalProps {
  readonly dataLoading?: boolean
  readonly onDismiss: () => void
  readonly labelKey: LucaI18nLangKey
  readonly customInfoTextKey?: LucaI18nLangKey
  readonly inviteAttendeesTitleKey?: LucaI18nLangKey
  readonly errorConfig?: InviteAttendeesErrorConfig
  readonly showError?: boolean
}

export const ManageInvitationsModal: React.FC<ManageInvitationModalProps> = props => {
  const {t} = useLucaTranslation()
  const {
    alreadyInvitedAddresses,
    createInvitations,
    createInvitationsLoading,
    emailAddressesMetadata,
    emailAddressesValue,
    onDeleteEmailAddress,
    setEmailAddressesValue
  } = useManageInvitationsModal(props)
  const {
    dataLoading = false,
    labelKey,
    onDismiss,
    customInfoTextKey,
    inviteAttendeesTitleKey,
    errorConfig,
    showError
  } = props

  return (
    <Modal
      customStyles={styles.inviteAttendeesModal}
      customButtonStyles={styles.modalButtons}
      onDismiss={onDismiss}
      onConfirm={createInvitations}
      preventSubmitOnEnter={true}
      confirmButtonDisabled={
        !!emailAddressesMetadata.alreadyInvitedAddresses.length ||
        !!emailAddressesMetadata.duplicatedAddresses.length ||
        !emailAddressesMetadata.validAddresses.length ||
        createInvitationsLoading ||
        dataLoading ||
        emailAddressesMetadata.hasInvalidAddress
      }
      isConfirmButtonLoading={createInvitationsLoading}
      confirmButtonKey={createInvitationsLoading ? "saving" : labelKey}
      title={t(labelKey)}>
      <div className="wrapper" css={styles.wrapper}>
        <InviteAttendeesEmailTextarea
          customInfoTextKey={customInfoTextKey}
          emailAddresseesMetadata={emailAddressesMetadata}
          textAreaValue={emailAddressesValue}
          onTextAreaChange={setEmailAddressesValue}
          disabled={createInvitationsLoading}
        />
        <InviteAttendeesEmailAddressesGrid
          onDeleteEmailAddress={onDeleteEmailAddress}
          emailAddressesMetadata={emailAddressesMetadata}
          alreadyInvitedEmailAddresses={alreadyInvitedAddresses}
          loading={dataLoading}
          inviteAttendeesTitleKey={inviteAttendeesTitleKey}
          errorConfig={errorConfig}
          showError={showError}
        />
      </div>
    </Modal>
  )
}

const styles = {
  wrapper: css({
    display: "flex",
    flexDirection: "column",
    height: "100%"
  }),
  inviteAttendeesModal: css({
    width: "90vw",
    height: 704
  }),
  modalButtons: css({
    width: 290
  })
}
