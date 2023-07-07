import {css} from "@emotion/react"
import * as React from "react"
import {LoadingIndicator, TabButtonBar, TabButtonBarEntry} from "../../../components"
import {LocalEmail} from "../../../models"
import {
  backgroundColorBright,
  cardBottomColor,
  Flex,
  fontFamily,
  spacing,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {Option} from "../../../utils"
import {getEntryPropsForEmail} from "../utils"
import {EmailListEntry, Props as EmailListEntryProps} from "./email-list-entry"

export type EntryProps = Omit<EmailListEntryProps, "isSelected">

export interface Props {
  readonly activeTabIndex: number
  readonly buttons: TabButtonBarEntry[]
  readonly entries: LocalEmail[]
  readonly isLoading: boolean
  readonly onSelectEmail: (email: LocalEmail) => void
  readonly scenarioStartedAt: Option<Date>
  readonly scenarioFictiveDate: Option<Date>
  readonly selectedEmailId: string | undefined
  readonly introductionEmailId: Option<UUID>
}

export const EmailList = ({
  isLoading,
  entries,
  buttons,
  scenarioStartedAt,
  scenarioFictiveDate,
  selectedEmailId,
  introductionEmailId,
  onSelectEmail,
  activeTabIndex
}: Props) => {
  const {t} = useLucaTranslation()

  return (
    <div css={styles.container}>
      <div css={styles.tabs}>
        <TabButtonBar customStyles={styles.tabButtonBar} buttons={buttons} activeTabIndex={activeTabIndex}>
          <div css={styles.list(isLoading)}>
            {isLoading ? (
              <LoadingIndicator />
            ) : entries.length > 0 ? (
              entries.map((entry, index) => {
                const isSelected = entry.id === selectedEmailId
                const isIntroductionEmail = introductionEmailId.map(id => id === entry.id).getOrElse(false)
                return (
                  <EmailListEntry
                    key={index}
                    isSelected={isSelected}
                    {...getEntryPropsForEmail(entry, scenarioFictiveDate, scenarioStartedAt, t)}
                    onClick={() => onSelectEmail(entry)}
                    isIntroductionEmail={isIntroductionEmail}
                  />
                )
              })
            ) : (
              <div css={styles.noEmailPlaceholder}>
                <span>{t("email__no_emails")}</span>
              </div>
            )}
          </div>
        </TabButtonBar>
      </div>
      <div css={styles.footer} />
    </div>
  )
}

const styles = {
  container: css({
    position: "relative",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }),
  tabs: css(Flex.column, {
    flex: 1,
    overflow: "hidden"
  }),
  tabButtonBar: css({
    overflow: "hidden"
  }),
  list: (isLoading: boolean) =>
    css({
      display: "flex",
      flexDirection: "column",
      justifyContent: isLoading ? "center" : "auto",
      alignItems: isLoading ? "center" : "auto",
      backgroundColor: backgroundColorBright,
      padding: spacing(spacingSmall),
      flex: 1,
      overflow: "auto"
    }),
  noEmailPlaceholder: css({
    fontFamily,
    fontSize: TextSize.Medium,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }),
  footer: css({
    height: spacingMedium,
    backgroundColor: cardBottomColor,
    borderRadius: spacing(0, 0, spacingTiny, spacingTiny)
  })
}
