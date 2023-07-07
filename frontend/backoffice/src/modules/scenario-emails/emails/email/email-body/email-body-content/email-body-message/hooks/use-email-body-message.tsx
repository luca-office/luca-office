import * as React from "react"
import {EmailMessageTemplate} from "shared/enums"
import {EmailUpdate} from "shared/graphql/generated/globalTypes"
import {useSampleCompanyLazy} from "shared/graphql/hooks"
import {Email, SampleCompany, Scenario} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {
  getCaretPosition,
  getEmailMessageTemplateValue,
  getEmailMessageWithTemplateLabels,
  Option,
  setCaretPosition
} from "shared/utils"
import {useEmailUpdate} from "../../../../hooks/use-email-update"

export interface useEmailBodyMessageHook {
  readonly dataLoading: boolean
  readonly sampleCompanyId: UUID | null
  readonly sampleCompany: Option<SampleCompany>
  readonly sampleCompanyName: string | null
  readonly sampleCompanyEmailSignature: string | null
  readonly emailMessage: string
  readonly updateEmailMessage: (value: string) => void
  readonly updateEmail: (update: EmailUpdate) => void
  readonly handleSubjectUpdate: (subject: string) => void
  readonly emailMessageHasSignature: boolean
  readonly emailMessageWithTemplateLabels: string
  readonly updateEmailMessageWithTemplate: (template: EmailMessageTemplate) => void
  readonly textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>
}

export const useEmailBodyMessage = (email: Email, scenario: Option<Scenario>): useEmailBodyMessageHook => {
  const {t} = useLucaTranslation()

  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null)

  const [emailMessage, updateEmailMessage] = React.useState(email.message)

  const sampleCompanyId = scenario.map(scenario => scenario.sampleCompanyId).orNull()

  const {sampleCompany, getSampleCompany} = useSampleCompanyLazy()
  const {updateEmail, updateEmailLoading} = useEmailUpdate(email)

  const emailMessageWithTemplateLabels = getEmailMessageWithTemplateLabels(t, email.message)

  const sampleCompanyName = sampleCompany.map(company => company.name).orNull()
  const sampleCompanyEmailSignature = sampleCompany.map(company => company.emailSignature).orNull()
  const emailMessageHasSignature =
    !!sampleCompanyEmailSignature && emailMessage.indexOf(sampleCompanyEmailSignature) !== -1

  const handleSubjectUpdate = (subject: string) =>
    new Promise<void>(resolve => updateEmail({subject: subject.trim()}, resolve))

  const updateEmailMessageWithTemplate = (template: EmailMessageTemplate) => {
    const templateValue = getEmailMessageTemplateValue(template)

    if (textAreaRef.current === null) {
      updateEmailMessage(emailMessage === "" ? templateValue : `${emailMessage} ${templateValue}`)
      return
    }

    const {start, end} = getCaretPosition(textAreaRef.current)

    updateEmailMessage(
      `${emailMessage.substring(0, start)}${templateValue}${emailMessage.substring(end, emailMessage.length)}`
    )

    const caretPosition = end + templateValue.length

    // use set timeout 0 to make sure the new value was already rendered
    setTimeout(
      () =>
        textAreaRef.current !== null &&
        setCaretPosition(textAreaRef.current, {start: caretPosition, end: caretPosition}),
      0
    )
  }

  React.useEffect(() => {
    if (sampleCompanyId !== null) {
      getSampleCompany(sampleCompanyId)
    }
  }, [sampleCompanyId])

  React.useEffect(() => {
    updateEmailMessage(email.message)
  }, [email.message])

  return {
    dataLoading: updateEmailLoading,
    sampleCompanyId,
    sampleCompany,
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
  }
}
