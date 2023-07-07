import {CSSInterpolation} from "@emotion/serialize"
import useEvent from "@react-hook/event"
import * as React from "react"
import OutsideClickHandler from "react-outside-click-handler"
import {ButtonVariant, HeadingLevel, IconName} from "../../enums"
import {Children, CustomStyle} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {Button, Heading, Icon, Overlay} from ".."
import {modalStyle as styles} from "./modal.style"

export interface ModalProps extends Children {
  readonly confirmButtonDisabled?: boolean
  readonly confirmButtonKey?: LucaI18nLangKey
  readonly confirmStopEventPropagationOnClick?: boolean
  readonly customButtonStyles?: CSSInterpolation
  readonly customContentStyles?: CSSInterpolation
  readonly customFooterStyles?: CSSInterpolation
  readonly customHeaderStyles?: CSSInterpolation
  readonly customOverlayStyles?: CSSInterpolation
  readonly deleteButtonDisabled?: boolean
  readonly deleteButtonKey?: LucaI18nLangKey
  readonly deleteStopEventPropagationOnClick?: boolean
  readonly dismissButtonKey?: LucaI18nLangKey
  readonly dismissOnOutsideClick?: boolean
  readonly dismissStopEventPropagationOnClick?: boolean
  readonly hideFooter?: boolean
  readonly isConfirmButtonLoading?: boolean
  readonly onConfirm: () => void
  readonly onDelete?: () => void
  readonly onDismiss?: () => void
  readonly preventDismissOnEscape?: boolean
  readonly preventSubmitOnEnter?: boolean
  readonly renderHeader?: () => React.ReactNode
  readonly showEmptyFooter?: boolean
  readonly stopEventPropagationOnOverlayClick?: boolean
  readonly title: string | React.ReactNode
  readonly sectionRef?: React.RefObject<HTMLElement>
  readonly renderFooter?: () => React.ReactNode
}

export const Modal: React.FC<ModalProps & CustomStyle> = ({
  children,
  confirmButtonDisabled = false,
  confirmButtonKey,
  confirmStopEventPropagationOnClick = false,
  customButtonStyles,
  customContentStyles,
  customFooterStyles,
  customHeaderStyles,
  customOverlayStyles,
  customStyles,
  deleteButtonDisabled = false,
  deleteButtonKey,
  deleteStopEventPropagationOnClick = false,
  dismissButtonKey,
  dismissOnOutsideClick = false,
  dismissStopEventPropagationOnClick = false,
  hideFooter = false,
  isConfirmButtonLoading,
  onConfirm,
  onDelete,
  onDismiss,
  preventDismissOnEscape = false,
  preventSubmitOnEnter = false,
  renderHeader,
  showEmptyFooter = false,
  stopEventPropagationOnOverlayClick,
  title,
  sectionRef,
  renderFooter
}) => {
  const {t} = useLucaTranslation()
  const deleteLabel = t(deleteButtonKey || "delete_button")
  const dismissLabel = t(dismissButtonKey || "cancel_button")
  const confirmLabel = t(confirmButtonKey || "confirm_button")
  const customOverlayStylesProp = customOverlayStyles ? {customStyles: customOverlayStyles} : undefined

  useEvent(document, "keydown", ({key}) => {
    if (!confirmButtonDisabled && !preventSubmitOnEnter && key === "Enter") {
      onConfirm()
    }

    if (onDismiss && !preventDismissOnEscape && key === "Escape") {
      onDismiss()
    }
  })

  return (
    <Overlay stopEventPropagation={stopEventPropagationOnOverlayClick} {...customOverlayStylesProp}>
      <OutsideClickHandler onOutsideClick={() => (dismissOnOutsideClick && onDismiss ? onDismiss() : {})}>
        <div css={[styles.wrapper, customStyles]}>
          <header css={[styles.heading, customHeaderStyles]}>
            {!renderHeader ? <Heading level={HeadingLevel.h3}>{title}</Heading> : renderHeader()}
            {onDismiss && <Icon onClick={onDismiss} customStyles={styles.closeIcon} name={IconName.Close} />}
          </header>
          <section css={[styles.content, customContentStyles]} ref={sectionRef}>
            {children}
          </section>

          {!hideFooter && (
            <React.Fragment>
              {!renderFooter ? (
                <footer css={[styles.footer(!onDismiss && !onDelete), customFooterStyles]}>
                  {!!onDelete && (
                    <Button
                      disabled={deleteButtonDisabled}
                      onClick={onDelete}
                      icon={IconName.Trash}
                      className={"delete-button"}
                      customStyles={[styles.button, styles.confirmButton, styles.deleteButton, customButtonStyles]}
                      stopEventPropagation={deleteStopEventPropagationOnClick}>
                      {deleteLabel}
                    </Button>
                  )}
                  {!!onDismiss && (
                    <Button
                      onClick={onDismiss}
                      className={"cancel-button"}
                      customStyles={[
                        styles.button,
                        styles.confirmButton,
                        styles.dismissButton(!!onDelete),
                        customButtonStyles
                      ]}
                      variant={ButtonVariant.Secondary}
                      stopEventPropagation={dismissStopEventPropagationOnClick}>
                      {dismissLabel}
                    </Button>
                  )}
                  <Button
                    disabled={confirmButtonDisabled}
                    onClick={onConfirm}
                    isLoading={isConfirmButtonLoading}
                    customStyles={[styles.button, customButtonStyles]}
                    className={"confirm-button"}
                    variant={ButtonVariant.Primary}
                    stopEventPropagation={confirmStopEventPropagationOnClick}>
                    {confirmLabel}
                  </Button>
                </footer>
              ) : (
                renderFooter()
              )}
            </React.Fragment>
          )}
          {hideFooter && showEmptyFooter && <div css={[styles.emptyFooter, customFooterStyles]} />}
        </div>
      </OutsideClickHandler>
    </Overlay>
  )
}
