import * as React from "react"
import {CardFooterItem} from "shared/components"
import {IconName} from "shared/enums"
import {settingStyles} from "../../scenario-settings.style"

export interface CardFooterIconProps {
  readonly isFinalized: boolean
}

export const CardFooterIcon: React.FC<CardFooterIconProps> = ({isFinalized}) => (
  <CardFooterItem
    customStyles={settingStyles.cardFooterItemLocked(isFinalized)}
    icon={isFinalized ? IconName.LockClosed : IconName.EditBordered}
  />
)
