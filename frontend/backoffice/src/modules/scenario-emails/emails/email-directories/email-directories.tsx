import {css} from "@emotion/react"
import * as React from "react"
import {HeaderCarouselContainer} from "shared/components"
import {IconName} from "shared/enums"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {Email, Intervention, Scenario} from "shared/models"
import {Flex, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {EmailContent, EmailDirectoriesList} from "../../../../components"
import {EmailDirectoriesFooter} from "./email-directories-footer/email-directories-footer"

export interface EmailDirectoriesProps {
  readonly actionsDisabled: boolean
  readonly scenario: Option<Scenario>
  readonly emails: Email[]
  readonly emailsLoading: boolean
  readonly selectedEmailId: Option<UUID>
  readonly introductionEmail: Option<Email>
  readonly interventions: Intervention[]
  readonly selectEmail: (emailId: Email) => void
  readonly selectedDirectory: EmailDirectory
  readonly selectDirectory: (directory: EmailDirectory) => void
}

export const EmailDirectories: React.FC<EmailDirectoriesProps> = ({
  actionsDisabled,
  emails,
  emailsLoading,
  introductionEmail,
  interventions,
  scenario,
  selectDirectory,
  selectedDirectory,
  selectedEmailId,
  selectEmail
}) => {
  const {t} = useLucaTranslation()

  const headerElements = [
    {
      label: t("email__directory_inbox"),
      count: emails.length,
      icon: IconName.EmailIncoming,
      directory: EmailDirectory.Inbox
    },
    {
      label: t("email__directory_sent"),
      count: emails.length,
      icon: IconName.EmailOutgoing,
      directory: EmailDirectory.Sent
    },
    {
      label: t("email__directory_trash"),
      count: emails.length,
      icon: IconName.Trash,
      directory: EmailDirectory.Trash
    }
  ]

  return (
    <EmailContent
      customStyles={styles.wrapper}
      useCustomHeaderWrapper
      header={
        <HeaderCarouselContainer
          onChange={element => selectDirectory(element.directory)}
          defaultSelectedElement={headerElements.find(element => element.directory === selectedDirectory)}
          elements={headerElements}
        />
      }>
      <div css={styles.content} className={"email-directories"}>
        <div css={styles.emails}>
          <EmailDirectoriesList
            {...{
              scenario,
              emails,
              emailsLoading,
              selectedEmailId,
              selectEmail,
              isInbox: selectedDirectory === EmailDirectory.Inbox,
              interventions
            }}
          />
        </div>
        <EmailDirectoriesFooter
          introductionEmail={introductionEmail}
          selectedEmailId={selectedEmailId}
          actionsDisabled={actionsDisabled}
        />
      </div>
    </EmailContent>
  )
}

const styles = {
  wrapper: css({
    ".email-content-content": {
      overflow: "hidden"
    }
  }),
  content: css(Flex.column, {
    padding: spacingSmall,
    height: "100%"
  }),
  emails: css({
    flex: 1,
    padding: spacingSmall,
    overflow: "auto"
  })
}
