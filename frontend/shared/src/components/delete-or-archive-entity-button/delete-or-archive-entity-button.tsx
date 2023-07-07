import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {IconName} from "../../enums"
import {ArchiveEntityHook, DeleteEntityHook} from "../../models"
import {buttonBackgroundDanger, CustomStyle} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {OrlyButton, OrlyButtonContainer, OrlyButtonProps} from "../orly-button/orly-button"

export interface DeleteOrArchiveEntityButtonProps extends CustomStyle {
  readonly customButtonStyles?: CSSInterpolation
  readonly disabled?: boolean
  readonly entityId: UUID
  readonly iconColor?: string
  readonly isConfirmDialogVisible?: boolean
  readonly modalTextKey?: LucaI18nLangKey
  readonly modalTitleKey?: LucaI18nLangKey
  readonly onSuccess?: (entityId?: UUID) => void
  readonly stopEventPropagation?: boolean
  readonly stopEventPropagationOnOverlayClick?: boolean
  readonly textKey?: LucaI18nLangKey
  readonly titleKey?: LucaI18nLangKey
  readonly toggleIsConfirmDialogVisible?: (isVisible: boolean) => void
  readonly useDeleteHook?: (id: UUID) => DeleteEntityHook
  readonly useArchiveHook?: (id: UUID) => ArchiveEntityHook
}

export const DeleteOrArchiveEntityButton: React.FC<DeleteOrArchiveEntityButtonProps> = ({
  customButtonStyles,
  customStyles,
  disabled,
  entityId,
  isConfirmDialogVisible,
  modalTextKey,
  modalTitleKey,
  onSuccess,
  iconColor,
  stopEventPropagation,
  stopEventPropagationOnOverlayClick,
  textKey,
  titleKey,
  toggleIsConfirmDialogVisible,
  useDeleteHook,
  useArchiveHook
}) => {
  const {t} = useLucaTranslation()

  if (useArchiveHook === undefined && useDeleteHook === undefined) {
    console.error("No Delete Or Archive Hook was passed. Please pass one of them.")
  }

  const deleteHook = useDeleteHook?.(entityId)
  const archiveHook = useArchiveHook?.(entityId)

  const handleArchiveOrDelete = () => {
    if (archiveHook) {
      archiveHook.archiveEntity(entityId).then(() => {
        if (onSuccess) {
          onSuccess(entityId)
        }
      })
    } else if (deleteHook) {
      deleteHook.deleteEntity(entityId).then(() => {
        if (onSuccess) {
          onSuccess(entityId)
        }
      })
    }
  }

  const orlyProps: OrlyButtonProps & CustomStyle = {
    customStyles,
    customButtonStyles: [deleteEntityButtonStyles.trashButton, customButtonStyles],
    disabled: deleteHook?.deleteEntityLoading || archiveHook?.archiveEntityLoading || disabled,
    onConfirm: handleArchiveOrDelete,
    modalTextKey: modalTextKey ?? (useArchiveHook ? "dialog__archive_element_text" : "dialog__delete_element_text"),
    modalTitleKey: modalTitleKey ?? (useArchiveHook ? "dialog__archive_element_title" : "dialog__delete_element_title"),
    confirmButtonKey: useArchiveHook ? "archive_button" : "delete_button",
    stopEventPropagation,
    textKey,
    titleKey,
    stopEventPropagationOnOverlayClick
  }

  return isConfirmDialogVisible !== undefined && toggleIsConfirmDialogVisible !== undefined ? (
    <OrlyButton
      t={t}
      iconName={useArchiveHook ? IconName.Archive : IconName.Trash}
      iconColor={iconColor}
      toggleConfirmDialog={() => toggleIsConfirmDialogVisible(!isConfirmDialogVisible)}
      showConfirmDialog={isConfirmDialogVisible}
      {...orlyProps}
    />
  ) : (
    <OrlyButtonContainer
      iconName={useArchiveHook ? IconName.Archive : IconName.Trash}
      iconColor={iconColor}
      {...orlyProps}
    />
  )
}

export const deleteEntityButtonStyles = {
  trashButton: css({
    background: buttonBackgroundDanger,
    border: "none"
  }),
  iconOnlyButton: css({
    background: "transparent",
    borderColor: "transparent",

    ":disabled": {
      background: "transparent",
      borderColor: "transparent",
      opacity: 0.4
    }
  })
}
