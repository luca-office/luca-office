import {noop} from "lodash-es"
import * as React from "react"
import {Button, OrlyButtonContainer} from "../../../components"
import {ButtonVariant, IconName} from "../../../enums"
import {EmailDirectory} from "../../../graphql/generated/globalTypes"
import {LocalEmail} from "../../../models"
import {useLucaTranslation} from "../../../translations"
import {styles} from "./email-details.style"

export interface EmailHeaderProps {
  readonly email: LocalEmail
  readonly isIntroductionEmail: boolean
  readonly isPreview: boolean
  readonly createEmail: (sender: string, answeredEmail: LocalEmail) => void
  readonly deleteEmail: (id: string) => void
  readonly moveEmailToDirectory: (id: string, dir: EmailDirectory) => void
  readonly validate: (email: LocalEmail) => void
}

export const EmailHeader: React.FC<EmailHeaderProps> = ({
  email,
  isIntroductionEmail,
  isPreview,
  createEmail,
  deleteEmail,
  moveEmailToDirectory,
  validate
}) => {
  const {t} = useLucaTranslation()

  switch (email.directory) {
    case EmailDirectory.Inbox:
      return (
        <>
          <Button
            icon={IconName.EmailOutgoing}
            variant={ButtonVariant.Primary}
            onClick={() => createEmail(email.sender ?? "", email)}
            disabled={isPreview}>
            {t("email__reply")}
          </Button>
          <OrlyButtonContainer
            disabled={isIntroductionEmail || !deleteEmail || isPreview}
            customButtonStyles={styles.trashButton}
            iconName={IconName.Trash}
            onConfirm={() => moveEmailToDirectory(email.id, EmailDirectory.Trash)}
            tooltipConfig={{labelKey: isIntroductionEmail ? "email__intro_can_not_delete" : "email__move_to_trash"}}
            modalTitleKey={"email__move_to_trash_confirm_title"}
            modalTextKey={"email__move_to_trash_confirm_text"}
          />
        </>
      )
    case EmailDirectory.Draft:
      return (
        <>
          <Button
            icon={IconName.Email}
            variant={ButtonVariant.Primary}
            onClick={() => validate(email)}
            disabled={isPreview}>
            {t("email__send_email")}
          </Button>
          <OrlyButtonContainer
            disabled={!deleteEmail || isPreview}
            customButtonStyles={styles.trashButton}
            iconName={IconName.Trash}
            onConfirm={() => deleteEmail(email.id)}
            tooltipConfig={{labelKey: "email__delete_draft_tooltip"}}
            textKey={"email__delete_label"}
            modalTitleKey={"email__delete_label"}
            modalTextKey={"email__delete_draft_confirm_text"}
          />
        </>
      )
    case EmailDirectory.Sent:
      return (
        <OrlyButtonContainer
          disabled={!deleteEmail || isPreview}
          customButtonStyles={styles.trashButton}
          iconName={IconName.Trash}
          onConfirm={() => moveEmailToDirectory(email.id, EmailDirectory.Trash)}
          tooltipConfig={{labelKey: "email__move_to_trash"}}
          modalTitleKey={"email__move_to_trash_confirm_title"}
          modalTextKey={"email__move_to_trash_confirm_text"}
        />
      )
    case EmailDirectory.Trash:
      return (
        <OrlyButtonContainer
          disabled={true}
          customButtonStyles={styles.trashButton}
          iconName={IconName.Trash}
          onConfirm={noop}
          tooltipConfig={{labelKey: "email__trash_can_not_delete"}}
        />
      )
    default:
      return null
  }
}
