import {css} from "@emotion/react"
import * as React from "react"
import {FormFieldLabel, Icon, ReadonlyActionField} from "shared/components"
import {IconName} from "shared/enums"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {Flex, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getReceptionDelayLabel} from "shared/utils"
import {detailViewStyles} from "../../detail-styles"
import {useEmailFileDetail} from "./hooks/use-email-file-detail"

interface Props {
  readonly scenarioId: UUID
  readonly emailId: UUID
}

export const EmailFileDetailAction: React.FC<Props> = ({scenarioId, emailId}) => {
  const {t} = useLucaTranslation()
  const {email, navigateToEmail} = useEmailFileDetail(scenarioId, emailId)

  return email
    .map(mail => (
      <>
        <FormFieldLabel textKey="files_and_directories__downloads_mail" />
        <ReadonlyActionField
          customStyles={detailViewStyles.actionField}
          buttonLabel={t("files_and_directories__downloads_mail_navigate")}
          onClick={() => navigateToEmail(mail.directory)}
          renderValue={() => (
            <div css={Flex.row}>
              {mail.directory !== EmailDirectory.Inbox ? (
                <>
                  <Icon name={IconName.EmailOutgoing} customStyles={styles.iconSpacing} />
                  <div css={styles.iconSpacing}>{mail.recipient}</div>
                </>
              ) : (
                <>
                  <Icon name={IconName.EmailIncoming} customStyles={styles.iconSpacing} />
                  <div css={styles.iconSpacing}>{mail.sender}</div>
                </>
              )}

              <>({getReceptionDelayLabel(t, mail.receptionDelayInSeconds)})</>
            </div>
          )}
        />
      </>
    ))
    .orNull()
}

const styles = {
  iconSpacing: css({
    marginRight: spacingSmall
  })
}
