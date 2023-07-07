import * as React from "react"
import {Overlay} from "shared/components"
import {IconName} from "shared/enums"
import {useLucaTranslation} from "shared/translations"
import {ManageInvitationsModal} from "../../../common"
import {useRaterInvitationOverlay} from "./hooks/use-rater-invitation-overlay"

export interface RaterInvitationOverlayProps {
  readonly surveyId: UUID
  readonly existingRaterEmails: string[]
  readonly onDismiss: () => void
  readonly dataLoading?: boolean
}

export const RaterInvitationOverlay: React.FC<RaterInvitationOverlayProps> = ({
  surveyId,
  existingRaterEmails,
  onDismiss,
  dataLoading: parentDataLoading
}) => {
  const {t} = useLucaTranslation()

  const {actionLoading, inviteRaters, setEmails, showRaterWarning} = useRaterInvitationOverlay({
    surveyId,
    onDismiss
  })

  return (
    <Overlay>
      <ManageInvitationsModal
        labelKey={"rating__invite_title"}
        customInfoTextKey={"rating__invite_description"}
        inviteAttendeesTitleKey={"rating__invite_emails_title"}
        onDismiss={onDismiss}
        existingInvitations={existingRaterEmails}
        handleInvitations={inviteRaters}
        invitationProcessLoading={actionLoading}
        dataLoading={parentDataLoading}
        onEmailAddressesChange={setEmails}
        errorConfig={{icon: IconName.Alert, text: t("rating__invite_raters_warning")}}
        showError={showRaterWarning}
      />
    </Overlay>
  )
}
