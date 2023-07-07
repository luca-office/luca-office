import {css} from "@emotion/react"
import * as React from "react"
import {Icon, Tooltip} from "../../../components"
import {IconName} from "../../../enums"
import {
  backgroundColorBright,
  borderRadius,
  borderRadiusSmall,
  boxHeightMedium,
  deepShadow,
  Flex,
  fontColor,
  fontColorBright,
  fontColorLight,
  fontFamily,
  listEntrySelectedColor,
  primaryColor,
  spacing,
  spacingHuge,
  spacingSmall,
  spacingTinier,
  TextSize
} from "../../../styles"
import {useLucaTranslation} from "../../../translations"

export interface Props {
  isSelected: boolean
  isRead: boolean
  eMailAddress: string
  subject: string
  subLabel?: string
  onClick: () => void
  isIntroductionEmail?: boolean
}

export const EmailListEntry: React.FC<Props> = ({
  isSelected,
  eMailAddress,
  subject,
  subLabel,
  isRead,
  onClick,
  isIntroductionEmail = false
}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={[Flex.row, styles.container(isSelected)]} onClick={onClick}>
      {isIntroductionEmail && (
        <Tooltip customStyles={styles.emailIconContainer} title={t("email__introduction_email_label")}>
          <Icon name={IconName.Email} color={fontColorBright} />
        </Tooltip>
      )}
      <div css={[Flex.column, styles.contentContainer]}>
        <div css={styles.emailRow}>
          <span css={styles.emailLabel}>{eMailAddress}</span>
          <div css={styles.emailStatusWrapper}>
            <span css={styles.emailLabel}>{subLabel}</span>
            <div css={styles.emailStatus(isRead)} />
          </div>
        </div>
        <div css={styles.subject}>{subject}</div>
      </div>
    </div>
  )
}

const styles = {
  container: (isSelected: boolean) =>
    css({
      paddingLeft: boxHeightMedium,
      position: "relative",
      border: `2px solid ${isSelected ? primaryColor : "transparent"}`,
      borderRadius: borderRadius,
      cursor: "pointer",
      boxSizing: "border-box",
      backgroundColor: isSelected ? listEntrySelectedColor : backgroundColorBright,
      transition: "all 0.2s",
      marginBottom: spacingTinier,

      ":hover": {
        boxShadow: deepShadow
      }
    }),
  contentContainer: css({
    margin: spacingSmall,
    width: "100%"
  }),
  emailLabel: css({
    fontFamily: fontFamily,
    fontSize: TextSize.Medium,
    letterSpacing: "0.15px",
    lineHeight: spacing(20),
    color: fontColor
  }),
  subject: css({
    fontFamily: fontFamily,
    fontSize: TextSize.Small,
    letterSpacing: "0.13px",
    lineHeight: spacing(18),
    color: fontColorLight,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }),
  emailIconContainer: css(Flex.column, {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: spacingHuge,
    backgroundColor: primaryColor,
    borderTopLeftRadius: borderRadiusSmall,
    borderBottomLeftRadius: borderRadiusSmall
  }),
  emailRow: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }),
  emailStatusWrapper: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }),
  emailStatus: (isRead: boolean) =>
    css({
      marginLeft: spacingSmall,
      borderRadius: "100%",
      width: 8,
      height: 8,
      background: !isRead ? primaryColor : undefined
    })
}
