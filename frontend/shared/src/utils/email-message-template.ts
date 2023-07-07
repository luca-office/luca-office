import {EmailMessageTemplate} from "../enums"
import {Salutation} from "../graphql/generated/globalTypes"
import {ParticipantDataWithToken} from "../models"
import {LucaI18nLangKey, LucaTFunction} from "../translations"

export const emailMessageTemplateMap = new Map<EmailMessageTemplate, string>([
  [EmailMessageTemplate.FormalSalutation, "{{FormalSalutation}}"],
  [EmailMessageTemplate.Salutation, "{{Salutation}}"],
  [EmailMessageTemplate.FirstName, "{{FirstName}}"],
  [EmailMessageTemplate.LastName, "{{LastName}}"]
])

export const getEmailMessageTemplateValue = (template: EmailMessageTemplate): string =>
  emailMessageTemplateMap.get(template) ?? ""

// eslint-disable-next-line consistent-return
export const getEmailMessageTemplateLabelKey = (template: EmailMessageTemplate): LucaI18nLangKey => {
  switch (template) {
    case EmailMessageTemplate.FormalSalutation:
      return "email_message_template__template_label_formal_salutation"
    case EmailMessageTemplate.Salutation:
      return "email_message_template__template_label_salutation"
    case EmailMessageTemplate.FirstName:
      return "email_message_template__template_label_first_name"
    case EmailMessageTemplate.LastName:
      return "email_message_template__template_label_last_name"
  }
}

// eslint-disable-next-line consistent-return
export const getEmailMessageTemplateTooltipKey = (template: EmailMessageTemplate): LucaI18nLangKey => {
  switch (template) {
    case EmailMessageTemplate.FormalSalutation:
      return "email_message_template__tooltip_formal_salutation"
    case EmailMessageTemplate.Salutation:
      return "email_message_template__tooltip_salutation"
    case EmailMessageTemplate.FirstName:
      return "email_message_template__tooltip_first_name"
    case EmailMessageTemplate.LastName:
      return "email_message_template__tooltip_last_name"
  }
}

export const emailMessageTemplateFormalSalutationValue = getEmailMessageTemplateValue(
  EmailMessageTemplate.FormalSalutation
)
export const emailMessageTemplateSalutationValue = getEmailMessageTemplateValue(EmailMessageTemplate.Salutation)
export const emailMessageTemplateFirstNameValue = getEmailMessageTemplateValue(EmailMessageTemplate.FirstName)
export const emailMessageTemplateLastNameValue = getEmailMessageTemplateValue(EmailMessageTemplate.LastName)

export const emailMessageTemplateFormalSalutationRegex = new RegExp(emailMessageTemplateFormalSalutationValue, "g")
export const emailMessageTemplateSalutationRegex = new RegExp(emailMessageTemplateSalutationValue, "g")
export const emailMessageTemplateFirstNameRegex = new RegExp(emailMessageTemplateFirstNameValue, "g")
export const emailMessageTemplateLastNameRegex = new RegExp(emailMessageTemplateLastNameValue, "g")
export const emailMessageTemplateTokenRegex = new RegExp(
  `(${emailMessageTemplateFirstNameValue}\\s*${emailMessageTemplateLastNameValue})|${emailMessageTemplateFirstNameValue}|${emailMessageTemplateLastNameValue}`,
  "g"
)

export const getEmailMessageWithTemplateLabels = (t: LucaTFunction, emailMessage: string): string => {
  let emailMessageWithTemplateLabels = emailMessage

  const templateLabels: [EmailMessageTemplate, RegExp][] = [
    [EmailMessageTemplate.FormalSalutation, emailMessageTemplateFormalSalutationRegex],
    [EmailMessageTemplate.Salutation, emailMessageTemplateSalutationRegex],
    [EmailMessageTemplate.FirstName, emailMessageTemplateFirstNameRegex],
    [EmailMessageTemplate.LastName, emailMessageTemplateLastNameRegex]
  ]

  templateLabels.forEach(([template, regex]) => {
    emailMessageWithTemplateLabels = emailMessageWithTemplateLabels.replace(
      regex,
      t(getEmailMessageTemplateLabelKey(template))
    )
  })

  return emailMessageWithTemplateLabels
}

// eslint-disable-next-line consistent-return
export const getEmailMessageFormalGreetingKey = (participantData: ParticipantDataWithToken): LucaI18nLangKey => {
  switch (participantData.salutation) {
    case Salutation.Mr:
      return "email_message_template__formal_greeting_mr"
    case Salutation.Mrs:
      return "email_message_template__formal_greeting_mrs"
    case Salutation.NonBinary:
      return "email_message_template__formal_greeting_non_binary"
  }
}

export const getEmailMessageWithTemplateValues = (
  t: LucaTFunction,
  emailMessage: string,
  participantData: ParticipantDataWithToken
): string => {
  const message = emailMessage
    .replace(emailMessageTemplateFormalSalutationRegex, t(getEmailMessageFormalGreetingKey(participantData)))
    .replace(
      emailMessageTemplateSalutationRegex,
      participantData.salutation === Salutation.Mr
        ? t("erp__salutation_label_mr")
        : participantData.salutation === Salutation.Mrs
        ? t("erp__salutation_label_mrs")
        : ""
    )

  return participantData.firstName === undefined && participantData.lastName === undefined
    ? message.replace(emailMessageTemplateTokenRegex, participantData.token ?? "")
    : message
        .replace(emailMessageTemplateFirstNameRegex, participantData.firstName ?? "")
        .replace(emailMessageTemplateLastNameRegex, participantData.lastName ?? "")
}
