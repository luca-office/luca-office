import {css} from "@emotion/react"
import * as React from "react"
import {Button, CardFooter, CardFooterItem, Icon, Tooltip} from "shared/components"
import {ButtonVariant, IconName} from "shared/enums"
import {buttonBackgroundDanger, Flex, validationErrorColor} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {formatDateFromString} from "shared/utils"
import {EditingStatusIndicator, EditingStatusIndicatorProps} from "../../../../components"
import {SelectionBaseEntity, SelectionCardStatusConfig} from "../module-selection-container"

export interface SelectionCardProps<T extends SelectionBaseEntity> {
  readonly author: string
  readonly createdAt: string
  readonly deselectEntity: (entity: T) => void
  readonly entity: T
  readonly isAssigned: boolean
  readonly isDisabled: boolean
  readonly isSelected: boolean
  readonly onClick: () => void
  readonly selectEntity: (entity: T) => void
  readonly customFooterItem?: React.ReactElement
  readonly editingStatusConfig?: SelectionCardStatusConfig
  readonly hideButton?: boolean
}

export const SelectionCardFooter = <T extends SelectionBaseEntity>({
  deselectEntity,
  hideButton = false,
  entity,
  isAssigned,
  isSelected,
  isDisabled,
  createdAt,
  selectEntity,
  author,
  customFooterItem,
  editingStatusConfig
}: SelectionCardProps<T>) => {
  const {t} = useLucaTranslation()
  const tooltipText = isSelected
    ? t("placeholder__remove_from_selection")
    : isAssigned
    ? t("placeholder__already_assigned")
    : isDisabled
    ? t("placeholder__disabled_cause_of_single_selection")
    : t("placeholder__add_to_selection")

  const stopEventPropagation = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    evt.stopPropagation()
  }

  const handleSelect = () => (isSelected ? deselectEntity(entity) : selectEntity(entity))

  return (
    <CardFooter customStyles={[styles.footerWithText]} onClick={stopEventPropagation}>
      <CardFooterItem text={formatDateFromString(createdAt)} icon={IconName.Calendar} />
      <CardFooterItem text={`${author}`} icon={IconName.User} />
      {customFooterItem}
      {editingStatusConfig && (
        <EditingStatusIndicator {...editingStatusConfig} iconOnly={true} t={t} customStyles={styles.statusIcon} />
      )}
      {!hideButton && (
        <Tooltip title={tooltipText}>
          <Button
            disabled={isAssigned || isDisabled}
            icon={isAssigned || isSelected ? IconName.Close : IconName.Add}
            variant={ButtonVariant.IconOnly}
            customStyles={isSelected && styles.deleteButton}
            onClick={handleSelect}
          />
        </Tooltip>
      )}
    </CardFooter>
  )
}

const styles = {
  footerWithText: css(Flex.row, {
    justifyContent: "space-between",
    cursor: "default"
  }),
  deleteButton: css({
    background: buttonBackgroundDanger,
    borderColor: validationErrorColor
  }),
  statusIcon: css({
    marginLeft: "auto"
  })
}
