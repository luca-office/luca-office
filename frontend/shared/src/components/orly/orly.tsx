import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {CustomStyle, headerHeight} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {Modal} from "../modal/modal"
import {ReactPortal} from "../react-portal/react-portal"
import {Text} from "../typography/typography"

export interface OrlyProps extends CustomStyle {
  readonly customOverlayStyles?: CSSInterpolation
  readonly onConfirm: () => void
  readonly onDismiss: () => void
  readonly confirmButtonKey?: LucaI18nLangKey
  readonly isConfirmButtonLoading?: boolean
  readonly confirmButtonDisabled?: boolean
  readonly stopEventPropagationOnOverlayClick?: boolean
  readonly titleKey?: LucaI18nLangKey
  readonly textKey?: LucaI18nLangKey
  readonly renderCustomContent?: () => JSX.Element
}

export const Orly: React.FC<OrlyProps> = ({
  customStyles,
  customOverlayStyles,
  onConfirm,
  onDismiss,
  confirmButtonKey = "delete_button",
  isConfirmButtonLoading = false,
  confirmButtonDisabled = false,
  stopEventPropagationOnOverlayClick = false,
  titleKey = "dialog__delete_element_title",
  textKey = "dialog__delete_element_text",
  renderCustomContent
}) => {
  const {t} = useLucaTranslation()
  return (
    <ReactPortal>
      <Modal
        customStyles={customStyles}
        customOverlayStyles={[styles.overlay, customOverlayStyles]}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
        confirmButtonKey={confirmButtonKey}
        isConfirmButtonLoading={isConfirmButtonLoading}
        confirmButtonDisabled={confirmButtonDisabled}
        confirmStopEventPropagationOnClick={true}
        dismissStopEventPropagationOnClick={true}
        stopEventPropagationOnOverlayClick={stopEventPropagationOnOverlayClick}
        title={t(titleKey)}>
        {renderCustomContent !== undefined ? renderCustomContent() : <Text>{t(textKey)}</Text>}
      </Modal>
    </ReactPortal>
  )
}

const styles = {
  overlay: css({
    // leave out header region
    marginTop: headerHeight,
    // center content against margin
    "> div > *": {
      marginTop: -headerHeight
    }
  })
}
