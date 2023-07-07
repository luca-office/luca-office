import * as React from "react"
import {PdfViewer} from "../../components"
import {Binary} from "../../models"
import {UseBinaryViewerHook} from "../../redux/hooks"
import {CustomStyle} from "../../styles"

export interface PdfViewerSurveyEvents {
  readonly sendCloseBinaryEvent: (binaryId: UUID) => void
  readonly sendSelectPdfEvent: (binary: Binary) => void
}

interface Props extends CustomStyle {
  readonly onClose: () => void
  readonly onMinimize?: () => void
  readonly useState: () => UseBinaryViewerHook
  readonly useSurveyEvents: () => PdfViewerSurveyEvents
}

export const PdfViewerContainer: React.FC<Props> = ({customStyles, onClose, onMinimize, useState, useSurveyEvents}) => {
  const {binaries, selectedBinaryId, selectBinaryId, closeBinary: onCloseBinary} = useState()

  const {sendCloseBinaryEvent, sendSelectPdfEvent} = useSurveyEvents()

  React.useEffect(() => {
    selectedBinaryId.forEach(id => {
      const binary = binaries.find(b => b.id === id)

      if (binary !== undefined) {
        sendSelectPdfEvent(binary)
      }
    })
  }, [selectedBinaryId.orNull()])

  const closeBinary = (binaryId: UUID) => {
    onCloseBinary(binaryId)
    sendCloseBinaryEvent(binaryId)
  }

  const handleClose = () => {
    binaries.forEach(binary => sendCloseBinaryEvent(binary.id))
    onClose()
  }

  return (
    <PdfViewer
      customStyles={customStyles}
      onClose={handleClose}
      onMinimize={onMinimize}
      selectBinaryId={selectBinaryId}
      {...{binaries, selectedBinaryId, closeBinary}}
    />
  )
}
