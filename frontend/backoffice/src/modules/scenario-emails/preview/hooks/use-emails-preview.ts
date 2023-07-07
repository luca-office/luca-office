import {useEffect, useState} from "react"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {useEmails, useFilesForScenario, useScenario} from "shared/graphql/hooks"
import {Email, LocalEmail} from "shared/models"
import {EmailBodyFile} from "shared/office-tools/email-client/email-details/email-files"
import {useLucaTranslation} from "shared/translations"
import {
  getDummyParticipantData,
  getSenderAndRecipient,
  iconForFile,
  Option,
  parseDateString,
  remoteToLocalEmail
} from "shared/utils"
import {createEmailsSortFn} from "../../utils/directory"

export const useEmailsPreview = (scenarioId: UUID) => {
  const {t} = useLucaTranslation()
  const {emails, emailsLoading} = useEmails(scenarioId)
  const [selectedEmail, setSelectedEmail] = useState<Option<LocalEmail>>(Option.none())
  const [filesForSelectedEmail, setFilesForSelectedEmail] = useState<EmailBodyFile[]>([])
  const [searchValue, setSearchValue] = useState<string>("")
  const [visibleEmails, setVisibleEmails] = useState<LocalEmail[]>([])
  const [currentDirectory, setCurrentDirectory] = useState<EmailDirectory>(EmailDirectory.Inbox)

  const {scenario} = useScenario(scenarioId)
  const introductionEmailId = scenario.map(scenarioValue => scenarioValue.introductionEmailId)
  const {files} = useFilesForScenario(scenarioId)

  const sampleCompany = scenario.flatMap(scenario => Option.of(scenario.sampleCompany))

  const scenarioFictiveDate = scenario.flatMap(scenario =>
    Option.of(scenario.date !== null ? parseDateString(scenario.date) : null)
  )

  const prepareEmail = (email: Email): LocalEmail => {
    const localEmail = remoteToLocalEmail(email)
    return {...localEmail, ...getSenderAndRecipient(localEmail, Option.of(getDummyParticipantData(t)), sampleCompany)}
  }

  useEffect(() => {
    if (!emailsLoading) {
      const localEmails = emails.getOrElse([]).map(prepareEmail)

      setVisibleEmails(
        localEmails
          .filter(e => e.sender?.toLowerCase().includes(searchValue) || e.message.toLowerCase().includes(searchValue))
          .sort(createEmailsSortFn(currentDirectory, introductionEmailId.orNull()))
      )
    }
  }, [emailsLoading, searchValue])

  const onSelectEmail = (email?: LocalEmail) => {
    const emailOption = Option.of(email)
    setSelectedEmail(emailOption)

    emailOption.forEach(email => {
      setFilesForSelectedEmail(
        files
          .getOrElse([])
          .filter(file => file.emailId === email.id)
          .map(file => ({
            id: file.id,
            title: file.name,
            relevance: Option.of(file.relevance),
            iconName: iconForFile(file)
          }))
      )
    })
  }

  return {
    emailsLoading,
    visibleEmails,
    introductionEmailId: introductionEmailId.getOrElse(""),
    selectedEmail: selectedEmail.orUndefined(),
    selectEmail: onSelectEmail,
    setSearchValue,
    currentDirectory,
    setCurrentDirectory,
    filesForSelectedEmail,
    participantData: getDummyParticipantData(t),
    sampleCompany,
    scenarioFictiveDate
  }
}
