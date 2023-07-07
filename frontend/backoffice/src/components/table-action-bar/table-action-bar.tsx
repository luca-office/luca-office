import {css} from "@emotion/react"
import * as React from "react"
import {Button} from "shared/components"
import {ButtonVariant, IconName} from "shared/enums"
import {buttonBackgroundDanger, CustomStyle, errorColor, Flex, spacingHuge, spacingTiny} from "shared/styles"

export interface TableActionBarProps extends CustomStyle {
  readonly onMoveUpwards: () => void
  readonly onMoveDownwards: () => void
  readonly onDelete?: () => void
  readonly upwardMoveDisabled?: boolean
  readonly downwardMoveDisabled?: boolean
  readonly deleteDisabled?: boolean
  readonly className?: string
}

export const TableActionBar: React.FC<TableActionBarProps> = ({
  onMoveUpwards,
  onMoveDownwards,
  onDelete,
  upwardMoveDisabled,
  downwardMoveDisabled,
  deleteDisabled,
  className,
  customStyles
}) => (
  <div className={className} css={[styles.wrapper, customStyles]}>
    <div css={Flex.row}>
      <Button
        variant={ButtonVariant.IconOnly}
        onClick={() => onMoveUpwards()}
        icon={IconName.ArrowUp}
        customStyles={styles.button}
        disabled={upwardMoveDisabled}
        customIconStyles={styles.buttonIcon}
      />
      <Button
        variant={ButtonVariant.IconOnly}
        onClick={() => onMoveDownwards()}
        icon={IconName.ArrowDown}
        disabled={downwardMoveDisabled}
        customStyles={[styles.button, styles.spacedButton]}
        customIconStyles={styles.buttonIcon}
      />
    </div>
    {!!onDelete && (
      <Button
        variant={ButtonVariant.IconOnly}
        onClick={() => onDelete()}
        icon={IconName.Trash}
        disabled={deleteDisabled}
        customStyles={[styles.button, styles.deleteButton]}
        customIconStyles={styles.buttonIcon}
      />
    )}
  </div>
)

const Sizes = {
  icon: 16
}
const styles = {
  wrapper: css(Flex.row, {
    flex: 1,
    justifyContent: "space-between"
  }),
  button: css({
    height: spacingHuge,
    width: spacingHuge
  }),
  spacedButton: css({
    marginLeft: spacingTiny
  }),
  deleteButton: css({
    borderColor: errorColor,
    background: buttonBackgroundDanger
  }),
  buttonIcon: css({
    fontSize: Sizes.icon,
    height: Sizes.icon,
    width: Sizes.icon,
    minWidth: Sizes.icon
  })
}
