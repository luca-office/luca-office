import {sortBy} from "lodash"
import React, {useMemo} from "react"
import {TabButtonBarEntry} from "../../../components"
import {EmailDirectory} from "../../../graphql/generated/globalTypes"
import {LocalEmail} from "../../../models"
import {useLucaTranslation} from "../../../translations"
import {Option} from "../../../utils"
import {getEmailListTabButtons} from "../config/email-button-bar"
import {getEmailCountsForDirectory} from "../utils"
import {EmailList, Props as ComponentProps} from "./email-list"

interface Props {
  readonly isLoading: boolean
  readonly emails: LocalEmail[]
  readonly selectedEmailId: string | undefined
  readonly introductionEmailId: Option<UUID>
  readonly onEmailSelected: (email: LocalEmail | undefined) => void
  readonly activeEmailDirectory: EmailDirectory
  readonly onChangeEmailDirectory: (directory: EmailDirectory) => void
  readonly scenarioStartedAt: Option<Date>
  readonly scenarioFictiveDate: Option<Date>
}

export const EmailListContainer: React.FC<Props> = ({
  isLoading,
  emails,
  selectedEmailId,
  introductionEmailId,
  onEmailSelected,
  activeEmailDirectory,
  onChangeEmailDirectory,
  scenarioStartedAt,
  scenarioFictiveDate
}) => {
  const {t} = useLucaTranslation()

  const directoryMap = new Map([
    [EmailDirectory.Inbox, 0],
    [EmailDirectory.Sent, 1],
    [EmailDirectory.Draft, 2],
    [EmailDirectory.Trash, 3]
  ])

  const activeTabIndex = useMemo(() => {
    return directoryMap.get(activeEmailDirectory) || 0
  }, [activeEmailDirectory])

  const entries: LocalEmail[] = useMemo(
    () =>
      sortBy(
        emails.filter(email => email.directory === activeEmailDirectory),
        email => email.receptionDelayInSeconds
      ),
    [emails, activeEmailDirectory]
  )

  const buttons: TabButtonBarEntry[] = useMemo(() => {
    const counts = getEmailCountsForDirectory(emails)

    return getEmailListTabButtons(counts, onChangeEmailDirectory, t)
  }, [emails])

  const listProps: ComponentProps = {
    isLoading,
    entries,
    buttons,
    selectedEmailId,
    introductionEmailId,
    onSelectEmail: onEmailSelected,
    activeTabIndex,
    scenarioStartedAt,
    scenarioFictiveDate
  }

  return <EmailList {...listProps} />
}
