import {css} from "@emotion/react"
import * as React from "react"
import {Icon} from "shared/components"
import {IconName} from "shared/enums"
import {Flex, spacingSmall} from "shared/styles"

interface Props {
  readonly showMail?: boolean
  readonly showTextEditor?: boolean
}

export const SettingsHeaderIcons: React.FC<Props> = ({showMail, showTextEditor}) => (
  <div css={[Flex.row, styles.headerIcons]}>
    <Icon name={IconName.FolderStack} />
    {showMail && <Icon name={IconName.Email} />}
    {showTextEditor && <Icon name={IconName.TextEditor} />}
  </div>
)

const styles = {
  headerIcons: css({
    "> div:not(:last-of-type)": {
      marginRight: spacingSmall
    }
  })
}
