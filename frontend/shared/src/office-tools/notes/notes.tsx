import {css} from "@emotion/react"
import {debounce} from "lodash-es"
import React from "react"
import {OfficeWindow, TextArea} from "../../components"
import {ViewerToolsType} from "../../enums"
import {NotesState} from "../../redux/state/data"
import {CustomStyle, floatingWindowShadow, spacingSmall} from "../../styles"

export interface NotesProps extends CustomStyle {
  readonly onClose: () => void
  readonly onMinimize?: () => void
  readonly onOutsideClick?: () => void
  readonly updateNotes: (note: NotesState) => void
  readonly text: NotesState
  readonly isReadOnly?: boolean
}

export const Notes: React.FC<NotesProps> = ({
  customStyles,
  onClose,
  onMinimize,
  onOutsideClick,
  updateNotes,
  text,
  isReadOnly
}) => {
  const debouncedChangeHandler = debounce(
    (ev: React.ChangeEvent<HTMLTextAreaElement>) => updateNotes(ev.target.value),
    500
  )

  return (
    <OfficeWindow
      customStyles={[styles.window, customStyles]}
      toolType={ViewerToolsType.Notes}
      isDraggable={true}
      isFooterVisible={false}
      draggableBoundsSelector={".desktop-content"}
      onClose={onClose}
      onMinimize={onMinimize}
      onOutsideClick={onOutsideClick}>
      <TextArea
        customStyles={styles.textWrapper}
        trimText={false}
        readOnly={isReadOnly}
        defaultValue={text}
        onChange={debouncedChangeHandler}
        customStyleOnlyTextArea={styles.textArea}
      />
    </OfficeWindow>
  )
}

const styles = {
  window: css({
    boxShadow: floatingWindowShadow
  }),
  textWrapper: css({
    padding: spacingSmall,
    textIndent: 0,
    minWidth: 150,
    minHeight: 150,
    resize: "both"
  }),
  textArea: css({
    height: "40vh",
    width: "30vw"
  })
}
