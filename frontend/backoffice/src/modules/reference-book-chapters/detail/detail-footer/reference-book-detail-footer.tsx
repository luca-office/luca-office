import {css} from "@emotion/react"
import * as React from "react"
import {Button, Icon, Text} from "shared/components"
import {ButtonVariant, IconName} from "shared/enums"
import {CustomStyle, spacingHeader, spacingHuge, spacingMedium, spacingSmall} from "shared/styles"
import {formatDate} from "shared/utils"

export interface ReferenceBookDetailFooterProps {
  readonly author: string
  readonly buttonText: string
  readonly creationDate: Date
  readonly disabled?: boolean
  readonly onButtonClick: () => void
}

export const ReferenceBookDetailFooter: React.FC<ReferenceBookDetailFooterProps & CustomStyle> = ({
  author,
  buttonText,
  creationDate,
  customStyles,
  disabled = false,
  onButtonClick
}) => (
  <div css={[styles.wrapper, customStyles]}>
    <div>
      <div css={styles.iconWrapper}>
        <Icon customStyles={styles.icon} name={IconName.Calendar} />
        <Text customStyles={styles.textDate}>{formatDate(creationDate)}</Text>
        <Icon customStyles={styles.icon} name={IconName.Profile} />
        <Text>{author}</Text>
      </div>
    </div>
    <Button onClick={onButtonClick} variant={ButtonVariant.Primary} disabled={disabled}>
      {buttonText}
    </Button>
  </div>
)

const styles = {
  wrapper: css({
    backgroundColor: "white",
    display: "flex",
    boxSizing: "border-box",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${spacingMedium}px ${spacingHeader}px`,
    userSelect: "none"
  }),
  iconWrapper: css({
    display: "flex",
    alignItems: "center"
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  textDate: css({
    marginRight: spacingHuge
  })
}
