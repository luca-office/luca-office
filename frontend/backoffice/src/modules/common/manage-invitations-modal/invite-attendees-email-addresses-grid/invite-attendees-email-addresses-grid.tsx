import {partial, range} from "lodash-es"
import * as React from "react"
import {ContentLoadingIndicator, Heading, Icon, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {errorColor, Flex} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {InviteAttendeesEmailAddressesGridItem} from "../invite-attendees-email-addresses-grid-item/invite-attendees-email-addresses-grid-item"
import {EmailAddressesMetadata} from "../models/email-addresses-metadata"
import {styles} from "./invite-attendees-email-addresses-grid.style"

export interface InviteAttendeesErrorConfig {
  readonly icon: IconName
  readonly text: string
}

export interface InviteAttendeesEmailAddressesGridProps {
  readonly emailAddressesMetadata: EmailAddressesMetadata
  readonly onDeleteEmailAddress: (email: string) => void
  readonly alreadyInvitedEmailAddresses: string[]
  readonly loading?: boolean
  readonly inviteAttendeesTitleKey?: LucaI18nLangKey
  readonly errorConfig?: InviteAttendeesErrorConfig
  readonly showError?: boolean
}

export const InviteAttendeesEmailAddressesGrid: React.FC<InviteAttendeesEmailAddressesGridProps> = ({
  emailAddressesMetadata,
  onDeleteEmailAddress,
  alreadyInvitedEmailAddresses,
  loading = false,
  inviteAttendeesTitleKey = "projects__survey_details_invite_emails_grid_heading",
  errorConfig,
  showError = false
}) => {
  const {t} = useLucaTranslation()

  const displayError = showError && errorConfig !== undefined

  const emailAddresses = emailAddressesMetadata.uniqueAddresses
  const duplicatedAddresses = emailAddressesMetadata.duplicatedAddresses
  const invitedAddresses = emailAddressesMetadata.alreadyInvitedAddresses
  const emailAddressesExisting =
    !!emailAddresses.length ||
    !!duplicatedAddresses.length ||
    !!invitedAddresses.length ||
    !!alreadyInvitedEmailAddresses.length

  const duplicatesStartIndex = alreadyInvitedEmailAddresses.length + emailAddresses.length
  const invitedStartIndex = duplicatesStartIndex + duplicatedAddresses.length
  return (
    <div className="wrapper" css={[styles.wrapper, Flex.column]}>
      <Heading customStyles={styles.heading} level={HeadingLevel.h3}>
        {t(inviteAttendeesTitleKey)}
      </Heading>
      <div className="grid-wrapper" css={[styles.gridWrapper, Flex.column]}>
        <div className="grid-top-bar" css={styles.gridTopBar} />
        <div className="grid-scroll-wrapper" css={styles.gridScrollWrapper}>
          {loading && <ContentLoadingIndicator customStyles={styles.loadingIndicator} />}
          {!loading && !emailAddressesExisting && (
            <Text customStyles={styles.emptyText}>{t("projects__survey_details_invite_emails_empty")}</Text>
          )}
          <div className="grid" css={styles.grid}>
            {emailAddressesExisting
              ? [...alreadyInvitedEmailAddresses, ...emailAddresses, ...duplicatedAddresses, ...invitedAddresses].map(
                  (address, index) => {
                    const isAlreadyInvited = index < alreadyInvitedEmailAddresses.length
                    const isDuplicate = index >= duplicatesStartIndex && index < invitedStartIndex
                    const isAlreadyInvitedDuplicate = index >= invitedStartIndex

                    const isInvalid = index >= duplicatesStartIndex
                    const disabled = alreadyInvitedEmailAddresses.includes(address) && isAlreadyInvited

                    const titleKey =
                      isAlreadyInvited || isAlreadyInvitedDuplicate
                        ? "projects__survey_details_tooltip_invite_already_sent"
                        : isDuplicate
                        ? "projects__survey_details_tooltip_invite_duplicate"
                        : undefined

                    return (
                      <InviteAttendeesEmailAddressesGridItem
                        onDeleteClicked={partial(onDeleteEmailAddress, address)}
                        isEmpty={false}
                        key={`${address}-${index}`}
                        isInvalid={isInvalid}
                        disabled={disabled}
                        emailAddress={address}
                        titleKey={titleKey}
                      />
                    )
                  }
                )
              : range(24).map(number => (
                  <InviteAttendeesEmailAddressesGridItem key={number} isEmpty={true} emailAddress="" />
                ))}
          </div>
        </div>
        <div className="grid-bottom-bar" css={styles.gridBottomBar(displayError)} />
        {displayError && (
          <div css={styles.errorMessage}>
            <Icon name={errorConfig?.icon ?? IconName.Alert} color={errorColor} />
            <Text customStyles={styles.errorMessageText}>{errorConfig?.text}</Text>
          </div>
        )}
      </div>
    </div>
  )
}
