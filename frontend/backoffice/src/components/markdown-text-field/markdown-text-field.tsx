import {css} from "@emotion/react"
import * as React from "react"
import {DeleteOrArchiveEntityButton, DeleteOrArchiveEntityButtonProps, Icon} from "shared/components"
import {IconName} from "shared/enums"
import {
  borderRadius,
  cardBottomColor,
  CustomStyle,
  Flex,
  primaryColor,
  spacingMedium,
  spacingSmall,
  spacingTiny
} from "shared/styles"
import {MarkdownText, MarkdownTextUpdateModal} from ".."

interface ContainerProps {
  readonly deleteConfig?: Required<
    Pick<DeleteOrArchiveEntityButtonProps, "entityId" | "useDeleteHook" | "modalTitleKey" | "modalTextKey">
  >
  readonly dialogTitle?: string
  readonly isEditable: boolean
  readonly onClick?: () => void
  readonly onConfirm?: (text: string) => Promise<unknown>
  readonly placeholder?: React.ReactElement | string
  readonly scrollId?: string
  readonly text: string
}

export const MarkdownTextField: React.FC<ContainerProps & CustomStyle> = ({
  customStyles,
  deleteConfig,
  dialogTitle,
  isEditable,
  onClick,
  onConfirm,
  placeholder,
  scrollId,
  text
}) => {
  const [isDeleteOrlyVisible, setIsDeleteOrlyVisible] = React.useState<boolean>(false)
  const [showMarkdownDialog, setShowMarkdownDialog] = React.useState<boolean>(false)
  const [hasMultilineText, setHasMultilineText] = React.useState<boolean>(false)
  const markdownRef = React.createRef<HTMLDivElement>()

  const handleClick = () => {
    if (isEditable) {
      onClick !== undefined ? onClick() : {}
      setShowMarkdownDialog(true)
    }
  }

  const trimmedText = text ? text.trim() : ""
  const hasText = trimmedText !== ""

  React.useEffect(() => {
    setHasMultilineText((markdownRef.current?.childElementCount ?? 0) > 1)
  }, [markdownRef])

  return (
    <>
      <div
        onClick={handleClick}
        css={[styles.wrapper(isEditable, hasText), customStyles]}
        className="markdown-text-field"
        data-scroll={scrollId}>
        <MarkdownText markdown={trimmedText} placeholder={placeholder} ref={markdownRef} />
        <div css={styles.controls(hasMultilineText, isDeleteOrlyVisible)} className={"controls"}>
          <Icon customStyles={styles.editIcon(hasMultilineText)} color={primaryColor} name={IconName.EditBordered} />
          {deleteConfig && (
            <DeleteOrArchiveEntityButton
              customStyles={styles.deleteButton(hasMultilineText)}
              stopEventPropagation={true}
              stopEventPropagationOnOverlayClick={true}
              isConfirmDialogVisible={isDeleteOrlyVisible}
              toggleIsConfirmDialogVisible={setIsDeleteOrlyVisible}
              {...deleteConfig}
            />
          )}
        </div>
      </div>
      {showMarkdownDialog ? (
        <MarkdownTextUpdateModal
          text={text}
          title={dialogTitle || ""}
          onConfirm={(text: string) => {
            if (onConfirm) {
              onConfirm(text)
            }
            setShowMarkdownDialog(false)
          }}
          onDismiss={() => setShowMarkdownDialog(false)}
        />
      ) : null}
    </>
  )
}

const styles = {
  wrapper: (isEditable: boolean, hasText: boolean) =>
    css(Flex.row, {
      justifyContent: "space-between",
      width: "100%",
      boxSizing: "border-box",
      cursor: isEditable ? "pointer" : "default",
      paddingLeft: hasText ? spacingTiny : spacingMedium,
      marginLeft: -spacingTiny,

      "&:hover": {
        backgroundColor: isEditable ? cardBottomColor : "none",
        borderRadius: borderRadius,

        ...(isEditable && {
          ".controls": {
            opacity: 1
          }
        })
      }
    }),
  controls: (hasMultilineText: boolean, isDeleteOrlyVisible: boolean) =>
    css(hasMultilineText ? Flex.column : Flex.row, {
      justifyContent: hasMultilineText ? "space-between" : "center",
      alignItems: hasMultilineText ? "auto" : "center",
      alignSelf: "stretch",
      opacity: isDeleteOrlyVisible ? 1 : 0,
      margin: spacingSmall
    }),
  editIcon: (hasMultilineText: boolean) =>
    css({
      alignSelf: hasMultilineText ? "flex-end" : "auto",
      marginRight: hasMultilineText ? 0 : spacingMedium
    }),
  deleteButton: (hasMultilineText: boolean) =>
    css({
      marginTop: hasMultilineText ? spacingSmall : 0
    })
}
