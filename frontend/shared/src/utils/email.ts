import {omit} from "lodash-es"
import {IconName} from "../enums"
import {EmailDirectory, Relevance} from "../graphql/generated/globalTypes"
import {Email, LocalEmail, ParticipantData, SampleCompany} from "../models"
import {LucaTFunction} from "../translations"
import {
  convertDaysToWeeks,
  convertHoursToDays,
  convertMinutesToHours,
  convertMonthsToYears,
  convertSecondsToMinutes,
  convertWeeksToMonths,
  createUUID,
  Option
} from "../utils"

export const emailRegexPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export const remoteToLocalEmail = (email: Email): LocalEmail => ({
  ...omit(email, "isInitiallyRead"),
  isRead: email.isInitiallyRead,
  isVisible: true
})

export const validateCcRecipients = (ccRecipients: string, separator: string | RegExp = ";") => {
  const emailAddresses = ccRecipients.split(separator)
  return (
    emailAddresses.filter(recipient => recipient !== "").length === 0 ||
    emailAddresses.every(recipient => emailRegexPattern.test(recipient))
  )
}

export const getSenderAndRecipient = (
  email: LocalEmail,
  participantData: Option<ParticipantData>,
  sampleCompany: Option<SampleCompany>
): Pick<LocalEmail, "sender" | "recipient"> => {
  const userEmail = getUserEmail(participantData, sampleCompany)

  switch (email.directory) {
    case EmailDirectory.Inbox:
    case EmailDirectory.Trash:
      return {sender: email.sender, recipient: userEmail}
    case EmailDirectory.Sent:
    case EmailDirectory.Draft:
    default:
      return {sender: userEmail, recipient: email.recipient || ""}
  }
}

export const sanitizeEmailUserName = (name: string) => {
  return name.replace(/\s+/g, ".")
}

export const getUserEmail = (participantDataOption: Option<ParticipantData>, sampleCompany: Option<SampleCompany>) =>
  participantDataOption
    .map(participantData =>
      `${sanitizeEmailUserName(participantData.firstName)}.${sanitizeEmailUserName(
        participantData.lastName
      )}@${sampleCompany.map(company => company.domain).getOrElse("luca-office.de")}`.toLowerCase()
    )
    .getOrElse("no.name@luca-office.de")

export const createEmailDraft = (
  scenarioId: string,
  sender: string,
  id: string | undefined,
  recipient?: string,
  answeredEmailText?: string,
  subject?: string
): LocalEmail => ({
  id: id !== undefined ? id : createUUID(),
  sender,
  recipient: recipient || "",
  ccRecipients: [],
  subject: subject ?? "",
  directory: EmailDirectory.Draft,
  receptionDelayInSeconds: 0,
  isRead: false,
  relevance: Relevance.PotentiallyHelpful,
  message: answeredEmailText ?? "",
  scenarioId,
  isVisible: true
})

export const getFilteredEmailsByDirectory = (directory: EmailDirectory, emails: Email[]): Email[] =>
  emails.filter(email => email.directory === directory)

export const getDirectoryIcon = (directory: EmailDirectory): IconName => {
  switch (directory) {
    case EmailDirectory.Inbox:
      return IconName.EmailIncoming
    case EmailDirectory.Sent:
      return IconName.EmailOutgoing
    case EmailDirectory.Trash:
      return IconName.Trash
    default:
      return IconName.Alert
  }
}

const toReceptionDelayLabel = (time: number, singular: string, plural: string): string => {
  const absTime = Math.abs(time)
  return `${time >= 0 ? "+" : "-"} ${absTime} ${absTime === 1 ? singular : plural}`
}

export const getReceptionDelayLabel = (t: LucaTFunction, receptionDelayInSeconds: number): string => {
  const seconds = receptionDelayInSeconds

  if (seconds === 0) {
    return t("unit__just_now")
  }
  if (seconds > -60 && seconds < 60) {
    return toReceptionDelayLabel(seconds, t("unit__seconds_singular"), t("unit__seconds_plural"))
  }

  const minutes = convertSecondsToMinutes(seconds)
  if (minutes > -60 && minutes < 60) {
    const minutesLabel = t("unit__minutes_short")
    return toReceptionDelayLabel(minutes, minutesLabel, minutesLabel)
  }

  const hours = convertMinutesToHours(minutes)
  if (hours > -24 && hours < 24) {
    return toReceptionDelayLabel(hours, t("unit__hours_singular"), t("unit__hours_plural"))
  }

  const days = convertHoursToDays(hours)
  if (days > -7 && days < 7) {
    return toReceptionDelayLabel(days, t("unit__days_singular"), t("unit__days_plural"))
  }

  const weeks = convertDaysToWeeks(days)
  if (weeks > -4 && weeks < 4) {
    return toReceptionDelayLabel(weeks, t("unit__weeks_singular"), t("unit__weeks_plural"))
  }

  const months = convertWeeksToMonths(weeks)
  if (months > -12 && months < 12) {
    return toReceptionDelayLabel(months, t("unit__months_singular"), t("unit__months_plural"))
  }

  return toReceptionDelayLabel(convertMonthsToYears(months), t("unit__years_singular"), t("unit__years_plural"))
}
