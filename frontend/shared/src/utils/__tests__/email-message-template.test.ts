import {fakeTranslate} from "../../../tests/utils/translate-mock"
import {EmailMessageTemplate} from "../../enums"
import {participantDataMock} from "../../graphql/__mocks__"
import {
  getEmailMessageFormalGreetingKey,
  getEmailMessageTemplateLabelKey,
  getEmailMessageTemplateTooltipKey,
  getEmailMessageTemplateValue,
  getEmailMessageWithTemplateLabels,
  getEmailMessageWithTemplateValues
} from "../email-message-template"

const emailMessageBeforeMigration =
  "{{EmailMessageTemplate_FormalSalutation}} {{EmailMessageTemplate_Salutation}} {{EmailMessageTemplate_FirstName}} {{EmailMessageTemplate_LastName}}"
const emailMessage = "{{FormalSalutation}} {{Salutation}} {{FirstName}} {{LastName}}"

const emailMessage1 =
  "Greetings, email_message_template__template_label_formal_salutation email_message_template__template_label_last_name, we would like to inform you that your package has been shipped."

const emailMessage2 = "{{FormalSalutation}} {{FirstName}}, we would like to thank you for your recent purchase."
const emailMessage4 = "Dear {{Salutation}} {{LastName}}, we regret to inform you that your flight has been delayed."
const emailMessageWithTemplateLabels =
  "email_message_template__template_label_formal_salutation email_message_template__template_label_salutation email_message_template__template_label_first_name email_message_template__template_label_last_name"

describe("email-message-template", () => {
  describe("getEmailMessageTemplateLabelKey", () => {
    it("returns correct value", () => {
      expect(getEmailMessageTemplateLabelKey(EmailMessageTemplate.FormalSalutation)).toEqual(
        "email_message_template__template_label_formal_salutation"
      )
      expect(getEmailMessageTemplateLabelKey(EmailMessageTemplate.Salutation)).toEqual(
        "email_message_template__template_label_salutation"
      )
      expect(getEmailMessageTemplateLabelKey(EmailMessageTemplate.FirstName)).toEqual(
        "email_message_template__template_label_first_name"
      )
      expect(getEmailMessageTemplateLabelKey(EmailMessageTemplate.LastName)).toEqual(
        "email_message_template__template_label_last_name"
      )
    })
  })
  describe("getEmailMessageTemplateTooltipKey", () => {
    it("returns correct value", () => {
      expect(getEmailMessageTemplateTooltipKey(EmailMessageTemplate.FormalSalutation)).toEqual(
        "email_message_template__tooltip_formal_salutation"
      )
      expect(getEmailMessageTemplateTooltipKey(EmailMessageTemplate.Salutation)).toEqual(
        "email_message_template__tooltip_salutation"
      )
      expect(getEmailMessageTemplateTooltipKey(EmailMessageTemplate.FirstName)).toEqual(
        "email_message_template__tooltip_first_name"
      )
      expect(getEmailMessageTemplateTooltipKey(EmailMessageTemplate.LastName)).toEqual(
        "email_message_template__tooltip_last_name"
      )
    })
  })
  describe("getEmailMessageWithTemplateLabels", () => {
    it("returns correct value", () => {
      expect(getEmailMessageWithTemplateLabels(fakeTranslate, emailMessage)).toEqual(emailMessageWithTemplateLabels)
      expect(getEmailMessageWithTemplateLabels(fakeTranslate, emailMessage1)).toEqual(
        "Greetings, email_message_template__template_label_formal_salutation email_message_template__template_label_last_name, we would like to inform you that your package has been shipped."
      )

      expect(getEmailMessageWithTemplateLabels(fakeTranslate, emailMessage2)).toEqual(
        "email_message_template__template_label_formal_salutation email_message_template__template_label_first_name, we would like to thank you for your recent purchase."
      )

      expect(getEmailMessageWithTemplateLabels(fakeTranslate, emailMessage4)).toEqual(
        "Dear email_message_template__template_label_salutation email_message_template__template_label_last_name, we regret to inform you that your flight has been delayed."
      )
    })
  })
  describe("getEmailMessageFormalGreetingKey", () => {
    it("returns correct value", () => {
      expect(getEmailMessageFormalGreetingKey(participantDataMock[0])).toEqual(
        "email_message_template__formal_greeting_mr"
      )
      expect(getEmailMessageFormalGreetingKey(participantDataMock[1])).toEqual(
        "email_message_template__formal_greeting_mrs"
      )
      expect(getEmailMessageFormalGreetingKey(participantDataMock[3])).toEqual(
        "email_message_template__formal_greeting_non_binary"
      )
    })
  })
  describe("getEmailMessageWithTemplateValues", () => {
    it("returns correct value", () => {
      expect(getEmailMessageWithTemplateValues(fakeTranslate, emailMessage, participantDataMock[0])).toEqual(
        `email_message_template__formal_greeting_mr erp__salutation_label_mr ${participantDataMock[0].firstName} ${participantDataMock[0].lastName}`
      )
      expect(getEmailMessageWithTemplateValues(fakeTranslate, emailMessage, participantDataMock[1])).toEqual(
        `email_message_template__formal_greeting_mrs erp__salutation_label_mrs ${participantDataMock[1].firstName} ${participantDataMock[1].lastName}`
      )
      expect(getEmailMessageWithTemplateValues(fakeTranslate, emailMessage, participantDataMock[3])).toEqual(
        `email_message_template__formal_greeting_non_binary  ${participantDataMock[3].firstName} ${participantDataMock[3].lastName}`
      )
    })
  })
  describe("getEmailMessageTemplateValue", () => {
    it("returns correct value", () => {
      expect(getEmailMessageTemplateValue(EmailMessageTemplate.FormalSalutation)).toEqual("{{FormalSalutation}}")
      expect(getEmailMessageTemplateValue(EmailMessageTemplate.Salutation)).toEqual("{{Salutation}}")
      expect(getEmailMessageTemplateValue(EmailMessageTemplate.FirstName)).toEqual("{{FirstName}}")
      expect(getEmailMessageTemplateValue(EmailMessageTemplate.LastName)).toEqual("{{LastName}}")
    })
  })
})
