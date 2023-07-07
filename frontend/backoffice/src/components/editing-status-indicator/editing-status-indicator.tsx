import {css} from "@emotion/react"
import * as React from "react"
import {Icon, Text} from "shared/components"
import {IconName} from "shared/enums"
import {CustomStyle, Flex, FontWeight, spacingMedium, spacingSmall, TextSize} from "shared/styles"
import {WithLucaTranslation} from "shared/translations"

export interface EditingStatusIndicatorProps extends WithLucaTranslation, CustomStyle {
  readonly isFinalized: boolean
  readonly isPublished?: boolean
  readonly iconOnly?: boolean
  readonly iconWithText?: boolean
}

export const EditingStatusIndicator: React.FC<EditingStatusIndicatorProps> = ({
  customStyles,
  isFinalized,
  isPublished,
  iconOnly = true,
  iconWithText = false,
  t
}) => {
  const statusText = (
    <Text size={iconWithText ? TextSize.Medium : TextSize.Smaller}>
      {t(
        isPublished
          ? "subheader__filter_by_published"
          : !isFinalized
          ? "subheader__filter_by_in_progress"
          : "subheader__filter_by_done"
      )}
    </Text>
  )
  return (
    <div className="editing-status-indicator" css={css([Flex.row, customStyles])}>
      {iconOnly || iconWithText ? (
        <Icon
          name={isPublished ? IconName.Publish : isFinalized ? IconName.LockClosed : IconName.EditBordered}
          hasSpacing={iconWithText}
        />
      ) : (
        <React.Fragment>
          {!iconWithText && (
            <Text size={TextSize.Smaller} customStyles={styles.statusLabel}>
              {t("detail_card__label_status")}:
            </Text>
          )}
          {statusText}
        </React.Fragment>
      )}
      {iconWithText && statusText}
    </div>
  )
}

const styles = {
  statusLabel: css({
    fontWeight: FontWeight.Bold,
    marginRight: spacingSmall
  })
}
