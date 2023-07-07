import {css} from "@emotion/react"
import * as React from "react"
import {Button, Heading, Icon, ReadonlyActionField, Text, TextInput, Tooltip} from "shared/components"
import {ButtonVariant, HeadingLevel, IconName, InputType} from "shared/enums"
import {EmailUpdate} from "shared/graphql/generated/globalTypes"
import {Email, Scenario} from "shared/models"
import {
  CustomStyle,
  Flex,
  FontWeight,
  iconBrightColor,
  iconDefaultColor,
  iconDisabledColor,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {InlineEditableTextareaContainer, OverlayEditField, OverlayEditFieldType} from "../../../../../../../components"
import {EmailBodyMessageHeader} from "../email-body-message-header/email-body-message-header"
import {useEmailBodyMessage} from "./hooks/use-email-body-message"
import {emailBodyMessageStyle as styles} from "./style/email-body-message.style"

export interface EmailBodyMessageProps extends CustomStyle {
  readonly email: Email
  readonly scenario: Option<Scenario>
  readonly disabled?: boolean
}

export const EmailBodyMessage: React.FC<EmailBodyMessageProps> = ({disabled, email, customStyles, scenario}) => {
  const {t} = useLucaTranslation()

  const {
    dataLoading,
    sampleCompanyName,
    sampleCompanyEmailSignature,
    emailMessage,
    updateEmailMessage,
    updateEmail,
    handleSubjectUpdate,
    emailMessageHasSignature,
    emailMessageWithTemplateLabels,
    updateEmailMessageWithTemplate,
    textAreaRef
  } = useEmailBodyMessage(email, scenario)

  const sampleCompanyModalFooter = scenario
    .map(scenario => {
      const hasSampleCompany = !!scenario.sampleCompanyId
      const isEnabled = !dataLoading && hasSampleCompany && !!sampleCompanyEmailSignature

      return (
        <div css={styles.modalFooterContainer}>
          <div css={Flex.row}>
            <Tooltip
              title={t(
                isEnabled
                  ? "scenario_sample_companies__add_signature"
                  : hasSampleCompany
                  ? "scenario_sample_companies__no_signature"
                  : "scenario_sample_companies__none_added"
              )}
              text={isEnabled ? t("scenario_sample_companies__add_signature_text") : undefined}
              icon={isEnabled ? IconName.Paste : undefined}>
              <Button
                variant={ButtonVariant.IconOnly}
                icon={IconName.Paste}
                disabled={!isEnabled}
                iconColor={iconBrightColor}
                onClick={() => updateEmailMessage(`${emailMessage}\n\n${sampleCompanyEmailSignature}`.trim())}
              />
            </Tooltip>
            <Text size={TextSize.Medium} customStyles={styles.sampleCompanyLabel}>
              {t("email__message_dialog_sample_company")}
            </Text>
          </div>
          <div>
            <ReadonlyActionField
              disabled={!isEnabled}
              customStyles={styles.sampleCompany(isEnabled, emailMessageHasSignature)}
              renderValue={() => (
                <div css={Flex.row}>
                  <Icon
                    name={IconName.Trunk}
                    customStyles={styles.sampleCompanyIcon}
                    color={isEnabled ? iconDefaultColor : iconDisabledColor}
                  />
                  {sampleCompanyName
                    ? sampleCompanyName
                    : t("scenario_sample_companies__add_signature_company_placeholder")}
                </div>
              )}
            />
          </div>
        </div>
      )
    })
    .orUndefined()

  return (
    <div css={[Flex.column, customStyles]}>
      <div css={[Flex.column, styles.marginSmallHorizontal]}>
        <div css={styles.label}>{t("email__subject_label")}</div>
        <TextInput
          type={InputType.text}
          value={email.subject}
          onBlur={evt => handleSubjectUpdate(evt.target.value)}
          disabled={disabled}
          placeholder={!disabled ? t("email__subject_placeholder") : undefined}
        />
      </div>
      <div css={[Flex.column, styles.message]}>
        <div css={[styles.marginSmallHorizontal, styles.messageLabelWrapper]}>
          <Heading customStyles={styles.messageLabel} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
            {t("email__message_label")}
          </Heading>
          <Icon name={IconName.EditPencil} />
        </div>
        <div css={[styles.messageTextField]}>
          <OverlayEditField<EmailUpdate>
            customModalStyles={styles.modal}
            customModalContentStyles={styles.modalContent}
            disabled={disabled}
            displayPlain={true}
            renderValue={() => (
              <div css={styles.messageInput}>
                <InlineEditableTextareaContainer
                  text={emailMessageWithTemplateLabels}
                  disabled={disabled}
                  placeholder={!disabled ? t("email__message_placeholder") : undefined}
                  showCheckmark={false}
                  readOnly={true}
                />
              </div>
            )}
            dialogTitleKey={"email__message_dialog_title"}
            formFields={[
              {
                customStyles: styles.modalField,
                customStyleOnlyTextArea: styles.modalTextArea,
                placeholderKey: "email__message_placeholder",
                ref: textAreaRef,
                value: emailMessage,
                type: OverlayEditFieldType.TEXTAREA,
                updateId: "message",
                onChangeHandler: value => updateEmailMessage(value),
                renderHeader: () => <EmailBodyMessageHeader onTemplateSelection={updateEmailMessageWithTemplate} />
              }
            ]}
            updateLoading={dataLoading}
            onUpdate={updateEmail}
            modalFooter={sampleCompanyModalFooter}
          />
        </div>
      </div>
    </div>
  )
}
