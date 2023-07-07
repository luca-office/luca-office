import * as React from "react"
import {Button, Icon, OverviewCard} from "shared/components"
import {IconName} from "shared/enums"
import {Email} from "shared/models"
import {Flex, fontColorBright, primaryColor} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {emailDirectoriesFooterStyle as styles} from "./email-directories-footer.style"
import {useEmailDirectoriesFooter} from "./hooks/use-email-directories-footer"

export interface EmailDirectoriesFooterProps {
  readonly actionsDisabled: boolean
  readonly introductionEmail: Option<Email>
  readonly selectedEmailId: Option<UUID>
}

export const EmailDirectoriesFooter: React.FC<EmailDirectoriesFooterProps> = ({
  actionsDisabled,
  introductionEmail,
  selectedEmailId
}) => {
  const {t} = useLucaTranslation()
  const {showCreateEmailModal, handleCreateClick} = useEmailDirectoriesFooter(actionsDisabled, introductionEmail)
  const isIntroDefined = introductionEmail.isDefined()
  const isIntroSelected = introductionEmail.map(mail => mail.id === selectedEmailId.orUndefined()).getOrElse(false)

  return (
    <div css={styles.footer}>
      <Button
        customStyles={styles.button}
        icon={IconName.Add}
        onClick={!actionsDisabled ? showCreateEmailModal : undefined}
        disabled={actionsDisabled}>
        {t("email__create")}
      </Button>
      <OverviewCard
        customStyles={[styles.card(isIntroDefined || actionsDisabled), styles.footerBorder(isIntroSelected)]}
        onClick={isIntroDefined || !actionsDisabled ? handleCreateClick : undefined}
        content={
          <div css={[Flex.row, styles.introductionEmailCard]}>
            <div css={styles.introductionEmailButton}>
              <Icon name={isIntroDefined ? IconName.Email : IconName.Add} color={fontColorBright} />
            </div>
            <div css={styles.cardContent}>
              <div css={Flex.row}>
                <div css={styles.cardLabelText}>
                  {t(
                    isIntroDefined
                      ? "email__introduction_email_label_defined"
                      : "email__introduction_email_label_not_defined"
                  )}
                </div>
                {isIntroDefined && <Icon customStyles={styles.smallIcon} name={IconName.Check} color={primaryColor} />}
              </div>
              <div css={styles.cardText}>{t("email__introduction_email_info")}</div>
            </div>
          </div>
        }
      />
    </div>
  )
}
