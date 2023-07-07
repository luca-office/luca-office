import {css} from "@emotion/react"
import * as React from "react"
import {Icon, Paper, Text, Tooltip} from "shared/components"
import {IconName} from "shared/enums"
import {errorColor, Flex, spacing, spacingCard, spacingMedium, spacingTiny, TextSize} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"

export interface InviteAttendeesEmailAddressesGridItemProps {
  readonly emailAddress: string
  readonly isEmpty: boolean
  readonly disabled?: boolean
  readonly isInvalid?: boolean
  readonly onDeleteClicked?: () => void
  readonly titleKey?: LucaI18nLangKey
}

export const InviteAttendeesEmailAddressesGridItem: React.FC<InviteAttendeesEmailAddressesGridItemProps> = ({
  emailAddress,
  isEmpty,
  isInvalid = false,
  onDeleteClicked,
  disabled = false,
  titleKey
}) => {
  const {t} = useLucaTranslation()

  const paperElem = (
    <Paper
      title={disabled ? t("projects__survey_details_tooltip_invite_already_sent") : titleKey ? t(titleKey) : undefined}
      customStyles={styles.paper(isEmpty, disabled, isInvalid)}>
      <Text size={TextSize.Medium}>{emailAddress}</Text>
      {!isEmpty && (
        <Tooltip title={t("projects__survey_details_tooltip_remove_from_list")}>
          <Icon
            title={t("projects__survey_details_tooltip_remove_from_list")}
            onClick={onDeleteClicked}
            className="trash-icon"
            customStyles={styles.icon}
            name={IconName.Trash}
          />
        </Tooltip>
      )}
    </Paper>
  )

  // only display the tooltip if the paper is disabled
  return !disabled && !titleKey ? (
    paperElem
  ) : (
    <Tooltip title={t(titleKey ?? "projects__survey_details_tooltip_invite_already_sent")}>{paperElem}</Tooltip>
  )
}

const styles = {
  paper: (isEmpty: boolean, isDisabled: boolean, isInvalid: boolean) =>
    css(Flex.row, {
      padding: isEmpty ? spacingMedium : spacing(spacingTiny * 1.5, spacingCard),
      backgroundColor: isEmpty ? "#F5F6F7" : "white",
      border: isInvalid ? `1px solid ${errorColor}` : undefined,
      opacity: isDisabled ? 0.48 : 1,
      boxShadow: isEmpty ? "none" : undefined,
      cursor: isDisabled ? "not-allowed" : undefined,
      justifyContent: "space-between",

      "&:hover": {
        ".trash-icon": {
          display: !isDisabled ? "block" : "none",
          cursor: !isDisabled ? "pointer" : "initial"
        }
      }
    }),
  icon: css({
    display: "none"
  })
}
